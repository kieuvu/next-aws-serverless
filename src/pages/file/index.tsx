import FetchService from "@/services/FetchService";
import Link from "next/link";
import { ReactElement, ReactNode, useEffect, useState } from "react";

export default function File(): ReactElement {
  const [file, setFile] = useState<Blob | null>(null);
  const [images, setImages] = useState<[]>([]);

  useEffect((): void => {
    getImages();
  }, []);

  function handleFileChange(e: any): void {
    setFile(e.target.files[0]);
  }

  async function getImages(): Promise<void> {
    const response: any = await new FetchService()
      .setURL("/api/file")
      .withBearerAuthorization()
      .fetch();

    if (response.status) setImages(response.data);
  }

  async function handleFileUpload(): Promise<void> {
    if (!file) {
      alert("No file input detected");
      return;
    }

    const fileSizeInBytes: number = file.size;
    const maxFileSizeInBytes: number = 1024 * 1024;

    if (fileSizeInBytes >= maxFileSizeInBytes) {
      alert("File size exceeds the maximum allowed size of 1MB.");
      return;
    }

    const fileName: string = encodeURIComponent(file.name);
    const fileType: string = encodeURIComponent(file.type);

    try {
      const response: any = await new FetchService()
        .setURL("/api/createS3Presigned")
        .withBearerAuthorization()
        .setData({
          fileName,
          fileType,
        })
        .fetch();

      const { url, fields, filename, bucket } = response;
      const formData: FormData = new FormData();

      Object.entries({ ...fields, file }).forEach(
        ([key, value]: [string, any]): void => {
          formData.append(key, value as string);
        },
      );

      await new FetchService()
        .isPostRequest()
        .setURL(url)
        .setFormData(formData)
        .fetch();

      await new FetchService()
        .isPostRequest()
        .setURL("/api/file")
        .setData({
          filename,
          bucket,
        })
        .withBearerAuthorization()
        .fetch();

      await getImages();
    } catch (error) {
      console.error("Error when upload file:", error);
    }
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='mt-5'>
        <input
          accept='image/*'
          type='file'
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </div>

      <h1 className='prose text-center mt-[50px]'>All Image</h1>
      <div className='table w-[800px] rounded p-2 border-2 mt-[50px]'>
        <div className='table-header-group'>
          <div className='table-row'>
            <div className='text-left table-cell border-b-2 pb-2 mt-2'>
              Name
            </div>
            <div className='text-left table-cell border-b-2 pb-2 mt-2'>
              Bucket
            </div>
            <div className='text-left table-cell border-b-2 pb-2 mt-2'>
              Author
            </div>
          </div>
        </div>
        <div className='table-row-group'>
          {images.map(
            (image: any, index: number): ReactNode => (
              <div
                className='table-row'
                key={index}>
                <div className='table-cell pt-2'>
                  <Link
                    target='_blank'
                    className='text-blue-600 underline '
                    href={`https://${image.bucket}.s3.amazonaws.com/${image.name}`}>
                    {image.name}
                  </Link>
                </div>
                <div className='table-cell pt-2'>{image.bucket}</div>
                <div className='table-cell pt-2'>{image.author}</div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

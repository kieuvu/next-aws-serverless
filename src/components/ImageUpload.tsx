import FetchService from "@/services/FetchService";
import { ReactElement } from "react";

export default function ImageUpload(): ReactElement {
  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): Promise<any> => uploadPhoto(e)}
        type='file'
        accept='image/png, image/jpeg'
      />
    </>
  );
}

const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
  const file: File = e.target.files?.[0]!;
  const fileName: string = encodeURIComponent(file.name);
  const fileType: string = encodeURIComponent(file.type);

  const res: any = await new FetchService()
    .setURL("/api/createS3Presigned")
    .withBearerAuthorization()
    .setData({
      fileName,
      fileType,
    })
    .fetch();

  const { url, fields } = await res;
  const formData: FormData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  return await new FetchService().isPostRequest().setURL(url).setFormData(formData).fetch();
};

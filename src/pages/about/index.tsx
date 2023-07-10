import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

const logToServer = async (): Promise<any> => {
  const response = await fetch("/api/log");
  return await response.json();
};

const getHelloApi = async (): Promise<any> => {
  return await fetch("/api/hello");
};

const dispatchQueue = async () => {
  await fetch("api/queue", {
    method: "POST",
    body: JSON.stringify({
      to: "recipient@example.com",
      subject: "Hello",
      body: "This is the email body.",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function About(): ReactElement {
  const [helloMessage, setHelloMessage] = useState<string>("");
  const [logMessage, setLogMessage] = useState<string>("");
  const [uploadFileToggle, setUploadFileToggle] = useState<boolean>(false);

  useEffect((): void => {
    const fetch = async (): Promise<void> => {
      const response = await getHelloApi();
      const data = await response.json();

      if (data.message) {
        setHelloMessage(data.message);
      }
    };

    fetch();
  }, []);

  const handleLogToServer = async (): Promise<void> => {
    const logData = await logToServer();
    if (logData.status) {
      setLogMessage(logData.logMessage);
    }
  };

  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>
      <code className='font-mono font-bold my-2'>
        Test API: Get Hello Message From Api: [{helloMessage}]
      </code>

      <button
        onClick={(): Promise<void> => handleLogToServer()}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Log Anything On Server <br />
        {logMessage}
      </button>

      <button
        onClick={() => setUploadFileToggle(!uploadFileToggle)}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Upload File To S3
      </button>

      {uploadFileToggle ? <ImageUpload /> : <></>}

      <button
        onClick={() => dispatchQueue()}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Dispatch Queue
      </button>

      <button className=' my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <Link href='/'>Back To Home</Link>
      </button>
    </div>
  );
}

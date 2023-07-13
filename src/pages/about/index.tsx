import ImageUpload from "@/components/ImageUpload";
import FetchService from "@/services/FetchService";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const logToServer = async (): Promise<any> => {
  return await new FetchService().setURL("/api/log").withBearerAuthorization().fetch();
};

const getHelloApi = async (): Promise<any> => {
  return await new FetchService().setURL("/api/hello").withBearerAuthorization().fetch();
};

const dispatchQueue = async (): Promise<any> => {
  await new FetchService()
    .isPostRequest()
    .setURL("api/queueSender")
    .setHeader("Content-Type", "application/json")
    .withBearerAuthorization()
    .fetch();
};

export default function About(): ReactElement {
  const [helloMessage, setHelloMessage] = useState<string>("");
  const [logMessage, setLogMessage] = useState<string>("");
  const [uploadFileToggle, setUploadFileToggle] = useState<boolean>(false);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const router: NextRouter = useRouter();

  useEffect((): void => {
    const fetch = async (): Promise<void> => {
      setIsFetching(true);
      const response: any = await getHelloApi();
      setIsFetching(false);
      if (response.status) return setHelloMessage(response.message);
      setIsUnauthorized(true);
    };

    fetch();
  }, []);

  const logout = () => {
    localStorage.clear();
    router.reload();
  };

  const handleLogToServer = async (): Promise<void> => {
    const logData: any = await logToServer();
    if (logData?.status) setLogMessage(logData.logMessage);
  };

  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>
      <code className='font-mono font-bold my-2'>
        Test API: Get Hello Message From Api: [
        {isUnauthorized ? (
          <>
            <code>Unauthorized: </code>
            <Link
              className='text-blue-500'
              href='/login'
            >
              Login
            </Link>
            |
            <Link
              className='text-blue-500'
              href='/register'
            >
              Register
            </Link>
          </>
        ) : (
          helloMessage
        )}
        ]
      </code>

      <button
        onClick={(): Promise<void> => handleLogToServer()}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Log Anything On Server <br />
        {logMessage}
      </button>

      <button
        onClick={(): void => setUploadFileToggle(!uploadFileToggle)}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Upload File To S3
      </button>

      {uploadFileToggle ? <ImageUpload /> : <></>}

      <button
        onClick={(): Promise<any> => dispatchQueue()}
        className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Dispatch Queue
      </button>

      <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <Link href='/'>Back To Home</Link>
      </button>

      {!isFetching && (
        <>
          {isUnauthorized ? (
            <>
              <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <Link href='/register'>Register</Link>
              </button>
              <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <Link href='/login'>Login</Link>
              </button>
            </>
          ) : (
            <button
              onClick={(): void => logout()}
              className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Logout
            </button>
          )}
        </>
      )}
    </div>
  );
}

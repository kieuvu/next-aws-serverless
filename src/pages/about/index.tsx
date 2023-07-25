import FetchService from "@/services/FetchService";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

async function logToServer(): Promise<any> {
  return new FetchService()
    .setURL("/api/log")
    .withBearerAuthorization()
    .fetch();
}

async function getHelloApi(): Promise<any> {
  return new FetchService()
    .setURL("/api/hello")
    .withBearerAuthorization()
    .fetch();
}

async function dispatchQueue(): Promise<any> {
  new FetchService()
    .isPostRequest()
    .setURL("api/queueSender")
    .setHeader("Content-Type", "application/json")
    .withBearerAuthorization()
    .fetch();
}

export async function getServerSideProps(): Promise<any> {
  const res: Response = await fetch(
    "https://api.github.com/repos/vercel/next.js",
  );
  const repo: any = await res.json();
  return { props: { repo } };
}

export default function About({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const [helloMessage, setHelloMessage] = useState<string>("");
  const [logMessage, setLogMessage] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const router: NextRouter = useRouter();

  useEffect((): void => {
    async function fetch(): Promise<void> {
      setIsFetching(true);
      const response: any = await getHelloApi();
      setIsFetching(false);
      if (!response.status) return setIsAuthorized(false);
      setHelloMessage(response.message);
      setIsAuthorized(true);
    }

    fetch();
  }, []);

  function logout(): void {
    localStorage.clear();
    router.reload();
  }

  async function handleLogToServer(): Promise<void> {
    const logData: any = await logToServer();
    if (logData?.status) setLogMessage(logData.logMessage);
  }

  return (
    <div className='h-[100vh] flex items-center justify-center flex-col'>
      <div className='mb-5'>
        Test: Data Received From getServerSideProps()
        <div className='h-[200px] overflow-auto'>
          <pre>{JSON.stringify(repo, null, 4)}</pre>
        </div>
      </div>
      <code className='font-mono font-bold my-2'>
        Test API: Get Hello Message From Api: [
        {!isAuthorized && !isFetching ? (
          <>
            <code>Unauthorized: </code>
            <Link
              className='text-blue-500'
              href='/login'>
              Login
            </Link>
            |
            <Link
              className='text-blue-500'
              href='/register'>
              Register
            </Link>
          </>
        ) : (
          helloMessage
        )}
        ]
      </code>
      {!isAuthorized ? (
        <></>
      ) : (
        <>
          <button
            onClick={(): Promise<void> => handleLogToServer()}
            className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Log Something On Server <br />
            {logMessage}
          </button>

          <button
            onClick={(): Promise<any> => dispatchQueue()}
            className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Dispatch Queue
          </button>

          <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            <Link href='/dynamodb'>DynamoDB</Link>
          </button>

          <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            <Link href='/file'>Upload File</Link>
          </button>

          <button className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            <Link href='/'>Back To Home</Link>
          </button>

          {!isFetching && isAuthorized && (
            <button
              onClick={(): void => logout()}
              className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Logout
            </button>
          )}
        </>
      )}
    </div>
  );
}

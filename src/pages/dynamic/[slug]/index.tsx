import hello from "@/pages/api/hello";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";

export default function Dynamic(): ReactElement {
  const router: NextRouter = useRouter();

  return (
    <div className='flex items-center justify-center h-[100vh] flex-col'>
      <h1>Slug: {router.query.slug}</h1>
    </div>
  );
}

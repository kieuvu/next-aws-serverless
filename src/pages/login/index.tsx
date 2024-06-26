import { ReactElement, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import FetchService from "@/services/FetchService";

export default function Login(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router: NextRouter = useRouter();

  async function onSubmit(): Promise<void> {
    if (!email.trim() || !password.trim()) {
      alert("Fill out all fields");
    }

    const response: any = await new FetchService()
      .isPostRequest()
      .setURL("/api/auth/login")
      .setData({
        email,
        password,
      })
      .fetch();

    if (response.status) {
      localStorage.setItem(
        "credentials",
        JSON.stringify(response.credentials.token),
      );
      console.log("Login Success", response);
      router.push("/about");
    }
  }

  return (
    <div className='flex items-center justify-center h-[100vh] flex-col'>
      <div className='text-center font-bold text-[24px]'>Login</div>
      <div className='m-10'>
        <div>
          <label
            className='block'
            htmlFor='input_text'
          >
            Email:
          </label>
          <input
            id='input_text'
            value={email}
            type='text'
            required
            className='border'
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div>
          <label
            className='block'
            htmlFor='input_password'
          >
            Password:
          </label>
          <input
            value={password}
            id='input_password'
            type='password'
            required
            className='border'
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(e.target.value)
            }
          />
        </div>
      </div>
      <button
        onClick={(): Promise<void> => onSubmit()}
        className='border'
      >
        Submit
      </button>
    </div>
  );
}

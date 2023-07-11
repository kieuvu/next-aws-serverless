import FetchService from "@/services/FetchService";
import { ReactElement, useState } from "react";

export default function Register(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      alert("Fill out all fields");
    }

    const response = await new FetchService()
      .isPostRequest()
      .setURL("/api/auth/register")
      .setData({
        email,
        password,
      })
      .fetch();

    console.log("Submitted", response);
  };

  return (
    <div className='flex items-center justify-center h-[100vh] flex-col'>
      <div className='text-center font-bold text-[24px]'>Register</div>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={() => onSubmit()}
        className='border'
      >
        Submit
      </button>
    </div>
  );
}

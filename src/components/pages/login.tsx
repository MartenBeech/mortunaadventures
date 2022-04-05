import React, { useState } from "react";
import buffer from "buffer";
import { Auth } from "../../rest/auth";

export let Username = "";

interface loginProps {
  setToken: any;
}

export function Login(props: loginProps) {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Username = process.env.REACT_APP_AUTH_EMAIL_ADMIN;
    let authenticated = await Auth({
      username: Username,
      password,
    });
    if (!authenticated) {
      Username = process.env.REACT_APP_AUTH_EMAIL_GUEST;
      authenticated = await Auth({
        username: Username,
        password,
      });
    }

    if (authenticated) {
      const buff = buffer.Buffer.from(`${password}`).toString("base64");
      const basicAuth = `Basic ${buff}`;

      const token = basicAuth;
      props.setToken(token);
    }

    if (!authenticated) {
      setErrorMsg("Incorrect password");
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col w-full ml-4 mr-4 justify-center bg-gray-400 rounded-xl">
        <div className="flex justify-center text-2xl mt-8">
          Please Enter Password
        </div>
        {errorMsg && (
          <div className="flex justify-center w-full">
            <div className="flex justify-center rounded w-2/3 text-lg text-red-500 bg-red-200 mt-4">
              {errorMsg}
            </div>
          </div>
        )}
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label>
            <div className="flex justify-center mt-8 text-lg">Password</div>
            <div className="flex justify-center">
              <input
                className="border w-2/3 rounded px-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="flex justify-center">
            <button
              className="mt-8 border border-black rounded bg-barma-blue-dark text-white hover:bg-barma-blue-light mb-8 w-1/4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

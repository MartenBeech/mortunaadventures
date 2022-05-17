import React, { useState } from "react";
import buffer from "buffer";
import { Auth } from "../../rest/auth";
import { Paragraph } from "../paragraph";

export let Username = "";
export let UserIsAdmin = false;

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
      UserIsAdmin = Username === process.env.REACT_APP_AUTH_EMAIL_ADMIN;

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
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col w-full ml-4 mr-4 justify-center bg-details-light rounded-xl">
        <div className="flex justify-center mt-8">
          <Paragraph value="Please Enter Password" textSize="2xl" />
        </div>
        {errorMsg && (
          <div className="flex justify-center w-full">
            <div className="flex justify-center rounded w-2/3 bg-error mt-4">
              <Paragraph value={errorMsg} textSize={"lg"} />
            </div>
          </div>
        )}
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label>
            <div className="flex justify-center mt-8">
              <Paragraph value="Password" textSize="lg" />
            </div>
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
              className="mt-8 border border-black rounded bg-highlights hover:bg-details-light text-dark font-montserrat mb-8 w-1/4"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { GetBlogResponse } from "../entities/blog";

interface titleProps {
  title: string;
}

export function Title(props: titleProps) {
  return (
    <div className="mt-8 mb-8 text-base">
      <p className=" font-serif font-bold text-2xl border-b">{props.title}</p>
    </div>
  );
}

interface titleInputProps {
  state: GetBlogResponse;
  setState: React.Dispatch<React.SetStateAction<GetBlogResponse>>;
}

export function TitleInput(props: titleInputProps) {
  return (
    <div className="mt-8 mb-8 text-base">
      <input
        className=" font-serif font-bold text-2xl border-b w-full bg-background"
        value={props.state.title}
        placeholder="Please enter Title..."
        onChange={(event) => {
          props.setState({ ...props.state, title: event.target.value });
        }}
      ></input>
    </div>
  );
}

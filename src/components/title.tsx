import React from "react";

interface titleProps {
  title: string;
}

export function Title(props: titleProps) {
  return (
    <div className="mt-8 mb-8">
      <div className="text-3xl font-serif font-bold text-base border-b">
        {props.title}
      </div>
    </div>
  );
}

interface titleInputProps {
  state: any;
  setState: any;
}

export function TitleInput(props: titleInputProps) {
  return (
    <div className="mt-8 mb-8">
      <input
        className="text-3xl font-serif font-bold text-base border-b w-full bg-background"
        value={props.state.title}
        onChange={(event) => {
          props.setState({ ...props.state, title: event.target.value });
        }}
      ></input>
    </div>
  );
}

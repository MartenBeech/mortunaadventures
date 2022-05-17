import React from "react";

interface inputProps {
  value: string | number;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: inputProps) {
  return (
    <input
      className="w-full h-10 px-2 bg-details-light border-base border ml-4 rounded font-montserrat mr-4"
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

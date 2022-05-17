import React from "react";

interface inputProps {
  value: string | number;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input(props: inputProps) {
  return (
    <input
      className="w-full h-10 px-2 bg-highlights border-base border ml-4 rounded font-montserrat mr-4"
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

interface fileInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  includeVideos?: boolean;
  multiple?: boolean;
}

export function FileInput(props: fileInputProps) {
  return (
    <label className="flex cursor-pointer w-1/3">
      <div className="flex justify-center w-full border border-base rounded-full px-2 py-1 bg-highlights hover:bg-details-light text-sm">
        {`${props.includeVideos ? "Upload File" : "Upload Image"}${
          props.multiple ? "s" : ""
        }`}
      </div>
      <input
        className="w-0"
        multiple={props.multiple}
        type={"file"}
        style={{ visibility: "hidden" }}
        accept={`image/* ${props.includeVideos ? ", video/*" : ""}`}
        onChange={props.onChange}
      />
    </label>
  );
}

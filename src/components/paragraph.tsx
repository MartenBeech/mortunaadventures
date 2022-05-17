import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { UserIsAdmin } from "./pages/login";

interface paragraphProps {
  value: string;
  textSize?: string;
  bold?: boolean;
}

export function Paragraph(props: paragraphProps) {
  return (
    <div className="text-dark">
      <p
        className={`font-montserrat ${props.bold && "font-bold"} text-${
          props.textSize
        }`}
      >
        {props.value}
      </p>
    </div>
  );
}

interface textAreaProps {
  value: string;
  textSize?: string;
  elementName: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea(props: textAreaProps) {
  return (
    <div className="text-dark">
      <TextareaAutosize
        className={`font-montserrat w-full bg-background resize-none px-2 py-2 rounded-lg text-${props.textSize}`}
        disabled={UserIsAdmin ? false : true}
        value={props.value}
        placeholder={`Please enter ${props.elementName}...`}
        onChange={props.onChange}
      />
    </div>
  );
}

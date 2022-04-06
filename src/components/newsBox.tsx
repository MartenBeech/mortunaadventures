import React from "react";
import { Link } from "react-router-dom";

export interface NewsBoxProps {
  id: number;
  title: string;
  imgSrc: string;
  date: string;
}

export function NewsBox(props: NewsBoxProps) {
  return (
    <div>
      <Link to={`/blog/${props.id}`}>
        <div className="border border-base bg-highlights mt-8">
          <div className="font-montserrat flex justify-center text-xl mt-1 mb-1">
            {props.title}
          </div>
          <div className="w-full h-60">
            <div className="flex justify-center items-center h-full w-full">
              <img className="flex max-h-full max-w-full" src={props.imgSrc} />
            </div>
          </div>
          <div className="font-montserrat flex justify-center mt-1 mb-1">
            {props.date}
          </div>
        </div>
      </Link>
    </div>
  );
}

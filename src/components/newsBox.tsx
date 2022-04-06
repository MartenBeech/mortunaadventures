import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface NewsBoxProps {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  date: string;
}

export function NewsBox(props: NewsBoxProps) {
  return (
    <div className="mt-8">
      <Link to={`/blog/${props.id}`}>
        <div className="flex border border-base bg-highlights">
          <div className="w-1/2">
            <div className="w-full">
              <div className="flex justify-start items-start h-full w-full">
                <img
                  className="flex max-h-full max-w-full"
                  src={props.imgSrc}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="font-montserrat flex justify-center mt-2 mb-2 ml-2 mr-2 text-xl">
              {props.title}
            </div>
            <div className="font-montserrat flex justify-start mt-2 mb-2 ml-2 mr-2">
              {props.description}
            </div>
            <div className="font-montserrat flex justify-end mt-2 mb-2 ml-2 mr-2 items-end">
              {props.date}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

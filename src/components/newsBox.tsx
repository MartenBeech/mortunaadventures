import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScreenSize } from "../app";

export interface NewsBoxProps {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  date: string;
}

export function NewsBox(props: NewsBoxProps) {
  const [screenSize, setScreenSize] = useState({} as ScreenSize);

  useEffect(() => {
    updateScreenSize(window.innerWidth);
  }, []);

  window.addEventListener("resize", () => {
    updateScreenSize(window.innerWidth);
  });

  function updateScreenSize(size: number) {
    setScreenSize(
      size <= 600
        ? ScreenSize.small
        : size <= 1200
        ? ScreenSize.medium
        : ScreenSize.large
    );
  }

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
          {screenSize === ScreenSize.small ? (
            <div className="w-1/2">
              <div className="font-montserrat flex justify-center mt-2 mb-2 ml-2 mr-2 font-bold">
                {props.title}
              </div>
              <div className="font-montserrat flex justify-start mt-2 mb-2 ml-2 mr-2 text-sm">
                {props.description}
              </div>
              <div className="font-montserrat flex justify-end mt-2 mb-2 ml-2 mr-2 items-end text-sm">
                {props.date}
              </div>
            </div>
          ) : (
            <div className="w-1/2">
              <div className="font-montserrat flex justify-center mt-2 mb-2 ml-2 mr-2 font-bold text-xl">
                {props.title}
              </div>
              <div className="font-montserrat flex justify-start mt-2 mb-2 ml-2 mr-2">
                {props.description}
              </div>
              <div className="font-montserrat flex justify-end mt-2 mb-2 ml-2 mr-2 items-end">
                {props.date}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

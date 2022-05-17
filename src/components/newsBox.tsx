import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScreenSize } from "../app";
import { Paragraph } from "./paragraph";

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
              <div className="flex justify-center m-2">
                <Paragraph value={props.title} bold />
              </div>
              <div className="flex justify-start m-2">
                <Paragraph value={props.description} textSize={"sm"} />
              </div>
              <div className="flex justify-end m-2 items-end">
                <Paragraph value={props.date} textSize={"sm"} />
              </div>
            </div>
          ) : (
            <div className="w-1/2">
              <div className="flex justify-center m-2">
                <Paragraph value={props.title} bold textSize="xl" />
              </div>
              <div className="flex justify-start m-2">
                <Paragraph value={props.description} />
              </div>
              <div className="flex justify-end m-2 items-end">
                <Paragraph value={props.date} />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

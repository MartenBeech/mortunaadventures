import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import worldMap from "../../images/worldMap.png";
import { ScreenSize } from "../../app";

export function Homepage() {
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
    <div>
      <div className="h-full w-full relative">
        <img className="relative" src={worldMap} width="100%" />
        <Link
          className="absolute w-2/7 h-2/5 top-20%"
          to={"north-america"}
        ></Link>
        <Link
          className="absolute w-1/4 h-2/5 left-12% top-60%"
          to={"south-america"}
        ></Link>
        <Link
          className="absolute w-1/4 h-1/3 left-40% top-16%"
          to={"europe"}
        ></Link>
        <Link
          className="absolute w-1/4 h-2/5 left-40% top-52%"
          to={"africa"}
        ></Link>
        <Link
          className="absolute w-2/7 h-1/2 left-68% top-16%"
          to={"asia"}
        ></Link>
        <Link
          className="absolute w-1/4 h-1/3 left-72% top-68%"
          to={"australia"}
        ></Link>
      </div>
      <div className="flex justify-center font-montserrat italic mt-6 text-base">
        <div
          className={`${
            screenSize === ScreenSize.large ? "text-md" : "text-sm"
          }`}
        >
          Click any continent to open the map
        </div>
      </div>
    </div>
  );
}

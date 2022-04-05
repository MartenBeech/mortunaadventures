import React from "react";
import { Link } from "react-router-dom";
import worldMap from "../../images/worldMap.png";

export function Homepage() {
  return (
    <div className="h-full w-full relative">
      <img className="relative" src={worldMap} />
      <Link
        className="absolute border border-black w-2/7 h-2/5 top-20%"
        to={"europe"}
      ></Link>
      <Link
        className="absolute border border-black w-1/4 h-2/5 left-12% top-60%"
        to={"europe"}
      ></Link>
      <Link
        className="absolute border border-black w-1/4 h-1/3 left-40% top-16%"
        to={"europe"}
      ></Link>
      <Link
        className="absolute border border-black w-1/4 h-2/5 left-40% top-52%"
        to={"europe"}
      ></Link>
      <Link
        className="absolute border border-black w-2/7 h-1/2 left-68% top-16%"
        to={"europe"}
      ></Link>
      <Link
        className="absolute border border-black w-1/4 h-1/3 left-72% top-68%"
        to={"europe"}
      ></Link>
    </div>
  );
}

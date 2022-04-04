import React from "react";
import { Link } from "react-router-dom";

export function Homepage() {
  return (
    <div>
      <div className="flex justify-center h-11/12">
        <div className="rounded-lg h-full w-full ml-40 mr-40 flex bg-[url('../src/images/worldMap.png')] justify-center">
          <div className="w-full">
            <div className="flex mt-40">
              <div className="flex flex-col">
                <Link
                  className="border border-black w-104 h-88 ml-0"
                  to={"europe"}
                ></Link>
                <Link
                  className="border border-black w-88 h-88 ml-48 mt-8"
                  to={"europe"}
                ></Link>
              </div>
              <div className="flex flex-col">
                <Link
                  className="border border-black w-88 h-72 ml-4"
                  to={"europe"}
                ></Link>
                <Link
                  className="border border-black w-96 h-88 ml-4"
                  to={"europe"}
                ></Link>
              </div>
              <div className="flex flex-col">
                <Link
                  className="border border-black w-104 h-104 ml-0"
                  to={"europe"}
                ></Link>
                <Link
                  className="border border-black w-104 h-80 ml-20"
                  to={"europe"}
                ></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

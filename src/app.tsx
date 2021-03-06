import React, { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { Login } from "./components/pages/login";

export enum ScreenSize {
  small,
  medium,
  large,
}

export function App() {
  const [token, setToken] = useState("");
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
    <div className="flex justify-center bg-background">
      <div
        className={
          screenSize === ScreenSize.small
            ? "w-full"
            : screenSize === ScreenSize.medium
            ? "w-2/3"
            : screenSize === ScreenSize.large
            ? "w-1/2"
            : ""
        }
      >
        <div className="border-l border-r">
          {!token ? (
            <Login setToken={setToken} />
          ) : (
            <div className="min-h-screen bg-background">
              <Navbar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

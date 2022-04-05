import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Username } from "./login";
import { Title } from "../title";

export function News() {
  const [state, setState] = useState({});

  return (
    <div className="w-full">
      <div className="ml-8 mr-8">
        <Title title="News" />
        {Username === process.env.REACT_APP_AUTH_EMAIL_ADMIN && (
          <div className="flex w-full justify-center">
            <Link to={`/blog/0`} className="w-1/2">
              <button className="border border-base bg-highlights hover:bg-details-light w-full h-10 mb-4 rounded-xl font-montserrat">
                Create new Blog
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

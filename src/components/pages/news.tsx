import React, { useState } from "react";
import { Link } from "react-router-dom";

export function News() {
  const [state, setState] = useState({});

  return (
    <div className="w-full">
      <div>News</div>
      <div className="flex w-full">
        <Link to={`/blog/0`}>
          <button className="border border-base bg-highlights hover:bg-details-light w-60 h-20 mb-4 rounded-xl font-montserrat">
            Create new Blog
          </button>
        </Link>
      </div>
    </div>
  );
}

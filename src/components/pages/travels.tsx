import React, { useEffect, useState } from "react";
import { Title } from "../title";
import { NewsBox, NewsBoxProps } from "../newsBox";
import { GetAllNews } from "./news";

export function Travels() {
  const [state, setState] = useState({ news: [] as Array<NewsBoxProps> });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAllNews({ setState, setLoading, label: "Travels" });
  }, []);
  return (
    <div>
      <div className="ml-8 mr-8">
        <Title title="Travels" />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {state.news.map((news) => {
              return (
                <NewsBox
                  key={news.id}
                  date={news.date}
                  id={news.id}
                  imgSrc={news.imgSrc}
                  title={news.title}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="h-8"></div>
    </div>
  );
}

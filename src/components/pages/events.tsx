import React, { useEffect, useState } from "react";
import { Title } from "../title";
import { NewsBox, NewsBoxProps } from "../newsBox";
import { GetAllNews } from "./news";

export function Events() {
  const [state, setState] = useState({ news: [] as Array<NewsBoxProps> });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAllNews({ setState, setLoading, label: "Events" });
  }, []);
  return (
    <div>
      <div className="ml-8 mr-8">
        <Title title="Events" />
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
                  description={news.description}
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Username } from "./login";
import { Title } from "../title";
import { NewsBox, NewsBoxProps } from "../newsBox";
import { GetBlogs } from "../../rest/blog";
import { GetImages } from "../../rest/storage";
import { GetBlogResponse } from "../../entities/blog";

export function News() {
  const [state, setState] = useState({ news: [] as Array<NewsBoxProps> });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetAllNews({ setState, setLoading });
  }, []);
  return (
    <div>
      <div className="ml-8 mr-8">
        <Title title="News" />
        {Username === process.env.REACT_APP_AUTH_EMAIL_ADMIN && (
          <div className="flex w-full justify-center">
            <Link to={`/blog/0`} className="w-1/2">
              <button className="border border-base bg-highlights hover:bg-details-light w-full h-10 rounded-xl font-montserrat">
                Create new Blog
              </button>
            </Link>
          </div>
        )}
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

interface getAllNewsProps {
  setState: React.Dispatch<
    React.SetStateAction<{
      news: NewsBoxProps[];
    }>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
}

export async function GetAllNews(props: getAllNewsProps) {
  props.setLoading(true);

  let blogs = await GetBlogs();

  if (props.label) {
    blogs = blogs.filter((blog) => blog.label === props.label);
  }

  const getImages = async (blog: GetBlogResponse) => {
    const images = await GetImages({ id: blog.id, maxImages: 2 });
    return {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      date: blog.date,
      imgSrc: images[1][0],
    };
  };

  const news = await Promise.all(
    blogs.map((blog) => {
      return getImages(blog);
    })
  );
  news.sort((a, b) => b.id - a.id);
  props.setState({ news });
  props.setLoading(false);
}

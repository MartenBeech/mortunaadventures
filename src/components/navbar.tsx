import React from "react";
import { Homepage } from "./pages/homepage";
import { News } from "./pages/news";
import { Travels } from "./pages/travels";
import { Experiences } from "./pages/experiences";
import { GoogleMap } from "./pages/googleMap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiNewspaper } from "react-icons/gi";
import { MdOutlineAttractions } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { Blog } from "./pages/blog";

export const Navbar = () => {
  return (
    <BrowserRouter>
      <div className="">
        <div className="flex">
          <div className="flex box-border bg-details-light w-screen justify-around">
            <div className="flex w-full">
              <NavButton text="Home" link={"/"} icon={<ImHome size={18} />} />
              <NavButton
                text="News"
                link={"/news"}
                icon={<GiNewspaper size={20} />}
              />
              <NavButton
                text="Travels"
                link={"/travels"}
                icon={<GiCommercialAirplane size={18} />}
              />
              <NavButton
                text="Events"
                link={"/events"}
                icon={<MdOutlineAttractions size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/travels" element={<Travels />}></Route>
        <Route path="/events" element={<Experiences />}></Route>
        <Route path="/europe" element={<GoogleMap />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

interface buttonProps {
  text: string;
  link: string;
  icon?: any;
}

const NavButton = (props: buttonProps) => {
  return (
    <div className="flex w-full">
      <div className="w-full">
        <Link to={`${props.link}`}>
          <div className="w-full justify-center flex">
            <button
              className={
                props.link === useLocation().pathname
                  ? "text-text h-10 w-2/3 cursor-default opacity-50 text-sm"
                  : "text-text h-10 w-2/3 hover:text-base font-montserrat font-bold text-sm hover:text-sm"
              }
            >
              <div className="flex">
                <div className="mr-1">{props.icon}</div>
                <div className="">{props.text.toLocaleUpperCase()}</div>
              </div>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

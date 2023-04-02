import React, { useEffect, useState } from "react";
import clsx from "clsx";
import router from "next/router";
import MenuItem from "./menuItem";
import { useSpring, animated, config } from "react-spring";
import { Icon } from "./icons/icons";
import Link from "next/link";
import jwt_decode from "jwt-decode";


const sidebarItems = [
    [
      { id: "0", title: "Home", notifications: false },
      { id: "2", title: "Forum", notifications: 6 },
      { id: "3", title: "Report", notifications: false },
      { id: "4", title: "Missing", notifications: false },
      { id: "5", title: "Wanted", notifications: false },
      { id: "6", title: "Panic", notifications: false },
      { id: "7", title: "FR", notifications: false },




    ],
    [
      { id: "8", title: "ViewReports", notifications: false },
      { id: "9", title: "AddCriminals", notifications: false },
      { id: "10", title: "DistressSignal", notifications: false },
    ],
  ];

const handleLogout = () => {
    // Clear the local storage or the session data
    localStorage.removeItem("token");
    // Redirect the user to the login page
    router.push("/login");
  };
  
  function SideBar({ onSidebarHide, showSidebar }) {
    interface Token{
      role: string;
      username: string;
      badge: string;
    }

    let token
    if (typeof localStorage !== 'undefined') {

  token = localStorage.getItem("token") as string;
    }
  let decodedToken;
  if (token) {
    try {
      decodedToken = jwt_decode(token) as Token;
    } catch (err) {
      console.error(err);
    }
  }
  const [role, setRole] = useState(null);
  
  useEffect(() => {
      if (decodedToken) {
        setRole(decodedToken.role);
      }
    }, [token, decodedToken]);

  
    const [selected, setSelected] = useState("0");
    const { dashOffset, indicatorWidth, precentage } = useSpring({
      dashOffset: 26.015,
      indicatorWidth: 70,
      precentage: 77,
      from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
      config: config.molasses,
    });
  
    return (
      <div
        className={clsx(
          "fixed inset-y-0 left-0 bg-[#8b0000] text-[#fff] w-full sm:w-20 xl:w-60 sm:flex flex-col z-10",
          showSidebar ? "flex" : "hidden"
        )}
      >
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
            <img src="images/logo.svg" className="w-10 h-10" />
            <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
              CRA
            </div>
            <div
              className="flex-grow sm:hidden xl:block"
              onClick={onSidebarHide}
            />
          </div>
        </div>
        <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
          <div className="w-full p-3 h-24 sm:h-20 xl:h-24 hidden sm:block flex-shrink-0">
            <div className="bg-sidebar-card-top rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3">
              <Icon path="res-react-dash-sidebar-card" className="w-9 h-9 " />
              <div className="block sm:hidden xl:block ml-3">
                <div className="text-sm font-bold text-white">Sales House</div>
                <div className="text-sm">General Item</div>
              </div>
              <div className="block sm:hidden xl:block flex-grow" />
              <Icon
                path="res-react-dash-sidebar-card-select"
                className="block sm:hidden xl:block w-5 h-5"
              />
            </div>
          </div>
          {sidebarItems[0].map((i) => {
  const currentUrl = `/features/${i.title.toLowerCase()}`;
  return (
    <Link href={currentUrl} as={`/${i.title.toLowerCase()}`} key={i.id}>
      <a>
        <MenuItem
          item={i}
          onClick={setSelected}
          selected={selected}
        />
      </a>
    </Link>
  );
})}

 {role === 'police-admin' ? (
    <>
      <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
        Admin Features
      </div>
      {sidebarItems[1].map((i) => {
  const currentUrl = `/features/${i.title.toLowerCase()}`;
  return (
    <Link href={currentUrl} as={`/${i.title.toLowerCase()}`} key={i.id}>
      <a>
        <MenuItem
          item={i}
          onClick={setSelected}
          selected={selected}
        />
      </a>
    </Link>
  );
})}


    </>
  ) : <div><h1></h1></div>}

          <div className="flex-grow" />
          <div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32">
            <div
              className="rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
              }}
            >
              <div className="block sm:hidden xl:block pt-3">
                <div className="font-bold text-gray-300 text-sm">Used Space</div>
                <div className="text-gray-500 text-xs">
                  Admin updated 09:12 am November 08,2020
                </div>
                <animated.div className="text-right text-gray-400 text-xs">
                  {precentage.interpolate((i) => `${Math.round(i)}%`)}
                </animated.div>
                <div className="w-full text-gray-300">
                  <svg
                    viewBox="0 0 100 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5.25"
                      x2="95"
                      y2="5.25"
                      stroke="#3C3C3C"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <animated.line
                      x1="5"
                      y1="5.25"
                      x2={indicatorWidth}
                      y2="5.25"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
  
              <div className="hidden sm:block xl:hidden ">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="56" height="56" fill="#2C2C2D" />
                  <path
                    d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                    stroke="#3C3C3C"
                    strokeWidth="6"
                  />
                  <animated.path
                    d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeDasharray="113.113"
                    strokeDashoffset={dashOffset}
                    strokeWidth="6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="block sm:hidden xl:block ml-2 font-bold">
            <button
              className="btn btn-active bg-[#1e1e1e]"
              onClick={handleLogout}
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                height="16"
                width="16"
              >
                <path
                  className="ml-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
        </div>
      </div>
    );
  }
  export default SideBar;
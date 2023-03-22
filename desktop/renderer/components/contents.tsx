import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Icon, IconButton } from "./icons/icons";
import TopParishes from "./contents/topParishes";
import NameCard from "./contents/nameCards";
import Satisfication from "./contents/satisfication";
import Graph from "./contents/graph";
import Segmentation from "./contents/segmentation";
import AddComponent from "./contents/addComponents";


const employeeData = [
    {
      id: 1,
      name: "Total Crime",
      position: "Sale's manager USA",
      transactions: 3490,
      rise: true,
      tasksCompleted: 3,
    },
  
    {
      id: 2,
      name: "Total Crime",
      position: "Sale's manager Europe",
      transactions: 590,
      rise: false,
      tasksCompleted: 5,
    },
  
    {
      id: 3,
      name: "Total Crime",
      position: "Sale's manager Asia",
      transactions: 2600,
      rise: true,
      tasksCompleted: 1,
    },
  ];
  

function Content({ onSidebarHide }) {
    const [welcome, setWelcome] = useState("");
  
    interface Token{
      role: string;
      username: string;
      badge: string;
    }
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      
      if (decodedToken.role === "civilian") {
        setWelcome(decodedToken.username);
      } else {
        setWelcome(decodedToken.badge);
      }
    }, []);
    const currentDate = new Date(Date.now());
    const dateString = currentDate.toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return (
      <div className="flex w-full bg-[#1e1e1e]">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
          .
        </div>
        <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex justify-between">
              <div className="">
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-[#fff]">
                    welcome {welcome}
                  </div>
                  <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                    <Icon path="res-react-dash-premium-star" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon
                    path="res-react-dash-date-indicator"
                    className="w-3 h-3"
                  />
                  <div className="ml-2">{dateString}</div>
                </div>
              </div>
              <IconButton
                icon="res-react-dash-sidebar-open"
                className="block sm:hidden"
                onClick={onSidebarHide}
              />
            </div>
  
            <button className="btn btn-ghost btn-circle float-left">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
          {employeeData.map(
            ({
              id,
              name,
              position,
              transactions,
              rise,
              tasksCompleted,
            }) => (
              <NameCard
                {...{
                  key: id,
                  id,
                  name,
                  position,
                  transactionAmount: transactions,
                  rise,
                  tasksCompleted,
                }}
              />
            )
          )}
  
          <div className="w-full p-2 lg:w-2/3">
            <div className="rounded-lg bg-card sm:h-80 h-60">
              <Graph />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card h-80">
              <TopParishes />
            </div>
          </div>
  
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card h-80">
              <Segmentation />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card h-80">
              <Satisfication />
            </div>
          </div>
          <div className="w-full p-2 lg:w-1/3">
            <div className="rounded-lg bg-card overflow-hidden h-80">
              <AddComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
export default Content;  
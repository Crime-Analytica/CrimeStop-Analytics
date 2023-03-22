import React, {useState, useEffect} from "react";
import SideBar from "../components/sideBar";
import Content from "../components/contents";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import Store from "electron-store";
const store = new Store();


const home = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);
  interface Token{
    role: string;
    username: string;
    badge: string;
  }
  useEffect(() => {
    const token = store.get("token") as string;
    if (!token) {
      Router.push("/");
      return;
    }
  
    try {
      const decodedToken = jwt_decode(token) as Token;
      if (!decodedToken || !decodedToken.role) {
        Router.push("/");
        return;
      }
    } catch (error) {
      Router.push("/");
      return;
    }
  }, []);
  return (
    <div className="flex">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
};

export default home;

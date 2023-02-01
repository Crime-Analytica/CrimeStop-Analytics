import React from "react";
const { useState, useEffect } = React;;
import SideBar from "../components/sideBar";
import Content from "../components/contents";


const Home = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);
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

export default Home;

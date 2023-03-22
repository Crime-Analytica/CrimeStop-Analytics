import React, { useState } from "react";
import SideBar from "../components/sideBar";
import Spinner from "react-spinner-material";


function fr() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    setLoading(true);
    // simulate image upload
    setTimeout(() => {
      const file = event.target.files[0];
      setImageSrc(URL.createObjectURL(file));
      setLoading(false);
    }, 10000);
  };

  return (
    <div className="flex h-screen">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
        showSidebar={showSidebar}
      />
      <div className="w-full flex items-center justify-center">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner
              radius={60}
              color={"#969696"}
              stroke={2}
              visible={true}
              className=""
            />
          </div>
        ) : imageSrc ? (
          <>
            <img src={imageSrc} alt="uploaded" />
            <p className="mt-20 ml-12 text-[#e01e] text-2xl">Match found</p>
          </>
        ) : (
          <input
            type="file"
            className="w-64 p-4 border border-[#e01e] rounded-lg"
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
}

export default fr;

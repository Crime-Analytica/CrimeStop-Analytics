import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import SideBar from "../components/sideBar";

function Report() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [civilianId, setCivilianId] = useState("");
  const [reportType, setReportType] = useState("");
  const [message, setMessage] = useState("");

  interface Token {
    id: string;
    role: string;
    username: string;
    badge: string;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token) as Token;

    if (decodedToken.role === "civilian") {
      setCivilianId(decodedToken.id);
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      reportType,
      message,
      civilianId,
    };

    try {
      const response = await fetch("http://localhost:80/api/send-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Unable to send report");
      }

      const newReport = await response.json();
      console.log("Report sent:", newReport);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#1e1e1e]">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
        showSidebar={showSidebar}
      />

      <h1 className="text-xl text-white ml-[60rem]"> Send Us A report </h1>

      <div className="flex flex-wrap gap-8 mr-64 mt-20 right-0 left-0 ml-[34rem]">
        <div className="card w-80 bg-[#8b0000] shadow-xl">
          <div className="card-body">
            <h2 className="card-title items justify-center">Arrests Made</h2>
            <div className="card-actions items justify-center">
              <button className="btn bg-[#1e1e1e]  mt-4 w-32 text-xl">
                2,852
              </button>
            </div>
          </div>
        </div>

        <div className="card w-80 bg-[#8b0000] shadow-xl">
          <div className="card-body">
            <h2 className="card-title items justify-center">Tips Received</h2>
            <div className="card-actions items justify-center">
              <button className="btn bg-[#1e1e1e]  mt-4 w-32 text-xl">
                31,023
              </button>
            </div>
          </div>
        </div>

        <div className="card w-80 bg-[#8b0000] shadow-xl">
          <div className="card-body">
            <h2 className="card-title items justify-center">Rewards Paid</h2>
            <div className="card-actions items justify-center">
              <button className="btn bg-[#1e1e1e] mt-4 w-32 text-xl">
                $62,444,085
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-xl ml-[36rem] mt-16 w-1/2 bg-[#8b0000] items justify-center">
        <div className="card-body">
          <form>
            <div className="mb-6">
              <label
                htmlFor="reportType"
                className="block text-white text-lg font-medium mb-2"
              >
                Report Type
              </label>
              <select
                id="reportType"
                name="reportType"
                className="w-full p-3 rounded-md bg-gray-800 text-white"
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="">Select a report type</option>
                <option value="Crime">Crime</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Traffic Violation">Traffic Violation</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-white text-lg font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 rounded-md bg-gray-800 text-white"
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn bg-[#8b0000] text-white hover:bg-red-700 transition-colors duration-200"
              onClick={handleSubmit}
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Report;

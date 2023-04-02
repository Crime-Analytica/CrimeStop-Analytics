import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import GoogleMapReact from "google-map-react";

function DistressSignal() {
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [panicSignals, setPanicSignals] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedPanicSignal, setSelectedPanicSignal] = useState(null);

  useEffect(() => {
    fetch("http://localhost:80/api/get-distressSignals")
      .then((response) => response.json())
      .then((data) => {
        setPanicSignals(data);
        setMapCenter({ lat: data[0].latitude, lng: data[0].longitude });
      })
      .catch((error) => {
        console.error("Error fetching panic signals:", error);
      });
  }, []);

  const handlePanicSignalClick = (panicSignal) => {
    setMapCenter({ lat: panicSignal.latitude, lng: panicSignal.longitude });
    setSelectedPanicSignal(panicSignal);
  };

  const renderPanicSignals = () => {
    return panicSignals.map((panicSignal) => {
      return (
        <div key={panicSignal.id} onClick={() => handlePanicSignalClick(panicSignal)}>
     {/* {panicSignal.civilianId} */}
{panicSignal.message}
         
        </div>
      );
    });
  };

  return (
     <div className="flex h-screen bg-[#1e1e1e]">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
        showSidebar={showSidebar}
      />
        {renderPanicSignals()}

      {mapCenter && (
        <div style={{ height: "100vh", width: "50%" }}>
          <GoogleMapReact center={mapCenter} defaultZoom={12}>
            {selectedPanicSignal && (
              <Marker lat={selectedPanicSignal.latitude} lng={selectedPanicSignal.longitude} />
            )}
          </GoogleMapReact>
        </div>
      )}
    </div>
  );
}

const Marker = () => <div style={{ color: "red" }}>Marker</div>;

export default DistressSignal;

import React, { useEffect, useState } from 'react';
import SideBar from '../components/sideBar';
import jwt_decode from 'jwt-decode';

function Panic() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [civilianId, setCivilianId]=useState("")
  
    interface Token{
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
  const messages = [
    'I need help, please send assistance!',
    'I am in danger, please send help immediately!',
    'I am lost and need assistance, please help me!'
  ];

  const handlePanicClick = () => {
    const apiKey = '4a65a4dbfb7e4bbc99bb6229808896f4';
    const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const latitude = Number(data.latitude);
      const longitude = Number(data.longitude);
      if (selectedMessage) {
        // Send a post request with the information to the backend
        fetch('http://localhost:80/api/send-distress-signal', {
          method: 'POST',
          body: JSON.stringify({ latitude, longitude, message: selectedMessage, civilianId}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
  };

  const handleSelectChange = (event) => {
    setSelectedMessage(event.target.value);
  };

  return (
    <div>
      <SideBar
        onSidebarHide={() => {
          setShowSidebar(true);
        }}
        showSidebar={showSidebar}
      />
      <label
        htmlFor="my-modal-6" 
        className="btn bg-[#8b0000] mt-[28rem] ml-[64rem] z-10"
      >
        <span className='text-white'>
          Send a distress signal
        </span>
      </label>
      
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <select value={selectedMessage} onChange={handleSelectChange}>
            <option value="">Please select a message</option>
            {messages.map((message, index) => (
              <option key={index} value={message}>
                {message}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn" onClick={handlePanicClick}>
              Enter
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panic;

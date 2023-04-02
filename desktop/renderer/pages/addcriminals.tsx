import SideBar from '../components/sideBar'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

function addcriminals() {
    const [showSidebar, onSetShowSidebar] = useState(false);
    cloudinary.config({
      cloud_name: 'dwhs4luwi',
      api_key: '581411898773423',
      api_secret: 'VVF69WiveyBqdA1syQb48eIZ6Mw'
    })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, n/handle-callback-err
    cloudinary.api.ping(function (error, result) { console.log(result) })
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [wantedFor, setWantedFor] = useState("");
      const [image, setImage] = useState(null);
    

      const handleSubmit = async (e) => {
          e.preventDefault();
        
          const data = {
            firstName,
            lastName,
            wantedFor,
            imageUrl: "",
          };
        
          // Read image data and upload to Cloudinary
          if (image) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(image);
            reader.onloadend = () => {
              const buffer = Buffer.from(reader.result as ArrayBuffer);
              const uploadOptions = { folder: "wanted" };
              const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                  console.error(error);
                } else {
                  // Add image URL to data object
                  data.imageUrl = result.secure_url;
        
                  // Send data to server as JSON
                  axios.post("http://localhost:80/api/add-criminals", data, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then(response => {
                    console.log(response.data);
                  })
                  .catch(error => {
                    console.error(error);
                  });
                }
              });
              streamifier.createReadStream(buffer).pipe(uploadStream);
            };
          } else {
            // No image uploaded, send data to server as JSON
            axios.post("http://localhost:80/api/add-criminals", data, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
          }
        }

    return (
      <><div className="flex">
        <SideBar
          onSidebarHide={() => {
            onSetShowSidebar(true);
          } }
          showSidebar={showSidebar} />



      </div><div className="card card-compact w-96 h-[28rem] bg-[#8b0000] ml-[90rem]  shadow-xl z-10 mt-2 absolute">
          <h2 className="card-title ml-20 z-10 mt-4 ">Add Missing Person</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <figure>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                onChange={(e) => setImage(e.target.files[0])} />
            </figure>
            <div className="card-body">
              <div className="card-actions justify-end">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="input w-64 mr-[3.5rem] bg-[#1e1e1e]"
                  value={firstName}

                  onChange={(e) => {
                    console.log(e.target.value);
                    setFirstName(e.target.value);
                  } } />
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="input w-64 mr-[3.5rem] bg-[#1e1e1e]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
                <input
                  type="text"
                  placeholder="Enter wanted for"
                  className="input w-64 mr-[3.5rem] bg-[#1e1e1e]"
                  value={wantedFor}
                onChange={(e) => setWantedFor(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn bg-[#1e1e1e] w-64 flex items-center justify-between  hover:bg-transparent no-animation z-10 ml-[3.5rem]"
                >
                  <span className="text-black  absolute text-xs">Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div></>
    )
}

export default addcriminals

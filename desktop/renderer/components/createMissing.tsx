import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'


// const cloudName = process.env.CLOUDINARY_CLOUD_NAME
// const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
// const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

function CreateMissing() {

    
cloudinary.config({
    cloud_name: 'dwhs4luwi',
    api_key: '581411898773423',
    api_secret: 'VVF69WiveyBqdA1syQb48eIZ6Mw'
  })
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, n/handle-callback-err
  cloudinary.api.ping(function (error, result) { console.log(result) })
    const [startDate, setStartDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [lastSeen, setLastSeen] = useState("");
    const [dateMissing, setDateMissing] = useState("");
    const [image, setImage] = useState(null);
    const [civilian, setCivilianId]=useState("")
  
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
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = {
          firstName,
          lastName,
          age: Number(age),
          lastSeen: lastSeen,
          dateMissing: dateMissing,
          imageUrl: "",
          civilianId: civilian
        };
      
        // Read image data and upload to Cloudinary
        if (image) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(image);
          reader.onloadend = () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer);
            const uploadOptions = { folder: "missing" };
            const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
              if (error) {
                console.error(error);
              } else {
                // Add image URL to data object
                data.imageUrl = result.secure_url;
      
                // Send data to server as JSON
                axios.post("http://localhost:80/api/create-missing-persons", data, {
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
          axios.post("http://localhost:80/api/create-missing-persons", data, {
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
      };
      

  return (
    <div className="card card-compact w-96 h-[28rem] bg-[#8b0000] ml-[90rem]  shadow-xl z-10 mt-2 absolute">
      <h2 className="card-title ml-20 z-10 mt-4 ">Add Missing Person</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <figure>
          <input
            type="file"
            className="file-input w-full max-w-xs"
            onChange={(e) => setImage(e.target.files[0])}
          />
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
  }}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="input w-64 mr-[3.5rem] bg-[#1e1e1e]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Age"
              className="input w-64 mr-[3.5rem] bg-[#1e1e1e]"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button className="btn bg-[#1e1e1e] w-64 flex items-center justify-between  hover:bg-transparent no-animation z-10 mr-[3.5rem]">
              <span className="text-black  absolute text-xs">Last Seen</span>
              <DatePicker
                className="bg-[#1e1e1e] w-[4.5rem] z-10 ml-32"
                selected={lastSeen}
                onChange={(date) => setLastSeen(date)}
              />
            </button>
            <button className="btn bg-[#1e1e1e] w-64 flex items-center justify-between  hover:bg-transparent no-animation z-10ml-[3.5rem]">
              <span className="text-black  absolute text-xs">Date Missing</span>
              <DatePicker
                className="bg-[#1e1e1e] w-[4.5rem] z-10 ml-32"
                selected={dateMissing}
                onChange={(date) => setDateMissing(date)}
              />
            </button>
            <button
              type="submit"
              className="btn bg-[#1e1e1e] w-64 flex items-center justify-between  hover:bg-transparent no-animation z-10 ml-[3.5rem]"
            >
              <span className="text-black  absolute text-xs">Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateMissing;

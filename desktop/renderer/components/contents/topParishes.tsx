import React from "react";
import {Icon} from "../icons/icons";

const Countrydata = [
    { name: "St Catherine", rise: true, value: 21942.83, id: 1 },
    { name: "Kingston", rise: false, value: 19710.0, id: 2 },
    { name: "Clarendon", rise: false, value: 12320.3, id: 3 },
    { name: "Portmore", rise: true, value: 9725.0, id: 4 },
  ];

function TopParishes() {
    return (
      <div className="flex p-4 flex-col h-full">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold">Total Crime</div>
          <Icon path="res-react-dash-plus" className="w-5 h-5" />
        </div>
        <div className="">Parishes</div>
        {Countrydata.map(({ name, rise, value, id }) => (
          <div className="flex items-center mt-3" key={id}>
            <div className="">{id}</div>
            <div className="ml-2">{name}</div>
            <div className="flex-grow" />
            <div className="">{`$${value.toLocaleString()}`}</div>
            <Icon
              path={
                rise ? "res-react-dash-country-up" : "res-react-dash-country-down"
              }
              className="w-4 h-4 mx-3"
            />
            <Icon path="res-react-dash-options" className="w-2 h-2" />
          </div>
        ))}
        <div className="flex-grow" />
        <div className="flex justify-center">
          <div className="">Check All</div>
        </div>
      </div>
    );
  }

  export default TopParishes;
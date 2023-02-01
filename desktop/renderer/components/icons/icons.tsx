import React from "react";
import clsx from "clsx";

export function Icon({ path = "options", className = "w-4 h-4" }) {
    return (
      <img
        src={`https://assets.codepen.io/3685267/${path}.svg`}
        alt=""
        className={clsx(className)}
      />
    );
  }

export function IconButton({
    onClick = () => {},
    icon = "options",
    className = "w-4 h-4",
  }) {
    return (
      <button onClick={onClick} type="button" className={className}>
        <img
          src={`https://assets.codepen.io/3685267/${icon}.svg`}
          alt=""
          className="w-full h-full"
        />
      </button>
    );
  }
  

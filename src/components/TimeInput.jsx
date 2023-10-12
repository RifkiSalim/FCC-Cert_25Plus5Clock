// React Imports
import React from "react";

// Icons
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

export const TimeInput = ({
  type,
  value,
  onIncrease,
  onDecrease,
  disabled,
}) => {
  // Init Dynamic IDs
  let labelId = "";
  let valueId = "";
  let inc = "";
  let dec = "";

  // Set Dynamic IDs
  switch (type) {
    case "break": {
      labelId = "break-label";
      valueId = "break-length";
      inc = "break-increment";
      dec = "break-decrement";
      break;
    }
    case "session": {
      labelId = "session-label";
      valueId = "session-length";
      inc = "session-increment";
      dec = "session-decrement";
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className="container flex flex-col justify-center items-center p-2 space-y-4">
      {/* Input Type */}
      <h3 className="text-3xl font-bold uppercase" id={labelId}>
        {type}
      </h3>
      {/* Controls */}
      <div className="join bg-glass">
        <button
          className="join-item btn btn-ghost disabled:text-white"
          disabled={disabled}
          onClick={onDecrease}
          id={dec}
        >
          <BiMinusCircle size={32} />
        </button>
        {/* Value */}
        <span
          className="flex flex-col justify-center items-center w-12 text-xl join-item"
          id={valueId}
        >
          {value}
        </span>
        <button
          className="join-item btn btn-ghost disabled:text-white"
          disabled={disabled}
          onClick={onIncrease}
          id={inc}
        >
          <BiPlusCircle size={32} />
        </button>
      </div>
    </div>
  );
};

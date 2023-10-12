import React, { useEffect, useState } from "react";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

export const TimeInput = ({ type, onChange, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleIncrement = () => {
    setValue((prevState) => {
      const newValue = prevState + 1;
      return newValue > 60 ? 60 : newValue;
    });
  };
  const handleDecrement = () => {
    setValue((prevState) => {
      const newValue = prevState - 1;
      return newValue <= 0 ? 1 : newValue;
    });
  };

  let labelId = "";
  let valueId = "";
  let inc = "";
  let dec = "";
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
    <div className="container p-2 flex flex-col items-center justify-center space-y-4">
      <h3 className="text-3xl uppercase font-bold" id={labelId}>
        {type}
      </h3>
      <div className="join bg-glass">
        <button
          className="join-item btn btn-ghost"
          onClick={handleDecrement}
          id={inc}
        >
          <BiMinusCircle size={32} />
        </button>
        <span
          className="join-item text-xl w-12 flex flex-col items-center justify-center"
          id={valueId}
        >
          {value}
        </span>
        <button
          className="join-item btn btn-ghost"
          onClick={handleIncrement}
          id={dec}
        >
          <BiPlusCircle size={32} />
        </button>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { BiPlayCircle, BiPauseCircle, BiReset } from "react-icons/bi";

export const Timer = ({ timeLeft, text, onClick, onResetClick }) => {
  const [isRunning, setIsRunning] = useState(false);
  return (
    <div className="bg-glass py-4 px-20 text-gray-100 flex flex-col justify-center items-center space-y-2">
      <div className="p-2">
        <h2 className="text-3xl uppercase" id="timer-label">
          {text}
        </h2>
        <h1 className="text-7xl" id="time-left">
          {timeLeft}
        </h1>
      </div>
      <div className="divider divider-vertical before:bg-gray-100 after:bg-gray-100"></div>
      <div className="flex flex-row p-2 ">
        <button
          className="btn btn-ghost"
          id="start_stop"
          onClick={() => {
            onClick();
          }}
        >
          {isRunning ? <BiPauseCircle size={42} /> : <BiPlayCircle size={42} />}
        </button>
        <div className="divider divider-horizontal before:bg-gray-100 after:bg-gray-100"></div>
        <button className="btn btn-ghost" id="reset" onClick={onResetClick}>
          <BiReset size={42} />
        </button>
      </div>
    </div>
  );
};

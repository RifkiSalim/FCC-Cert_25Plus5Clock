import React from "react";
import { BiPlayCircle, BiPauseCircle, BiReset } from "react-icons/bi";

export const Timer = ({ isRunning, timeLeft, text, onClick, onResetClick }) => {
  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
  };
  return (
    <div className="flex flex-col justify-center items-center px-12 py-4 space-y-2 text-gray-100 lg:px-20 bg-glass">
      <div className="p-2">
        <h2 className="text-2xl uppercase lg:text-3xl" id="timer-label">
          {text}
        </h2>
        <div className="text-5xl lg:text-7xl" id="time-left">
          <h2>{formatTime(timeLeft)}</h2>
        </div>
      </div>
      <div className="divider divider-vertical before:bg-gray-100 after:bg-gray-100"></div>
      <div className="flex flex-row p-2">
        <button
          className="btn btn-ghost"
          id="start_stop"
          onClick={() => onClick()}
        >
          {isRunning ? <BiPauseCircle size={42} /> : <BiPlayCircle size={42} />}
        </button>
        <div className="divider divider-horizontal before:bg-gray-100 after:bg-gray-100"></div>
        <button
          className="btn btn-ghost"
          id="reset"
          onClick={() => onResetClick()}
        >
          <BiReset size={42} />
        </button>
      </div>
    </div>
  );
};

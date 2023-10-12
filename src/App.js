import React, { useEffect, useState } from "react";
import StepsBG from "./assets/bg-steps.svg";
import { TimeInput } from "./components/TimeInput";
import { Timer } from "./components/Timer";
import useCountDown from "react-countdown-hook";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState("session");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    25 * 1000 * 60,
    1000
  );

  return (
    <div
      className="flex flex-col justify-center items-center text-center bg-fixed bg-center bg-cover"
      style={{ height: "100vh", backgroundImage: `url(${StepsBG})` }}
    >
      <div
        className="container flex flex-col lg:flex-row space-y-4 w-full lg:w-3/5 bg-glass p-2 divide-x divide-gray-300"
        style={{
          height: "60%",
        }}
      >
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Timer
            onClick={() => {
              if (isRunning && !isPaused) {
                pause();
                setIsPaused(true);
              } else if (isRunning && isPaused) {
                setIsPaused(false);
                resume();
              } else {
                setIsRunning(true);
                start();
              }
            }}
            onPause={() => pause()}
            text={timerType}
            timeLeft={timeLeft}
            onResetClick={() => {}}
          />
        </div>
        <div className="w-1/2 text-gray-100">
          <div className="container p-2 flex flex-col items-center justify-center h-full">
            <TimeInput
              defaultValue={breakLength}
              onChange={(val) => {}}
              type="break"
            />
            <div className="divider before:bg-gray-300 after:bg-gray-300"></div>
            <TimeInput
              defaultValue={sessionLength}
              onChange={(val) => {}}
              type="session"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

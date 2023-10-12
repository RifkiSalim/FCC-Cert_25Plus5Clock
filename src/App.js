// React Imports
import React, { useRef, useState, useEffect } from "react";

// Custom Components
import { TimeInput } from "./components/TimeInput";
import { Timer } from "./components/Timer";

// Assets
import StepsBG from "./assets/bg-steps.svg";
import BeepFX from "./assets/alarm-beep.mp3";

const App = () => {
  // Settings States
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  // Timer States
  const [isRunning, setIsRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(25 * 60);
  const [timerType, setTimerType] = useState("session");

  // Refs
  const audioRef = useRef(null); // for audio element
  const timerRef = useRef(null); // for timer

  /*
   * Timer related functions
   */

  // Timer state control
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  // Timer Update tick
  const updateTimer = () => {
    if (timerValue > 0) {
      setTimerValue((prevState) => prevState - 1);
    }
    if (timerValue === 1) {
      // Play Audio Ahead of Time
      playAudio();
    }
    if (timerValue === 0) {
      // Toggle Timer Type
      switch (timerType) {
        case "session": {
          setTimerType("break");
          setTimerValue(breakLength * 60);
          break;
        }
        case "break": {
          setTimerType("session");
          setTimerValue(sessionLength * 60);
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  // Input handlers
  const handleTimerClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      stopTimer();
    }
  };

  const handleTimerReset = () => {
    // Reset settings
    setBreakLength(5);
    setSessionLength(25);
    setTimerType("session");
    // stop the timer
    stopTimer();

    // Reset timer
    setTimerValue(sessionLength * 60);
    // also stop audio
    stopAudio();
  };

  /*
   * Settings related functions
   */
  const handleSettingsChange = (value, type) => {
    const newValue =
      type === "session" ? sessionLength + value : breakLength + value;

    if (newValue > 60 || newValue <= 0) return;

    if (type === timerType) {
      setTimerValue(newValue * 60);
    }

    if (type === "session") {
      setSessionLength(newValue);
    } else {
      setBreakLength(newValue);
    }
  };

  /*
   * Audio Related functions
   */
  const playAudio = () => {
    stopAudio();

    audioRef.current.loop = true;
    audioRef.current.play();
  };
  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  /*
   * Side Effects
   */
  // Timer
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(updateTimer, 1000);
      timerRef.current = interval;
    }
    return () => clearInterval(timerRef.current);
  });

  // Prioritize sessionLength for User Story #18.
  // Simple but effective. Thanks for the solution, Aryan!
  useEffect(() => {
    setTimerValue(sessionLength * 60);
  }, [sessionLength]);
  return (
    <div
      className="flex flex-col justify-center items-center text-center bg-fixed bg-center bg-cover"
      style={{ height: "100dvh", backgroundImage: `url(${StepsBG})` }}
    >
      <div
        className="container flex flex-col justify-center items-center p-2 space-y-4 w-full divide-y divide-gray-300 lg:divide-y-0 lg:divide-x lg:flex-row lg:w-3/5 bg-glass"
        style={{
          minHeight: "60%",
        }}
      >
        <div className="flex flex-col justify-center items-center w-1/2">
          <audio src={BeepFX} id="beep" ref={audioRef}></audio>
          <Timer
            isRunning={isRunning}
            onClick={handleTimerClick}
            text={timerType}
            timeLeft={timerValue}
            onResetClick={handleTimerReset}
          />
        </div>
        <div className="w-1/2 text-gray-100">
          <div className="container flex flex-col justify-center items-center p-2 h-full">
            <TimeInput
              disabled={isRunning}
              value={breakLength}
              onIncrease={() => handleSettingsChange(1, "break")}
              onDecrease={() => handleSettingsChange(-1, "break")}
              type="break"
            />
            <div className="divider before:bg-gray-300 after:bg-gray-300"></div>
            <TimeInput
              disabled={isRunning}
              value={sessionLength}
              onIncrease={() => handleSettingsChange(1, "session")}
              onDecrease={() => handleSettingsChange(-1, "session")}
              type="session"
            />
          </div>
        </div>
      </div>
      <span className="my-2 text-center text-white text-opacity-75">
        Designed and Coded by{" "}
        <a
          href="https://rifkisalim.com"
          target="_blank"
          rel="noreferrer"
          className="text-white link"
        >
          Rifki Salim
        </a>
        .
      </span>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTTPage = () => {
  const [playerAScore, setPlayerAScore] = useState(0);
  const [playerBScore, setPlayerBScore] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [currentServer, setCurrentServer] = useState("Player A");
  const [timerId, setTimerId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Function to update the timer
  const handleStartTimer = () => {
    if (isTimerRunning) return;
    setIsTimerRunning(true);

    let minutes = 0;
    let seconds = 0;

    const id = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      setTimer(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    setTimerId(id);
  };

  // Functions to update scores
  const incrementPlayerAScore = () => {
    setPlayerAScore((prev) => {
      const newScore = prev + 1;
      checkServerChange(newScore + playerBScore);
      return newScore;
    });
  };

  const decrementPlayerAScore = () => {
    if (playerAScore > 0) setPlayerAScore(playerAScore - 1);
  };

  const incrementPlayerBScore = () => {
    setPlayerBScore((prev) => {
      const newScore = prev + 1;
      checkServerChange(playerAScore + newScore);
      return newScore;
    });
  };

  const decrementPlayerBScore = () => {
    if (playerBScore > 0) setPlayerBScore(playerBScore - 1);
  };

  // Function to check and update the server based on total points
  const checkServerChange = (totalPoints) => {
    if (totalPoints % 2 === 0) {
      setCurrentServer((prevServer) => (prevServer === "Player A" ? "Player B" : "Player A"));
    }
  };

  // Function to reset match details
  const resetMatch = () => {
    setPlayerAScore(0);
    setPlayerBScore(0);
    setTimer("00:00");
    setCurrentServer("Player A");
    setIsTimerRunning(false);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-center text-[#387478] mb-6">
          Table Tennis Match Coordinator Panel
        </h1>

        {/* Match Info */}
        <div className="bg-white p-6 max-w-6xl mx-auto rounded-lg border border-[#387478] shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold text-[#387478]">Match Timer:</h2>
            <span className="text-xl font-bold text-[#387478]">{timer}</span>
            <button
              onClick={handleStartTimer}
              disabled={isTimerRunning}
              className={`px-4 py-2 rounded ${
                isTimerRunning
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#387478] text-white hover:bg-[#4fa3a9]"
              }`}
            >
              Start Timer
            </button>
          </div>

          {/* Scores */}
          <div className="flex justify-around items-center mb-4 mt-12">
            {/* Player A */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Player A</h3>
              <span className="text-4xl font-bold text-gray-700">{playerAScore}</span>
              <div className="mt-2">
                <button
                  onClick={incrementPlayerAScore}
                  className="px-3 py-1 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Point
                </button>
                <button
                  onClick={decrementPlayerAScore}
                  className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Point
                </button>
              </div>
            </div>

            {/* Player B */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Player B</h3>
              <span className="text-4xl font-bold text-gray-700">{playerBScore}</span>
              <div className="mt-2">
                <button
                  onClick={incrementPlayerBScore}
                  className="px-3 py-1 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Point
                </button>
                <button
                  onClick={decrementPlayerBScore}
                  className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Point
                </button>
              </div>
            </div>
          </div>

          {/* Current Server */}
          <div className="mb-4 mt-12">
            <h3 className="text-lg font-semibold text-[#387478]">Current Server:</h3>
            <p className="text-xl font-bold text-gray-700">{currentServer}</p>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetMatch}
            className="w-full px-4 py-2 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
          >
            Reset Match
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditTTPage;

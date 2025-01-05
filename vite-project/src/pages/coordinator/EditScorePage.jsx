import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditScorePage = () => {
  const [AScore, setAScore] = useState(0);
  const [BScore, setBScore] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [goalScorer, setGoalScorer] = useState("");
  const [extraTime, setExtraTime] = useState("");
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

      if (minutes === 90 + parseInt(extraTime || 0)) {
        clearInterval(id);
        setIsTimerRunning(false);
      }
    }, 1000);

    setTimerId(id);
  };

  // Functions to update scores
  const incrementAScore = () => setAScore(AScore + 1);
  const decrementAScore = () => {
    if (AScore > 0) setAScore(AScore - 1);
  };

  const incrementBScore = () => setBScore(BScore + 1);
  const decrementBScore = () => {
    if (BScore > 0) setBScore(BScore - 1);
  };

  // Function to handle extra time
  const handleExtraTimeInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setExtraTime(value); // Allow only numeric values
    }
  };

  const addExtraTime = () => {
    if (extraTime && parseInt(extraTime) > 0) {
      toast.success("Extra time added!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Function to reset match details
  const resetMatch = () => {
    setAScore(0);
    setBScore(0);
    setTimer("00:00");
    setGoalScorer("");
    setExtraTime("");
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
          Football Match Coordinator Panel
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
                  : "bg-[#448d92] text-white hover:bg-[#4fa3a9]"
              }`}
            >
              Start Timer
            </button>
          </div>

          {/* Scores */}
          <div className="flex justify-around items-center mb-4 mt-12">
            {/* Team A */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Team A</h3>
              <span className="text-4xl font-bold text-gray-700">{AScore}</span>
              <div className="mt-2">
                <button
                  onClick={incrementAScore}
                  className="px-3 py-1 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Goal
                </button>
                <button
                  onClick={decrementAScore}
                  className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Goal
                </button>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Team B</h3>
              <span className="text-4xl font-bold text-gray-700">{BScore}</span>
              <div className="mt-2">
                <button
                  onClick={incrementBScore}
                  className="px-3 py-1 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Goal
                </button>
                <button
                  onClick={decrementBScore}
                  className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Goal
                </button>
              </div>
            </div>
          </div>

          {/* Goal Scorer */}
          <div className="mb-4 mt-12">
            <label className="block text-[#387478] font-semibold mb-2">
              Goal Scorer:
            </label>
            <input
              type="text"
              value={goalScorer}
              onChange={(e) => setGoalScorer(e.target.value)}
              placeholder="Enter player's name"
              className="w-full px-4 py-2 border border-[#387478] rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Extra Time */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#387478]">Extra Time:</h3>
            <div className="flex items-center">
              <input
                type="text"
                value={extraTime}
                onChange={handleExtraTimeInput}
                className="w-24 px-4 py-2 mr-4 border border-[#387478] rounded-lg shadow-md focus:outline-none"
              />
              <button
                onClick={addExtraTime}
                className="px-4 py-2 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
              >
                Add Extra Time
              </button>
            </div>
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

export default EditScorePage;

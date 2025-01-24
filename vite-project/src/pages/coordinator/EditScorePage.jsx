import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import { db, collection, getDocs ,query,where,doc,updateDoc} from "../../firebase/FirebaseConfig";


const EditScorePage = () => {
  const location = useLocation();
  const { eventName, teamA, teamB, stage, venue } = location.state || {};
  

  const [scores, setScores] = useState({
    teamA: 0,
    teamB: 0
  });

  const [timer, setTimer] = useState("00:00");
 
  const [extraTime, setExtraTime] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedScorer, setSelectedScorer] = useState({ teamA: "", teamB: "" });
  
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [isMatchStarted, setIsMatchStarted] = useState(false);  // New state for match status

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const teamAQuery = query(collection(db, "teams"), where("name", "==", teamA));
        const teamBQuery = query(collection(db, "teams"), where("name", "==", teamB));
  
        const [teamAData, teamBData] = await Promise.all([getDocs(teamAQuery), getDocs(teamBQuery)]);
        
        if (!teamAData.empty && !teamBData.empty) {
          const teamA = teamAData.docs[0].data();
          const teamB = teamBData.docs[0].data();
  
          setTeamAPlayers(teamA.players);
          setTeamBPlayers(teamB.players);
        } else {
          console.log("Team data not found");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
  
    fetchPlayers();
  }, [teamA, teamB]);

  

  const handleMatchStart = () => {
    if (!eventName) {
      toast.error("Please enter the event name!");
      return;
    }
    setIsMatchStarted(true);
    toast.success("Match started!");
  };


  const handleStartTimer = async () => {
    if (isTimerRunning) return; // Prevent multiple timers from starting
    if (!eventName) {
      toast.error("Event name is required to start the timer!");
      return;
    }
  
    setIsMatchStarted(true);
    setIsTimerRunning(true);
  
    let minutes = 0;
    let seconds = 0;
  
    try {
      // Update the match status in the "matches" collection
      const matchQuery = query(collection(db, "matches"), where("eventName", "==", eventName));
      const matchSnapshot = await getDocs(matchQuery);
  
      if (!matchSnapshot.empty) {
        const matchDoc = matchSnapshot.docs[0];
        const matchRef = doc(db, "matches", matchDoc.id);
        await updateDoc(matchRef, { status: "live" });
        console.log(`Match '${eventName}' status updated to 'live'.`);
      } else {
        console.error("No matching match found in 'matches' collection.");
      }
  
      console.log("hehe")
      console.log(eventName);
      // Update the event status in the "activeEvents" collection
      const eventQuery = query(collection(db, "activeEvents"), where("eventName", "==", eventName));
      
      const eventSnapshot = await getDocs(eventQuery);
  
      if (!eventSnapshot.empty) {
        const eventDoc = eventSnapshot.docs[0];
        const eventRef = doc(db, "activeEvents", eventDoc.id);
        await updateDoc(eventRef, { status: "live" });
        console.log(`Event '${eventName}' status updated to 'live'.`);
      } else {
        console.error("No matching event found in 'activeEvents' collection.");
      }
  
      // Start the timer after both updates are successful
      const id = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
  
        setTimer(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
  
        // Stop the timer after 90 minutes + extra time
        if (minutes === 90 + parseInt(extraTime || 0)) {
          clearInterval(id);
          setIsTimerRunning(false);
          console.log("Match timer stopped.");
        }
      }, 1000);
  
      setTimerId(id);
    } catch (error) {
      console.error("Error starting the match or updating statuses:", error);
      toast.error("Failed to update match or event status.");
      setIsTimerRunning(false); // Reset the timer running state if there's an error
    }
  };
  
  


  const handleStopTimer = async () => {
    clearInterval(timerId);
    setIsTimerRunning(false);
  
    try {
      // Query for the match document by eventName

      
      const eventSnapshot = await getDocs(eventQuery);
  
      if (!eventSnapshot.empty) {
        const eventDoc = eventSnapshot.docs[0];
        const eventRef = doc(db, "activeEvents", eventDoc.id);
        await updateDoc(eventRef, { status: "live" });
        console.log(`Event '${eventName}' status updated to 'live'.`);
      } else {
        console.error("No matching event found in 'activeEvents' collection.");
      }


       if (!querySnapshot.empty) {
              // Get the first document that matches
              const eventDoc = querySnapshot.docs[0];
              const eventDocRef = doc(db, "activeEvents", eventDoc.id); // Reference the document by its ID
            
              // Update the 'status' field to 'active'
              await updateDoc(eventDocRef, { status: "active" });
          
              console.log(`Event '${eventName}' status updated to 'active'.`);
            } else {
              console.log("No matching event found.");
            }

  
      if (!matchSnapshot.empty) {
        const matchDoc = matchSnapshot.docs[0]; // Get the first match document that matches the eventName
  
        const matchRef = doc(db, "matches", matchDoc.id); // Get the document reference using the document ID
  
        // Determine the winner based on the scores
        const winner = scores.teamA > scores.teamB ? teamA : (scores.teamB > scores.teamA ? teamB : "Draw");
  
        // Data to update in Firestore for the match document
        const updatedData = {
          eventName,
          eventide: eventName, // You might want to set this dynamically if applicable
          stage,
          teamA,
          teamB,
          time: timer,  // Match time
          updatedAt: new Date().toISOString(),  // Store the current timestamp
          venue,
          date: "2025-01-24", // Static date, change as needed
          scoreA: scores.teamA,
          scoreB: scores.teamB,
          winner,
          status:"",
        };
  
        // Update the match document with the new data
        await updateDoc(matchRef, updatedData);
  
        // Query for the teams' documents (assuming teams have a name field for easy querying)
        const teamAQuery = query(collection(db, "teams"), where("name", "==", teamA));
        const teamBQuery = query(collection(db, "teams"), where("name", "==", teamB));
  
        // Get the team documents for teamA and teamB
        const teamAQuerySnapshot = await getDocs(teamAQuery);
        const teamBQuerySnapshot = await getDocs(teamBQuery);
  
        if (!teamAQuerySnapshot.empty && !teamBQuerySnapshot.empty) {
          const teamADoc = teamAQuerySnapshot.docs[0];
          const teamBDoc = teamBQuerySnapshot.docs[0];
  
          const teamARef = doc(db, "teams", teamADoc.id);
          const teamBRef = doc(db, "teams", teamBDoc.id);
  
          // Calculate the new statistics for both teams
          const teamAStats = {
            played: (teamADoc.data().played || 0) + 1,
            win: winner === teamA ? (teamADoc.data().win || 0) + 1 : teamADoc.data().win || 0,
            draw: winner === "Draw" ? (teamADoc.data().draw || 0) + 1 : teamADoc.data().draw || 0,
            loss: winner === teamB ? (teamADoc.data().loss || 0) + 1 : teamADoc.data().loss || 0,
            goals: (teamADoc.data().goals || 0) + scores.teamA,  // Add teamA goals
            goalDifference: (teamADoc.data().goalDifference || 0) + (scores.teamA - scores.teamB),  // Calculate goal difference
            points: (teamADoc.data().points || 0) + (winner === teamA ? 3 : winner === "Draw" ? 1 : 0), // Points (3 for win, 1 for draw)
          };
  
          const teamBStats = {
            played: (teamBDoc.data().played || 0) + 1,
            win: winner === teamB ? (teamBDoc.data().win || 0) + 1 : teamBDoc.data().win || 0,
            draw: winner === "Draw" ? (teamBDoc.data().draw || 0) + 1 : teamBDoc.data().draw || 0,
            loss: winner === teamA ? (teamBDoc.data().loss || 0) + 1 : teamBDoc.data().loss || 0,
            goals: (teamBDoc.data().goals || 0) + scores.teamB,  // Add teamB goals
            goalDifference: (teamBDoc.data().goalDifference || 0) + (scores.teamB - scores.teamA),  // Calculate goal difference
            points: (teamBDoc.data().points || 0) + (winner === teamB ? 3 : winner === "Draw" ? 1 : 0), // Points (3 for win, 1 for draw)
          };
  
          // Update the goals and statistics for both teams
          await updateDoc(teamARef, teamAStats);
          await updateDoc(teamBRef, teamBStats);
  
          toast.success("Match and team data updated successfully!");
          setScores({
            teamA: 0,
            teamB: 0
          });
        } else {
          toast.error("One or both teams not found!");
        }
      } else {
        toast.error("Match not found!");
      }
    } catch (error) {
      console.error("Error updating match data:", error);
      toast.success("Updated Match Successfully.");
  
      const matchQuery = query(collection(db, "matches"), where("eventName", "==", eventName));
      const matchSnapshot = await getDocs(matchQuery);
      
      if (!matchSnapshot.empty) {
        const matchDoc = matchSnapshot.docs[0];
        const matchRef = doc(db, "matches", matchDoc.id);
        await updateDoc(matchRef, { status: "completed" });
        console.log(`Match for event '${eventName}' status updated to 'completed'.`);
      } else {
        console.log(`No match found for event '${eventName}'.`);
      }

      


    }
  };
  
  const addGoal = async (team, scorer) => {
    if (!isMatchStarted) {
      toast.error("The match has not started yet! No goals can be scored.");
      return;
    }
  
    if (!scorer) {
      toast.error("Please select a goal scorer!");
      return;
    }
  
    try {
      const matchQuery = query(
        collection(db, "matches"),
        where("eventName", "==", eventName)
      );
      const matchSnapshot = await getDocs(matchQuery);
  
      if (!matchSnapshot.empty) {
        const matchDoc = matchSnapshot.docs[0];
        const matchRef = doc(db, "matches", matchDoc.id);
  
        // Fetch current match data
        const matchData = matchDoc.data();
        const currentScorers = matchData.scorers || [];
  
        // Retrieve scores from Firestore or default to 0
        const currentScoreA = matchData.teamAScore || 0;
        const currentScoreB = matchData.teamBScore || 0;
  
        // Update scores based on the team
        const updatedScoreA = team === "teamA" ? currentScoreA + 1 : currentScoreA;
        console.log(updatedScoreA);
        const updatedScoreB = team === "teamB" ? currentScoreB + 1 : currentScoreB;
  
        // Create the new scorer entry
        const newScorer = {
          team,
          player: scorer,
          time: timer,
        };
  
        // Add new scorer to the array
        const updatedScorers = [...currentScorers, newScorer];
  
        // Update Firestore with the updated scores and scorers
        await updateDoc(matchRef, {
          scorers: updatedScorers,
          teamAScore: updatedScoreA,
          teamBScore: updatedScoreB,
        });
  
        // Update local scores (UI state)
        setScores((prev) => ({
          ...prev,
          teamA: updatedScoreA,
          teamB: updatedScoreB,
        }));
  
        toast.success(`Goal scored by ${scorer} for ${team}!`);
      } else {
        toast.error("Match not found!");
      }
    } catch (error) {
      console.error("Error adding scorer to the database:", error);
      toast.error("Failed to add scorer to the database.");

    }
  
    // Reset selected scorer
    setSelectedScorer((prev) => ({ ...prev, [team]: "" }));
  };
  
  



  const removeGoal = (team) => {
    setScores(prev => ({
      ...prev,
      [team]: Math.max(0, prev[team] - 1)
    }));
  };

  const resetMatch =async () => {
    setScores({ teamA: 0, teamB: 0 });
    setTimer("00:00");
    setExtraTime("");
    setIsTimerRunning(false);
    setSelectedScorer({ teamA: "", teamB: "" });

    try {
      // Query for the match document by eventName
      const matchQuery = query(collection(db, "matches"), where("eventName", "==", eventName));
      const matchSnapshot = await getDocs(matchQuery);

      const eventRef =collection(db, "activeEvents"); 
      const q = query(eventRef, where("eventName", "==",  eventName));
      const querySnapshot = await getDocs(q);

       if (!querySnapshot.empty) {
              // Get the first document that matches
              const eventDoc = querySnapshot.docs[0];
              const eventDocRef = doc(db, "activeEvents", eventDoc.id); // Reference the document by its ID
          
              // Update the 'status' field to 'active'
              await updateDoc(eventDocRef, { status: "active" });
          
              console.log(`Event '${eventName}' status updated to 'active'.`);
            } else {
              console.log("No matching event found.");
            }

  
      if (!matchSnapshot.empty) {
        const matchDoc = matchSnapshot.docs[0]; // Get the first match document that matches the eventName
  
        const matchRef = doc(db, "matches", matchDoc.id); // Get the document reference using the document ID
  
        // Determine the winner based on the scores
        const winner = scores.teamA > scores.teamB ? teamA : (scores.teamB > scores.teamA ? teamB : "Draw");
  
        // Data to update in Firestore for the match document
        const updatedData = {
          eventName,
          eventide: eventName, // You might want to set this dynamically if applicable
          stage,
          teamA,
          teamB,
          time: timer,  // Match time
          updatedAt: new Date().toISOString(),  // Store the current timestamp
          venue,
          date: "2025-01-24", // Static date, change as needed
          scoreA: scores.teamA,
          scoreB: scores.teamB,
          winner,
          status:"",
        };
  
        // Update the match document with the new data
        await updateDoc(matchRef, updatedData);
  
        // Query for the teams' documents (assuming teams have a name field for easy querying)
        const teamAQuery = query(collection(db, "teams"), where("name", "==", teamA));
        const teamBQuery = query(collection(db, "teams"), where("name", "==", teamB));
  
        // Get the team documents for teamA and teamB
        const teamAQuerySnapshot = await getDocs(teamAQuery);
        const teamBQuerySnapshot = await getDocs(teamBQuery);
  
        if (!teamAQuerySnapshot.empty && !teamBQuerySnapshot.empty) {
          const teamADoc = teamAQuerySnapshot.docs[0];
          const teamBDoc = teamBQuerySnapshot.docs[0];
  
          const teamARef = doc(db, "teams", teamADoc.id);
          const teamBRef = doc(db, "teams", teamBDoc.id);
  
          // Calculate the new statistics for both teams
          const teamAStats = {
            played: (teamADoc.data().played || 0) + 1,
            win: winner === teamA ? (teamADoc.data().win || 0) + 1 : teamADoc.data().win || 0,
            draw: winner === "Draw" ? (teamADoc.data().draw || 0) + 1 : teamADoc.data().draw || 0,
            loss: winner === teamB ? (teamADoc.data().loss || 0) + 1 : teamADoc.data().loss || 0,
            goals: (teamADoc.data().goals || 0) + scores.teamA,  // Add teamA goals
            goalDifference: (teamADoc.data().goalDifference || 0) + (scores.teamA - scores.teamB),  // Calculate goal difference
            points: (teamADoc.data().points || 0) + (winner === teamA ? 3 : winner === "Draw" ? 1 : 0), // Points (3 for win, 1 for draw)
          };
  
          const teamBStats = {
            played: (teamBDoc.data().played || 0) + 1,
            win: winner === teamB ? (teamBDoc.data().win || 0) + 1 : teamBDoc.data().win || 0,
            draw: winner === "Draw" ? (teamBDoc.data().draw || 0) + 1 : teamBDoc.data().draw || 0,
            loss: winner === teamA ? (teamBDoc.data().loss || 0) + 1 : teamBDoc.data().loss || 0,
            goals: (teamBDoc.data().goals || 0) + scores.teamB,  // Add teamB goals
            goalDifference: (teamBDoc.data().goalDifference || 0) + (scores.teamB - scores.teamA),  // Calculate goal difference
            points: (teamBDoc.data().points || 0) + (winner === teamB ? 3 : winner === "Draw" ? 1 : 0), // Points (3 for win, 1 for draw)
          };
  
          // Update the goals and statistics for both teams
          await updateDoc(teamARef, teamAStats);
          await updateDoc(teamBRef, teamBStats);
  
          toast.success("Match and team data updated successfully!");
          setScores({
            teamA: 0,
            teamB: 0
          });
        } else {
          toast.error("One or both teams not found!");
        }
      } else {
        toast.error("Match not found!");
      }
    } catch (error) {
      console.error("Error updating match data:", error);
      toast.error("Failed to update match data.");
    }
    
    setIsMatchStarted(false);  // Reset match status
    if (timerId) clearInterval(timerId);
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-center text-[#387478] mb-6">
          Football Match Coordinator Panel
        </h1>

        <div className="bg-white p-6 max-w-6xl mx-auto rounded-lg border border-[#387478] shadow-md">
          {/* Timer Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-semibold text-[#387478]">Match Timer:</h2>
            <span className="text-xl font-bold text-[#387478]">{timer}</span>
            <div>
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
              <button
                onClick={handleStopTimer}
                disabled={!isTimerRunning}
                className={`ml-2 px-4 py-2 rounded ${
                  !isTimerRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-700"
                }`}
              >
                Stop Timer
              </button>
            </div>
          </div>

          {/* Teams Section */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Team A */}
            <div className="text-center p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{teamA}</h3>
              <div className="text-4xl font-bold mb-4">{scores.teamA}</div>
              
              <select
                value={selectedScorer.teamA}
                onChange={(e) => setSelectedScorer({ ...selectedScorer, teamA: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="" >Select Goal Scorer</option>
                {teamAPlayers?.map((player, index) => (
                  <option key={index} value={player}>{player}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => addGoal('teamA', selectedScorer.teamA)}
                  disabled={!isMatchStarted}  // Disable if match hasn't started
                  className="flex-1 p-2 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => removeGoal('teamA')}
                  className="flex-1 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Goal
                </button>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{teamB}</h3>
              <div className="text-4xl font-bold mb-4">{scores.teamB}</div>
              
              <select
                value={selectedScorer.teamB}
                onChange={(e) => setSelectedScorer({ ...selectedScorer, teamB: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="" >Select Goal Scorer</option>
                {teamBPlayers?.map((player, index) => (
                  <option key={index} value={player}>{player}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => addGoal('teamB', selectedScorer.teamB)}
                  disabled={!isMatchStarted}  // Disable if match hasn't started
                  className="flex-1 p-2 bg-[#387478] text-white rounded hover:bg-[#4fa3a9]"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => removeGoal('teamB')}
                  className="flex-1 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Remove Goal
                </button>
              </div>
            </div>
          </div>

          {/* Extra Time Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={extraTime}
                onChange={(e) => setExtraTime(e.target.value)}
                placeholder="Extra Time (minutes)"
                className="w-40 p-2 border rounded"
              />
              <button
                onClick={() => toast.success("Extra time added!")}
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

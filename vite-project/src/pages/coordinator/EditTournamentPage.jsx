import Layout from "../../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { db, collection, doc, setDoc, getDocs, query, where,updateDoc } from "../../firebase/FirebaseConfig";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Loader2, AlertCircle, Trash2, Plus, Save, CheckCircle } from "lucide-react";
import { Toaster } from '../../components/toaster/toaster'
import { useLocation ,useNavigate} from 'react-router-dom';
import { useToast } from '../../components/toaster/usetoaster'


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert";

const EditTournamentPage = () => {
  const { toast } = useToast()
  let teamA = null;
  let teamB = null;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const eventName = queryParams.get('eventName');
    console.log(eventName)
  const [teams, setTeams] = useState([{ name: "", players: [], eventId: eventName }]);
  const [old_teams, setOldTeams] = useState([{ name: "", players: [] , eventId :eventName }]);
  const [old_matches, setOldMatches] = useState([{ name: "", players: [] , club : ""}]);
  const [matches, setMatches] = useState([
    { matchId:"",teamA: "", teamB: "", date: "", time: "", venue: "", stage: "",eventId:"" ,club:"",playerA:"",playerB:"" ,eventType:"" },
  ]);
  const [activeSection, setActiveSection] = useState("teams");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: null, index: null });
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
 

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 12);
};

  



  // Reset form when switching sections
  useEffect(() => {
    setError(null);
    fetchMatch();
    fetchTeams(); 
    setSuccess(null);
    setValidationErrors({});
    
    // Reset teams data when switching to teams section
    if (activeSection === "teams") {
      setTeams([{ name: "", players: [] }]);
      setIsDirty(false);
    }
  }, [activeSection]);


  const handleRowClick = (matchId, club ,eventName, teamA, teamB, stage, venue) => {
    navigate(`/editscore`, {
      state: {
        matchId,
        club,
        eventName,
        teamA,
        teamB,
        stage,
        venue,
      },
    });
  };

//  const handleRowClick = (teamId) => {
//     navigate(`/editscore`);
//   };

  // Enhanced validation functions
  const validateTeam = (team, index) => {
    const errors = [];
    if (!team.name.trim()) {
      errors.push(`Team ${index + 1}: Team name is required`);
    }
    // Now requiring at least one player
    if (!team.players || team.players.length === 0) {
      errors.push(`Team ${index + 1}: At least one player is required`);
    } else {
      // Check if any player name is empty
      team.players.forEach((player, playerIndex) => {
        if (!player.trim()) {
          errors.push(`Team ${index + 1}, Player ${playerIndex + 1}: Player name is required`);
        }
      });
    }
    return errors;
  };

//Fetching a team 
  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("eventId", "==", eventName));
      const querySnapshot = await getDocs(q);
      const fetchedTeams = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOldTeams(fetchedTeams);
      setError(null);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError("Failed to fetch teams. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  


//Fetching a team 
const fetchMatch = async () => {
  try {
    setIsLoading(true);
    
    // Fetch event name from query params first
    const eventName = queryParams.get('eventName');
    console.log(eventName);

    // Now you can use eventName in the query
    const teamsRef = collection(db, "matches");
    const q = query(teamsRef, where("eventId", "==", eventName)); 
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    console.log("heheh");
   
    const fetchedMatch = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOldMatches(fetchedMatch);
    setError(null);
  } catch (error) {
    console.error("Error fetching teams:", error);
    setError("Failed to fetch teams. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};


  // Function to clear team information
const resetTeams = () => {
  setTeams([
    {
      name: "",
      players: [],

    },
  ]);
};


  // Function to clear match information
  const resetMatch = () => {
    setMatches([
      {
        teamA: "", teamB: "", date: "", time: "", venue: "", stage: "" 
      },
    ]);
  };

  // Check if save should be enabled
  const canSaveTeam = () => {
    return teams.every(team => 
      team.name.trim() && 
      team.players.length > 0 && 
      team.players.every(player => player.trim())
    ) && isDirty;

  
  };
  const handleDeleteMatch = (matchId) => {
   
    const updatedMatches = old_matches.filter((match) => match.id !== matchId);
    setOldMatches(updatedMatches); 
  
  };
  
  // Enhanced team operations
  const handleTeamChange = (index, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = value;
    setTeams(updatedTeams);
    setError(null);
    setIsDirty(true);
    const newValidationErrors = { ...validationErrors };
    delete newValidationErrors[`team-${index}`];
    setValidationErrors(newValidationErrors);
  };

  const addTeamInput = () => {
    setTeams([...teams, { name: "", players: [], eventId:eventName }]);
    setIsDirty(true);
  };

  const removeTeamInput = (index) => {
    const teamName = teams[index].name;
    const isUsedInMatch = matches.some(
      match => match.teamA === teamName || match.teamB === teamName
    );

    if (isUsedInMatch) {
      setError(`Cannot delete team "${teamName}" as it is used in one or more matches`);
      return;
    }

    setDeleteConfirm({ show: true, type: 'team', index });
  };



  const validateMatch = (match, index) => {
    const errors = [];
    if (!match.teamA) errors.push(`Match ${index + 1}: Team A is required`);
    if (!match.teamB) errors.push(`Match ${index + 1}: Team B is required`);
    if (match.teamA === match.teamB) errors.push(`Match ${index + 1}: Teams must be different`);
    if (!match.date) errors.push(`Match ${index + 1}: Date is required`);
    if (!match.time) errors.push(`Match ${index + 1}: Time is required`);
    if (!match.venue.trim()) errors.push(`Match ${index + 1}: Venue is required`);
    if (!match.stage.trim()) errors.push(`Match ${index + 1}: Match stage is required`);
    
    // Additional date validation
    if (match.date) {
      const matchDate = new Date(match.date);
      const today = new Date();
      if (matchDate < today) {
        errors.push(`Match ${index + 1}: Match date cannot be in the past`);
      }
    }
    
    return errors;
  };
  const handleDeleteConfirm = () => {
    if (deleteConfirm.type === 'team') {
      const updatedTeams = teams.filter((_, i) => i !== deleteConfirm.index);
      setTeams(updatedTeams);
    } else {
      const updatedMatches = matches.filter((_, i) => i !== deleteConfirm.index);
      setMatches(updatedMatches);
    }
    setDeleteConfirm({ show: false, type: null, index: null });
    setIsDirty(true);
  };

  // Enhanced player operations
  const handlePlayerChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players[playerIndex] = value;
    setTeams(updatedTeams);
    setError(null);
    setIsDirty(true);
    // Clear validation error for this field
    const newValidationErrors = { ...validationErrors };
    delete newValidationErrors[`team-${teamIndex}-player-${playerIndex}`];
    setValidationErrors(newValidationErrors);
  };

  const addPlayerInput = (teamIndex) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = [...updatedTeams[teamIndex].players, ""];
    setTeams(updatedTeams);
    setIsDirty(true);
  };

  const removePlayerInput = (teamIndex, playerIndex) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = updatedTeams[teamIndex].players.filter(
      (_, i) => i !== playerIndex
    );
    setTeams(updatedTeams);
    setIsDirty(true);
  };

   // Enhanced match operations
   const handleMatchChange = (index, field, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][field] = value;
    setMatches(updatedMatches);
    setError(null);
    setIsDirty(true);
    // Clear validation error for this field
    const newValidationErrors = { ...validationErrors };
    delete newValidationErrors[`match-${index}-${field}`];
    setValidationErrors(newValidationErrors);
  };

  const addMatch = () => {
    console.log("Adding match");
    console.log(matches);
    if (old_teams.length < 2) {
      setError("Please add at least two teams before creating a match");
      return;
    }
    setMatches([...matches, { matchId:"",teamA: "", teamB: "", date: "", time: "", venue: "", stage: "" }]);
    setIsDirty(true);
  };

  const removeMatch = (index) => {
    setDeleteConfirm({ show: true, type: 'match', index });
  };

  // Enhanced save operations with better error handling
  const saveTeamChanges = async () => {
    setError(null);
    setSuccess(null);
    setValidationErrors({});
    
    // Validate all teams
    let allErrors = [];
    teams.forEach((team, index) => {
      const teamErrors = validateTeam(team, index);
      allErrors = [...allErrors, ...teamErrors];
    });

    const loadingToast = toast({
      title: "Saving Teams",
      description: "Please wait while we save your changes...",
      duration: 30000, // Long duration for loading state
      variant: "loading",
      isLoading: true,
    })


    if (allErrors.length > 0) {
      setValidationErrors(
        allErrors.reduce((acc, error) => {
          acc[error] = true;
          return acc;
        }, {})
      );
      setError("Please fix all validation errors before saving");
      return;
    }

    setIsLoading(true);
    try {
      const teamsRef = collection(db, "teams");
      const teamPromises = teams.map(async (team) => {
        const teamDoc = doc(teamsRef);
        await setDoc(teamDoc, {
          name: team.name.trim(),
          eventId: eventName,
          players: team.players.filter(player => player.trim()),
          updatedAt: new Date().toISOString(),
        });
        return teamDoc.id;
      },
    resetTeams());

      await Promise.all(teamPromises);

      loadingToast.dismiss()
      toast({
        title: "Teams Saved Successfully",
        description: "All your team changes have been saved.",
        duration: 3000,
        variant: "success",
      })
      setSuccess("Teams updated successfully!");
      setIsDirty(false);
    } catch (error) {
      console.error("Error saving teams:", error);

      loadingToast.dismiss()
      toast({
        title: "Failed to Save Teams",
        description: error.message || "Please try again later.",
        duration: 4000,
        variant: "error",
      })
      setError(`Error saving teams: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMatchChanges = async () => {
    setError(null);
    setSuccess(null);
    setValidationErrors({});
  
    const loadingToast = toast({
      title: "Saving Matches",
      description: "Please wait while we save your changes...",
      duration: 30000, // Long duration for loading state
      variant: "loading",
      isLoading: true,
    });
  
    let allErrors = [];
    matches.forEach((match, index) => {
      const matchErrors = validateMatch(match, index);
      allErrors = [...allErrors, ...matchErrors];
    });
  
    if (allErrors.length > 0) {
      setValidationErrors(
        allErrors.reduce((acc, error) => {
          acc[error] = true;
          return acc;
        }, {})
      );
      setError("Please fix all validation errors before saving");
      return;
    }
  
    setIsLoading(true);
    try {
      const matchesRef = collection(db, "matches");
      const matchDoc = doc(matchesRef, generateRandomId());
      const eventRef = collection(db, "activeEvents");
      const q = query(eventRef, where("id", "==", eventName));
      const querySnapshot = await getDocs(q);
      const matchData = querySnapshot.docs.map(doc => doc.data());
  
      console.log("Event Data:", matchData[0]);
  
      const eventname = matchData[0].eventName;
      const eventType = matchData[0].eventType;
      const club = matchData[0].clubName ; 
  
      if (!querySnapshot.empty) {
        const eventDoc = querySnapshot.docs[0];
        const eventDocRef = doc(db, "activeEvents", eventDoc.id);
  
        await updateDoc(eventDocRef, { status: "active" });
        console.log(`Event '${eventName}' status updated to 'active'.`);
      } else {
        console.log("No matching event found.");
      }
  
      const matchPromises = matches.map(async (match) => {
        if (!eventname) {
          console.error("Event name is undefined. Skipping match.");
          return; // Skip the match if event name is not defined
        }
  
        let teamA, teamB;
        for (let i = 0; i < old_teams.length; i++) {
          if (old_teams[i].name === match.teamA) {
            teamA = old_teams[i];
          }
          if (old_teams[i].name === match.teamB) {
            teamB = old_teams[i];
          }
        }
  
        console.log("Teams:", teamA, teamB);
  
        if (!teamA || !teamB) {
          console.error("Team A or Team B not found, skipping match.");
          return; // Skip the match if a team is not found
        }
  
        const matchDocs = doc(matchesRef);
        await setDoc(matchDoc, {
          matchId: matchDocs.id,
          playerA: teamA.players,
          playerB: teamB.players,
          teamA: match.teamA,
          eventType: eventType,
          teamB: match.teamB,
          date: match.date,
          time: match.time,
          venue: match.venue?.trim() || "",
          stage: match.stage?.trim() || "",
          eventId: eventName,
          club: club,
          eventName: eventname,
          updatedAt: new Date().toISOString(),
          status: "upcoming",
        });
  
        return matchDoc.id;
      });
  
      await Promise.all(matchPromises);
  
      loadingToast.dismiss();
      toast({
        title: "Success!",
        description: "Matches have been saved successfully.",
        duration: 3000,
        variant: "success",
      });
      setSuccess("Matches updated successfully!");
      fetchMatch();
      resetMatch();
      setIsDirty(false);
    } catch (error) {
      console.error("Error saving matches:", error);
  
      loadingToast.dismiss();
      toast({
        title: "Failed to Save Matches",
        description: "Failed to save matches. Please try again later.",
        variant: "error",
        duration: 4000,
      });
      setError(`Error saving matches: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  // Confirmation dialog for unsaved changes
  const handleSectionChange = (newSection) => {
    if (isDirty) {
      setDeleteConfirm({
        show: true,
        type: 'section-change',
        callback: () => {
          setActiveSection(newSection);
          setIsDirty(false);
        },
      });
    } else {
      setActiveSection(newSection);
    }
  };

  return (
    <Layout>
         <Toaster />
      <div className="p-8 max-w-5xl mx-auto">
    
        <h1 className="text-3xl font-bold text-center text-[#387478] mb-8">
          Edit Tournament
        </h1>

        {/* Status Messages */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
     

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleSectionChange("teams")}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeSection === "teams"
                ? "bg-[#387478] text-white"
                : "bg-white text-[#387478] hover:bg-[#387478]/5"
            }`}
          >
            Teams {isDirty && activeSection === "teams" && "•"}
          </button>
          <button
            onClick={() => handleSectionChange("matches")}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeSection === "matches"
                ? "bg-[#387478] text-white"
                : "bg-white text-[#387478] hover:bg-[#387478]/5"
            }`}
          >
            Matches {isDirty && activeSection === "matches" && "•"}
          </button>
        </div>


        {/* Teams Section */}
        {activeSection === "teams" && (
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-lg border border-[#387478]/10">
            <h2 className="text-2xl font-bold text-[#387478] mb-6">Teams</h2>
            {teams.map((team, index) => (
              <div key={index} className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleTeamChange(index, e.target.value)}
                    placeholder={`Team ${index + 1} name*`}
                    className={`flex-1 px-6 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`team-${index}`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  />
                  
                </div>
                {/* Players Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-[#387478]/10">
                  <h4 className="text-lg font-semibold text-[#387478] mb-4">
                    Players for {team.name || `Team ${index + 1}`}
                  </h4>
                  {team.players.map((player, playerIndex) => (
                    <div key={playerIndex} className="flex items-center gap-4 mb-3">
                      <input
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerChange(index, playerIndex, e.target.value)}
                        placeholder={`Player ${playerIndex + 1} name*`}
                        className={`flex-1 px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                          validationErrors[`team-${index}-player-${playerIndex}`]
                            ? "border-red-500"
                            : "border-[#387478]/20 focus:border-[#387478]"
                        }`}
                      />
                      <button
                        onClick={() => removePlayerInput(index, playerIndex)}
                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addPlayerInput(index)}
                    className="mt-4 px-6 py-3 text-[#387478] border border-[#387478] rounded-xl hover:bg-[#387478]/5 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Player
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <button
                onClick={addTeamInput}
                className="px-6 py-3 text-[#387478] border border-[#387478] rounded-xl hover:bg-[#387478]/5 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Team
              </button>
              <button
                onClick={saveTeamChanges}
                disabled={isLoading || !canSaveTeam()}
                className={`px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2 ${
                  isLoading || !canSaveTeam()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#387478] text-white hover:bg-[#387478]/90"
                }`}
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Teams
              </button>
            </div>
          </div>
        )} 
        
        
        {/* Matches Section */}
        {activeSection === "matches" && (

<div>

<div className="bg-white rounded-2xl p-8 shadow-lg border border-[#387478]/10">
            <h2 className="text-2xl font-bold text-[#387478] mb-6">Matches</h2>
            {matches.map((match, index) => (
              <div key={index} className="mb-8 bg-gray-50 p-6 rounded-xl border border-[#387478]/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#387478]">Match {index + 1}</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="px-4 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors inline-flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Delete Match
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Match</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this match? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeMatch(index)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                <select
  value={match.teamA}
  onChange={(e) => handleMatchChange(index, "teamA", e.target.value)}
  className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
    validationErrors[`match-${index}-teamA`] ? "border-red-500" : "border-[#387478]/20 focus:border-[#387478]"
  }`}
>
  <option value="">Select Team A*</option>
  {old_teams.map((team, i) => (
    <option key={i} value={team.name} disabled={team.name === match.teamB}>
      {team.name}
    </option>
  ))}
</select>

                  <select
                    value={match.teamB}
                    onChange={(e) => handleMatchChange(index, "teamB", e.target.value)}
                    className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`match-${index}-teamB`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  >
                    <option value="">Select Team B*</option>
                    {old_teams.map((team, i) => (
                      <option key={i} value={team.name} disabled={team.name === match.teamB}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="date"
                    value={match.date}
                    onChange={(e) => handleMatchChange(index, "date", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`match-${index}-date`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  />
                  <input
                    type="time"
                    value={match.time}
                    onChange={(e) => handleMatchChange(index, "time", e.target.value)}
                    className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`match-${index}-time`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  />
                  <input
                    type="text"
                    value={match.venue}
                    onChange={(e) => handleMatchChange(index, "venue", e.target.value)}
                    placeholder="Venue*"
                    className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`match-${index}-venue`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  />
                  <input
                    type="text"
                    value={match.stage}
                    onChange={(e) => handleMatchChange(index, "stage", e.target.value)}
                    placeholder="Match Stage*"
                    className={`px-6 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-[#387478]/20 transition-all ${
                      validationErrors[`match-${index}-stage`]
                        ? "border-red-500"
                        : "border-[#387478]/20 focus:border-[#387478]"
                    }`}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <button
                onClick={addMatch}
                className="px-6 py-3 text-[#387478] border border-[#387478] rounded-xl hover:bg-[#387478]/5 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Match
              </button>
              <button
                onClick={saveMatchChanges}
                disabled={isLoading || !isDirty}
                className={`px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2 ${
                  isLoading || !isDirty
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#387478] text-white hover:bg-[#387478]/90"
                }`}
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Matches
              </button>
            </div>
          </div>
  
          <div className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5 mb-8">
  <h2 className="text-2xl font-semibold text-[#387478] mb-4">Match Table</h2>

  {isLoading ? (
    <p className="text-center text-gray-500">Loading Match...</p>
  ) : error ? (
    <p className="text-center text-red-500">{error}</p>
  ) : old_matches.length === 0 ? (
    <p className="text-center text-gray-500">No Match found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse border border-[#387478]">
        <thead>
          <tr className="bg-gray-200 text-[#387478]">
            <th className="px-2 py-2 border-b border-[#387478] text-left font-semibold">Rank</th>
            <th className="px-8 py-2 border-b border-[#387478] text-left font-semibold">Event Name</th>
            <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Team A</th>
            <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Team B </th>
            <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Stage</th>
            <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Venue</th>
            <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Winner</th>
            
          </tr>
        </thead>
        <tbody>
          {old_matches.map((match, index) => (
            <tr
              key={match.id}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={() => handleRowClick(match.id,
                match.id ,
                match.eventName || "Unknown",
                match.teamA || 0,
                match.teamB || 0,
                match.stage || "Unknown",
                match.venue || "Unknown")}
            >
              <td className="px-4 py-2 border-b border-[#387478] text-left">{index + 1}</td>
              <td className="px-8 py-2 border-b border-[#387478] text-left">{match.eventName || "Unknown"}</td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">{match.teamA || 0}</td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">{match.teamB || 0}</td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">{match.stage|| 0}</td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">{match.venue || 0}</td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">
                {(match.winner|| 0)}
              </td>
              <td className="px-1 py-2 border-b border-[#387478] text-center">
             
              </td> {/* Delete button */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
</div>


         
        )}
    
        {/* Unsaved Changes Dialog */}
        <AlertDialog
          open={deleteConfirm.show}
          onOpenChange={(isOpen) => !isOpen && setDeleteConfirm({ show: false, type: null, index: null })}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {deleteConfirm.type === 'section-change' 
                  ? 'Unsaved Changes'
                  : `Delete ${deleteConfirm.type === 'team' ? 'Team' : 'Match'}`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {deleteConfirm.type === 'section-change'
                  ? 'You have unsaved changes. Are you sure you want to leave this section? Your changes will be lost.'
                  : `Are you sure you want to delete this ${deleteConfirm.type}? This action cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteConfirm.type === 'section-change') {
                    deleteConfirm.callback();
                  } else {
                    handleDeleteConfirm();
                  }
                }}
                className={deleteConfirm.type === 'section-change' ? "" : "bg-red-500 hover:bg-red-600"}
              >
                {deleteConfirm.type === 'section-change' ? 'Leave' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

    
   
    </Layout>
    );
    };
    
    export default EditTournamentPage;
    
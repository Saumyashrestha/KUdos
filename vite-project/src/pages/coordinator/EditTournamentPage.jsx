import Layout from "../../components/layout/Layout";
import React, { useState } from "react";

const EditTournamentPage = () => {
  const [teams, setTeams] = useState([{ name: "", players: [] }]);
  const [matches, setMatches] = useState([
    { teamA: "", teamB: "", date: "", time: "", venue: "" },
  ]);

  const handleTeamChange = (index, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = value;
    setTeams(updatedTeams);
  };

  const addTeamInput = () => {
    setTeams([...teams, { name: "", players: [] }]);
  };

  const removeTeamInput = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
  };

  const handlePlayerChange = (teamIndex, playerIndex, value) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players[playerIndex] = value;
    setTeams(updatedTeams);
  };

  const addPlayerInput = (teamIndex) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = [...updatedTeams[teamIndex].players, ""];
    setTeams(updatedTeams);
  };

  const removePlayerInput = (teamIndex, playerIndex) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = updatedTeams[teamIndex].players.filter(
      (_, i) => i !== playerIndex
    );
    setTeams(updatedTeams);
  };

  const handleMatchChange = (index, field, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][field] = value;
    setMatches(updatedMatches);
  };

  const addMatch = () => {
    setMatches([...matches, { teamA: "", teamB: "", date: "", time: "", venue: "" }]);
  };

  const removeMatch = (index) => {
    const updatedMatches = matches.filter((_, i) => i !== index);
    setMatches(updatedMatches);
  };

  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#387478] mb-8">
          Edit Tournament
        </h1>

        <div className="mb-8 bg-[#f5f5f5] border border-[#387478] rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#387478] mb-4">Teams</h2>
          {teams.map((team, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleTeamChange(index, e.target.value)}
                  placeholder={`Team ${index + 1}`}
                  className="border border-[#387478] rounded-md px-4 py-2 w-full"
                />
                {teams.length > 1 && (
                  <button
                    onClick={() => removeTeamInput(index)}
                    className="text-gray-600 font-bold text-md"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
              <div className="bg-[#f5f5f5] p-4 border border-gray-300 rounded-md shadow-md">
                <h4 className="text-md font-semibold text-[#387478] mb-4">
                  Players for {team.name || `Team ${index + 1}`}
                </h4>
                {team.players.map((player, playerIndex) => (
                  <div
                    key={playerIndex}
                    className="flex items-center gap-4 mb-2"
                  >
                    <input
                      type="text"
                      value={player}
                      onChange={(e) =>
                        handlePlayerChange(index, playerIndex, e.target.value)
                      }
                      placeholder={`Player ${playerIndex + 1}`}
                      className="border border-[#387478] rounded-md px-4 py-2 w-full"
                    />
                    <button
                      onClick={() => removePlayerInput(index, playerIndex)}
                      className="text-gray-600 font-bold text-md"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPlayerInput(index)}
                  className="bg-[#387478] text-white px-4 py-2 mt-2 rounded-md"
                >
                  + Add Player
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addTeamInput}
            className="bg-[#387478] text-white px-4 py-2 rounded-md"
          >
            + Add Team
          </button>
        </div>

        <div className="bg-[#f5f5f5] border border-[#387478] rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-[#387478] mb-4">Matches</h2>
          {matches.map((match, index) => (
            <div key={index} className="mb-8 p-6 shadow-md border border-gray-300 rounded-md">
              <h3 className="font-semibold text-lg text-[#387478] mb-4">
                Match {index + 1}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <select
                  value={match.teamA}
                  onChange={(e) =>
                    handleMatchChange(index, "teamA", e.target.value)
                  }
                  className="border border-[#387478] rounded-md px-4 py-2"
                >
                  <option value="">Select Team A</option>
                  {teams.map((team, i) => (
                    <option key={i} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <select
                  value={match.teamB}
                  onChange={(e) =>
                    handleMatchChange(index, "teamB", e.target.value)
                  }
                  className="border border-[#387478] rounded-md px-4 py-2"
                >
                  <option value="">Select Team B</option>
                  {teams.map((team, i) => (
                    <option key={i} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="date"
                  value={match.date}
                  onChange={(e) =>
                    handleMatchChange(index, "date", e.target.value)
                  }
                  className="border border-[#387478] rounded-md px-4 py-2"
                />
                <input
                  type="time"
                  value={match.time}
                  onChange={(e) =>
                    handleMatchChange(index, "time", e.target.value)
                  }
                  className="border border-[#387478] rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  value={match.venue}
                  onChange={(e) =>
                    handleMatchChange(index, "venue", e.target.value)
                  }
                  placeholder="Venue"
                  className="border border-[#387478] rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  value={match.stage}
                  onChange={(e) =>
                    handleMatchChange(index, "stage", e.target.value)
                  }
                  placeholder="Match Stage (Group Stage/Quarter Finals/Semi Finals)"
                  className="border border-[#387478] rounded-md w-96 px-4 py-2"
                />
              </div>
              <button
                onClick={() => removeMatch(index)}
                className="text-gray-600 font-semibold text-md"
              >
                <i className="fas fa-trash"></i> Delete Match
              </button>
            </div>
          ))}
          <button
            onClick={addMatch}
            className="bg-[#387478] text-white px-4 py-2 rounded-md"
          >
            + Add Match
          </button>
        </div>

        <button className="bg-[#387478] hover:bg-[#4fa3a9] text-white px-4 mt-4 py-2 rounded-md">
          Save Changes
        </button>
      </div>
    </Layout>
  );
};

export default EditTournamentPage;

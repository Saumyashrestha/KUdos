import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";
import { db, collection, getDocs, query, where } from "../../firebase/FirebaseConfig";
import { useEffect, useState } from "react";

const Football = () => {
  const location = useLocation();
  const [eventData, setEventData] = useState(null);
  const [teamAScorers, setTeamAScorers] = useState([]);
  const [teamBScorers, setTeamBScorers] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const eventName = queryParams.get("eventName");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsRef = collection(db, "matches");
        const q = query(eventsRef, where("matchId", "==", eventName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          console.log("Fetched Event Data:", data); // Debugging the event data
          setEventData(data);

          const scorers = data.scorers || [];
          console.log("Scorers:", scorers); // Debugging scorers data

          const teamAScorersList = scorers.filter((scorer) => scorer.team === "teamA");
          const teamBScorersList = scorers.filter((scorer) => scorer.team === "teamB");

          setTeamAScorers(teamAScorersList);
          setTeamBScorers(teamBScorersList);
        } else {
          console.log("No matching event found");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    

    if (eventName) {
      fetchEventData();
    }
  }, [eventName]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-10">
          <p className="text-xl text-[#387478]">Loading event data...</p>
        </div>
      </Layout>
    );
  }

  if (!eventData) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-10">
          <p className="text-xl text-[#387478]">No event found for "{eventName}".</p>
        </div>
      </Layout>
    );
  }

  console.log("Event Data:", eventData); // Debugging event data

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-10">
        {/* Scorecard Container */}
        <div className="shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl mb-10">
          <div className="flex justify-between items-center px-10">
            {/* Left Team */}
            <div className="text-center space-y-4">
              <img
                src="/TeamA.png"
                alt="Team A Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">{eventData.teamA}</h3>
              <div className="text-sm text-[#387478] space-y-2">
                {teamAScorers.map((scorer, index) => (
                  <p key={index}>
                    {scorer.player || "Unknown Player"} ({scorer.time || 0})
                  </p>
                ))}
              </div>
            </div>

            {/* Match Time and Scores */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-[#387478]">{eventData.scoreA}:{eventData.scoreB}</h1>
              <div className="border border-[#387478] bg-[#387378] rounded-full py-1 px-6 inline-block">
                <p className="text-lg text-white">{eventData.time}</p>
              </div>
            </div>



            {/* Right Team */}
            <div className="text-center space-y-4">
              <img
                src="/TeamB.png"
                alt="Team B Jersey"
                className="w-20 mx-auto"
              />
              <h3 className="font-semibold text-xl text-[#387478]">{eventData.teamB}</h3>
              <div className="text-sm text-[#387478] space-y-2">
                {teamBScorers.map((scorer, index) => (
                  <p key={index}>
                    {scorer.player || "Unknown Player"} ({scorer.time || 0})
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lineup Container */}
        <div className="shadow-md rounded-lg border border-[#387478] p-8 w-[90%] max-w-4xl">
          <h2 className="text-2xl font-bold text-[#387478] mb-8">
            Lineup
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Team A */}
            <div className="space-y-2">
              <h3 className="font-semibold text-xl text-[#387478] mb-6">
                Team A
              </h3>
              
              
              <ul className="text-[#387478]">
  {eventData?.playerA?.map((player, index) => (
    <li key={index} className="flex flex-col">
      {player}
      <hr className="border-t border-gray-400 my-4" />
    </li>
  ))}
</ul>

            </div>

            {/* Team B */}
            <div className="space-y-2">
              <h3 className="font-semibold text-xl text-[#387478] mb-6">
                Team B
              </h3>
              
              
              <ul className="text-[#387478]">
  {eventData?.playerB?.map((player, index) => (
    <li key={index} className="flex flex-col">
      {player}
      <hr className="border-t border-gray-400 my-4" />
    </li>
  ))}
</ul>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Football;

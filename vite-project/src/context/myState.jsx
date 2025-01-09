import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";
import MyContext from "./myContext";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);
  const [getAllMatches, setGetAllMatches] = useState([]);

  const getAllMatchesFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "Matches"), orderBy("dateTime", "desc"));
      const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
        // Fetch match data with team names
        const matchesWithTeams = await Promise.all(
          QuerySnapshot.docs.map(async (docSnapshot) => {
            const matchData = docSnapshot.data();
            const team1Ref = matchData.team1Id;
            const team2Ref = matchData.team2Id;

            // Fetch team data
            const team1Doc = await getDoc(doc(db, "Teams", "jyGfcgEkQ7mO9qIIeLol"));
            const team2Doc = await getDoc(doc(db, "Teams", "fgkFJmvptPDd1zBkOUix"));

            console.log("Team 1 Exists:", team1Doc.exists());
            console.log("Team 2 Exists:", team2Doc.exists());

            console.log("Match Data:", matchData);
            console.log("Team 1 Data:", team1Doc.data());
            console.log("Team 2 Data:", team2Doc.data());

            return {
              ...matchData,
              id: docSnapshot.id,
              team1Name: team1Doc.exists()
                ? team1Doc.data().name
                : "Unknown Team",
              team2Name: team2Doc.exists()
                ? team2Doc.data().name
                : "Unknown Team",
            };
          })
        );

        // Update state with fetched matches and team data
        setGetAllMatches(matchesWithTeams);
        setLoading(false);
      });

      // Return the unsubscribe function to clean up the listener
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching matches or teams:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMatchesFunction();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllMatches,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDoc,
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

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const matchesWithTeams = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const matchData = docSnapshot.data();
            
            // Extract team1Id and team2Id
            const team1RefPath = matchData.team1Id;
            const team2RefPath = matchData.team2Id;
            

            // Resolve references dynamically
            const team1Doc = await getDoc(team1RefPath);
            const team2Doc = await getDoc(team2RefPath);

            return {
              ...matchData,
              id: docSnapshot.id,
              team1Name: team1Doc.exists() ? team1Doc.data().name : "Unknown Team",
              team2Name: team2Doc.exists() ? team2Doc.data().name : "Unknown Team",
            };
          })
        );

        // Update state with fetched matches and team data
        setGetAllMatches(matchesWithTeams);
        setLoading(false);
      });

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

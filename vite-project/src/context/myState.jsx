import {
  collection,
  query,
  onSnapshot,
  where,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";
import MyContext from "./myContext";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);
  const [getAllMatches, setGetAllMatches] = useState([]);
  const [clubName, setClubName] = useState("");

  const getAllMatchesFunction = async () => {
    setLoading(true);
    try {
      console.log("clubName::::::::", clubName);  
      const matchQuery = clubName
        ? query(collection(db, "matches"), where("club", "==", clubName))
        : query(collection(db, "matches"));

      const unsubscribe = onSnapshot(matchQuery, async (querySnapshot) => {
        const matches = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const matchData = docSnapshot.data();

           console.log(matchData);  

            return {
              ...matchData,
            };
          })
        );

        setGetAllMatches(matches);
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
  }, [clubName]);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllMatches,
        setClubName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;

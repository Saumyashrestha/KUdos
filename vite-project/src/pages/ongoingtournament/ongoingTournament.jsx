import Layout from "../../components/layout/Layout";
import { useRef , useState  ,useEffect} from "react";
import { getAuth } from 'firebase/auth';
import { useLocation ,useNavigate} from 'react-router-dom';

import { db, collection, getDocs ,query,where} from "../../firebase/FirebaseConfig";

const OngoingTournament = () => {
    const matchContainerRef = useRef(null);
    const location = useLocation();
   
    const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [old_teams, setOldTeams] = useState([{ name: "", players: [] }]);
      const [isLoading, setIsLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const eventName = queryParams.get('eventName');
    const [activeEvents, setActiveEvents] = useState([]);
    const [coordinator, setCoordinator] = useState([]);
    const [matches, setMatches] = useState([]);
    const [userDetails, setUserDetailsLocal] = useState({});
 const [match, setMatch] = useState("");
 

    const scrollLeft = () => {
        matchContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        matchContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };


    const image = match.club;
 



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
        
          setError("Failed to fetch teams. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        const fetchActiveEvents = async () => {
        
        
          const activeEventsRef = collection(db, "activeEvents");
          const q = query(activeEventsRef, where("status", "==", "active"));
          const querySnapshot = await getDocs(q);
    
          const events = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setActiveEvents(events);
        };

        const fetchCurrentEvent = async () => {
          const activeEventsRef = collection(db, "matches");
          const q = query(activeEventsRef, where("eventId", "==", eventName));
          const querySnapshot = await getDocs(q);
    
          const events = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          setActiveEvents(events);
        };
        
    
       
         const fetchMatches = async () => {
            try {

              // const teamAQuery = query(collection(db, "teams"), where("name", "==", teamA));
              // const teamBQuery = query(collection(db, "teams"), where("name", "==", teamB));
                

              const matchRef = collection(db, 'matches');
             
            
              const q = query(matchRef, where("eventId", "==",  eventName));
          
              const querySnapshot = await getDocs(q);

              const matchData = querySnapshot.docs.map(doc => doc.data());
             
            setMatch(matchData[0]);
              setMatches(matchData);
            } catch (error) {
              console.error("Error fetching matches: ", error);
            }
          };

        
          const fetchUserDetail = async () => {
            const auth = getAuth();
            const user = auth.currentUser;  
            userDetails.email = user.email;
           
          };


          
      
  
          const fetchCoordinator = async () => {
            try {
              const coordinatorRef = collection(db, 'coordinator'); 
              
            
              const q = query(coordinatorRef, where("email", "==", userDetails.email));
              
           
              const querySnapshot = await getDocs(q);
            
              const coordinatorData = querySnapshot.docs.map(doc => doc.data());
              setCoordinator(coordinatorData);
            

            } catch (error) {
              console.error("Error fetching matches: ", error);
            }
          };
    
          if (eventName) {
          
            fetchMatches();
          }
          fetchCoordinator(); 
        fetchActiveEvents();
        fetchActiveEvents();
        fetchUserDetail();
        fetchTeams();
       
      },[eventName, userDetails.email]); 
    
     

    return (
      
        <Layout>
<div className="container border border-[#387478] shadow-md rounded-lg mt-20 mx-auto px-5 py-5 flex flex-col h-48">
        <div className="flex items-center mt-2 space-x-5">
        {match && match.club ? (
  <img
  src={`/${match?.club}.png`}
    alt="Club Logo"
    className="w-16 h-16 object-cover"
  />
) : (
  <p>Image not available</p>
)}
            <div>
                <h1 className="text-2xl font-semibold text-[#387478]">{match.club}</h1>
                
                <h2 className="text-lg text-gray-600">DoCSE</h2>
            </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-between items-center mt-auto pb-1">
            <div className="flex space-x-10">
                <a
                    href="#matches"
                    className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                >
                    Matches
                </a>
                <a
                    href="#table"
                    className="text-[#387478] hover:text-[#387478] text-lg font-semibold border-b-2 border-transparent hover:border-[#387478]"
                >
                    Table
                </a>
            </div>
            


    {coordinator.map(coord => {
  
    // Check if the email matches and return the button if true
    if (coord.eventId === eventName) {
        return (
            <button
                className="bg-[#387478] text-white text-lg font-semibold py-2 px-4 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-[#306a61] hover:shadow-lg"
                onClick={() => navigate(`/edittournament?eventName=${eventName}`)}
                key={coord.email} // Add a unique key for list items
            >
                Edit
            </button>
        );
    }

    // Return null if condition is not met
    return null;
})}

        </div>
    </div>


            {/* Matches Section */}
            <div id="matches" className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5">
                <h2 className="text-2xl font-semibold text-[#387478] mb-4">Matches</h2>
                
                <div className="relative">
                   

                    {/* Matches Container */}
                    <div
                        ref={matchContainerRef}
                        className="flex space-x-5 overflow-x-auto px-20 py-5 relative"
                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                        {matches.map((match, index) => (
                       
              <a
                key={index}
                href={`http://localhost:5173/football?eventName=${match.matchId}`}
                className="min-w-[250px] flex flex-col items-center bg-gray-300 border border-[#387478] rounded-lg shadow-md p-4 hover:bg-gray-400 transition"
              >
                {/* Jerseys and Teams */}
                <div className="flex items-center justify-between w-full">
                  {/* Team 1 Jersey and Name */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/TeamA.png" // Assuming you have team jerseys stored
                      alt={`${match.teamA} Jersey`}
                      className="w-12 h-12 object-contain"
                    />
                    <p className="text-sm font-medium mt-1">{match.teamA}</p>
                  </div>

                  {/* Score and Time */}
                  <div className="text-center">
                    <p className="text-xl font-bold">{match.score}</p>
                    <p className="text-sm text-gray-500">{match.time}</p>
                  </div>

                  {/* Team 2 Jersey and Name */}
                  <div className="flex flex-col items-center">
                    <img
                      src='/TeamB.png'// Assuming you have team jerseys stored
                      alt={`${match.teamB} Jersey`}
                      className="w-12 h-12 object-contain"
                    />
                    <p className="text-sm font-medium mt-1">{match.teamB}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
                 {/* Table Section */}
                 <div className="container bg-gray-100 border border-[#387478] shadow-md rounded-lg mt-8 mx-auto px-5 py-5 mb-8">
      <h2 className="text-2xl font-semibold text-[#387478] mb-4">Teams Table</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading teams...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : old_teams.length === 0 ? (
        <p className="text-center text-gray-500">No teams found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[#387478]">
            <thead>
              <tr className="bg-gray-200 text-[#387478]">
                <th className="px-2 py-2 border-b border-[#387478] text-left font-semibold">Rank</th>
                <th className="px-8 py-2 border-b border-[#387478] text-left font-semibold">Team Name</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Played</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Win</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Draw</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Loss</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Goal Difference</th>
                <th className="px-1 py-2 border-b border-[#387478] text-center font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {old_teams.map((team, index) => (
                <tr key={team.id} className="hover:bg-gray-200">
                  <td className="px-4 py-2 border-b border-[#387478] text-left">{index + 1}</td>
                  <td className="px-8 py-2 border-b border-[#387478] text-left">{team.name || "Unknown"}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">{team.played || 0}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">{team.win || 0}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">{team.draw || 0}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">{team.loss || 0}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">{team.goalDifference || 0}</td>
                  <td className="px-1 py-2 border-b border-[#387478] text-center">
                    {(team.win || 0) * 3 + (team.draw || 0) * 1 + (team.loss || 0) * 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
        
        </Layout>
    );
};

export default OngoingTournament;

import { useContext, useEffect, useState } from "react";

import myContext from "../../context/myContext";
import { getFirestore, collection, getDocs, query, where, doc,  } from "firebase/firestore";
import { db,updateDoc } from '../../firebase/FirebaseConfig'
import { getAuth } from 'firebase/auth';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { set } from "date-fns";

const clubHomeCard = () => {

  const context = useContext(myContext);
  const {AllMatches, getAllMatches } = context;

  const [userDetails, setUserDetailsLocal] = useState({});
  const [activeEvents, setActiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  
 
  useEffect(() => {
    const fetchActiveEvents = async () => {
    
    const db = getFirestore();
      const activeEventsRef = collection(db, "activeEvents");
      const q = query(activeEventsRef, where("status", "==", "active"));
      const q1 = query(activeEventsRef, where("status", "==", "upcoming"));
      const querySnapshot = await getDocs(q);

      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      

      const querySnapshot1 = await getDocs(q1);
      const events1 = querySnapshot1.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(events);
      setActiveEvents(events);
      setUpcomingEvents(events1);
    };

    const fetchUserDetail = async () => {
      const auth = getAuth();
      const user = auth.currentUser;  
      userDetails.email = user.email;
      console.log("User Details:", user.email); 
    };

    fetchActiveEvents();
    fetchUserDetail();
  },[]); 



 
 
  
  const handleEventAction = (event) => {
    // If user is the coordinator, navigate to edit/manage page
    if (userDetails.email === event.organizerEmail) {
      navigate('/edittournament', { 
        state: { 
          eventDetails: event.id,
          userRole: 'coordinator' 
        } 
      });
    } else {
      // Regular navigation for non-coordinators
      window.location.href = event.link;
    }
  };
  const getBadgeColor = (eventType) => {
    const colors = {
  'Football': 'bg-orange-500 text-white',
  'Futsal': 'bg-teal-500 text-white',
  'Cricket': 'bg-indigo-600 text-white',
  'Basketball': 'bg-red-500 text-white',
  'Volleyball': 'bg-yellow-600 text-white',
  'Badminton': 'bg-pink-500 text-white',
  'Tennis Table': 'bg-lime-500 text-white',
  'Tournament': 'bg-gray-800 text-white'
    };
    return colors[eventType] || 'bg-pink-500 text-white';
  };


  const handleAddEvent = async (newEvent) => {
    const isDuplicate = event.some((event) => event.eventName.toLowerCase() === newEvent.eventName.toLowerCase());
    
    if (isDuplicate) {
      alert('An equipment with this name already exists!');
      return;
    }
    
   
    
    setActiveEvents([...event, { ...newEvent, image: "/api/placeholder/400/320" }]);
    setIsAddModalOpen(false);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    const eventRef = doc(db, "activeEvents", updatedEvent.id);
    await updateDoc(eventRef, {
      eventName: updatedEvent.eventName,
      eventType: updatedEvent.eventType,
    });

    const updatedEventList = activeEvents.map((event) =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    ); 
    setActiveEvents(updatedEventList);
    setIsAddModalOpen(false);
    setEditingEvent(null);
  };



  const AddEventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Event Details
          </h2>
          <button
            onClick={() => {
              setIsAddModalOpen(false);
              setEditingEvent(null);
            }}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedEvent = {
            
              eventName: formData.get('eventName'),
              eventType: formData.get('eventType'),
            };

            editingEvent ? handleUpdateEvent(updatedEvent) : handleAddEvent(updatedEvent);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              defaultValue={editingEvent?.eventName}
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#387478] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <input
              type="text"
              name="eventType"
              defaultValue={editingEvent?.eventType}
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#387478] focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#387478] text-white py-3 px-4 rounded-lg hover:bg-[#2c5a5d] transition-all duration-200"
          >
            {editingEvent ? 'Update Equipment' : 'Add Equipment'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    
       <div className="playfair mt-10 bg-white">
      
      <div className="relative mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#387478] inline-block pb-2">
          LIVE MATCHES
        </h1>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#387478] rounded-full"></div>
      </div>

      <section className="body-font">
        <div className="container px-5 py-5 mx-auto space-y-6">
          
          {getAllMatches.map((match) => {
            const { matchId, team1Name, team2Name, venue, dateTime, team1score, team2score, matchTime } = match;

            return (
              <a
                key={matchId}
                className="block w-full bg-white border-2 border-[#e7f3f3] p-0 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-102 hover:shadow-xl hover:border-[#387478]"
              >
                <div className="relative bg-[#f8f7f6] w-full flex justify-between items-center px-28 py-6">
                  {/* Left Team */}
                  <div className="text-center space-y-4">
                    <img
                      className="h-30 w-32 object-cover mx-auto"
                      src="/TeamA.png" 
                      alt={`${team1Name} jersey`}
                    />
                    <h3 className="font-semibold text-xl text-[#2c5a5d]">{team1Name}</h3>
                  </div>

                  <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#387478] bg-[#f0f7f7] py-3 px-6 rounded-xl">
                      {team1score} : {team2score}
                    </h1>
                    <div className="bg-gradient-to-r from-[#387478] to-[#2c5a5d] rounded-full py-2 px-8 inline-block shadow-md">
                      <p className="text-lg text-white font-medium">{matchTime}</p>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <img
                      className="h-30 w-32 object-cover mx-auto"
                      src="/TeamB.png" 
                      alt={`${team2Name} jersey`}
                    />
                    <h3 className="font-semibold text-xl text-[#2c5a5d]">{team2Name}</h3>
                  </div>
                </div>
                <div className="border-t-2 border-[#e7f3f3]"></div>
                <div className="p-5 bg-[#f9fbfb]">
                  <h1 className="text-lg font-semibold text-[#387478]">
                    {team1Name} VS {team2Name}
                  </h1>
                  <p className="text-[#5c8f92] text-sm mt-1">Venue: {venue}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Ongoing Tournaments Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#387478] inline-block pb-2">
            Active Tournaments
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#387478] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {activeEvents.map((event) => (
     
            <a
              key={event.id}
              href={event.link}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#e7f3f3] hover:border-[#387478]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src={event.bannerImage}
                  alt={`${event.eventName} banner`}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#387478]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-md ${getBadgeColor(event.eventType)}`}>
                    {event.eventType}
                  </span>
                </div>

                <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="p-1.5 bg-white rounded-full shadow-lg">
                    <img
                      className="h-14 w-14 rounded-full object-cover"
                      src={event.clubLogo}
                      alt={`${event.organizerEmail} club logo`}
                    />
                  </div>
                </div>
                
                {/* Conditionally render the "Edit" button */}
                {userDetails.email === event.organizerEmail && (
                  console.log(event),
                  <button 
                    className="absolute bottom-4 right-4 bg-[#387478] text-white py-1 px-4 rounded-full"
                    onClick={() => {
                      setEditingEvent(event);
                      setIsAddModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>

              <a href={`http://localhost:5173/ongoingtournament?eventName=${event.id}`}>
        
  <div className="p-6 bg-gradient-to-b from-white to-[#f9fbfb]">
    <h2 className="text-xl font-semibold text-[#387478] group-hover:text-[#2c5a5d] transition-colors duration-300">
      {event.eventName}
    </h2>
    <a href={event.link} className="block">
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-[#5c8f92] font-medium cursor-pointer">View Details</span>
        <svg 
          className="w-5 h-5 text-[#387478] transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  </div>
</a>

              
            </a>
          ))}
        </div>
      </div>

      {/* Recent Matches Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#387478] inline-block pb-2">
            Upcoming Tournaments
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#387478] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {upcomingEvents.map((event) => (
            console.log("User Email:", userDetails.email), 
            console.log("Event Creator Email:", event.userEmail),
            <div 
            key={event.id}
            onClick={() => handleEventAction(event)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#e7f3f3] hover:border-[#387478] cursor-pointer"
          >
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src={event.bannerImage}
                  alt={`${event.eventName} banner`}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#387478]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-md ${getBadgeColor(event.eventType)}`}>
                    {event.eventType}
                  </span>
                </div>

                <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="p-1.5 bg-white rounded-full shadow-lg">
                    <img
                      className="h-14 w-14 rounded-full object-cover"
                      src={event.clubLogo}
                      alt={`${event.eventName} club logo`}
                    />
                  </div>
                </div>
                
                {/* Conditionally render the "Edit" button */}
                {userDetails.email === event.organizerEmail && (
                  <button 
                    className="absolute bottom-4 right-4 bg-[#387478] text-white py-1 px-4 rounded-full"
                    onClick={() => {
                      setEditingEvent(event);
                      setIsAddModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="p-6 bg-gradient-to-b from-white to-[#f9fbfb]">
    <h2 className="text-xl font-semibold text-[#387478] group-hover:text-[#2c5a5d] transition-colors duration-300">
      {event.eventName}
    </h2>
    <a href={event.link} className="block">
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-[#5c8f92] font-medium cursor-pointer">Coming Soon</span>
        <svg 
          className="w-5 h-5 text-[#387478] transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  </div>



              
            </div>
          ))}
        </div>
      </div>
      


      
      {isAddModalOpen && <AddEventModal />}
    </div>
   
   

   
  );
};

export default clubHomeCard;

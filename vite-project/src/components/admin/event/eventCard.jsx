import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../card/card';
import { Calendar, MapPin, FileText, User } from 'lucide-react';
import Layout from '../../layout/Layout';
import { db, collection, getDocs, doc, updateDoc, setDoc } from '../../../firebase/FirebaseConfig';

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleAccept = async () => {
    try {
      if (!selectedEvent || !selectedEvent.id || !selectedEvent.userEmail || !selectedEvent.eventType || !selectedEvent.eventDate) {
        throw new Error('Invalid event data or missing required fields.');
      }
  
      // Create a new document in the activeEvents collection
      const activeEventRef = doc(db, 'activeEvents', selectedEvent.id);
      await setDoc(activeEventRef, {
        ...selectedEvent,
        status: 'active',
        acceptedAt: new Date().toISOString(),
      });
  
      // Update the status in the eventRequests collection
      const eventRequestRef = doc(db, 'eventRequests', selectedEvent.id);
      await updateDoc(eventRequestRef, {
        status: 'accepted',
      });
  
      // If the user is to be made a coordinator, update their role
      if (selectedEvent.userEmail) {
        const usersRef = collection(db, 'Users');
        const userSnapshot = await getDocs(usersRef);
        const userDoc = userSnapshot.docs.find((doc) => doc.data().Email === selectedEvent.userEmail);
  
        if (userDoc) {
          const userRef = doc(db, 'Users', userDoc.id);
          await updateDoc(userRef, {
            Role: `${selectedEvent.eventName} Coordinator`,
          });
        }
      }
  
      // Update local state
      setEventData((prevData) =>
        prevData.map((event) =>
          event.id === selectedEvent.id ? { ...event, status: 'accepted' } : event
        )
      );
  
      // Refresh the events by calling fetchEvents again
      fetchEvents();
  
      alert('Event has been successfully accepted and added to active events!');
    } catch (error) {
      console.error('Error accepting event:', error);
      alert('Failed to accept event: ' + error.message);
    }
  };
  
  const handleReject = async () => {
    try {
      if (!selectedEvent || !selectedEvent.id || !selectedEvent.userEmail || !selectedEvent.eventType || !selectedEvent.eventDate) {
        throw new Error('Invalid event data or missing required fields.');
      }
  
      // Get the Firestore reference for the selected event
      const eventRef = doc(db, 'eventRequests', selectedEvent.id);
  
      // Update the event status to 'rejected' and set the rejection timestamp
      await updateDoc(eventRef, {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
      });
  
      // Update the local event data state to reflect the rejection
      setEventData((prevData) =>
        prevData.map((event) =>
          event.id === selectedEvent.id ? { ...event, status: 'rejected' } : event
        )
      );
  
      // Refresh the events by calling fetchEvents again
      fetchEvents();
  
      // Notify the user that the event was rejected
      alert('Event request has been rejected.');
    } catch (error) {
      // Handle any errors that occur during the rejection process
      console.error('Error rejecting event:', error);
      alert('Failed to reject event: ' + error.message);
    }
  };
  
  // Fetch events function to refresh data
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'eventRequests'));
      const data = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((event) => !event.status || event.status === 'pending'); // Only show pending requests
      setEventData(data);
      setLoading(false);
      console.log('Fetched event data:', data); // Log fetched data for debugging
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch event requests. Please try again later.'); // Set error state when there's an issue
      console.error('Error fetching events:', error);
    }
  };
  

  const openConfirmationDialog = (event, action) => {
    console.log('Selected event data:', event);  // Check if the event data has the required fields
    setSelectedEvent(event);
    const confirmed = window.confirm(
      action === 'accept'
        ? 'Are you sure you want to accept this event request? This action will notify the organizer.'
        : 'Are you sure you want to reject this event request? This action will notify the organizer.'
    );
    if (confirmed) {
      action === 'accept' ? handleAccept() : handleReject();
    }
  };
  

  useEffect(() => {
    
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'eventRequests'));
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((event) => !event.status || event.status === 'pending'); // Only show pending requests
        setEventData(data);
        setLoading(false);
        console.log('Fetched event data:', data); // Log fetched data for debugging
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch event requests. Please try again later.'); // Set error state when there's an issue
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#387478' }}>
          Event Requests
        </h1>
        {loading ? (
          <p
            style={{
              fontSize: '1.2rem',
              color: '#387478',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '20px',
              animation: 'fadeIn 1.5s ease-in-out',
            }}
          >
            Loading events...
          </p>
        ) : error ? (
          <p>{error}</p> // Display error message
        ) :eventData.length === 0 ? (
          <p>No event requests available.</p>
        ) : (
          eventData.map((event, index) => (
            <Card key={index} className="bg-white shadow-lg mb-6">
              <CardHeader className="border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold" style={{ color: '#387478' }}>
                    Event Request Details
                  </CardTitle>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openConfirmationDialog(event, 'accept')}
                      className="px-4 py-2 rounded-lg text-white transition-transform hover:scale-105"
                      style={{ backgroundColor: '#387478' }}
                    >
                      Accept Event
                    </button>
                    <button
                      onClick={() => openConfirmationDialog(event, 'reject')}
                      className="px-4 py-2 rounded-lg border text-red-600 border-red-600 hover:bg-red-50 transition-transform hover:scale-105"
                    >
                      Reject Event
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Banner Image */}
                <div className="mb-6">
                  <img
                    src={event.bannerImage}
                    alt="Event Banner"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Event Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#387478' }}>
                        <Calendar className="h-5 w-5" />
                        Event Information
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Type:</span> {event.eventType}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span> {event.eventDate}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span> {event.startTime} - {event.endTime}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2 " style={{ color: '#387478' }}>
                        <MapPin className="h-5 w-5" />
                        Venue And Attendance
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Location:</span> {event.location}
                        </p>
                        <p>
                          <span className="font-medium ">Expected Participants:</span> {event.expectedAttendees}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#387478' }}>
                        <User className="h-5 w-5" />
                        Organizer Details
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Name:</span> {event.userName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {event.userEmail}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {event.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#387478' }}>
                        <FileText className="h-5 w-5" />
                        Additional Information
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Description:</span> {event.description || 'Not provided'}
                        </p>

                        {event.proposalFile && (
                          <div className="mt-2">
                            <p className="font-medium mb-1">Proposal Document:</p>
                            <img
                              src={event.proposalFile}
                              alt="Proposal Document"
                              className="w-full h-14 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default EventDetails;

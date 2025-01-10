import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../card/card';
import { Calendar, MapPin, FileText, User } from 'lucide-react';
import Layout from '../../layout/Layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert";

import { db, collection, getDocs, doc, updateDoc } from '../../../firebase/FirebaseConfig';

const EventDetails = () => {
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogType, setDialogType] = useState(null); // 'accept' or 'reject'
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (event, type) => {
    setSelectedEvent(event);
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const handleAccept = async () => {
    try {
      const eventRef = doc(db, 'eventRequests', selectedEvent.id);
      await updateDoc(eventRef, {
        status: 'accepted'
      });
      setEventData(eventData.map(event => 
        event.id === selectedEvent.id ? { ...event, status: 'accepted' } : event
      ));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error accepting event:', error);
      alert('Failed to accept event');
    }
  };

  const handleReject = async () => {
    try {
      const eventRef = doc(db, 'eventRequests', selectedEvent.id);
      await updateDoc(eventRef, {
        status: 'rejected'
      });
      setEventData(eventData.map(event => 
        event.id === selectedEvent.id ? { ...event, status: 'rejected' } : event
      ));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error rejecting event:', error);
      alert('Failed to reject event');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'eventRequests'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventData(data);
      } catch (error) {
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
        
        {eventData.map((event, index) => (
          <Card key={index} className="bg-white shadow-lg mb-6">
         
   <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold" style={{ color: '#387478' }}>
              Event Request Details
            </CardTitle>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-lg text-white transition-transform hover:scale-105"
                style={{ backgroundColor: '#387478' }}
              >
                Accept Event
              </button>
              <button
                onClick={handleReject}
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

<p><span className="font-medium">Type:</span> {event.eventType}</p>

<p><span className="font-medium">Date:</span> {event.eventDate}</p>

<p><span className="font-medium">Time:</span> {event.startTime} - {event.endTime}</p>

</div>

</div>

<div className="bg-gray-50 p-4 rounded-lg">

<h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#387478' }}>

<MapPin className="h-5 w-5" />

 Venue & Attendance

</h3>

<div className="space-y-2">

<p><span className="font-medium">Location:</span> {event.location}</p>

<p><span className="font-medium">Expected Participants:</span> {event.expectedAttendees}</p>

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

<p><span className="font-medium">Name:</span> {event.userName}</p>

<p><span className="font-medium">Email:</span> {event.userEmail}</p>

<p><span className="font-medium">Phone:</span> {event.phoneNumber}</p>

</div>

</div>

<div className="bg-gray-50 p-4 rounded-lg">

<h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#387478' }}>

<FileText className="h-5 w-5" />

 Additional Information

</h3>

<div className="space-y-2">

<p><span className="font-medium">Description:</span> {event.description || 'Not provided'}</p>

{event.proposalFile && (

<div className="mt-2">

<p className="font-medium mb-1">Proposal Document:</p>

<img

src={event.proposalFile}

alt="Proposal Document"

className="w-full h-05 object-cover rounded-lg"

/>

</div>

 )}

</div>

</div>

</div>

</div>

</CardContent>
          </Card>
        ))}

        {/* Confirmation Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialogType === 'accept' ? 'Accept Event Request' : 'Reject Event Request'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {dialogType === 'accept' 
                  ? 'Are you sure you want to accept this event request? This action will notify the organizer.'
                  : 'Are you sure you want to reject this event request? This action will notify the organizer.'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={dialogType === 'accept' ? handleAccept : handleReject}
                className={dialogType === 'accept' ? 'bg-[#387478] hover:bg-[#2c5a5d]' : 'bg-red-600 hover:bg-red-700'}
              >
                {dialogType === 'accept' ? 'Accept' : 'Reject'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default EventDetails;
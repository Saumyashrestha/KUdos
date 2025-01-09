import React, { useState,useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/card/card';
import { Calendar, Clock, MapPin, Users, FileText, Send, Phone, Upload, CheckCircle, Trophy } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { getAuth } from 'firebase/auth';



import { db, doc, collection, getDoc,getDocs,addDoc } from '../../firebase/FirebaseConfig';


const EventRequestForm = () => {
    const [userDetails, setUserDetailsLocal] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    expectedAttendees: '',
    description: '',
    eventType: 'football',
    otherEventType: '',
    phoneNumber: '',
    bannerImage: '/api/placeholder/400/320',
    proposalFile: '/api/placeholder/400/320',
    location: '',
    userName:'',
    userEmail:''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');

  const sportTypes = [
    'Football',
    'Basketball',
    'Table Tennis',
    'Futsal',
    'Volleyball',
    'Badminton',
    'Cricket',
    'Tennis',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    // Wait for user to be authenticated and details to load
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user?.uid); // Ensure user is authenticated
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetailsLocal(docSnap.data()); // Set user details in local state
        } else {
          console.log("User not logged in");
        }
      }
    });
  
    if (!userDetails) {
      console.log("User details not available yet");
      return; // Ensure data is available before submitting
    }
  
    try {
      await addDoc(collection(db, 'eventRequests'), {
        ...formData, // Spread existing form data
        userName: userDetails?.Name, // Ensure userName is populated
        userEmail: userDetails?.Email,
      });
  
      console.log('Form submitted successfully!');
      setIsSubmitted(true);
  
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          eventName: '',
          eventDate: '',
          startTime: '',
          endTime: '',
          expectedAttendees: '',
          description: '',
          eventType: 'football',
          otherEventType: '',
          requirements: '',
          phoneNumber: '',
          userName: '',
          userEmail: ''
        });
        setFileName('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  



  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-4">
              <Trophy className="h-12 w-12" style={{ color: '#387478' }} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sports Event Request</h1>
            <p className="text-gray-600">Let's make your sports event happen!</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            {/* Guidelines Card */}
            <Card className="bg-gray-50 border-none mb-8 transform hover:scale-[1.01] transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#387478' }}>
                  <FileText className="h-5 w-5" style={{ color: '#387478' }} />
                  Quick Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" style={{ color: '#387478' }} />
                    Provide accurate event details
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" style={{ color: '#387478' }} />
                    Specify any special requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" style={{ color: '#387478' }} />
                    Upload supporting documents if needed
                  </li>
                </ul>
              </CardContent>
            </Card>

            {isSubmitted ? (
              <div className="bg-gray-50 p-6 rounded-2xl flex items-center gap-3 animate-fadeIn">
                <div className="p-2 rounded-full" style={{ backgroundColor: '#387478' }}>
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#387478' }}>Success!</h3>
                  <p className="text-gray-600">Your event request has been submitted. We'll review it shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Event Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-medium text-gray-700">Event Name</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all hover:border-gray-300"
                      style={{ '--tw-ring-color': '#387478' }}
                      placeholder="Enter event name"
                    />
                  </div>

                  {/* <div className="space-y-2 group">
                    <label className="text-sm font-medium text-gray-700">Sport Type</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all hover:border-gray-300"
                      style={{ '--tw-ring-color': '#387478' }}
                    >
                      {sportTypes.map((sport) => (
                        <option key={sport.toLowerCase()} value={sport.toLowerCase()}>
                          {sport}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div> */}
                </div>
                {/* <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Event Banner
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors group">
                  <div className="space-y-2 text-center">
                    <div className="relative group">
                      <img 
                        src={bannerPreview || defaultBannerImage} 
                        alt="Banner preview" 
                        className="mx-auto max-h-48 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <p className="text-white text-sm">Click to change</p>
                      </div>
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="banner-upload" className="relative cursor-pointer rounded-md font-medium transition-colors" style={{ color: '#387478' }}>
                        <span>{bannerPreview ? 'Change banner' : 'Upload banner'}</span>
                        <input
                          id="banner-upload"
                          name="banner"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleBannerChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div> */}

                {/* Date and Time Section */}
                <div className="bg-gray-50 p-6 rounded-2xl space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5" style={{ color: '#387478' }} />
                    Date And Time
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': '#387478' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': '#387478' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">End Time</label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                        style={{ '--tw-ring-color': '#387478' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Location, Attendees, and Phone Number */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" style={{ color: '#387478' }} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#387478' }}
                      placeholder="Enter event location"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="h-4 w-4" style={{ color: '#387478' }} />
                      Expected Participants
                    </label>
                    <input
                      type="number"
                      name="expectedAttendees"
                      value={formData.expectedAttendees}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#387478' }}
                      placeholder="Number of participants"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" style={{ color: '#387478' }} />
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#387478' }}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#387478' }}
                    placeholder="Describe your event (format, rules, requirements, etc.)"
                  />
                </div>

                {/* File Upload */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event Proposal</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors group">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="proposal-upload" className="relative cursor-pointer rounded-md font-medium transition-colors" style={{ color: '#387478' }}>
                          <span>Upload a file</span>
                          <input
                            id="proposal-upload"
                            name="proposal"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                      {fileName && (
                        <p className="text-sm font-medium" style={{ color: '#387478' }}>{fileName}</p>
                      )}
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-4 text-white rounded-xl transition-all transform hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: '#387478' }}
                  >
                    <Send className="h-4 w-4" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventRequestForm;


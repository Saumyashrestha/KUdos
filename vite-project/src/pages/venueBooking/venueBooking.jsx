import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../../components/layout/Layout";

const venueBooking = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        venue: "",
        date: "",
        time: "",
        eventName: "",
    });

    const bookings = {
        "2025-02-04": "Football Ground Booked",
        "2025-02-05": "Basketball Court Booked",
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!formData.venue || !formData.date || !formData.time || !formData.eventName) {
            alert("Please fill out all fields.");
            return;
        }
        alert(`Request submitted for ${formData.eventName}`);
        setShowModal(false);
        setFormData({ venue: "", date: "", time: "", eventName: "" });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl mt-2 font-semibold text-center text-[#387478] mb-6">
                    Venue Booking
                </h1>

                {/* Calendar Section */}
                <div className="flex flex-col justify-center items-center">
                    <div className="mt-6 w-[600px] max-w-full">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="w-full"
                        />
                    </div>

                    {/* Bookings Section */}
                    <div className="mt-8 w-[600px]">
                        <h2 className="text-lg font-semibold text-[#387478] mb-4">
                            Bookings
                        </h2>
                        <ul className="text-gray-700 text-sm space-y-2">
                            {Object.entries(bookings).map(([date, booking]) => (
                                <li key={date}>
                                    <span className="font-semibold">{date}:</span> {booking}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="mt-6 px-6 py-2 bg-[#387478] text-white font-semibold rounded-md hover:bg-[#4fa3a9]"
                        onClick={() => setShowModal(true)}
                    >
                        Book Venue
                    </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                        <div className="bg-white p-6 rounded-md shadow-lg w-[400px] border border-[#387478] ">
                            <h2 className="text-xl font-semibold text-[#387478] mb-4">Book Venue</h2>
                            <div className="mb-4">
                                <label className="block text-gray-800 mb-2">Select Venue</label>
                                <select
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                >
                                    <option value="">Select...</option>
                                    <option value="Football Ground">Football Ground</option>
                                    <option value="Basketball Court">Basketball Court</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 mb-2"> Start Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 mb-2"> End Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-red-500 hover:bg-[#ff5449] text-white rounded-md mr-2"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-[#387478] text-white rounded-md hover:bg-[#4fa3a9]"
                                    onClick={handleSubmit}
                                >
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default venueBooking;

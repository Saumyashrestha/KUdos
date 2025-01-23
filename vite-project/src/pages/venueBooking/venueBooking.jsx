import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../../components/layout/Layout";

const venueBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const bookings = {
    "2025-02-04": "Football Ground Booked",
    "2025-02-05": "Basketball Court Booked",
    "2025-02-06": "Auditorium Reserved",
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold text-center text-[#387478] mb-6">
          Venue Booking
        </h1>
        <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg border border-[#387478]">

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="mx-auto"
          />
          <div className="mt-8">
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
        </div>
      </div>
    </Layout>
  );
};

export default venueBooking;

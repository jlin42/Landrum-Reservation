import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './Timeslots'; // Import the TimeSlot component

const ReactCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Dummy data: replace this with your actual data structure
  const reservations = {
    '2023-08-25': ['09:00 AM', '10:00 AM'],
    '2023-08-26': ['11:00 AM', '12:00 PM'],
    // Add more dates and reservation times here
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-app">
      <h1>Calendar App</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <TimeSlot
        date={selectedDate}
        reservationTimes={
          reservations[selectedDate.toISOString().split('T')[0]] || []
        }
      />
    </div>
  );
};

export default ReactCalendar;
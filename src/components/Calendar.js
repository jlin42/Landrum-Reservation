import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './Timeslots'; // Import the TimeSlot component
import './css/Calendar.css'

const ReactCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Dummy data: replace this with your actual data structure
  const reservations = {
    '2023-08-25': ['9:00 AM', '10:00 AM'],
    '2023-08-26': ['11:00 AM', '12:00 PM'],
    '2023-08-28': ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
    // Add more dates and reservation times here
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-app">
        <div className="booking-view">
        <h1 className="calendar-title">{selectedDate.toDateString()}</h1>
            <div className="booking-container">
            
            <Calendar onChange={handleDateChange} value={selectedDate} />
            <TimeSlot
                date={selectedDate}
                reservationTimes={
                reservations[selectedDate.toISOString().split('T')[0]] || []
                }
                
            />
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
import React, { useState } from 'react';
import './css/Timeslots.css'

const TimeSlot = ({ date, reservationTimes }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
  };

  return (
    <div className="timeslot">
      <h2>Available times:</h2>
      <div className="timeslot-grid">
        {reservationTimes.map((time, index) => (
          <button
            key={index}
            className={`${selectedTimeSlot === time ? 'selected' : ''} ${time !== '9:00 AM' ? 'available' : 'unavailable'}`}
            onClick={() => handleTimeSlotClick(time)}>{time}
          </button>
        ))}
      </div>
      <button className="reserve-button">Reserve</button>
    </div>
  );
};

export default TimeSlot;
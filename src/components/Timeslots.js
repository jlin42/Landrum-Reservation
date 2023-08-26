import React from 'react';

const TimeSlot = ({ date, reservationTimes }) => {
  console.log('Received date:', date);
  console.log('Received reservationTimes:', reservationTimes);
  return (
    <div className="timeslot">
      <h2>Reservation Times for {date.toDateString()}</h2>
      {reservationTimes.length === 0 ? (
        <p>No reservation times available for this date.</p>
      ) : (
        <ul>
          {reservationTimes.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlot;
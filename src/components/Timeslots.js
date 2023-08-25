import React from 'react';

const TimeSlot = ({ time, isReserved, onReserve }) => {
  return (
    <div className={`timeslot ${isReserved ? 'reserved' : ''}`}>
      <span>{time}</span>
      {!isReserved && <button onClick={onReserve}>Reserve</button>}
    </div>
  );
};

export default TimeSlot;
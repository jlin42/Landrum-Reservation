import React, { useState, useEffect } from 'react';
import './css/Timeslots.css';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebase-config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TimeSlot = ({ date }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [reservationTimes, setReservationTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const timeslotsRef = collection(db, 'bookings');
        const q = query(timeslotsRef, where('date', '==', formattedDate));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const data = querySnapshot.docs[0].data();
          setReservationTimes(data.times || []);
        } else {
          setReservationTimes([]);
        }
      } catch (error) {
        console.error('Error fetching timeslots: ', error);
      }
    };
    fetchData();
  }, [date, db]);

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
  };

  return (
    <div className="timeslot">
      <h2>Available times:</h2>
      <div className="timeslot-grid">
        {reservationTimes.map((timeSlot, index) => (
          <button
            key={index}
            className={`${selectedTimeSlot === timeSlot.time ? 'selected' : ''} ${
              timeSlot.availability ? 'available' : 'unavailable'
            }`}
            onClick={() => handleTimeSlotClick(timeSlot.time)}
            style={{ backgroundColor: timeSlot.availability ? 'green' : 'red' }}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>
      <button className="reserve-button">Reserve</button>
    </div>
  );
};

export default TimeSlot;
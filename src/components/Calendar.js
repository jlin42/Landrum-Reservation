import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeSlot from './Timeslots';
import './css/Calendar.css';
import { getFirestore, collection, getDocs, where, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebase-config';

const app = initializeApp(firebaseConfig);

const ReactCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeslots, setTimeslots] = useState([]);

  const db = getFirestore(app);

  const generateDatesForNextWeek = () => {
    const today = new Date();
    const dates = [];
  
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
  
    return dates;
  };

  const createDocumentsForNextWeek = async (dates) => {
    const collectionRef = collection(db, 'bookings'); // Replace 'days' with your collection name
  
    for (const date of dates) {
      const formattedDate = date.toISOString().split('T')[0];
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour === 0){
            try {
                const docRef = doc(collectionRef, formattedDate);
                const docData = {
                    time: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
                    availability: true
                    
                };
        
                // Create the document
                await setDoc(docRef, docData);
        
                console.log(`Document created for ${formattedDate}`);
            } catch (error) {
                console.error(`Error creating document for ${formattedDate}:`, error);
            }
            }
        };
      }

    const deleteOldBookings = async () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
    
        // Calculate midnight of the current day
        const midnight = new Date(today);
        midnight.setHours(0, 0, 0, 0);
    
        const collectionRef = collection(db, 'bookings');
        const q = query(collectionRef, where('date', '<', formattedDate));
    
        try {
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach(async (doc) => {
            // Check if the booking is older than midnight
            if (doc.data().date.toMillis() < midnight.getTime()) {
            // Delete the old booking
            await deleteDoc(doc.ref);
            console.log(`Deleted old booking: ${doc.id}`);
            }
        });
        } catch (error) {
        console.error('Error deleting old bookings:', error);
        }
      };
      
      // Schedule the function to run every midnight
      setInterval(deleteOldBookings, 24 * 60 * 60 * 1000);
  
      

  useEffect(() => {
    const fetchData = async () => {
      try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const timeslotsRef = collection(db, 'bookings');
            const q = query(timeslotsRef, where('date', '==', formattedDate));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
            const data = querySnapshot.docs[0].data();
            setTimeslots(data.timeslots || []);
            } else {
            setTimeslots([]);
            }
        } catch (error) {
            console.error('Error fetching timeslots: ', error);
      }
    };

    fetchData();
  }, [selectedDate, db]);

  useEffect(() => {
    const nextWeekDates = generateDatesForNextWeek();
    createDocumentsForNextWeek(nextWeekDates);
  }, []); // This effect runs once during component mount

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-app">
      <div className="booking-view">
        <h1 className="calendar-title">{selectedDate.toDateString()}</h1>
        <div className="booking-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <TimeSlot date={selectedDate} reservationTimes={timeslots} />
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
import {useState} from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'
// import './App.css';

function ReactCalendar() {
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [reservationTimes, setReservationTimes] = useState([]);

 const reservations = {
    '2023-08-25': ['09:00 AM', '10:00 AM'],
    '2023-08-26': ['11:00 AM', '12:00 PM'],
    // Add more dates and reservation times here
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate)
    setReservationTimes(reservations[formattedDate] || []);
  };

return (
 <div className="app">
   <h1 className="header">React Calendar</h1>
   <div className="calendar-container">
     <Calendar onChange={handleDateChange} value={selectedDate} />
   </div>
   <div className="reservation-times">
        <h2>Reservation Times for {selectedDate.toDateString()}</h2>
        {reservationTimes.length === 0 ? ( <p>No reservation times available for this date.</p>
        ) : (
          <ul>
            {reservationTimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        )}
      </div>
   <div className="text-center">
      Selected date: {selectedDate.toDateString()}
   </div>
 </div>
  )

}

export default ReactCalendar;

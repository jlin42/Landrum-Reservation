import ReactCalendar from "../components/Calendar"; 
import 'react-calendar/dist/Calendar.css'
import TimeSlot from '../components/Timeslots';
// import './App.css';

function Booking() {
return (
 <div>
    <ReactCalendar/>
    <TimeSlot/>
  </div>
  );
}

export default Booking;

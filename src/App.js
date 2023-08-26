import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './pages/NavBar.js'
import Booking from "./pages/Bookings.js";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="content-container">
        <Routes>
          <Route className="container" path="/" element={<NavBar/>}>
            <Route path="booking" element={<Booking/>} />
            <Route path="login" element={null} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;

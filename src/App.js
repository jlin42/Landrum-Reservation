import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar.js';
import Booking from './pages/Bookings.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { UserProvider } from './context/UserContext';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="content-container">
        <UserProvider>
        <Routes>
          <Route className="container" path="/" element={<NavBar/>}>
            <Route path="booking" element={<Booking/>} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>}/>
          </Route>
        </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );

}

export default App;

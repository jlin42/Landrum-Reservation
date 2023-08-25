import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Calendar from "./components/Calendar";
import Booking from "./pages/Bookings.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="booking" element={<Booking/>} />
          <Route path="login" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;

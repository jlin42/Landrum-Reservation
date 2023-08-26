import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './css/NavBar.css';

const NavBar = () => {
  return (
    <>
      <nav>
        <ul className="NavBar-container">
          <div>
            <Link className="Link" to="/booking">Reserve a Time</Link>
          </div>
          <div>
            <Link className="Link" to="/reservations">Current Reservations</Link>
          </div>
          <div className="login-bar">
            <FontAwesomeIcon className="profile-icon" icon={faUser} />
            <Link className="Link" to="/login">Login</Link>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default NavBar;
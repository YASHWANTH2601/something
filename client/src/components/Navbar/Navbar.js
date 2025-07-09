import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ user, onLoginClick, onLogoutClick }) => {
  return (
    <nav className="navbar navbar-expand bg-primary text-white px-3 d-flex justify-content-between align-items-center">
      <div className="fw-bold fs-5">GFMNOW</div>
      <ul className="d-flex list-unstyled align-items-center justify-content-center m-0 ">
        <li className="me-3">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className="me-3">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="me-3">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
        <li className="me-3">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
      <div>
        {user ? (
          <div className="d-flex align-items-center gap-3">
            <Link to="/profile">
              <img
                src={user.photos?.[0]?.value}
                alt="avatar"
                className="rounded-circle"
                style={{ width: 32, height: 32 }}
              />
            </Link>

            <span>{user.displayName}</span>
            <button className="logoutbtn" onClick={onLogoutClick}>
              Logout
            </button>
            {/* <button onClick={onLogoutClick} className="ms-2 btn btn-light">
              Logout
            </button> */}
          </div>
        ) : (
          <button className="loginbtn" onClick={onLoginClick}>
            Login
          </button>
        )}
        {/* <button className="btn btn-light" onClick={onLoginClick}>Login</button> */}
      </div>
    </nav>
  );
};

export default Navbar;

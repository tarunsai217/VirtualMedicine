import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Header(props) {
  let [activeNav, setActiveNav] = useState("home");
  const changeNavBar = (nav) => {
    setActiveNav(nav);
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Doctor- Consulting
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li
                className={
                  activeNav === "home" ? "nav-item activeNavBar" : "nav-item"
                }
                onClick={() => {
                  changeNavBar("home");
                }}
              >
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {JSON.parse(localStorage.getItem("doctorEmail")) !== null ||
              JSON.parse(localStorage.getItem("patientEmail")) !== null ? (
                <li
                  className={
                    activeNav === "logged"
                      ? "nav-item activeNavBar"
                      : "nav-item"
                  }
                  onClick={() => {
                    changeNavBar("logged");
                  }}
                >
                  {JSON.parse(localStorage.getItem("patientEmail")) !== null ? (
                    <Link to="/patient/userprofile" className="nav-link">
                      Patient
                    </Link>
                  ) : (
                    <Link to="/doctor/doctorprofile" className="nav-link">
                      Doctor
                    </Link>
                  )}
                </li>
              ) : (
                ""
              )}
            </ul>
            {JSON.parse(localStorage.getItem("doctorEmail")) === null &&
            JSON.parse(localStorage.getItem("patientEmail")) === null ? (
              <div style={{ marginLeft: "auto" }}>
                <Link to="/register" className="btn btn-primary registerBtn">
                  Register
                </Link>
                <Link to="/login" className="btn btn-danger">
                  Login
                </Link>
              </div>
            ) : (
              <div style={{ marginLeft: "auto" }}>
                <Link
                  to="/"
                  onClick={props.onLogout}
                  className="btn btn-warning mr-2"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
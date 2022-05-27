import React, { useState, useEffect } from "react";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import CreateSchedule from "../DoctorSchedule/CreateSchedule/CreateSchedule";

function PatientSideNavBar({ loggedIn }) {
  let navigate = useNavigate();
  let param = window.location.href.split("/patient/")[1];
  if (param === "") {
    param = "patient";
  }
  let [activeBar, setActiveBar] = useState(param);
  const changeNavBar = (val) => {
    setActiveBar(val);
  };

  let patientEmail = JSON.parse(localStorage.getItem("patientEmail"));

  useEffect(() => {
    if (patientEmail === null) {
      navigate("/");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="col-3">
        <ul className="list-group" style={{ textAlign: "center" }}>
          <li className="list-group-item">
            <div className="row">
              <div className="col-12">
                <img
                  className="thumbnail"
                  src="https://cdn5.vectorstock.com/i/1000x1000/78/14/tiny-cute-cartoon-patient-man-character-broken-vector-26027814.jpg"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-12 mt-4">
                <h3 style={{ wordBreak: "break-all" }}>
                  {patientEmail ? patientEmail : "Patient Name"}
                </h3>
              </div>
            </div>
          </li>
          <Link
            to="/patient/userprofile"
            onClick={() => {
              changeNavBar("userprofile");
            }}
          >
            <li
              className={
                activeBar === "userprofile"
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              My-Profile
            </li>
          </Link>

          <Link
            to="/patient/patientAppointmentPage"
            onClick={() => {
              changeNavBar("patientAppointmentPage");
            }}
          >
            <li
              className={
                activeBar === "patientAppointmentPage"
                  ? "list-group-item active"
                  : "list-group-item"
              }
              aria-current="true"
            >
              Appointments
            </li>
          </Link>

          <Link
            to="/patient/homePagePatient"
            onClick={() => {
              changeNavBar("homePagePatient");
            }}
          >
            <li
              className={
                activeBar === "homePagePatient"
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              Book Appointment
            </li>
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default PatientSideNavBar;

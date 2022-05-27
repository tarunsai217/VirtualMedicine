import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DoctorSideNavBar() {
  let param = window.location.href.split("/doctor/")[1];
  if (param === "") {
    param = "dashboard";
  }

  let [activeBar, setActiveBar] = useState(param);

  const changeNavBar = (val) => {
    setActiveBar(val);
  };

  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem("doctorEmail"));
  //const email = "deepak@gmail.com";

  useEffect(() => {
    if (email === null) {
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
                  src="https://cdn.pixabay.com/photo/2021/11/20/03/17/doctor-6810751__340.png"
                  alt=""
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-12 mt-4">
                <h3 style={{ wordBreak: "break-all" }}>
                  {email !== null ? email : "Doctor@gmail.com"}
                </h3>
              </div>
            </div>
          </li>
          <Link
            onClick={(e) => {
              changeNavBar("doctorprofile");
            }}
            to="/doctor/doctorprofile"
          >
            <li
              className={
                activeBar === "doctorprofile"
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              My Profile
            </li>
          </Link>

          <Link
            onClick={(e) => {
              changeNavBar("doctorAppointment");
            }}
            to="/doctor/doctorAppointment"
          >
            <li
              className={
                activeBar === "doctorAppointment"
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              Appointments
            </li>
          </Link>

          <Link
            onClick={(e) => {
              changeNavBar("createschedule");
            }}
            to="/doctor/schedule"
          >
            <li
              className={
                activeBar === "createschedule"
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              Schedule
            </li>
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default DoctorSideNavBar;

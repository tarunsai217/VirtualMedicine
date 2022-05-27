import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import UserProfile from "./components/patient/UserProfile";
import DoctorProfile from "./components/doctors/doctorProfile";
import ViewSchedule from "./components/DoctorSchedule/ViewSchedule/ViewSchedule";
import PatientVideo from "./components/patient/video/PatientVideo";
import HomePagePatient from "./components/patient/homePage/HomePagePatient";
import DoctorAppointment from "./components/doctors/doctorAppointment";
import PatientAppointment from "./components/patient/patientAppointmentPage";
import DoctorSideNavBar from "./components/common/DoctorSideNavBar";
import NotFound from "./components/common/NotFound";
import DoctorChat from "./components/doctors/DoctorChat";
import PatientSideNavBar from "./components/common/PatientSideNavBar";

function App() {
  let [loggedIn, setLoggedIn] = useState(true);
  const logout = () => {
    localStorage.removeItem("patientEmail");
    localStorage.removeItem("doctorEmail");
    if (loggedIn === false) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const userLogged = () => {
    if (loggedIn === false) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <React.Fragment>
      <Header onLogout={logout} loggedIn={loggedIn} />
      <div className="row container-fluid mt-3">
        <Routes>
          <Route path="/login" element={<Login onUserLogged={userLogged} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/doctor/doctorprofile"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <DoctorProfile loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/doctor/doctorAppointment"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <DoctorAppointment loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/doctor/patientAppointmentPage"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <PatientAppointment loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <ViewSchedule loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/doctor/Chat"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <DoctorChat loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/doctor"
            element={
              <>
                <DoctorSideNavBar loggedIn={loggedIn} />
                <DoctorProfile loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/patient/patientAppointmentPage"
            element={
              <>
                <PatientSideNavBar loggedIn={loggedIn} />
                <PatientAppointment loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/patient/userprofile"
            element={
              <>
                <PatientSideNavBar loggedIn={loggedIn} />
                <UserProfile loggedIn={loggedIn} />
              </>
            }
          />

          <Route
            path="/patient/homePagePatient"
            element={
              <>
                <HomePagePatient loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/callPatient"
            element={
              <>
                <PatientVideo />
              </>
            }
          />
          <Route
            path="/patient"
            element={
              <>
                <PatientSideNavBar loggedIn={loggedIn} />
                <UserProfile loggedIn={loggedIn} />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
export default App;

// To Run Video&chat server go to respective folder and start the server.

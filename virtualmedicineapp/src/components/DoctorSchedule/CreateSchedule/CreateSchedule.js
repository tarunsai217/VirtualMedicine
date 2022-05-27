import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./CreateSchedule.css";
import Swal from "sweetalert2";
import api from "../../../env";

// const host = "http://localhost:8080";

export default function CreateSchedule({ isModalOpen }) {
  const month =
    new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1;
  const currentdate =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  const todaydate = new Date().getFullYear() + "-" + month + "-" + currentdate;
  const minute =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  const hour =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  const currTime = hour + ":" + minute;
  const [storedDate, setstoredDate] = useState([]);
  const doctorEmail = JSON.parse(localStorage.getItem("doctorEmail"));
  const [changeDate, setchangeDate] = useState(todaydate);
  const [changeendTime, setchangeendTime] = useState(currTime);
  const [changestartTime, setchangestartTime] = useState(currTime);
  // console.log(changeDate)
  const [changeSpecialization, setchangeSpecialization] = useState();

  useEffect(() => {
    setchangeDate(todaydate);
    setchangestartTime(currTime);
    setchangeendTime(currTime);
    console.log("createSchedulereset");
  }, [isModalOpen]);
  
  useEffect(() => {
    axios
      .get(`${api}/schedule/scheduleservice/api/v1/schedules/getScheduleByDoctorEmail/${doctorEmail}`)
      .then((res) => {
        const specialization = res.data;
        console.log(specialization);
        setchangeSpecialization(specialization.specialization);
      });
  }, []);

  function Datechange(e) {
    console.log(e.target.value);
    setchangeDate(e.target.value);
  }
  function startTimechange(e) {
    console.log(e.target.value);
    setchangestartTime(e.target.value);
  }

  function endTimeChange(e) {
    console.log(e.target.value);
    setchangeendTime(e.target.value);
  }

  function add() {
    console.log("add function invoked")
    let date = changeDate;
    let starttime = changestartTime;
    let endtime = changeendTime;
    /*  if (starttime === "" || endtime === "" || date === "") {
      alert("Please fill all fields...!!!!!!");
      return;
      */
    if (endtime <= starttime) {
      Swal.fire(
        "OOPS!",
        "End time can not be equal or less than start time",
        "error"
      );
    } else {
      const obj = {};
      // const arr = [];
      const str = date + "_" + starttime + "_" + endtime;
      const addDate = [...storedDate, str];
      // console.log(addDate);

      for (let i = 0; i < storedDate.length; i++)
        if (storedDate[i] === str) {
          return;
        }
      obj.doctorEmail = doctorEmail;
      obj.scheduleDate = date;
      obj.startTime = starttime;
      obj.endTime = endtime;
      obj.scheduleStatus = "AVAILABLE";
      obj.specialization = changeSpecialization;

      // arr.push(obj);
      console.log(obj);
      setstoredDate(addDate);
      // for (let i = 0; i < arr.length; i++) {
      axios.post(`${api}/schedule/scheduleservice/api/v1/schedules/create`, obj).then(
        (response) => {
          console.log("response",response);
          if (
            response.status == 200 ||
            response.status == 304 ||
            response.status == 201
          ) {
            Swal.fire("Success!", "Schedule Added Successfully!", "success");
          }
        },
        (error) => {
          console.log(error);
        }
      );
      // }
    }
  }

  return (
    <>
      <div className="col" id="col-2">
        <div className="main">
          <div className="schedule">
            <h5>Schedule Timings</h5>
          </div>
          <br />
          <br />
          <div className="row" id="row-2">
            <div className="col" id="select-1">
              <h5>Select Date:</h5>
            </div>
            <div className="col" id="col-3">
              <input
                className="form-control"
                type="date"
                id="date"
                value={changeDate}
                min={todaydate}
                onChange={(e) => Datechange(e)}
              />
            </div>
          </div>
          <div className="row" id="row-3">
            <div className="col">
              <div>
                <h5>Start Time</h5>
                <br />
              </div>
              <div>
                <input
                  className="form-control"
                  type="time"
                  value={changestartTime}
                  id="start-time"
                  onChange={(e) => startTimechange(e)}
                />
              </div>
            </div>
            <div className="col">
              <div>
                <h5>End Time</h5>
              </div>
              <br />
              <div>
                <input
                  className="form-control"
                  type="time"
                  value={changeendTime}
                  id="end-time"
                  onChange={(e) => endTimeChange(e)}
                />
              </div>
            </div>
            <div className="col" id="col-4">
              <input
                type="button"
                id="add"
                value="Add"
                className="btn btn-primary"
                onClick={add}
              />
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

// export default CreateSchedule;

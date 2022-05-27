import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../env";

// const host = "http://localhost:8080";
// const host2 = "http://localhost:8080";

function PatientAppointment() {
  // const [id1, setid1] = useState()
  let [doctorsAppointment, setdoctorsAppointment] = useState([]);
  let id = JSON.parse(localStorage.getItem("patientEmail"));
  useEffect(() => {
    axios
      .get(`${api}/appointments/api/v1/appointments/appointment/patient/${id}`)
      .then((res) => {
        const data = res.data;
        
        for (let i = 0; i < data.length; i++) {
          data[i].position = i;
        }
        setdoctorsAppointment(data);
        console.log(data);
        // setid1(doctorsAppointment.scheduleId);
        // console.log(res.data.scheduleId);
      });
  }, []);

  let tdStyle = { textAlign: "center", verticalAlign: "middle" };

  const cancelAppointment = (buttonPosition, appointmentId, scheduleId) => {
    console.log(appointmentId);
    let data = JSON.stringify({
      "appointmentStatus": "CANCELED"
    });
    let config = {
      method: 'put',
      url: `${api}/appointments/api/v1/appointments/appointment/${appointmentId}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        
        const tempArr = [];
        for (let i = 0; i < doctorsAppointment.length; i++) {
          tempArr.push(doctorsAppointment[i]);
          if (buttonPosition === tempArr[i].position) {
            tempArr[i].appointmentStatus = "CANCELED";
          }
        }
        setdoctorsAppointment(tempArr);
      })
      .catch(function (error) {
        console.log(error);
      });

      const id1 = scheduleId;
      console.log(id1)
      const data1 = {
        "scheduleStatus": "AVAILABLE"
      };
      axios
      .put(
        `${api}/schedule/scheduleservice/api/v1/schedules/updateSchedule/${id1}`,data1
      )
      .then(
        (response) => {
          if (
            response.status == 201 ||
            response.status == 304 ||
            response.status == 200
          ) {
            // alert("Delete Schedule");
            console.log(response);
            console.log("doctor schedule updated successfully")
          }
        },
        (error) => {
          console.log(error);
        }
      );

    // axios
    //   .put(`${host}/api/v1/appointments/appointment/${appointmentId}`)
    //   .then((res) => {
    //     console.log(res);
    //     // once the status is updated in backend and we get OK status then just update
    //     // the position of the array of doctorsAppointment to cancel...
    //     const tempArr = [];
    //     for (let i = 0; i < doctorsAppointment.length; i++) {
    //       tempArr.push(doctorsAppointment[i]);
    //       if (buttonPosition === tempArr[i].position) {
    //         tempArr[i].appointmentStatus = "Cancel";
    //       }
    //     }
    //     setdoctorsAppointment(tempArr);
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });
  };

  const handleChatSubmit = function(apptId, patEmail, docEmail) {
    console.log('clicled')
    
  }

  return (
    <React.Fragment>
      <div className="col-md-9">
        <div>
          <table className="table table-bordered" id="appointment_table">
            <thead>
              <tr>
                <th style={tdStyle}>Doctor Details</th>
                <th style={tdStyle}>Appointment Date</th>
                <th style={tdStyle}>Booking Date</th>
                <th style={tdStyle}>Start Time</th>
                <th style={tdStyle}>End Time</th>
                <th style={tdStyle}>Status</th>
                <th style={tdStyle}>Cancel</th>
                <th style={tdStyle}>Chat</th>
              </tr>
            </thead>
            <tbody>
              {doctorsAppointment.length!=0 ? doctorsAppointment.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className="row">
                      <div className="col" style={{ textAlign: "center" }}>
                        <div>
                          <img
                            className="thumbnail"
                            src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                            alt="img"
                            style={{ width: "50px" }}
                          />
                        </div>
                        <div className="">
                          <div className="">
                            <p>
                              <h6>{appointment.doctorEmail}</h6>
                             
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{appointment.appointmentDate}</td>
                  <td style={tdStyle}>{appointment.bookedOn}</td>
                  <td style={tdStyle}>{appointment.startTime}</td>
                  <td style={tdStyle}>{appointment.endTime}</td>
                  <td style={tdStyle}>{appointment.appointmentStatus}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => {
                        cancelAppointment(appointment.position, appointment.appointmentId, appointment.scheduleId);
                      }}
                      className="btn btn-danger"
                      position={appointment.position}
                    >
                      Cancel
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <Link to="/callPatient">
                      {/* <button onClick={handleChatSubmit(appointment.appointmentId, appointment.patientEmail, appointment.doctorEmail)} className="btn btn-sm btn-warning">Chat</button> */}
                      <button onClick={() => {
                        localStorage.setItem('isUser', JSON.stringify("patient"));
                        localStorage.setItem('patientToCallEmail', JSON.stringify(appointment.patientEmail));
                        localStorage.setItem('doctorToCallEmail', JSON.stringify(appointment.doctorEmail));
                        localStorage.setItem('apptId', JSON.stringify(appointment.appointmentId));
                      }} className="btn btn-sm btn-warning">Chat</button>
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={tdStyle}>Nothing to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PatientAppointment;

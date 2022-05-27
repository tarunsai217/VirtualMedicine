import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from "sweetalert2";
import api from '../../../env';

//Style
import './DoctorProfile.css'
import Scheduler from './Schedulers';


// const host = "http://localhost:8080";
// const host2 = "http://localhost:8091"

export default function DoctorProfile(props) {

  const [startdate, setStartdate] = useState('');
  const [schedulerData, setSchedulerData] = useState([]);
  const [scheduleId, setScheduleId] = useState('');
  useEffect(()=> {
    getCurrentDate();
    getScheduleData(props.data.email);

  },[props])

  useEffect(() => {
  })
  const getScheduleData = async (email, date) => {
      const response = await fetch(`${api}/schedule/scheduleservice/api/v1/schedules/getScheduleByDoctorEmail/${email}`);
      const result = await response.json();
      console.log(result);
      if(result){
        const schudlerArray  = [];
        for(const data of result){
          // if(new Date(`${data.scheduleDate} ${data.endTime}`) >= new Date()){
            schudlerArray.push({ start_date:`${data.scheduleDate} ${data.startTime.substring(0, 5)}`, end_date:`${data.scheduleDate} ${data.endTime.substring(0, 5)}`, text: data.scheduleStatus, id: data.scheduleId})
          // }
        }
        setSchedulerData(schudlerArray);
      } 
  }


  function getCurrentDate () {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let todayDate = String(date.getDate()).padStart(2, 0);
    let currentDate = `${year}-${month}-${todayDate}`;
    setStartdate(currentDate);
  }
  
  const handleUpdate = (value) => {
    setScheduleId(value);
  }
  useEffect(()=> {
    console.log('working')
    let test = document.querySelectorAll('.dhx_cal_event');
    const id = scheduleId;
      console.log(test);
      for(let i =0 ; i< test.length; i++){
        if(test[i].ariaLabel !== 'BOOKED'){
          if ( test[i].outerHTML.substring(15,22) == id ) {
            test[i].children[1].classList.toggle("selected");
            test[i].children[2].classList.toggle("selected");
          } else {
            if(test[i].children[1].classList.contains('selected')){
              test[i].children[1].classList.toggle("selected");
              test[i].children[2].classList.toggle("selected");
            } else {
              test[i].classList.toggle("hidden")
            }
          }
        }
      }
  },[scheduleId])
  

  const handleSubmitEvent = async () => {
    if(scheduleId){
      const response = await fetch(`${api}/schedule/scheduleservice/api/v1/schedules/getScheduleById/${scheduleId}`);
      const result = await response.json();
      console.log(result);
      let myHeaders = new Headers();
      const getMailid = JSON.parse(localStorage.getItem("patientEmail"));
      myHeaders.append("Content-Type", "application/json");
      // need to pass patient email from local storage 
      // yet to be implemented
      let body  = JSON.stringify({
        "doctorEmail" :  result[0].doctorEmail,
        "patientEmail": getMailid,
        "appointmentDate" : result[0].scheduleDate,
        "startTime" : result[0].startTime,
        "endTime" : result[0].endTime,
        "scheduleId" : scheduleId,
        "specialization" : result[0].specialization
      });
      let body1 = JSON.stringify({
        "scheduleStatus" : "BOOKED"
      })
      let requestOptionsschedule = {
        method: 'PUT',
        headers: myHeaders,
        body: body1
      };
      const response1 = await fetch(`${api}/schedule/scheduleservice/api/v1/schedules/updateSchedule/${scheduleId}`, requestOptionsschedule)
      const result1 = await response1.json();
      
  
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body
      };
  
      fetch(`${api}/appointments/api/v1/appointments/appointment/`, requestOptions)
      .then(res => res.text())
      .then(result => {
        // console.log(result);
        Swal.fire(
          "Success!",
          "Appointment booked successfully!",
          "success"
        );        props.onHide();  
      })
      .catch(error => console.log(error));
    }

  };
  const checkScheduleData = schedulerData.length === 0 ? false : true;
  console.log(scheduleId)
  return (
    <div className='doctorProfileMain'>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Profile Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <div className="row">
            <div className="col-12 col-lg-2" style={{textAlign: "center"}}>
              <img src="/docIcon.png" className='modalImage' alt="docIcon" />
            </div>
            <div className="col-12 col-lg-10">
              <p>
                <strong>Name: </strong>{props.data.name}
              </p>
              <p>
                <strong>City: </strong>{props.data.city}
              </p>
              <p>
                <strong>Specialization: </strong>{props.data.specialization}
              </p>
              <p>
                <strong>Experience: </strong>{props.data.experience}
              </p>
            </div>
        </div>
            <div className="row">
            <div className='scheduler-container'>
             {checkScheduleData ? <Scheduler events={schedulerData} updateSchduleID = {handleUpdate}/> : <>No Schedules Created Yet</>} 
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            { scheduleId &&
                <button className='bookAppointment'  onClick={handleSubmitEvent}>Book Appointment</button> }
          </Modal.Footer>
        </Modal>
    </div>
  )
}

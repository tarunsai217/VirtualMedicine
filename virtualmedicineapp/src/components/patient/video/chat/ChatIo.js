import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import Chat from './Chat';
import './Chat.css'

const socket = io.connect('http://localhost:3030')
// const host = 'https://virtualmedicine.stackroute.io';

export default function ChatIo(props) {
  const [chatRoom, setChatRoom] = useState([]);
  const [isUser, setIsUser] = useState();

  const [patientEmail, setPatientEmail] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');

  const joinRoom = (id) => {
    if(id !== ''){
      socket.emit("chat", id);
    }
  }

  useEffect(() => {
    setPatientEmail(JSON.parse(localStorage.getItem('patientToCallEmail')));
    setDoctorEmail(JSON.parse(localStorage.getItem('doctorToCallEmail')));
    const apptId = JSON.parse(localStorage.getItem('apptId'));
    const pEmail = JSON.parse(localStorage.getItem('patientToCallEmail'));
    const dEmail = JSON.parse(localStorage.getItem('doctorToCallEmail'));
    const data = {
      "chatId": apptId,
      "doctorEmail": dEmail,
      "patientEmail": pEmail
    }
    setIsUser(JSON.parse(localStorage.getItem('isUser')));
    setChatRoom(data);
    joinRoom(data.chatId);
    // getRoomId(pEmail, dEmail, apptId);
  }, []);

  // const getRoomId = async (pEmail, dEmail, apptId) => {

  //   const response = await fetch(`${host}/chatservice/api/v1/chat/appointmentId/${apptId}`)
  //   console.log(response.status);
  //   if(response.status === 500 || response.status === 400){
  //     console.log('No room created');
  //     let myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     let body  = JSON.stringify({
  //       "appointmentId": apptId,
  //       "doctorEmail": dEmail,
  //       "patientEmail": pEmail,
  //     });
  //     let requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: body
  //     };
  //     fetch(`${host}/api/v1/chat`, requestOptions)
  //     .then(res => res.text())
  //     .then(result => {
  //       console.log(result);
  //       setChatRoom(result);
  //       console.log('Room Created successfully');
  //       joinRoom(result.chatId);
  //     })
  //     .catch(error => console.log(error));

  //   } else {
  //     const data = await response.json();
  //     console.log('Room exists!!')
  //     console.log(data);
  //     setChatRoom(data);
  //     joinRoom(data.chatId);
  //   }
  // }
  return (
    <div className='chatMain'>
      <Chat socket={socket} videoId={props.videoId} chatRoom={chatRoom} username={isUser === 'patient' ? patientEmail : doctorEmail} room={chatRoom.chatId}/>
    </div>
  )
}

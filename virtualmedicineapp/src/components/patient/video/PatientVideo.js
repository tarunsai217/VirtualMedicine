import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import './PatientVideo.css'
import ChatIo from "./chat/ChatIo"
import { Button, Card, Modal } from "react-bootstrap"


const socket = io.connect('http://localhost:5000');

export default function PatientVideo() {
  const [ patient, setPatient ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
  const [modalShow, setModalShow] = useState(false);
  const [isUser, setIsUser] = useState('');
  const [videoId, setVideoID] = useState('');
  const [sentVideoId, setSentVideoId ] = useState(false);
  
	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})
    
    getUser()
    
    socket.on("patient", (id) => {
			setPatient(id)
		})

		socket.on("callUser", (data) => {
      console.log(data);
			setReceivingCall(true);
      setModalShow(true);
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})

    setIsUser(JSON.parse(localStorage.getItem('isUser')));

	}, [])

  const getUser = () => {
    setIsUser(localStorage.getItem('isUser')); 
  }

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: patient,
				name:JSON.parse(localStorage.getItem('doctorEmail')) 
			})
		})

		peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
		})

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
    console.log('leavecall');
		setCallEnded(true)
		connectionRef.current.destroy()
    setSentVideoId(false)
	}
  console.log(patient);
  console.log(idToCall);


  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {name} is calling...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please Accept to Join the Call.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={answerCall}>Accept</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  return (
    <div>
      <div className="container">
        <div className="video-container">
          <div className="row">
            <div className="col-md-9" style={{ position: "relative"}}>
              <div className="video" style={{height:"80vh"}}>
                {!sentVideoId ?  <>
                {isUser === 'patient' ? 
                    <button id="videoId" variant="contained" color="primary" onClick={() => {setVideoID(patient); setSentVideoId(true)}}>
                    Please Click to send the Meeting Id
                  </button> 
                  : <></>}
                  {isUser !== 'patient' ?
                    <>
                    <Card id= "docVideoInput">
                        Please Enter the Meeting ID
                      <Card.Body>
                        <input type="text"
                          value={idToCall}
                          style={{textAlign: "center"}}
                          onChange={(e) => setIdToCall(e.target.value)}
                          placeholder = "Enter Room ID"
                        />
                      </Card.Body>
                    </Card>
                    </>
                  : <></>
                  }
                  </>
                : <>
                  {stream ? 
                    <video playsInline muted ref={myVideo} autoPlay className={callAccepted && !callEnded ? "userVideo" : "fullWidth" }  /> 
                  : <>Please Wait to Connect</>
                  }
                   <div className="video">
                    { callAccepted && !callEnded ?
                    <video playsInline ref={userVideo} autoPlay className={callAccepted && !callEnded ? "fullWidth" : "" } />:
                    null }
                  </div>
                  </>
                }
              </div>
             
              <div className="myId">
                  
                <div className="call-button">
                  {callAccepted && !callEnded ? (
                    <button className="callBtn" variant="contained" color="secondary" onClick={leaveCall}>
                      End Call
                    </button>
                  ) : (<>
                    {isUser !== 'patient' ? 
                      <button className={idToCall === '' ? "callBtn disabled" : "callBtn"} disabled={idToCall === '' ? true : false} color="primary" aria-label="call" onClick={() => {callUser(idToCall); setSentVideoId(true) }}>call</button>
                    : <></>
                    }
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3">
                <ChatIo videoId={isUser === 'patient' ? videoId : null } />              
            </div>
          </div>
        </div>
        
        <div>
          {receivingCall && !callAccepted ? (
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            //   <div className="caller">
            //   <h1 >{name} is calling...</h1>
            //   <button variant="contained" color="primary" onClick={answerCall}>
            //     Answer
            //   </button>
            // </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

// const host = 'https://virtualmedicine.stackroute.io'

export default function Chat({socket, username, chatRoom, videoId, room}) {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  
  const [isUser, setIsUser] = useState('');

  useEffect(() => {
    setIsUser(JSON.parse(localStorage.getItem('isUser')));
  })

  useEffect(() => {
    updateVideoId();
  }, [videoId])

  const updateVideoId = async () => {
    console.log('videoID: ' +videoId);
    if(videoId !== null && videoId !== ''){
      const messageData = {
        room: room,
        name: username,
        message: videoId,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  }

  const sendMessage = async () => {
    // console.log(isUser);
    if(currentMessage !== ''){
      const messageData = {
        room: room,
        name: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      console.log(messageData);
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      
      // let myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      //   const body  = JSON.stringify({
      //     "content": currentMessage,
      //     "sender": isUser === 'patient' ? chatRoom.patientEmail:chatRoom.doctorEmail,
      //     "receiver": isUser === 'patient' ? chatRoom.doctorEmail:chatRoom.patientEmail,
      //   });
      //   let requestOptions = {
      //     method: 'PUT',
      //     headers: myHeaders,
      //     body: body
      //   };
      //   fetch(`${host}/chatservice/api/v1/chat/chatId/${chatRoom.chatId}`, requestOptions)
      //   .then(res => res.text())
      //   .then(result => {
      //     console.log(result);
      //     console.log('Message updated successfully');
      //   })
      //   .catch(error => console.log(error));
      

    };
  }

  

  useEffect(()=> {
    socket.removeAllListeners()
    socket.on("recive_message", (data) => {
      setMessageList((list)=> [...list, data]);
    });

  },[socket])
  // console.log();
  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.name ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input 
        type="text" 
        value={currentMessage} 
        placeholder='Type your messages...' 
        onChange={(e) => setCurrentMessage(e.target.value)} 
        onKeyPress= {(e) => {
          e.key === "Enter" && sendMessage();
        }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

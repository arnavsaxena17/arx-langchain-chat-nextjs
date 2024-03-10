import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import MessageWindow from '../components/MessageWindow'; // Ensure this is the correct path
import { startSchedulingAgent } from '@/services/scheduler/schedulingAgent';
import { io } from 'socket.io-client';
interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}
startSchedulingAgent();

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = io(); // Assuming the server is running on the same host and port

    socket.on('chatResponse', (data) => {
      setResponse(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io('http://localhost:3000');
    socket.emit('message', { text: message });
    setMessage('');
  };
 
  return (
    <>
      <TopBar />
      <div style={{ display: 'flex' }}>
        <MessageWindow />
        <MessageWindow />
      </div>
      <div>
        <h2>Chat Component</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <p>Response: {response}</p>
      </div>
    </>
  );
}

import React from 'react';
import TopBar from '../components/TopBar';
import MessageWindow from '../components/MessageWindow'; // Ensure this is the correct path
import { startSchedulingAgent } from '@/services/scheduler/schedulingAgent';
interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}
startSchedulingAgent();

export default function Home() {
 
  return (
    <>
      <TopBar />
      <div style={{ display: 'flex' }}>
        <MessageWindow />
        <MessageWindow />
      </div>
    </>
  );
}

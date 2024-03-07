import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';

import MessageWindow from '../components/MessageWindow'; // Ensure this is the correct path

import styles from '../styles/Home.module.css';

interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}

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

import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import {MessageDisplay} from '../components/MessageDisplay'; // Ensure this is the correct path
import {MessageInput} from '../components/MessageInput'; // Ensure this is the correct path
import styles from '../styles/Home.module.css';

interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}

export default function MessageWindow() {
  const [userInput, setUserInput] = useState<string>("");
  const [history, setHistory] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([{ "message": "Hi there! How can I help?", "type": "apiMessage" }]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === "") { return; }
    

  const handleError = () => {
    setMessages((prevMessages) => [...prevMessages, { "message": "Oops! There seems to be an error. Please try again.", "type": "apiMessage" }]);
    setLoading(false);
    setUserInput("");
  }
    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { "message": userInput, "type": "userMessage" }]);

    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ question: userInput, history: history }), });
    if (!response.ok) { handleError(); return; }

    setUserInput("");
    const data = await response.json();

    if (data.result.error === "Unauthorized") { handleError(); return; }

    setMessages((prevMessages) => [...prevMessages, { "message": data.result, "type": "apiMessage" }]);
    setLoading(false);

  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid newline on enter press
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  useEffect(() => {
    // Update history or perform other side effects when messages change
    if (messages.length >= 3) {
      setHistory([[messages[messages.length - 2].message, messages[messages.length - 1].message]]);
    }
  }, [messages]);

  return (
    <>
      <main className={styles.main}>
        <MessageDisplay messages={messages} loading={loading} />
        <MessageInput userInput={userInput} setUserInput={setUserInput} handleSubmit={handleSubmit} handleEnter={handleEnter} loading={loading} />
      </main>
    </>
  );
}

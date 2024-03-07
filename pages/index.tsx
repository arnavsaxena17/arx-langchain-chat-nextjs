import { useState, useRef, useEffect, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
// import styles from '../styles/Home.module.css';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import Head from 'next/head';

interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [history, setHistory] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([{ "message": "Hi there! How can I help?", "type": "apiMessage" }]);

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => { 
    const messageList = messageListRef.current; 
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  // Focus on text field on load
  useEffect(() => { 
    const textArea = textAreaRef.current; 
    if (textArea) {
      textArea.focus(); 
    }
  }, []);

  const handleError = () => {
    setMessages((prevMessages) => [...prevMessages, { "message": "Oops! There seems to be an error. Please try again.", "type": "apiMessage" }]);
    setLoading(false);
    setUserInput("");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === "") { return; }

    setLoading(true);
    setMessages((prevMessages) => [...prevMessages, { "message": userInput, "type": "userMessage" }]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userInput, history: history }),
    });

    if (!response.ok) { handleError(); return; }

    setUserInput("");
    const data = await response.json();

    if (data.result.error === "Unauthorized") { handleError(); return; }

    setMessages((prevMessages) => [...prevMessages, { "message": data.result, "type": "apiMessage" }]);
    setLoading(false);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && userInput) {
      handleSubmit(e as unknown as FormEvent);
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (messages.length >= 3) {
      setHistory([[messages[messages.length - 2].message, messages[messages.length - 1].message]]);
    }
  }, [messages]);

  return (
    <>


      <Head>
        <title>LangChain Chat</title>
        <meta name="description" content="LangChain documentation chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topnav}>
        <div className={styles.navlogo}>
          <a href="/">LangChain</a>
        </div>
        <div className={styles.navlinks}>
          <a href="https://langchain.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="https://github.com/zahidkhawaja/langchain-chat-nextjs" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => (
              <div key={index} className={message.type === "userMessage" && loading && index === messages.length - 1 ? styles.usermessagewaiting : message.type === "apiMessage" ? styles.apimessage : styles.usermessage}>
                {message.type === "apiMessage" ? <Image src="/parroticon.png" alt="AI" width="30" height="30" className={styles.boticon} priority={true} /> : <Image src="/usericon.png" alt="Me" width="30" height="30" className={styles.usericon} priority={true} />}
                <div className={styles.markdownanswer}>
                  <ReactMarkdown linkTarget={"_blank"}>{message.message}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea disabled={loading} onKeyDown={handleEnter} ref={textAreaRef} autoFocus={false} rows={1} maxLength={512} type="text" id="userInput" name="userInput" placeholder={loading ? "Waiting for response..." : "Type your question..."} value={userInput} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)} className={styles.textarea} />
              <button type="submit" disabled={loading} className={styles.generatebutton}>
                {loading ? <div className={styles.loadingwheel}><CircularProgress color="inherit" size={20} /></div> : 
                  <svg viewBox='0 0 20 20' className={styles.svgicon} xmlns='http://www.w3.org/2000/svg'><path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path></svg>}
              </button>
            </form>
          </div>
          <div className={styles.footer}>
            <p>Powered by <a href="https://github.com/hwchase17/langchain" target="_blank" rel="noopener noreferrer">LangChain</a>. Built by <a href="https://twitter.com/chillzaza_" target="_blank" rel="noopener noreferrer">Zahid</a>.</p>
          </div>
        </div>
      </main>
    </>
  )
}

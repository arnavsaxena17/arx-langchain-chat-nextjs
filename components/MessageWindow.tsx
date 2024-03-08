import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import {MessageDisplay} from '../components/MessageDisplay'; // Ensure this is the correct path
import {MessageInput} from '../components/MessageInput'; // Ensure this is the correct path
import styles from '../styles/Home.module.css';
import { Console } from 'console';

interface Message {
  message: string;
  type: 'apiMessage' | 'userMessage';
}

export default function MessageWindow() {

    const [submitButtonRef, setSubmitButtonRef] = useState(null); // State to hold the submit button ref


    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([{ "message": "Hi there! How can I help?", "type": "apiMessage" }]);
    const [promptIndex, setPromptIndex] = useState(0);
    const prompts = ['Prompt 1', 'Prompt 2', 'Prompt 3'];
    
    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Handle Submit called");
        e.preventDefault();
        console.log("userInput:",userInput);
        if (userInput.trim() === "") { return; }
        console.log("Got here");
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

    const cycleThroughPrompts = async () => {
        console.log('Panda Button Clicked');
        console.log("This is the prompt index being started cycle through prompts", promptIndex);
        setPromptIndex(prevIndex => prevIndex + 1);
    }

    useEffect(() => {
        console.log("This is the prompt index inside cycle prompts functions", promptIndex);
        console.log("GOing to set user input of prompts[promptIndex]", prompts[promptIndex-1]);
        const cyclePrompts = async () => {
            if (promptIndex !== 0 && promptIndex <= prompts.length) {
                setUserInput(prompts[promptIndex-1]); // Set the user input to the current prompt
                console.log("submitButtonRef:",submitButtonRef);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (submitButtonRef) {
                    console.log("Going toclicks");
                    // debugger
                    (submitButtonRef as any).current.click(); // Use the ref to click the button
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setPromptIndex(prevIndex => prevIndex + 1);
            }
            else{
                setUserInput("");
            }

        }
        cyclePrompts()
        
        
    }, [promptIndex]);

    return (
        <>
        <main className={styles.main}>
            <MessageDisplay messages={messages} loading={loading} />
            <MessageInput userInput={userInput} setUserInput={setUserInput} handleSubmit={handleSubmit} handleEnter={handleEnter} loading={loading} setSubmitButtonRef={setSubmitButtonRef} />
            <button style={{ justifyContent: 'center', marginTop:50, textAlign: 'center', alignItems: 'center' }} onClick={cycleThroughPrompts}>Panda Button</button>

        </main>
        </>
    );
}

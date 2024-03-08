import CircularProgress from '@mui/material/CircularProgress';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { log } from 'console';


export const MessageInput = ({ userInput, setUserInput, handleSubmit, handleEnter, loading, setSubmitButtonRef}) => {
  const submitButtonRef = useRef(null); // Create a ref for the submit button

  // Pass the ref up to the parent component once it's set (i.e., after the component has mounted)
  useEffect(() => {
    setSubmitButtonRef(submitButtonRef);
  }, [submitButtonRef, setSubmitButtonRef]);



  return (
    <div className={styles.center}>
      <div className={styles.cloudform}>
        <form onSubmit={handleSubmit}>
          <textarea disabled={loading} onKeyDown={handleEnter} autoFocus={false} rows={1} maxLength={512} id="userInput" name="userInput" placeholder={loading ? "Waiting for response..." : "Type your question..."} value={userInput} onChange={(e) => setUserInput(e.target.value)} className={styles.textarea} />
          <button ref={submitButtonRef} type="submit" disabled={loading} className={styles.generatebutton}>
            {loading ? <div className={styles.loadingwheel}><CircularProgress color="inherit" size={20} /></div> : 
              <svg viewBox='0 0 20 20' className={styles.svgicon} xmlns='http://www.w3.org/2000/svg'><path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path></svg>}
          </button>
        </form>
      </div>
    </div>
  );
};
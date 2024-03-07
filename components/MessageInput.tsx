import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../styles/Home.module.css';




const cycleThroughPrompts = async () => {
  console.log('Panda Button Clicked');
  const prompts = ['Prompt 1', 'Prompt 2', 'Prompt 3']; // Array of prompts

  for (let i = 0; i < prompts.length; i++) {
    // setUserInput(prompts[i]); // Set the current prompt as the user input
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click(); // Click the submit button
    }
  }
};





export const MessageInput = ({ userInput, setUserInput, handleSubmit, handleEnter, loading }) => {
  return (
    <div className={styles.center}>
      <div className={styles.cloudform}>
        <form onSubmit={handleSubmit}>
          <textarea disabled={loading} onKeyDown={handleEnter} autoFocus={false} rows={1} maxLength={512} id="userInput" name="userInput" placeholder={loading ? "Waiting for response..." : "Type your question..."} value={userInput} onChange={(e) => setUserInput(e.target.value)} className={styles.textarea} />
          <button type="submit" disabled={loading} className={styles.generatebutton}>
            {loading ? <div className={styles.loadingwheel}><CircularProgress color="inherit" size={20} /></div> : 
              <svg viewBox='0 0 20 20' className={styles.svgicon} xmlns='http://www.w3.org/2000/svg'><path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path></svg>}
          </button>
        </form>
      </div>
      {/* <button style={{ justifyContent: 'center', marginTop:50, textAlign: 'center', alignItems: 'center' }} onClick={cycleThroughPrompts}>Panda Button</button> */}
    </div>
  );
};



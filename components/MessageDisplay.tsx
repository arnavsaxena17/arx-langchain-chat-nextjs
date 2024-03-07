import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css';

export const MessageDisplay = ({ messages, loading }) => {
  return (
    <div className={styles.cloud}>
      <div className={styles.messagelist}>
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
  );
};

;

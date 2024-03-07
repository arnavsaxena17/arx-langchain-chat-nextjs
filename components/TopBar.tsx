import Document, { Html,  Main, NextScript } from 'next/document';
import React from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function TopBar() {
    return (
        <>
        <Head>
            <title>LangChain Chat</title>
            <meta name="description" content="LangChain documentation chatbot" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head><div className={styles.topnav}>
        <div className={styles.navlogo}>
            <a href="/">LangChain</a>
        </div>
        <div className={styles.navlinks}>
            <a href="https://langchain.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">Docs</a>
            <a href="https://github.com/zahidkhawaja/langchain-chat-nextjs" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
            
        </div>
        </>
    );
  }


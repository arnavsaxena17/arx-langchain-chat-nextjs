import Document, { Html,  Main, NextScript } from 'next/document';
import React from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function TopBar() {
    return (
        <>
        <Head>
            <title>Arx Chat</title>
            <meta name="description" content="Arxena recruitment chatbot" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.topnav}>
            <div className={styles.navlogo}>
                <a href="/">ArxChat</a>
            </div>
            <div className={styles.navlinks}>
                <a href="https://localhost:5050/" target="_blank" rel="noopener noreferrer">Arxena Site</a>
            </div>
        </div>
        </>
    );
  }


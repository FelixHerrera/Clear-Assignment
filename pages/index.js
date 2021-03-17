import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clear Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Felix Herrera assignment
        </h1>

        <div className={styles.grid}>
          <Link href="/organizations">
            <a href="/organizations" className={styles.card}>
              <h3>Organizations &rarr;</h3>
            </a>
          </Link>

          <Link href="/members">
            <a href="/members" className={styles.card}>
              <h3>Members &rarr;</h3>
            </a>
          </Link>

          <Link href="/members/managers">
            <a href="/members/managers" className={styles.card}>
              <h3>Managers &rarr;</h3>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import styles from './styles.module.css';

function Loading() {
  return (
    <>
    <main className={styles.container}>
      <h1 className={styles.loading}>
        LOADING...
      </h1>
    </main>
  </>
  )
}

export default Loading;
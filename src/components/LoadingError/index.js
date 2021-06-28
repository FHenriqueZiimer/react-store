import React from 'react';
import styles from './styles.module.css';

function LoadingError() {
  return (
    <>
    <main className={styles.container}>
      <h1 className={styles.h1Error}>
        Ops...<br></br>Algum erro foi ocorrido. Por favor tente mais tarde
      </h1>
    </main>
  </>
  )
}

export default LoadingError;
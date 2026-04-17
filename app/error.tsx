'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.text}>
          We couldn’t load this page. Please try again in a moment.
        </p>
        <button type="button" className={styles.button} onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}

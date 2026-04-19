import Link from "next/link";
import styles from "./error.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className={styles.button}>
          Go home
        </Link>
      </div>
    </section>
  );
}

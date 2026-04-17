import Link from 'next/link';
import styles from '../../error.module.css';

export default function CamperNotFound() {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Camper not found</h1>
        <p className={styles.text}>
          This camper doesn’t exist or has been removed from the catalog.
        </p>
        <Link href="/catalog" className={styles.button}>
          Back to catalog
        </Link>
      </div>
    </section>
  );
}

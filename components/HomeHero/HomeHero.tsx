import Link from 'next/link';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 id="home-hero-title" className={styles.title}>
          Campers of your dreams
        </h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={styles.cta}>
          View Now
        </Link>
      </div>
    </section>
  );
}

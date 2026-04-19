import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.root}>
      <Image
        src="/logo.svg"
        alt="TravelTrucks"
        width={136}
        height={16}
        className={styles.svg}
        priority
        unoptimized
      />
    </Link>
  );
}

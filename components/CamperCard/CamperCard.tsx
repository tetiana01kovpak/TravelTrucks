import Link from "next/link";
import type { Camper } from "@/types/camper";
import RatingInline from "@/components/RatingInline/RatingInline";
import FeatureBadges from "@/components/FeatureBadges/FeatureBadges";
import { formatPrice } from "@/lib/format/price";
import styles from "./CamperCard.module.css";

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const description = camper.description;
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={camper.coverImage}
          alt={camper.name}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <header className={styles.header}>
            <h2 className={styles.title}>{camper.name}</h2>
            <span className={styles.price}>{formatPrice(camper.price)}</span>
          </header>

          <RatingInline
            rating={camper.rating}
            totalReviews={camper.totalReviews}
            location={camper.location}
          />
        </div>

        {description && <p className={styles.description}>{description}</p>}

        <FeatureBadges camper={camper} max={6} className={styles.badges} />

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}

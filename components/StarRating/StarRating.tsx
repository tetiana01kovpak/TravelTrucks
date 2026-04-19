import { FaStar } from "react-icons/fa";
import styles from "./StarRating.module.css";

type StarRatingProps = {
  value: number;
  outOf?: number;
  ariaLabel?: string;
};

export default function StarRating({
  value,
  outOf = 5,
  ariaLabel,
}: StarRatingProps) {
  const rounded = Math.max(0, Math.min(outOf, Math.round(value)));
  const label =
    ariaLabel ?? `Rating: ${value.toFixed(1)} out of ${outOf} stars`;

  return (
    <span className={styles.row} role="img" aria-label={label}>
      {Array.from({ length: outOf }).map((_, index) => (
        <FaStar
          key={index}
          aria-hidden="true"
          className={index < rounded ? styles.filled : styles.empty}
        />
      ))}
    </span>
  );
}

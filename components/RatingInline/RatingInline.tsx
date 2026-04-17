import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import styles from './RatingInline.module.css';

type RatingInlineProps = {
  rating: number;
  totalReviews: number;
  location: string;
  underline?: boolean;
};

export default function RatingInline({
  rating,
  totalReviews,
  location,
  underline = true,
}: RatingInlineProps) {
  return (
    <div className={styles.row}>
      <span className={styles.item}>
        <FaStar aria-hidden="true" className={styles.star} />
        <span className={underline ? styles.underline : undefined}>
          {rating.toFixed(1)}({totalReviews}{' '}
          {totalReviews === 1 ? 'Review' : 'Reviews'})
        </span>
      </span>
      <span className={styles.item}>
        <FiMapPin aria-hidden="true" className={styles.pin} />
        <span>{location}</span>
      </span>
    </div>
  );
}

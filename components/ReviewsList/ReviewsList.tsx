import type { Review } from '@/types/camper';
import StarRating from '@/components/StarRating/StarRating';
import styles from './ReviewsList.module.css';

type ReviewsListProps = {
  reviews: Review[];
};

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className={styles.empty}>
        No reviews yet. Be the first to share your experience.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.card}>
          <header className={styles.header}>
            <span className={styles.avatar} aria-hidden="true">
              {initial(review.reviewer_name)}
            </span>
            <div className={styles.person}>
              <p className={styles.name}>{review.reviewer_name}</p>
              <StarRating
                value={review.reviewer_rating}
                ariaLabel={`${review.reviewer_name} rated ${review.reviewer_rating} out of 5`}
              />
            </div>
          </header>
          <p className={styles.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

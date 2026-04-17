'use client';

import Loader from '@/components/Loader/Loader';
import styles from './LoadMoreButton.module.css';

type LoadMoreButtonProps = {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
};

export default function LoadMoreButton({
  onClick,
  loading,
  disabled,
}: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader size="sm" />
          <span>Loading…</span>
        </>
      ) : (
        'Load more'
      )}
    </button>
  );
}

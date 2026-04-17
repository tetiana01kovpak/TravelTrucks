import clsx from 'clsx';
import styles from './Loader.module.css';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
  label?: string;
};

export default function Loader({
  size = 'md',
  overlay = false,
  label = 'Loading',
}: LoaderProps) {
  const spinner = (
    <span
      className={clsx(styles.spinner, styles[size])}
      role="status"
      aria-label={label}
    />
  );

  if (overlay) {
    return <div className={styles.overlay}>{spinner}</div>;
  }
  return spinner;
}

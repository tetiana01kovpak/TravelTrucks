'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';
import { useCampersInfinite } from '@/hooks/useCampersInfinite';
import { parseFilters } from '@/lib/filters/searchParams';
import styles from './CatalogView.module.css';

export default function CatalogView() {
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFilters(searchParams),
    [searchParams]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
  } = useCampersInfinite(filters);

  if (isLoading) {
    return (
      <div className={styles.state}>
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.state}>
        <p className={styles.errorMsg}>
          Couldn’t load campers: {(error as Error)?.message || 'Unknown error'}.
        </p>
        <button
          type="button"
          className={styles.retry}
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];
  const total = data?.pages[0]?.total ?? campers.length;

  if (campers.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.emptyMsg}>
          No campers match your filters. Try clearing a filter or changing your
          search.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.count} aria-live="polite">
        Showing {campers.length} of {total} campers
      </p>
      <ul className={styles.list}>
        {campers.map((camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div className={styles.footer}>
          <LoadMoreButton
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            disabled={isFetching && !isFetchingNextPage}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import CamperCard from '@/components/CamperCard/CamperCard';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import Loader from '@/components/Loader/Loader';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';
import { useCampersInfinite } from '@/hooks/useCampersInfinite';
import type { FilterValues } from '@/types/camper';
import styles from './CatalogView.module.css';

type CatalogViewProps = {
  initialFilters: FilterValues;
};

export default function CatalogView({ initialFilters }: CatalogViewProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

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

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];
  const total = data?.pages[0]?.total ?? campers.length;

  return (
    <div className={styles.layout}>
      <FilterPanel initialValues={filters} onApply={setFilters} />
      <div className={styles.results}>
        {isLoading ? (
          <div className={styles.state}>
            <Loader size="lg" />
          </div>
        ) : isError ? (
          <div className={styles.state}>
            <p className={styles.errorMsg}>
              Couldn’t load campers:{' '}
              {(error as Error)?.message || 'Unknown error'}.
            </p>
            <button
              type="button"
              className={styles.retry}
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : campers.length === 0 ? (
          <div className={styles.state}>
            <p className={styles.emptyMsg}>
              No campers match your filters. Try clearing a filter or changing
              your search.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

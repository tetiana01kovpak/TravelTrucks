import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import FilterPanel from '@/components/FilterPanel/FilterPanel';
import Loader from '@/components/Loader/Loader';
import { fetchCampers } from '@/lib/api/campers';
import { parseFilters } from '@/lib/filters/searchParams';
import { PER_PAGE } from '@/lib/filters/schema';
import { getQueryClient } from '@/lib/query/getQueryClient';
import { campersListKey } from '@/lib/query/keys';
import CatalogView from './CatalogView';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse every camper in the TravelTrucks catalog and filter by location, vehicle type, engine and transmission.',
};

type CatalogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolved = await searchParams;
  const filters = parseFilters(resolved);

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: campersListKey(filters),
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <FilterPanel />
        <div className={styles.results}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense
              fallback={
                <div className={styles.suspense}>
                  <Loader size="lg" />
                </div>
              }
            >
              <CatalogView />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </section>
  );
}

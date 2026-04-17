'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/campers';
import { PER_PAGE } from '@/lib/filters/schema';
import { campersListKey } from '@/lib/query/keys';
import type { FilterValues } from '@/types/camper';

export function useCampersInfinite(filters: FilterValues) {
  return useInfiniteQuery({
    queryKey: campersListKey(filters),
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (last, pages) =>
      pages.length < last.totalPages ? pages.length + 1 : undefined,
    staleTime: 60 * 1000,
  });
}

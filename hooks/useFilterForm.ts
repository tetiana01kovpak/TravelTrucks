'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
  FilterValues,
} from '@/types/camper';
import {
  filtersEqual,
  parseFilters,
  serializeFilters,
} from '@/lib/filters/searchParams';

export type UseFilterFormReturn = {
  pending: FilterValues;
  committed: FilterValues;
  hasUncommitted: boolean;
  hasAnyFilter: boolean;
  setLocation: (value: string) => void;
  toggleForm: (value: CamperForm) => void;
  toggleEngine: (value: CamperEngine) => void;
  toggleTransmission: (value: CamperTransmission) => void;
  onSearch: () => void;
  onClear: () => void;
};

export function useFilterForm(): UseFilterFormReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const committed = useMemo(
    () => parseFilters(searchParams),
    [searchParams]
  );
  const committedKey = serializeFilters(committed);

  const [pending, setPending] = useState<FilterValues>(committed);
  const [lastCommittedKey, setLastCommittedKey] = useState(committedKey);

  if (committedKey !== lastCommittedKey) {
    setLastCommittedKey(committedKey);
    setPending(committed);
  }

  const setLocation = useCallback((value: string) => {
    setPending((prev) => ({ ...prev, location: value }));
  }, []);

  const toggleForm = useCallback((value: CamperForm) => {
    setPending((prev) => ({
      ...prev,
      form: prev.form === value ? undefined : value,
    }));
  }, []);

  const toggleEngine = useCallback((value: CamperEngine) => {
    setPending((prev) => ({
      ...prev,
      engine: prev.engine === value ? undefined : value,
    }));
  }, []);

  const toggleTransmission = useCallback((value: CamperTransmission) => {
    setPending((prev) => ({
      ...prev,
      transmission: prev.transmission === value ? undefined : value,
    }));
  }, []);

  const onSearch = useCallback(() => {
    const next: FilterValues = {
      ...pending,
      location: pending.location?.trim() || undefined,
    };
    const qs = serializeFilters(next);
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }, [pending, router, pathname]);

  const onClear = useCallback(() => {
    setPending({});
    router.push(pathname);
  }, [router, pathname]);

  const hasUncommitted = !filtersEqual(
    {
      ...pending,
      location: pending.location?.trim() || undefined,
    },
    committed
  );

  const hasAnyFilter =
    Boolean(committed.location) ||
    Boolean(committed.form) ||
    Boolean(committed.engine) ||
    Boolean(committed.transmission) ||
    Boolean(pending.location?.trim()) ||
    Boolean(pending.form) ||
    Boolean(pending.engine) ||
    Boolean(pending.transmission);

  return {
    pending,
    committed,
    hasUncommitted,
    hasAnyFilter,
    setLocation,
    toggleForm,
    toggleEngine,
    toggleTransmission,
    onSearch,
    onClear,
  };
}

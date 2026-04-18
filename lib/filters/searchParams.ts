import type { FilterValues } from '@/types/camper';
import {
  isCamperEngine,
  isCamperForm,
  isCamperTransmission,
} from './schema';

type ReadonlySearchParams = Pick<URLSearchParams, 'get'>;

export function parseFilters(
  params: ReadonlySearchParams | Record<string, string | string[] | undefined>
): FilterValues {
  const get = (key: string): string | undefined => {
    if (params && typeof (params as ReadonlySearchParams).get === 'function') {
      return (params as ReadonlySearchParams).get(key) ?? undefined;
    }
    const raw = (params as Record<string, string | string[] | undefined>)[key];
    if (Array.isArray(raw)) return raw[0];
    return raw;
  };

  const result: FilterValues = {};

  const location = get('location')?.trim();
  if (location) result.location = location;

  const form = get('form');
  if (form && isCamperForm(form)) result.form = form;

  const engine = get('engine');
  if (engine && isCamperEngine(engine)) result.engine = engine;

  const transmission = get('transmission');
  if (transmission && isCamperTransmission(transmission)) {
    result.transmission = transmission;
  }

  return result;
}

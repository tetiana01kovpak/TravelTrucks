import { cache } from 'react';
import { api } from './client';
import type {
  BookingPayload,
  BookingResponse,
  CamperDetail,
  CamperListResponse,
  FilterValues,
  Review,
} from '@/types/camper';

export type FetchCampersParams = FilterValues & {
  page?: number;
  perPage?: number;
};

export async function fetchCampers(
  params: FetchCampersParams
): Promise<CamperListResponse> {
  const query: Record<string, string | number> = {
    page: params.page ?? 1,
    perPage: params.perPage ?? 4,
  };
  if (params.location) query.location = params.location;
  if (params.form) query.form = params.form;
  if (params.engine) query.engine = params.engine;
  if (params.transmission) query.transmission = params.transmission;

  const { data } = await api.get<CamperListResponse>('/campers', {
    params: query,
  });
  return data;
}

export const fetchCamperById = cache(
  async (camperId: string): Promise<CamperDetail> => {
    const { data } = await api.get<CamperDetail>(`/campers/${camperId}`);
    return data;
  }
);

export const fetchCamperReviews = cache(
  async (camperId: string): Promise<Review[]> => {
    const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
    return data;
  }
);

export async function postBooking(
  camperId: string,
  payload: BookingPayload
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    payload
  );
  return data;
}

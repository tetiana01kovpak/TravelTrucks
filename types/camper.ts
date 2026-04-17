export type CamperForm =
  | 'alcove'
  | 'panel_van'
  | 'integrated'
  | 'semi_integrated';

export type CamperTransmission = 'automatic' | 'manual';

export type CamperEngine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export type CamperAmenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[];
  coverImage: string;
  totalReviews: number;
  description?: string;
};

export type CamperListResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
};

export type GalleryImage = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type CamperDetail = Camper & {
  description: string;
  gallery: GalleryImage[];
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
};

export type FilterValues = {
  location?: string;
  form?: CamperForm;
  engine?: CamperEngine;
  transmission?: CamperTransmission;
};

export type BookingPayload = {
  name: string;
  email: string;
};

export type BookingResponse = {
  message: string;
};

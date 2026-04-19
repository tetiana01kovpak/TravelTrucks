import type { FilterValues } from "@/types/camper";

export const campersListKey = (filters: FilterValues) =>
  [
    "campers",
    "list",
    {
      location: filters.location ?? "",
      form: filters.form ?? "",
      engine: filters.engine ?? "",
      transmission: filters.transmission ?? "",
    },
  ] as const;

export const camperDetailKey = (id: string) =>
  ["campers", "detail", id] as const;

export const camperReviewsKey = (id: string) =>
  ["campers", "reviews", id] as const;

import type {
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from "@/types/camper";

export const PER_PAGE = 4;

export const FORM_VALUES: readonly CamperForm[] = [
  "alcove",
  "panel_van",
  "integrated",
  "semi_integrated",
] as const;

export const ENGINE_VALUES: readonly CamperEngine[] = [
  "diesel",
  "petrol",
  "hybrid",
  "electric",
] as const;

export const TRANSMISSION_VALUES: readonly CamperTransmission[] = [
  "automatic",
  "manual",
] as const;

export const FORM_LABELS: Record<CamperForm, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

export const ENGINE_LABELS: Record<CamperEngine, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

export const TRANSMISSION_LABELS: Record<CamperTransmission, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

export function isCamperForm(value: string): value is CamperForm {
  return (FORM_VALUES as readonly string[]).includes(value);
}

export function isCamperEngine(value: string): value is CamperEngine {
  return (ENGINE_VALUES as readonly string[]).includes(value);
}

export function isCamperTransmission(
  value: string,
): value is CamperTransmission {
  return (TRANSMISSION_VALUES as readonly string[]).includes(value);
}

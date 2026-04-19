"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import MapIcon from "@/components/icons/MapIcon";
import {
  ENGINE_LABELS,
  ENGINE_VALUES,
  FORM_LABELS,
  FORM_VALUES,
  TRANSMISSION_LABELS,
  TRANSMISSION_VALUES,
  isCamperEngine,
  isCamperForm,
  isCamperTransmission,
} from "@/lib/filters/schema";
import type { FilterValues } from "@/types/camper";
import styles from "./FilterPanel.module.css";

type FilterPanelProps = {
  initialValues: FilterValues;
  onApply: (filters: FilterValues) => void;
};

export default function FilterPanel({
  initialValues,
  onApply,
}: FilterPanelProps) {
  const [values, setValues] = useState<FilterValues>(initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      ...values,
      location: values.location?.trim() || undefined,
    });
  };

  const handleReset = () => {
    setValues({});
    onApply({});
  };

  const handleRadioChange = (name: keyof FilterValues, raw: string) => {
    setValues((prev) => {
      const next = { ...prev };
      if (name === "form" && isCamperForm(raw)) next.form = raw;
      if (name === "engine" && isCamperEngine(raw)) next.engine = raw;
      if (name === "transmission" && isCamperTransmission(raw)) {
        next.transmission = raw;
      }
      return next;
    });
  };

  const hasAnyFilter = Boolean(
    values.location?.trim() ||
    values.form ||
    values.engine ||
    values.transmission,
  );

  return (
    <aside aria-label="Catalog filters">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div className={styles.field}>
            <label htmlFor="location" className={styles.fieldLabel}>
              Location
            </label>
            <div className={styles.locationWrap}>
              <MapIcon aria-hidden="true" className={styles.locationIcon} />
              <input
                id="location"
                name="location"
                type="text"
                className={styles.locationInput}
                placeholder="City"
                value={values.location ?? ""}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className={styles.filtersBlock}>
            <h2 className={styles.heading}>Filters</h2>

            <RadioGroup
              legend="Camper form"
              name="form"
              options={FORM_VALUES}
              labels={FORM_LABELS}
              selected={values.form}
              onChange={(v) => handleRadioChange("form", v)}
            />

            <RadioGroup
              legend="Engine"
              name="engine"
              options={ENGINE_VALUES}
              labels={ENGINE_LABELS}
              selected={values.engine}
              onChange={(v) => handleRadioChange("engine", v)}
            />

            <RadioGroup
              legend="Transmission"
              name="transmission"
              options={TRANSMISSION_VALUES}
              labels={TRANSMISSION_LABELS}
              selected={values.transmission}
              onChange={(v) => handleRadioChange("transmission", v)}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
          {hasAnyFilter && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleReset}
            >
              <FiX aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
      </form>
    </aside>
  );
}

type RadioGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: readonly T[];
  labels: Record<T, string>;
  selected: T | undefined;
  onChange: (value: string) => void;
};

function RadioGroup<T extends string>({
  legend,
  name,
  options,
  labels,
  selected,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupLabel}>{legend}</legend>
      <ul className={styles.optionList}>
        {options.map((value) => {
          const id = `${name}-${value}`;
          return (
            <li key={value} className={styles.optionItem}>
              <input
                id={id}
                className={styles.radio}
                type="radio"
                name={name}
                value={value}
                checked={selected === value}
                onChange={(event) => onChange(event.target.value)}
              />
              <label htmlFor={id} className={styles.optionLabel}>
                {labels[value]}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

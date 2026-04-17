'use client';

import { FiMapPin, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import type { ReactElement } from 'react';
import {
  LuCompass,
  LuGrid2X2,
  LuMap,
  LuCaravan,
} from 'react-icons/lu';
import {
  ENGINE_LABELS,
  ENGINE_VALUES,
  FORM_LABELS,
  FORM_VALUES,
  TRANSMISSION_LABELS,
  TRANSMISSION_VALUES,
} from '@/lib/filters/schema';
import type { CamperForm } from '@/types/camper';
import { useFilterForm } from '@/hooks/useFilterForm';
import styles from './FilterPanel.module.css';

const formIcons: Record<CamperForm, () => ReactElement> = {
  alcove: () => <LuCaravan aria-hidden="true" />,
  panel_van: () => <LuGrid2X2 aria-hidden="true" />,
  integrated: () => <LuMap aria-hidden="true" />,
  semi_integrated: () => <LuCompass aria-hidden="true" />,
};

export default function FilterPanel() {
  const {
    pending,
    setLocation,
    toggleForm,
    toggleEngine,
    toggleTransmission,
    onSearch,
    onClear,
    hasAnyFilter,
  } = useFilterForm();

  return (
    <aside className={styles.panel} aria-label="Catalog filters">
      <div className={styles.field}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <div className={styles.locationWrap}>
          <FiMapPin aria-hidden="true" className={styles.locationIcon} />
          <input
            id="location"
            type="text"
            className={styles.locationInput}
            placeholder="City"
            value={pending.location ?? ''}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                onSearch();
              }
            }}
          />
        </div>
      </div>

      <h2 className={styles.heading}>Filters</h2>

      <fieldset className={styles.group}>
        <legend className={styles.groupLabel}>Vehicle equipment</legend>
        <ul className={styles.chipList}>
          {TRANSMISSION_VALUES.map((value) => (
            <li key={value}>
              <ChipButton
                active={pending.transmission === value}
                onClick={() => toggleTransmission(value)}
                aria-pressed={pending.transmission === value}
              >
                <LuCompass aria-hidden="true" />
                {TRANSMISSION_LABELS[value]}
              </ChipButton>
            </li>
          ))}
          {ENGINE_VALUES.map((value) => (
            <li key={value}>
              <ChipButton
                active={pending.engine === value}
                onClick={() => toggleEngine(value)}
                aria-pressed={pending.engine === value}
              >
                <LuMap aria-hidden="true" />
                {ENGINE_LABELS[value]}
              </ChipButton>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupLabel}>Vehicle type</legend>
        <ul className={styles.chipList}>
          {FORM_VALUES.map((value) => {
            const Icon = formIcons[value];
            return (
              <li key={value}>
                <ChipButton
                  active={pending.form === value}
                  onClick={() => toggleForm(value)}
                  aria-pressed={pending.form === value}
                >
                  <Icon />
                  {FORM_LABELS[value]}
                </ChipButton>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.searchBtn}
          onClick={onSearch}
        >
          Search
        </button>
        {hasAnyFilter && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={onClear}
          >
            <FiX aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </aside>
  );
}

type ChipButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ChipButton({
  active,
  onClick,
  children,
  className,
  ...rest
}: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.chip, active && styles.chipActive, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

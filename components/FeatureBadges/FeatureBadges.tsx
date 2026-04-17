import type { ReactElement } from 'react';
import {
  LuBath,
  LuCookingPot,
  LuDroplets,
  LuFlame,
  LuMicrowave,
  LuRadio,
  LuRefrigerator,
  LuTv,
  LuFuel,
  LuMap,
  LuCog,
  LuWind,
} from 'react-icons/lu';
import type { Camper, CamperAmenity } from '@/types/camper';
import {
  ENGINE_LABELS,
  FORM_LABELS,
  TRANSMISSION_LABELS,
} from '@/lib/filters/schema';
import styles from './FeatureBadges.module.css';

const amenityMap: Record<
  CamperAmenity,
  { label: string; Icon: () => ReactElement }
> = {
  ac: { label: 'AC', Icon: () => <LuWind aria-hidden="true" /> },
  bathroom: { label: 'Bathroom', Icon: () => <LuBath aria-hidden="true" /> },
  kitchen: { label: 'Kitchen', Icon: () => <LuCookingPot aria-hidden="true" /> },
  tv: { label: 'TV', Icon: () => <LuTv aria-hidden="true" /> },
  radio: { label: 'Radio', Icon: () => <LuRadio aria-hidden="true" /> },
  refrigerator: {
    label: 'Refrigerator',
    Icon: () => <LuRefrigerator aria-hidden="true" />,
  },
  microwave: {
    label: 'Microwave',
    Icon: () => <LuMicrowave aria-hidden="true" />,
  },
  gas: { label: 'Gas', Icon: () => <LuFlame aria-hidden="true" /> },
  water: { label: 'Water', Icon: () => <LuDroplets aria-hidden="true" /> },
};

type Badge = { key: string; label: string; node: ReactElement };

function formIcon(): ReactElement {
  return <LuMap aria-hidden="true" />;
}

function engineIcon(): ReactElement {
  return <LuFuel aria-hidden="true" />;
}

function transmissionIcon(): ReactElement {
  return <LuCog aria-hidden="true" />;
}

type FeatureBadgesProps = {
  camper: Pick<
    Camper,
    'amenities' | 'form' | 'engine' | 'transmission'
  >;
  amenities?: CamperAmenity[];
  max?: number;
  className?: string;
};

export default function FeatureBadges({
  camper,
  amenities,
  max,
  className,
}: FeatureBadgesProps) {
  const list: Badge[] = [];

  list.push({
    key: 'transmission',
    label: TRANSMISSION_LABELS[camper.transmission],
    node: transmissionIcon(),
  });
  list.push({
    key: 'engine',
    label: ENGINE_LABELS[camper.engine],
    node: engineIcon(),
  });
  list.push({
    key: 'form',
    label: FORM_LABELS[camper.form],
    node: formIcon(),
  });

  const amenityList = amenities ?? camper.amenities;
  for (const amenity of amenityList) {
    const entry = amenityMap[amenity];
    if (!entry) continue;
    const Icon = entry.Icon;
    list.push({
      key: `amenity-${amenity}`,
      label: entry.label,
      node: <Icon />,
    });
  }

  const visible = typeof max === 'number' ? list.slice(0, max) : list;

  return (
    <ul className={[styles.row, className].filter(Boolean).join(' ')}>
      {visible.map((badge) => (
        <li key={badge.key} className={styles.badge}>
          <span className={styles.icon}>{badge.node}</span>
          <span>{badge.label}</span>
        </li>
      ))}
    </ul>
  );
}

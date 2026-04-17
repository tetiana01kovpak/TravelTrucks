import type { CamperDetail } from '@/types/camper';
import { FORM_LABELS } from '@/lib/filters/schema';
import styles from './SpecTable.module.css';

type SpecTableProps = {
  camper: Pick<
    CamperDetail,
    'form' | 'length' | 'width' | 'height' | 'tank' | 'consumption'
  >;
};

export default function SpecTable({ camper }: SpecTableProps) {
  const rows: Array<[string, string]> = [
    ['Form', FORM_LABELS[camper.form as keyof typeof FORM_LABELS] ?? camper.form],
    ['Length', camper.length],
    ['Width', camper.width],
    ['Height', camper.height],
    ['Tank', camper.tank],
    ['Consumption', camper.consumption],
  ];

  return (
    <dl className={styles.list}>
      {rows.map(([label, value]) => (
        <div key={label} className={styles.row}>
          <dt className={styles.label}>{label}</dt>
          <dd className={styles.value}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

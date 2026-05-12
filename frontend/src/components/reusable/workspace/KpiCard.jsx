import styles from './KpiCard.module.css';

function KpiCard({ label, value, context, variant = 'default' }) {
  const variantClass =
    variant === 'positive'
      ? styles.variantPositive
      : variant === 'negative'
        ? styles.variantNegative
        : variant === 'warning'
          ? styles.variantWarning
          : '';

  return (
    <article className={`${styles.card} ${variantClass}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {context ? <p className={styles.context}>{context}</p> : null}
    </article>
  );
}

export default KpiCard;

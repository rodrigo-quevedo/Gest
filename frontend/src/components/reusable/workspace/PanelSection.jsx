import styles from './PanelSection.module.css';

function PanelSection({ title, description, actionLabel, onAction, children }) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.desc}>{description}</p> : null}
        </div>
        {actionLabel && onAction ? (
          <button type="button" className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

export default PanelSection;

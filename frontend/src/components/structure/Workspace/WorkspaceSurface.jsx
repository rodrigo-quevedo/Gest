import styles from './WorkspaceSurface.module.css';

function WorkspaceSurface({ children }) {
  return (
    <section className={styles.surface}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}

export default WorkspaceSurface;

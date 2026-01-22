import styles from '../Styles.module.css';

export function Error({ error }: { error: string }) {
  return <p className={styles['input-error']}>{error}</p>;
}

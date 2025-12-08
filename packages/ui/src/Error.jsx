import styles from './Styles.module.css';

export function Error({ error }) {
  return <p className={styles['input-error']}>{error}</p>;
}

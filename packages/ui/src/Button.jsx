import styles from './Styles.module.css';

export function Button({ children, className = '', ...props }) {
  return (
    <button className={`${styles['game-button']} ${className}`} {...props}>
      {children}
    </button>
  );
}

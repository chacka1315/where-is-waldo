import styles from '../Styles.module.css';
import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${styles['game-button']} ${className}`} {...props}>
      {children}
    </button>
  );
}

import { ReactNode } from 'react';
import styles from '../Styles.module.css';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  className?: string;
  label: string;
}

export function LabeledInput({
  children,
  value,
  className = '',
  label,
  id = '',
  type = 'text',
  ...props
}: InputProps) {
  return (
    <section className={`${styles['labeled-input']} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} {...props} />
      {children}
    </section>
  );
}

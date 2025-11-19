import type { ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

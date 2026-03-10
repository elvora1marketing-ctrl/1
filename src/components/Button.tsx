import { motion } from 'framer-motion'
import { easing } from '../utils/animations'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text'
  size?: 'default' | 'large'
  children: ReactNode
  fullWidth?: boolean
}

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg',
  outline:
    'border-2 border-accent text-accent hover:bg-accent hover:text-white',
  text: 'text-accent hover:text-accent-dark underline underline-offset-4',
}

export default function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: easing }}
      className={`
        inline-flex items-center justify-center font-semibold rounded-button transition-all
        ${variants[variant]}
        ${size === 'large' ? 'h-14 px-10 text-lg' : 'h-[52px] px-8 text-base'}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...props}
    />
  )
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  size = 'default',
  className = '',
}: {
  children: ReactNode
  href: string
  variant?: 'primary' | 'outline'
  size?: 'default' | 'large'
  className?: string
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: easing }}
      className={`
        inline-flex items-center justify-center font-semibold rounded-button transition-all
        ${variants[variant]}
        ${size === 'large' ? 'h-14 px-10 text-lg' : 'h-[52px] px-8 text-base'}
        ${className}
      `}
    >
      {children}
    </motion.a>
  )
}

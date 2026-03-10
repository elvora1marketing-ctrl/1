import { motion } from 'framer-motion'
import { fadeInUp, scaleOnHover } from '../utils/animations'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      {...(hoverable ? scaleOnHover : {})}
      className={`bg-white rounded-card shadow-card p-6 md:p-8 ${
        hoverable ? 'hover:shadow-card-hover transition-shadow' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}

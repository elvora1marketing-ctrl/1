import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../utils/animations'
import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  bg?: 'default' | 'alt' | 'accent-light'
}

export default function Section({ id, children, className = '', bg = 'default' }: SectionProps) {
  const bgClass =
    bg === 'alt' ? 'bg-surface-alt' :
    bg === 'accent-light' ? 'bg-accent-light' :
    'bg-white'

  return (
    <section id={id} className={`section-padding ${bgClass} ${className}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="container-main"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionHeadline({
  children,
  subtitle,
}: {
  children: ReactNode
  subtitle?: string
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-[40px] font-bold leading-tight"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-base md:text-lg text-secondary max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

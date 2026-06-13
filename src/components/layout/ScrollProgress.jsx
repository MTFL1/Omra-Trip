import { useScroll, useTransform, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!reducedMotion) return

    const handleScroll = () => {
      setVisible(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 'calc(var(--z-sticky) + 10)',
          backgroundColor: visible ? 'var(--color-gold)' : 'transparent',
          transition: 'background-color var(--transition-fast)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 'calc(var(--z-sticky) + 10)',
        backgroundColor: 'var(--color-gold)',
        transformOrigin: '0% 50%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

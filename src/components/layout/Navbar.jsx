import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SOCIAL = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/omratrip',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/omratrip',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const { i18n } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)

  const isRTL = i18n.dir() === 'rtl'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mountAnimation = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 } }

  return (
    <motion.nav
      {...mountAnimation}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label="Navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-sticky)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: '1px solid transparent',
      }}
    >
      <div
        className="container-max flex items-center justify-between"
        style={{
          height: 'clamp(4rem, 5vw, 5rem)',
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center"
          aria-label="Omra Trip"
        >
          <span
            className="font-display-latin text-2xl font-semibold"
            style={{ color: 'var(--color-white)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Omra Trip
          </span>
          <span
            className="ml-1"
            style={{ color: 'var(--color-gold)', fontSize: '1.5rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            •
          </span>
        </a>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {SOCIAL.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/60 hover:text-[var(--color-gold)] transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

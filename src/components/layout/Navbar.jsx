import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)

  const isRTL = i18n.dir() === 'rtl'
  const whatsappURL = `https://wa.me/33600000000?text=${encodeURIComponent(t('whatsapp.message'))}`

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
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(232, 213, 163, 0.1)'
          : '1px solid transparent',
      }}
    >
      <div
        className="container-max flex items-center justify-between"
        style={{ height: 'clamp(4rem, 5vw, 5rem)' }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center"
          aria-label={t('nav.logo', 'Omra Trip')}
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

        {/* Language switcher + WhatsApp CTA */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <Button variant="whatsapp" size="sm" href={whatsappURL}>
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

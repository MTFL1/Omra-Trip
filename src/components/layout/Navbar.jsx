import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

const NAV_LINKS = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.offers', href: '#offers' },
  { key: 'nav.rooms', href: '#rooms' },
  { key: 'nav.reviews', href: '#reviews' },
  { key: 'nav.faq', href: '#faq' },
]

function HamburgerIcon({ open }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]" aria-hidden="true">
      <motion.span
        animate={open ? { rotate: 45, y: 7, width: '24px' } : { rotate: 0, y: 0, width: '24px' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          display: 'block',
          height: '2px',
          borderRadius: '2px',
          backgroundColor: 'var(--color-white)',
          transformOrigin: 'center',
        }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        style={{
          display: 'block',
          height: '2px',
          width: '24px',
          borderRadius: '2px',
          backgroundColor: 'var(--color-white)',
        }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7, width: '24px' } : { rotate: 0, y: 0, width: '24px' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          display: 'block',
          height: '2px',
          borderRadius: '2px',
          backgroundColor: 'var(--color-white)',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isRTL = i18n.dir() === 'rtl'

  const whatsappURL = `https://wa.me/33600000000?text=${encodeURIComponent(t('whatsapp.message'))}`

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mountAnimation = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 } }

  const handleNavLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        {...mountAnimation}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        dir={isRTL ? 'rtl' : 'ltr'}
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
        aria-label="Main navigation"
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
            style={{ order: isRTL ? 1 : 0 }}
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

          {/* Desktop nav links */}
          <ul
            className="hidden md:flex items-center gap-8 list-none m-0 p-0"
            role="list"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--color-text-light)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-light)' }}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right side */}
          <div
            className="hidden md:flex items-center gap-4"
            style={{ order: isRTL ? -1 : 1 }}
          >
            <LanguageSwitcher />
            <Button variant="whatsapp" size="sm" href={whatsappURL}>
              {t('nav.contact')}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              order: isRTL ? 0 : 1,
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 'clamp(4rem, 5vw, 5rem)',
              left: 0,
              right: 0,
              zIndex: 'calc(var(--z-sticky) - 1)',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(232, 213, 163, 0.2)',
              overflow: 'hidden',
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            aria-label="Mobile navigation"
          >
            <nav>
              <ul
                className="flex flex-col items-center gap-6 py-8 list-none m-0 p-0"
                style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
                role="list"
              >
                {NAV_LINKS.map(({ key, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="text-base font-medium"
                      style={{
                        color: 'var(--color-text-light)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                      onClick={handleNavLinkClick}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-light)' }}
                    >
                      {t(key)}
                    </a>
                  </li>
                ))}
                <li>
                  <LanguageSwitcher />
                </li>
                <li>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    href={whatsappURL}
                    onClick={handleNavLinkClick}
                  >
                    {t('nav.contact')}
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

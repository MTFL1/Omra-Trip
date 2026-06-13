import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

const LANGUAGES = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'AR', flag: '🇸🇦' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const wrapperRef = useRef(null)

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (code) => {
    changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-[var(--color-gold-light)] hover:border-[var(--color-gold)] transition"
        style={{
          color: 'var(--color-text-light)',
          transition: 'border-color var(--transition-fast)',
        }}
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.label}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              marginTop: '0.5rem',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(232, 213, 163, 0.2)',
              overflow: 'hidden',
              zIndex: 'var(--z-dropdown)',
              minWidth: '8rem',
            }}
          >
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === language
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className="flex items-center gap-2 px-4 py-3 text-sm w-full text-left"
                  style={{
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-light)',
                    backgroundColor: isActive ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
                    transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

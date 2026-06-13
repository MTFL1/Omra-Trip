import { useTranslation } from 'react-i18next'
import ArabesquePattern from '@/components/ui/ArabesquePattern'
import Button from '@/components/ui/Button'

/* ── Social icon components ────────────────────────────────────── */

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
)

/* ── Inline contact icon components ────────────────────────────── */

const AddressIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 mt-0.5">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 mt-0.5">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0 mt-0.5">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

/* ── Shared style helpers ───────────────────────────────────────── */

const columnHeadingClass =
  'text-xs uppercase tracking-widest mb-4 font-body font-semibold'

const linkClass =
  'text-sm font-body transition-colors duration-150 hover:text-[var(--color-gold)] focus-visible:outline-[var(--color-gold)]'

/* ── FooterSection ──────────────────────────────────────────────── */

export default function FooterSection() {
  const { t } = useTranslation()

  const whatsappUrl = `https://wa.me/33600000000?text=${encodeURIComponent(t('whatsapp.message'))}`

  const navLinks = [
    { href: '#about',   label: t('nav.about') },
    { href: '#offers',  label: t('nav.offers') },
    { href: '#rooms',   label: t('nav.rooms') },
    { href: '#reviews', label: t('nav.reviews') },
    { href: '#faq',     label: t('nav.faq') },
  ]

  const legalLinks = [
    { href: '#', label: t('footer.mentions') },
    { href: '#', label: t('footer.privacy') },
    { href: '#', label: t('footer.terms') },
  ]

  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-black)' }}
    >
      <ArabesquePattern
        color="var(--color-gold)"
        opacity={0.03}
        className="absolute inset-0"
      />

      <div className="container-max relative z-10">
        {/* ── Main grid ── */}
        <div className="pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 — Brand + tagline + social */}
          <div>
            <p
              className="font-display-latin text-2xl font-light"
              style={{ color: 'var(--color-white)' }}
            >
              Omra Trip
              <span style={{ color: 'var(--color-gold)' }}>.</span>
            </p>

            <p
              className="font-body text-sm mt-3 max-w-xs leading-relaxed"
              style={{ color: 'rgba(232, 232, 232, 0.60)' }}
            >
              {t('footer.tagline')}
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {[
                { Icon: FacebookIcon,  label: 'Facebook' },
                { Icon: InstagramIcon, label: 'Instagram' },
                { Icon: YouTubeIcon,   label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transition-colors duration-150 hover:text-[var(--color-gold)] focus-visible:outline-[var(--color-gold)]"
                  style={{ color: 'rgba(232, 232, 232, 0.60)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <p
              className={columnHeadingClass}
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.nav_title')}
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={linkClass}
                    style={{ color: 'rgba(232, 232, 232, 0.60)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <p
              className={columnHeadingClass}
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.legal_title')}
            </p>
            <ul className="flex flex-col gap-3">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={linkClass}
                    style={{ color: 'rgba(232, 232, 232, 0.60)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <p
              className={columnHeadingClass}
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.contact_title')}
            </p>

            <ul className="flex flex-col gap-4">
              <li
                className="flex items-start gap-2 font-body text-sm"
                style={{ color: 'rgba(232, 232, 232, 0.60)' }}
              >
                <AddressIcon />
                <span>{t('footer.address')}</span>
              </li>
              <li
                className="flex items-start gap-2 font-body text-sm"
                style={{ color: 'rgba(232, 232, 232, 0.60)' }}
              >
                <PhoneIcon />
                <span>{t('footer.phone')}</span>
              </li>
              <li
                className="flex items-start gap-2 font-body text-sm"
                style={{ color: 'rgba(232, 232, 232, 0.60)' }}
              >
                <EmailIcon />
                <span>{t('footer.email')}</span>
              </li>
            </ul>

            <div className="mt-6">
              <Button
                variant="whatsapp"
                size="sm"
                href={whatsappUrl}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(232, 213, 163, 0.10)' }}
        >
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(232, 232, 232, 0.40)' }}
          >
            {t('footer.copyright')}
          </p>
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(232, 232, 232, 0.40)' }}
          >
            {t('footer.made_with')}
          </p>
        </div>
      </div>
    </footer>
  )
}

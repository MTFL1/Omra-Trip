import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionTitle from '@/components/ui/SectionTitle'
import ArabesquePattern from '@/components/ui/ArabesquePattern'

// ── AnimatedCounter ─────────────────────────────────────────────────────────
// Parses a value string like "500+", "10", "98%" and animates from 0 to the
// numeric part over ~800ms using rAF. Falls back to static display for
// reduced-motion users.

function AnimatedCounter({ value }) {
  const reducedMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // Extract numeric part and suffix (+, %, or empty)
  const match = String(value).match(/^(\d+(?:\.\d+)?)(\D*)$/)
  const targetNumber = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''

  const [displayed, setDisplayed] = useState(reducedMotion ? targetNumber : 0)

  useEffect(() => {
    if (!inView || reducedMotion) return

    const duration = 800 // ms
    const startTime = performance.now()

    let rafId

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Linear easing — simple and legible for counters
      const current = Math.round(progress * targetNumber)
      setDisplayed(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, reducedMotion, targetNumber])

  // If reducedMotion, just show final value string without animation
  if (reducedMotion) {
    return (
      <span
        ref={ref}
        className="font-display-latin"
        style={{
          fontSize: '3rem',
          fontWeight: 700,
          color: 'var(--color-gold)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className="font-display-latin"
      style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: 'var(--color-gold)',
        lineHeight: 1,
      }}
    >
      {displayed}
      {suffix}
    </span>
  )
}

// ── AboutSection ─────────────────────────────────────────────────────────────

export default function AboutSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })

  const stats = [
    { value: t('about.stat1_value'), label: t('about.stat1_label') },
    { value: t('about.stat2_value'), label: t('about.stat2_label') },
    { value: t('about.stat3_value'), label: t('about.stat3_label') },
  ]

  return (
    <section
      id="about"
      aria-label="About"
      className="section-padding bg-[var(--color-white)]"
    >
      <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* ── Left column: text ── */}
        <motion.div
          ref={leftRef}
          animate={
            leftInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reducedMotion ? 0 : -30 }
          }
          initial={{ opacity: 0, x: reducedMotion ? 0 : -30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <SectionTitle
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            subtitle={t('about.subtitle')}
            align="left"
            dark={false}
          />

          <p
            className="font-body text-base leading-relaxed"
            style={{ color: 'var(--color-text-dark)', marginTop: '1.5rem' }}
          >
            {t('about.p1')}
          </p>
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: 'var(--color-text-dark)', marginTop: '1rem' }}
          >
            {t('about.p2')}
          </p>
        </motion.div>

        {/* ── Right column: stats ── */}
        <motion.div
          ref={rightRef}
          animate={
            rightInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reducedMotion ? 0 : 30 }
          }
          initial={{ opacity: 0, x: reducedMotion ? 0 : 30 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{ position: 'relative', overflow: 'hidden' }}
          className="flex items-center"
        >
          {/* Decorative arabesque behind stats */}
          <ArabesquePattern color="var(--color-gold)" opacity={0.04} />

          {/* Stats grid: 3 columns on mobile, 1 column on desktop */}
          <div
            className="grid grid-cols-3 md:grid-cols-1 gap-6 w-full"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 md:p-8"
                style={{
                  borderTop: '2px solid var(--color-gold)',
                }}
              >
                <AnimatedCounter value={stat.value} />
                <p
                  className="font-body text-sm"
                  style={{ color: '#6b7280', marginTop: '0.5rem' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

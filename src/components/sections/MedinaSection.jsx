import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ArabesquePattern from '@/components/ui/ArabesquePattern'
// Place your Medina video at src/assets/medina.mp4
import medinaVideo from '@/assets/medina.mp4'

export default function MedinaSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax: video moves at 35% scroll speed
  const videoY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section
      id="medina"
      ref={sectionRef}
      aria-label="Médine"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '70vh',
        minHeight: '400px',
      }}
    >
      {/* ── Parallax video ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          top: '-15%',
          height: '130%',
          zIndex: 0,
          y: reducedMotion ? 0 : videoY,
        }}
      >
        <video
          src={medinaVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </motion.div>

      {/* ── Dark vignette overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* ── Arabesque texture ── */}
      <ArabesquePattern
        color="var(--color-gold)"
        opacity={0.04}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      />

      {/* ── Centered quote / label ── */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: reducedMotion ? 0.15 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          gap: '1rem',
        }}
      >
        {/* Gold eyebrow line */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}
        >
          {t('about.stat2_label')}
        </p>

        {/* Arabic city name */}
        <p
          style={{
            fontFamily: 'var(--font-display-ar)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}
        >
          المدينة المنورة
        </p>

        {/* Latin subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-display-latin)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            color: 'var(--color-gold-light)',
            letterSpacing: '0.05em',
          }}
        >
          Al-Madinah Al-Munawwarah
        </p>

        {/* Gold divider */}
        <div
          style={{
            width: '48px',
            height: '2px',
            background: 'var(--color-gold)',
            marginTop: '0.5rem',
          }}
        />
      </motion.div>
    </section>
  )
}

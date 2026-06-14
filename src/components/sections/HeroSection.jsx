import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import ArabesquePattern from '@/components/ui/ArabesquePattern'
// Place your Kaaba tawaf video at src/assets/kaaba.mp4
import kaabaVideo from '@/assets/kaaba.mp4'
import kaabaPoster from '@/assets/kaaba-poster.webp'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

function buildItemVariants(reducedMotion) {
  return {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.15 : 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }
}

export default function HeroSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: video moves at 40% scroll speed (slower than page = depth effect)
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  const itemVariants = buildItemVariants(reducedMotion)

  const whatsappHref = `https://wa.me/32486101473?text=${encodeURIComponent(t('whatsapp.message'))}`

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero"
      style={{
        background: 'var(--color-black)',
        position: 'relative',
        overflow: 'hidden',
        height: '100svh',
      }}
    >
      {/* ── Background layer 1: parallax video ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          y: reducedMotion ? 0 : videoY,
          // Oversized so parallax shift doesn't reveal edges
          top: '-20%',
          height: '140%',
        }}
      >
        <video
          ref={videoRef}
          src={kaabaVideo}
          poster={kaabaPoster}
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </motion.div>

      {/* ── Overlay: dark vignette for text legibility ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0.65) 100%)',
        }}
      />

      {/* ── Overlay: arabesque texture on top of video ── */}
      <ArabesquePattern color="var(--color-gold)" opacity={0.04} className="absolute inset-0" style={{ zIndex: 2 }} />

      {/* ── Overlay: subtle gold radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,168,76,0.10) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {/* Bismillah */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-display-ar)',
            color: 'var(--color-gold)',
            fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
            marginBottom: '1rem',
          }}
        >
          {t('hero.bismillah')}
        </motion.p>

        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-body uppercase tracking-[0.3em] text-xs md:text-sm"
          style={{
            color: 'var(--color-gold-light)',
            marginBottom: '1.5rem',
          }}
        >
          {t('hero.eyebrow')}
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-display-latin text-5xl md:text-7xl lg:text-8xl leading-tight mx-auto"
          style={{
            color: 'var(--color-white)',
            fontWeight: 300,
            maxWidth: '56rem',
            marginBottom: '1.5rem',
          }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-body text-lg md:text-xl mx-auto"
          style={{
            color: 'rgba(232, 232, 232, 0.80)',
            maxWidth: '36rem',
            marginBottom: '1.25rem',
          }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 flex-col sm:flex-row items-center justify-center"
        >
          <Button variant="primary" size="lg" href="#offers">
            {t('hero.cta_offers')}
          </Button>
          <Button variant="whatsapp" size="lg" href={whatsappHref}>
            {t('hero.cta_contact')}
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
        <p
          className="font-body"
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.40)',
            marginTop: '0.5rem',
          }}
        >
          {t('hero.scroll_hint')}
        </p>
      </div>
    </section>
  )
}

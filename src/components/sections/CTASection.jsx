import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import ArabesquePattern from '@/components/ui/ArabesquePattern'

const WhatsAppSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.076 1.497 5.797L0 24l6.335-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.359-.213-3.722.88.935-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z" />
  </svg>
)

export default function CTASection() {
  const { t, i18n } = useTranslation()
  const reducedMotion = useReducedMotion()

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const whatsappUrl = `https://wa.me/33600000000?text=${encodeURIComponent(t('whatsapp.message'))}`

  const sectionVariants = {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.95 },
    visible: reducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const bubblePosition =
    i18n.dir() === 'rtl'
      ? { left: 24, right: 'auto' }
      : { right: 24, left: 'auto' }

  const bubbleAnimation = reducedMotion
    ? {}
    : {
        animate: { scale: [1, 1.1, 1] },
        transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
      }

  return (
    <>
      <section
        id="cta"
        aria-label="CTA"
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--color-gold)' }}
      >
        {/* Subtle arabesque overlay for texture */}
        <ArabesquePattern
          color="var(--color-black)"
          opacity={0.05}
          className="absolute inset-0"
        />

        <motion.div
          ref={sectionRef}
          className="container-max relative z-10 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2
            className="font-display-latin text-4xl md:text-6xl font-light max-w-3xl mx-auto mb-4"
            style={{ color: 'var(--color-black)' }}
          >
            {t('cta.title')}
          </h2>

          <p
            className="font-body text-lg max-w-xl mx-auto mb-10"
            style={{ color: 'rgba(10, 10, 10, 0.70)' }}
          >
            {t('cta.subtitle')}
          </p>

          <Button
            variant="whatsapp"
            size="lg"
            href={whatsappUrl}
          >
            {t('cta.button')}
          </Button>
        </motion.div>
      </section>

      {/* Floating WhatsApp bubble — fixed, rendered outside section flow */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="flex items-center justify-center rounded-full shadow-xl"
        style={{
          position: 'fixed',
          bottom: 24,
          ...bubblePosition,
          zIndex: 400,
          width: 60,
          height: 60,
          background: '#25D366',
          color: '#ffffff',
          flexShrink: 0,
        }}
        {...bubbleAnimation}
      >
        <WhatsAppSVG />
      </motion.a>
    </>
  )
}

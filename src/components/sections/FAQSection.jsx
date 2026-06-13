import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import FAQItem from '@/components/ui/FAQItem'
import SectionTitle from '@/components/ui/SectionTitle'
import { faq } from '@/data/index'

// ── FAQSection ────────────────────────────────────────────────────────────────

export default function FAQSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  // Only one accordion item open at a time; null means all closed
  const [openId, setOpenId] = useState(null)

  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-60px' })

  // Entrance animation variants for the FAQ grid
  const gridVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="faq"
      aria-label="FAQ"
      className="section-padding"
      style={{ background: 'var(--color-white)' }}
    >
      <div className="container-max">
        <SectionTitle
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
          align="center"
          dark={false}
        />

        {/* ── Two-column accordion grid ── */}
        <motion.div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {faq.map((item) => (
            <FAQItem
              key={item.id}
              question={t(item.questionKey)}
              answer={t(item.answerKey)}
              isOpen={openId === item.id}
              onToggle={() =>
                setOpenId(openId === item.id ? null : item.id)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { offers } from '@/data/index'

const ecoOffer     = offers.find((o) => o.tier === 'economique')
const premiumOffer = offers.find((o) => o.tier === 'premium')

function TierCard({ offer, labelKey, noteKey, isPopular, t }) {
  return (
    <div
      className={[
        'relative rounded-2xl p-5 bg-white',
        isPopular
          ? 'border-2 border-[var(--color-gold)] shadow-[0_0_32px_rgba(201,168,76,0.12)]'
          : 'border border-[var(--color-gold)]/30',
      ].join(' ')}
    >
      {isPopular && (
        <div
          className="absolute -top-3 left-4 bg-[var(--color-gold)] text-[var(--color-black)] text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
          aria-label={t('offers.popular')}
        >
          {t('offers.popular')}
        </div>
      )}

      <div className="flex justify-between items-start gap-4">
        <span className="font-body text-sm font-semibold text-[var(--color-text-dark)] uppercase tracking-wide pt-1">
          {t(labelKey)}
        </span>
        <div className="text-right flex-shrink-0">
          <span className="font-body text-[11px] text-gray-400 block leading-none mb-0.5">
            {t('offers.from')}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display-latin text-3xl font-bold text-[var(--color-text-dark)]">
              {offer.price.toLocaleString('fr-FR')}
            </span>
            <span className="font-body text-base font-medium text-gray-500">
              {offer.currency}
            </span>
          </div>
          <span className="font-body text-[11px] text-gray-400 block leading-none mt-0.5">
            / pers.
          </span>
        </div>
      </div>

      <p className="font-body text-xs text-gray-500 mt-3 leading-relaxed border-t border-gray-100 pt-3">
        {t(noteKey)}
      </p>
    </div>
  )
}

export default function OffersSection() {
  const { t }         = useTranslation()
  const reducedMotion = useReducedMotion()
  const ref           = useRef(null)
  const inView        = useInView(ref, { once: true, margin: '-60px' })

  const highlights = ecoOffer?.highlights ?? []

  return (
    <section
      id="offers"
      aria-label="Nos offres"
      className="section-padding"
      style={{ background: 'var(--color-gray-soft)' }}
    >
      <div className="container-max">
        <SectionTitle
          eyebrow={t('offers.eyebrow')}
          subtitle={t('offers.subtitle')}
          align="center"
          dark={false}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.15 : 0.6, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start"
        >
          {/* ── Left: included features ── */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-dark)] mb-5">
              {t('offers.included_in_both')}
            </p>
            <ul className="flex flex-col gap-3" aria-label={t('offers.included_in_both')}>
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" aria-hidden="true">✦</span>
                  <span className="font-body text-sm text-[var(--color-text-dark)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: tier cards + CTA ── */}
          <div className="flex flex-col gap-4">
            <TierCard
              offer={ecoOffer}
              labelKey="offers.tiers.economique"
              noteKey="offers.eco_note"
              isPopular={false}
              t={t}
            />
            <TierCard
              offer={premiumOffer}
              labelKey="offers.tiers.premium"
              noteKey="offers.premium_note"
              isPopular={true}
              t={t}
            />

            <p className="font-body text-xs text-gray-400 text-center">
              {t('offers.disclaimer')}
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('offers.select')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

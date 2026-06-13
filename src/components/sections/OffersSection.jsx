import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import PackageCard from '@/components/ui/PackageCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { offers } from '@/data/index'

const FILTERS = [
  { value: 'all',        labelKey: 'offers.filter_all' },
  { value: 'economique', labelKey: 'offers.filter_eco' },
  { value: 'confort',    labelKey: 'offers.filter_comfort' },
  { value: 'premium',    labelKey: 'offers.filter_premium' },
]

export default function OffersSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all' ? offers : offers.filter((o) => o.tier === activeFilter)

  const cardTransition = { duration: reducedMotion ? 0.15 : 0.3 }

  return (
    <section
      id="offers"
      aria-label="Nos offres"
      className="section-padding"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="container-max">
        <SectionTitle
          eyebrow={t('offers.eyebrow')}
          title={t('offers.title')}
          subtitle={t('offers.subtitle')}
          align="center"
          dark={true}
        />

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filtrer les offres"
          className="flex gap-2 justify-center mt-10 mb-12 flex-wrap"
        >
          {FILTERS.map(({ value, labelKey }) => {
            const isActive = activeFilter === value
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(value)}
                className={[
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
                  isActive
                    ? 'bg-[var(--color-gold)] text-[var(--color-black)]'
                    : 'border border-[var(--color-gold-light)]/30 text-[var(--color-text-light)] hover:border-[var(--color-gold)]',
                ].join(' ')}
              >
                {t(labelKey)}
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        <motion.div
          layout
          className={
            filtered.length === 1
              ? 'max-w-md mx-auto mt-4'
              : 'grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((offer) => (
              <motion.div
                key={offer.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={cardTransition}
              >
                <PackageCard
                  offer={offer}
                  isPopular={offer.badge === 'popular'}
                  onSelect={(o) => {
                    const waMsg = encodeURIComponent(
                      `Bonjour, je suis intéressé par la formule ${o.tier} à ${o.price}${o.currency}.`
                    )
                    window.open(`https://wa.me/33600000000?text=${waMsg}`, '_blank')
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Disclaimer */}
        <p
          className="mt-10 text-center text-xs"
          style={{ color: 'color-mix(in srgb, var(--color-text-light) 50%, transparent)' }}
        >
          {t('offers.disclaimer')}
        </p>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'

const TIER_STYLES = {
  economique: {
    border: 'border-gray-200',
    shadow: '',
  },
  confort: {
    border: 'border-[var(--color-gold)]',
    shadow: 'shadow-[0_0_24px_rgba(201,168,76,0.15)]',
  },
  premium: {
    border: 'border-[var(--color-gold-light)]',
    shadow: '',
  },
}

function SkeletonFallback() {
  return (
    <div className="relative rounded-2xl border-2 border-gray-100 bg-[var(--color-white)] p-8 flex flex-col gap-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded-full w-1/3" />
      <div className="h-10 bg-gray-200 rounded-full w-1/2" />
      <div className="flex flex-col gap-3">
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="h-3 bg-gray-100 rounded-full w-4/6" />
      </div>
    </div>
  )
}

function ExclusiveBadge() {
  return (
    <div
      aria-label="Exclusif"
      className="absolute top-4 right-4 bg-[var(--color-gold-dark)] text-[var(--color-white)] text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
    >
      Exclusif
    </div>
  )
}

export default function PackageCard({ offer, onSelect, isPopular }) {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  if (!offer) {
    return <SkeletonFallback />
  }

  const tierStyle = TIER_STYLES[offer.tier] ?? TIER_STYLES.economique

  const hoverAnimation = {
    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
    ...(reducedMotion ? {} : { y: -8 }),
  }

  const details = [
    offer.duration,
    offer.flights,
    offer.hotelDistance,
    offer.meals,
    offer.groupSize,
  ].filter(Boolean)

  return (
    <motion.div
      className={[
        'relative rounded-2xl border-2 bg-[var(--color-white)] p-8 flex flex-col gap-6',
        tierStyle.border,
        tierStyle.shadow,
      ].join(' ')}
      whileHover={hoverAnimation}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {isPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-black)] text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap z-10"
          aria-label={t('offers.popular')}
        >
          {t('offers.popular')}
        </div>
      )}

      {offer.tier === 'premium' && <ExclusiveBadge />}

      {/* Tier label */}
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
        {t(`offers.tiers.${offer.tier}`)}
      </p>

      {/* Price block */}
      <div>
        <div className="flex items-baseline gap-1">
          <span
            className="font-display-latin text-4xl font-bold text-[var(--color-text-dark)]"
            aria-label={`${offer.price} ${offer.currency}`}
          >
            {offer.price.toLocaleString('fr-FR')}
          </span>
          <span className="text-lg text-[var(--color-text-dark)] font-medium">
            {offer.currency}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{offer.duration}</p>
      </div>

      {/* Details list */}
      {details.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm text-gray-600" aria-label="Détails de la formule">
          {details.map((detail) => (
            <li key={detail} className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] leading-none mt-0.5" aria-hidden="true">
                ✦
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Highlights */}
      {offer.highlights && offer.highlights.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-dark)]" aria-label="Points forts">
          {offer.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] leading-none mt-0.5" aria-hidden="true">
                ✦
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-auto pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={() => onSelect && onSelect(offer)}
        >
          {t('offers.select')}
        </Button>
      </div>
    </motion.div>
  )
}

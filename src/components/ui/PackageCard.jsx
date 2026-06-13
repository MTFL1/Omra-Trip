import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'

const TIER_STYLES = {
  economique: {
    border: 'border-[var(--color-gold)]/40',
    shadow: '',
    glow: '',
  },
  premium: {
    border: 'border-[var(--color-gold)]',
    shadow: 'shadow-[0_0_32px_rgba(201,168,76,0.18)]',
    glow: 'shadow-[0_0_48px_rgba(201,168,76,0.25)]',
  },
}

const ROOM_LABELS = [
  { key: 'double', label: 'Chambre double' },
  { key: 'triple', label: 'Chambre triple' },
  { key: 'quad',   label: 'Chambre quad'   },
]

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

export default function PackageCard({ offer, onSelect, isPopular }) {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  if (!offer) return <SkeletonFallback />

  const tierStyle = TIER_STYLES[offer.tier] ?? TIER_STYLES.economique

  const hoverAnimation = {
    boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
    ...(reducedMotion ? {} : { y: -6 }),
  }

  return (
    <motion.div
      className={[
        'relative rounded-2xl border-2 bg-[var(--color-white)] p-8 flex flex-col gap-6 h-full',
        tierStyle.border,
        tierStyle.shadow,
      ].join(' ')}
      whileHover={hoverAnimation}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-black)] text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap z-10"
          aria-label={t('offers.popular')}
        >
          {t('offers.popular')}
        </div>
      )}

      {/* Tier label */}
      <div>
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">
          {t(`offers.tiers.${offer.tier}`)}
        </span>
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">{offer.duration}</p>
      </div>

      {/* Gold divider */}
      <div style={{ width: 32, height: 1, background: 'var(--color-gold)', opacity: 0.5 }} aria-hidden="true" />

      {/* Prices per room type */}
      {offer.prices && (
        <div className="flex flex-col gap-3">
          {ROOM_LABELS.map(({ key, label }, i) => (
            <div key={key}>
              <div className="flex justify-between items-baseline">
                <span className="font-body text-sm text-gray-500">{label}</span>
                <span className="font-display-latin text-2xl font-bold text-[var(--color-text-dark)]">
                  {offer.prices[key].toLocaleString('fr-FR')}
                  <span className="text-base font-medium ml-1">{offer.currency}</span>
                </span>
              </div>
              {i < ROOM_LABELS.length - 1 && (
                <div className="mt-3 border-t border-gray-100" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Gold divider */}
      <div style={{ width: '100%', height: 1, background: 'var(--color-gold)', opacity: 0.15 }} aria-hidden="true" />

      {/* Highlights */}
      {offer.highlights?.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm text-gray-600" aria-label="Services inclus">
          {offer.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] leading-none mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Urgency signal */}
      <p
        className="font-body text-center"
        style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)' }}
      >
        {t('offers.urgency')}
      </p>

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

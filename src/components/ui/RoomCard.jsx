import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

export default function RoomCard({ hotel }) {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const imageHover = reducedMotion ? {} : { scale: 1.05 }

  return (
    <div className="rounded-xl overflow-hidden shadow-[var(--shadow-md)] bg-[var(--color-white)] flex flex-col">
      {/* Header gradient */}
      <div className="h-48 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          whileHover={imageHover}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,168,76,0.35) 0%, rgba(10,10,10,0.85) 100%)',
          }}
        >
          {/* Stars */}
          <div className="flex gap-1" aria-label={`${hotel.stars} étoiles`}>
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <span key={i} className="text-[var(--color-gold)]">
                <StarIcon />
              </span>
            ))}
          </div>
          {/* City name */}
          <span className="font-display-latin text-2xl text-[var(--color-white)] tracking-wide drop-shadow-md select-none">
            {t(hotel.cityKey)}
          </span>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Hotel name */}
        <div>
          <h3 className="font-display-latin text-xl text-[var(--color-text-dark)] leading-snug">
            {hotel.name}
          </h3>
          {hotel.equivalent && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1 italic">
              {t('rooms.equivalent')}
            </p>
          )}
        </div>

        {/* Distance */}
        <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-gold)] font-medium">
          <LocationIcon />
          <span>{t(hotel.distanceKey)}</span>
        </div>

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Équipements">
            {hotel.amenities.map((key) => (
              <li
                key={key}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                {t(key)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

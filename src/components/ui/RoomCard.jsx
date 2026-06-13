import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PersonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
)

export default function RoomCard({ room }) {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const imageHover = reducedMotion ? {} : { scale: 1.05 }

  return (
    <div className="rounded-xl overflow-hidden shadow-[var(--shadow-md)] bg-[var(--color-white)] flex flex-col">
      {/* Image placeholder — replace background with actual room image when available */}
      <div className="h-48 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={imageHover}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,168,76,0.3) 0%, rgba(10,10,10,0.8) 100%)',
          }}
        >
          {/* Replace background with actual room image when available */}
          <span className="font-display-latin text-2xl text-[var(--color-white)] capitalize tracking-wide drop-shadow-md select-none">
            {room.type}
          </span>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Room type heading */}
        <h3 className="font-display-latin text-2xl text-[var(--color-text-dark)] capitalize">
          {room.type}
        </h3>

        {/* Capacity badge */}
        <div className="inline-flex items-center gap-1.5 bg-[var(--color-gray-soft)] text-[var(--color-text-dark)] text-xs font-medium px-3 py-1.5 rounded-full self-start">
          <PersonIcon />
          <span>{t('rooms.capacity', { count: room.capacity })}</span>
        </div>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <ul
            className="flex flex-wrap gap-2"
            aria-label="Équipements"
          >
            {room.amenities.map((amenity) => (
              <li
                key={amenity}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                {amenity}
              </li>
            ))}
          </ul>
        )}

        {/* Price modifier */}
        <div className="mt-auto pt-2">
          {room.priceModifier === 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span aria-hidden="true">✓</span>
              {t('rooms.included')}
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-semibold text-[var(--color-gold)] bg-[var(--color-gold-light)]/20 border border-[var(--color-gold-light)] px-3 py-1.5 rounded-full">
              {t('rooms.from', { amount: room.priceModifier })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

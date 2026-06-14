import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionTitle from '@/components/ui/SectionTitle'

import hiltonBreakfast from '@/assets/Hilton-breakfast.webp'
import hiltonHall from '@/assets/Hilton-hall.webp'
import hiltonDouble from '@/assets/hilton-double-room.webp'
import valyQuad from '@/assets/Valy Quad.webp'
import valyBreakfast from '@/assets/Valy breakfast.webp'
import valyDouble from '@/assets/Valy double.webp'

const SLIDES = [
  { id: 1, src: hiltonHall },
  { id: 2, src: valyDouble },
  { id: 3, src: hiltonDouble },
  { id: 4, src: valyBreakfast },
  { id: 5, src: hiltonBreakfast },
  { id: 6, src: valyQuad },
]

const AMENITY_KEYS = [
  'rooms.amenity_breakfast',
  'rooms.amenity_wifi',
  'rooms.amenity_ac',
  'rooms.amenity_haram',
]

const INTERVAL_MS = 5000

export default function RoomsSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [reducedMotion])

  const slide = SLIDES[current]

  return (
    <section
      id="rooms"
      aria-label={t('rooms.title')}
      className="relative overflow-hidden section-padding"
    >
      {/* Background carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.2, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.78) 100%)',
          }}
        />
      </div>

      {/* Filigrane hôtels — bas gauche */}
      <div className="absolute bottom-4 left-4 z-10 text-left pointer-events-none" aria-hidden="true">
        <p className="text-white/30 text-[11px] leading-relaxed font-body">
          Makkah : Hôtel DoubleTree by Hilton Jabal Omar ou équivalent
        </p>
        <p className="text-white/30 text-[11px] leading-relaxed font-body">
          Madina : Hôtel Valy ou équivalent
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 container-max text-center">
        <SectionTitle
          eyebrow={t('rooms.eyebrow')}
          title={t('rooms.title')}
          subtitle={t('rooms.subtitle')}
          align="center"
          dark={true}
        />

        {/* Amenities list */}
        <ul className="mt-8 flex flex-col items-center gap-3">
          {AMENITY_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-2.5">
              <span className="text-[var(--color-gold)] text-base leading-none" aria-hidden="true">✓</span>
              <span className="text-white text-base sm:text-lg font-medium">{t(key)}</span>
            </li>
          ))}
        </ul>

        {/* Carousel dots */}
        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Diaporama">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Diapositive ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={[
                'h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                i === current
                  ? 'w-6 bg-[var(--color-gold)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

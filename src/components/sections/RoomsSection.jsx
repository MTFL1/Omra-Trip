import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import RoomCard from '@/components/ui/RoomCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { rooms } from '@/data/index'

export default function RoomsSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: reducedMotion ? 0 : 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reducedMotion ? 0.15 : 0.5 },
    },
  }

  return (
    <section
      id="rooms"
      aria-label="Chambres"
      className="section-padding"
      style={{ background: 'var(--color-gray-soft)' }}
    >
      <div className="container-max">
        <SectionTitle
          eyebrow={t('rooms.eyebrow')}
          title={t('rooms.title')}
          subtitle={t('rooms.subtitle')}
          align="center"
          dark={false}
        />

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room) => (
            <motion.div key={room.id} variants={itemVariants}>
              <RoomCard room={room} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

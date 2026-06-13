import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const StarFilled = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="var(--color-gold)"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const StarEmpty = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-gold-light)"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function StarRating({ rating }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} étoile${rating > 1 ? 's' : ''} sur 5`}
    >
      {Array.from({ length: 5 }).map((_, i) =>
        i < filled ? <StarFilled key={i} /> : <StarEmpty key={i} />
      )}
    </div>
  )
}

export default function ReviewCard({ review }) {
  const reducedMotion = useReducedMotion()
  const [isExpanded, setIsExpanded] = useState(false)

  const animationProps = reducedMotion
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.15 },
        viewport: { once: true, margin: '-50px' },
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' },
        viewport: { once: true, margin: '-50px' },
      }

  const initials = getInitials(review.name)

  return (
    <motion.div
      {...animationProps}
      className="rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-md)] flex flex-col gap-4 h-full"
    >
      {/* Header: avatar + name + origin */}
      <div className="flex gap-3 items-center">
        <div
          className="w-10 h-10 rounded-full bg-[var(--color-gold)] text-[var(--color-black)] font-semibold text-sm flex items-center justify-center flex-shrink-0 select-none"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-[var(--color-text-dark)] leading-snug truncate">
            {review.name}
          </span>
          <span className="text-xs text-gray-500 truncate">{review.origin}</span>
        </div>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Package tag */}
      <div>
        <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-gold-light)] text-[var(--color-gold)]">
          {review.package}
        </span>
      </div>

      {/* Review text with expand/collapse */}
      <div className="flex flex-col gap-1">
        <p
          className={[
            'text-sm leading-relaxed text-gray-600',
            isExpanded
              ? ''
              : 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]',
          ].join(' ')}
        >
          {review.text}
        </p>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="self-start text-xs text-[var(--color-gold)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:outline-offset-2 rounded transition-[opacity] duration-[var(--transition-fast)]"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Réduire' : 'Lire plus'}
        </button>
      </div>

      {/* Date pushed to bottom */}
      <time
        dateTime={review.date}
        className="text-xs text-gray-400 mt-auto block"
      >
        {review.date}
      </time>
    </motion.div>
  )
}

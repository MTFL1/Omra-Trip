import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ReviewCard from '@/components/ui/ReviewCard'
import SectionTitle from '@/components/ui/SectionTitle'
import { reviews } from '@/data/index'

// ── EmptyPlaceholder ──────────────────────────────────────────────────────────

function EmptyPlaceholder({ message }) {
  return (
    <div
      className="mt-12 flex items-center justify-center rounded-2xl py-16 px-8 border"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-gold-light) 30%, transparent)',
        background: 'color-mix(in srgb, var(--color-gold) 5%, transparent)',
      }}
    >
      <p
        className="text-center font-body text-base italic"
        style={{ color: 'var(--color-gold-light)' }}
      >
        {message}
      </p>
    </div>
  )
}

// ── NavigationDots ────────────────────────────────────────────────────────────

function NavigationDots({ count, currentIndex, onSelect }) {
  return (
    <div
      className="flex items-center justify-center gap-2 mt-8"
      role="tablist"
      aria-label="Sélectionner un témoignage"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={currentIndex === i}
          aria-label={`Témoignage ${i + 1}`}
          onClick={() => onSelect(i)}
          className="relative flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
          style={{ '--tw-ring-color': 'var(--color-gold)', '--tw-ring-offset-color': 'var(--color-white)' }}
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="block rounded-full"
            style={{
              height: 8,
              width: currentIndex === i ? 24 : 8,
              background:
                currentIndex === i
                  ? 'var(--color-gold)'
                  : 'rgba(201, 168, 76, 0.25)',
            }}
          />
        </button>
      ))}
    </div>
  )
}

// ── ReviewsSection ────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const hasReviews = Array.isArray(reviews) && reviews.length > 0

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  // Advance to the next card, wrapping around
  const next = useCallback(() => {
    if (!hasReviews) return
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }, [hasReviews])

  const prev = useCallback(() => {
    if (!hasReviews) return
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [hasReviews])

  // Auto-scroll — disabled for reduced-motion users
  useEffect(() => {
    if (!hasReviews || reducedMotion || isPaused) return
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [hasReviews, reducedMotion, isPaused, next])

  // Keyboard navigation on the carousel container
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  // Touch / mouse drag helpers
  const handlePointerDown = (e) => {
    setDragStartX(e.clientX ?? e.touches?.[0]?.clientX ?? 0)
    setIsPaused(true)
  }

  const handlePointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const delta = endX - dragStartX
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev()
    }
    // Resume auto-scroll after a short delay so the user's swipe registers
    setTimeout(() => setIsPaused(false), 1200)
  }

  // Build the 3-card visible window (wrapping), used for all breakpoints.
  // CSS grid hides extra cards on smaller screens.
  const getVisibleWindow = () => {
    if (!hasReviews) return []
    return [0, 1, 2].map((offset) => ({
      review: reviews[(currentIndex + offset) % reviews.length],
      slot: offset,
    }))
  }

  const visibleWindow = getVisibleWindow()

  return (
    <section
      id="reviews"
      aria-label="Avis"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-white)' }}
    >
      <div className="container-max relative z-10">
        <SectionTitle
          eyebrow={t('reviews.eyebrow')}
          title={t('reviews.title')}
          subtitle={t('reviews.subtitle')}
          align="center"
          dark={false}
        />

        {!hasReviews ? (
          <EmptyPlaceholder message={t('reviews.soon')} />
        ) : (
          <>
            {/* ── Carousel ── */}
            <div
              className="mt-12 relative select-none outline-none"
              role="region"
              aria-label="Carrousel de témoignages"
              aria-live="polite"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
            >
              {/*
                Grid shows:
                  - 1 card on mobile  (grid-cols-1)
                  - 2 cards on md     (md:grid-cols-2)
                  - 3 cards on lg     (lg:grid-cols-3)
                Cards beyond the visible count are hidden via overflow / CSS.
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleWindow.map(({ review, slot }) => (
                    <motion.div
                      key={`${review.id}-${currentIndex}`}
                      // Hide 2nd+ cards below md, hide 3rd below lg
                      className={[
                        slot === 1 ? 'hidden md:block' : '',
                        slot === 2 ? 'hidden lg:block' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      initial={
                        reducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.96, y: 12 }
                      }
                      animate={
                        reducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1, y: 0 }
                      }
                      exit={
                        reducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.96, y: -12 }
                      }
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      // Active card (slot 0) gets a subtle gold ring highlight
                      style={
                        slot === 0
                          ? {
                              outline: '1px solid color-mix(in srgb, var(--color-gold) 40%, transparent)',
                              borderRadius: '1rem',
                            }
                          : undefined
                      }
                    >
                      <ReviewCard review={review} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Dots navigation ── */}
            <NavigationDots
              count={reviews.length}
              currentIndex={currentIndex}
              onSelect={setCurrentIndex}
            />
          </>
        )}
      </div>
    </section>
  )
}

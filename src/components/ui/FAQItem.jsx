import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  const reducedMotion = useReducedMotion()

  const iconAnimation = reducedMotion
    ? {}
    : { rotate: isOpen ? 45 : 0 }

  const iconTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.2 }

  const answerVariants = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15, ease: 'easeInOut' } },
        exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeInOut' } },
      }
    : {
        initial: { height: 0, opacity: 0 },
        animate: {
          height: 'auto',
          opacity: 1,
          transition: { duration: 0.3, ease: 'easeInOut' },
        },
        exit: {
          height: 0,
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeInOut' },
        },
      }

  return (
    <div className="border-b border-[var(--color-gold-light)]">
      <button
        type="button"
        className={[
          'w-full',
          'flex',
          'justify-between',
          'items-center',
          'py-5',
          'text-left',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[var(--color-gold)]',
          'rounded-sm',
        ].join(' ')}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span
          className="font-display-latin text-xl"
          style={{ color: 'var(--color-text-dark)' }}
        >
          {question}
        </span>

        <motion.span
          className="ml-4 shrink-0 text-2xl leading-none select-none"
          style={{ color: 'var(--color-gold)' }}
          animate={iconAnimation}
          transition={iconTransition}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            className="overflow-hidden"
            variants={answerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

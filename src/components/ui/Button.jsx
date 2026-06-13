import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.076 1.497 5.797L0 24l6.335-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.359-.213-3.722.88.935-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z" />
  </svg>
)

const LoadingSpinner = () => (
  <span
    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    role="status"
    aria-label="Chargement"
  />
)

const variantClasses = {
  primary: [
    'bg-[var(--color-gold)]',
    'text-[var(--color-black)]',
    'font-semibold',
    'border-none',
    'hover:bg-[var(--color-gold-dark)]',
  ].join(' '),
  secondary: [
    'bg-transparent',
    'border-2',
    'border-[var(--color-gold)]',
    'text-[var(--color-gold)]',
    'hover:bg-[var(--color-gold)]',
    'hover:text-[var(--color-black)]',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[var(--color-gold)]',
    'border-none',
    'hover:underline',
  ].join(' '),
  whatsapp: [
    'bg-[#25D366]',
    'text-white',
    'border-none',
    'hover:brightness-90',
  ].join(' '),
}

const sizeClasses = {
  sm: 'text-sm px-4 py-2 rounded-full',
  md: 'text-base px-6 py-3 rounded-full',
  lg: 'text-lg px-8 py-4 rounded-full',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  icon,
  loading = false,
  disabled = false,
}) {
  const reducedMotion = useReducedMotion()
  const tapAnimation = reducedMotion ? {} : { scale: 0.97 }

  const isDisabled = disabled || loading

  const baseClasses = [
    'font-body',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'cursor-pointer',
    'transition-[background-color,color,opacity]',
    '[transition-duration:var(--transition-fast,150ms)]',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-[var(--color-gold)]',
    'focus-visible:outline-offset-[3px]',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    variantClasses[variant] ?? variantClasses.primary,
    sizeClasses[size] ?? sizeClasses.md,
  ].join(' ')

  const resolvedIcon = variant === 'whatsapp' ? <WhatsAppIcon /> : icon

  const content = (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        resolvedIcon && <span className="flex-shrink-0">{resolvedIcon}</span>
      )}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={isDisabled ? undefined : href}
        className={baseClasses}
        whileTap={isDisabled ? {} : tapAnimation}
        aria-disabled={isDisabled || undefined}
        style={{ opacity: loading ? 0.6 : 1 }}
        onClick={isDisabled ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={baseClasses}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? {} : tapAnimation}
      style={{ opacity: loading ? 0.6 : 1 }}
    >
      {content}
    </motion.button>
  )
}

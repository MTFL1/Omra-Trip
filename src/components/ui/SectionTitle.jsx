import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  const prefersReduced = useReducedMotion();

  const isCenter = align === 'center';

  const containerVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const titleColor = dark
    ? 'var(--color-text-light)'
    : 'var(--color-text-dark)';

  const subtitleColor = dark
    ? 'var(--color-text-light)'
    : undefined; // falls back to Tailwind text-gray-500

  return (
    <motion.div
      className={[
        'flex flex-col',
        isCenter ? 'items-center text-center' : 'items-start text-left',
      ].join(' ')}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <span
          className="font-body uppercase tracking-widest mb-3"
          style={{
            color: 'var(--color-gold)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
          }}
        >
          {eyebrow}
        </span>
      )}

      {/* Title */}
      <h2
        className="font-display-latin text-4xl md:text-5xl leading-tight"
        style={{ color: titleColor, fontWeight: 400 }}
      >
        {title}
      </h2>

      {/* Gold underline decoration */}
      <div
        style={{
          width: 48,
          height: 2,
          background: 'var(--color-gold)',
          marginTop: 12,
          marginBottom: 16,
          flexShrink: 0,
          ...(isCenter ? { alignSelf: 'center' } : { alignSelf: 'flex-start' }),
        }}
        aria-hidden="true"
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={[
            'font-body text-lg',
            isCenter ? 'mx-auto' : '',
            dark ? '' : 'text-gray-500',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            maxWidth: '42rem',
            color: dark ? subtitleColor : undefined,
            lineHeight: '1.7',
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;

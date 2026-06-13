import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { offers } from '@/data/index'

const TRIP_DATES = [
  { id: 'd1', label: '2 – 12 juillet 2026' },
  { id: 'd2', label: '16 – 26 juillet 2026' },
  { id: 'd3', label: '6 – 16 août 2026' },
  { id: 'd4', label: '20 – 30 août 2026' },
]

const CITIES = [
  'Paris', 'Bruxelles', 'Genève', 'Casablanca',
]

const ROOMS = [
  { key: 'double', label: 'Double', capacity: '2 pers.' },
  { key: 'triple', label: 'Triple', capacity: '3 pers.' },
  { key: 'quad',   label: 'Quad',   capacity: '4 pers.' },
]

function SelectCard({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 font-body text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
        selected
          ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-text-light)]'
          : 'border-white/10 text-white/60 hover:border-white/30',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function StepLabel({ number, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
        style={{ background: 'var(--color-gold)', color: 'var(--color-black)' }}
      >
        {number}
      </span>
      <span className="font-body text-xs uppercase tracking-[0.15em] font-medium text-[var(--color-gold)]">
        {label}
      </span>
    </div>
  )
}

export default function BookingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [formule, setFormule]   = useState(null)
  const [dateId, setDateId]     = useState(null)
  const [city, setCity]         = useState(null)
  const [roomKey, setRoomKey]   = useState(null)
  const [persons, setPersons]   = useState(1)

  const selectedOffer = useMemo(
    () => offers.find((o) => o.tier === formule) ?? null,
    [formule]
  )

  const pricePerPerson = useMemo(() => {
    if (!selectedOffer?.prices || !roomKey) return null
    return selectedOffer.prices[roomKey]
  }, [selectedOffer, roomKey])

  const totalPrice = pricePerPerson ? pricePerPerson * persons : null

  const selectedDate = TRIP_DATES.find((d) => d.id === dateId)

  const isComplete = formule && dateId && city && roomKey

  function handleSubmit() {
    if (!isComplete) return
    const tierLabel = selectedOffer?.tier === 'economique' ? 'Éco' : 'Premium'
    const roomLabel = ROOMS.find((r) => r.key === roomKey)?.label ?? roomKey
    const lines = [
      `Bonjour, je souhaite réserver une place pour l'Omra Trip :`,
      ``,
      `✦ Formule : ${tierLabel}`,
      `✦ Date : ${selectedDate?.label}`,
      `✦ Départ : ${city}`,
      `✦ Chambre : ${roomLabel}`,
      `✦ Nombre de personnes : ${persons}`,
      totalPrice ? `✦ Prix estimé : ${totalPrice.toLocaleString('fr-FR')} €` : '',
      ``,
      `Merci de me contacter pour finaliser ma réservation.`,
    ].filter((l) => l !== undefined)

    const msg = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/33600000000?text=${msg}`, '_blank')
  }

  return (
    <section
      id="booking"
      aria-label="Réserver"
      className="section-padding"
      style={{ background: 'var(--color-black)' }}
    >
      <div className="container-max">
        <SectionTitle
          eyebrow="Réservation"
          title="Construisez votre voyage"
          subtitle="Sélectionnez vos préférences — nous vous recontactons sur WhatsApp pour finaliser."
          align="center"
          dark={true}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >

          {/* ── Col 1 ── */}
          <div className="flex flex-col gap-8">

            {/* Formule */}
            <div>
              <StepLabel number="1" label="Formule" />
              <div className="grid grid-cols-2 gap-3">
                {offers.map((o) => {
                  const label = o.tier === 'economique' ? 'Éco' : 'Premium'
                  const from  = Math.min(...Object.values(o.prices))
                  return (
                    <SelectCard
                      key={o.tier}
                      selected={formule === o.tier}
                      onClick={() => setFormule(o.tier)}
                    >
                      <span className="block font-semibold text-base">{label}</span>
                      <span className="block text-xs mt-0.5 opacity-60">
                        à partir de {from.toLocaleString('fr-FR')} €
                      </span>
                    </SelectCard>
                  )
                })}
              </div>
            </div>

            {/* Dates */}
            <div>
              <StepLabel number="2" label="Date de départ" />
              <div className="grid grid-cols-1 gap-2">
                {TRIP_DATES.map((d) => (
                  <SelectCard
                    key={d.id}
                    selected={dateId === d.id}
                    onClick={() => setDateId(d.id)}
                  >
                    {d.label}
                  </SelectCard>
                ))}
              </div>
            </div>

          </div>

          {/* ── Col 2 ── */}
          <div className="flex flex-col gap-8">

            {/* Ville départ */}
            <div>
              <StepLabel number="3" label="Ville de départ" />
              <div className="grid grid-cols-2 gap-2">
                {CITIES.map((c) => (
                  <SelectCard
                    key={c}
                    selected={city === c}
                    onClick={() => setCity(c)}
                  >
                    {c}
                  </SelectCard>
                ))}
              </div>
            </div>

            {/* Chambre */}
            <div>
              <StepLabel number="4" label="Type de chambre" />
              <div className="grid grid-cols-3 gap-2">
                {ROOMS.map((r) => {
                  const price = selectedOffer?.prices?.[r.key]
                  return (
                    <SelectCard
                      key={r.key}
                      selected={roomKey === r.key}
                      onClick={() => setRoomKey(r.key)}
                    >
                      <span className="block font-semibold">{r.label}</span>
                      <span className="block text-[11px] mt-0.5 opacity-60">{r.capacity}</span>
                      {price && (
                        <span className="block text-[11px] mt-1 text-[var(--color-gold)]">
                          {price.toLocaleString('fr-FR')} € / pers.
                        </span>
                      )}
                    </SelectCard>
                  )
                })}
              </div>
            </div>

            {/* Nombre de personnes */}
            <div>
              <StepLabel number="5" label="Nombre de personnes" />
              <div
                className="flex items-center gap-4 rounded-xl border-2 border-white/10 px-5 py-3"
                style={{ width: 'fit-content' }}
              >
                <button
                  type="button"
                  onClick={() => setPersons((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors text-lg leading-none"
                  aria-label="Diminuer"
                >
                  −
                </button>
                <span className="font-display-latin text-2xl font-bold text-white w-6 text-center">
                  {persons}
                </span>
                <button
                  type="button"
                  onClick={() => setPersons((p) => Math.min(8, p + 1))}
                  className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors text-lg leading-none"
                  aria-label="Augmenter"
                >
                  +
                </button>
                <span className="text-sm text-white/40 ml-1">personne{persons > 1 ? 's' : ''}</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── Summary + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-10 max-w-5xl mx-auto"
        >
          <div
            className="rounded-2xl border border-[var(--color-gold)]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(201,168,76,0.05)' }}
          >
            {/* Price display */}
            <div>
              {totalPrice ? (
                <>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                    Estimation totale
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-latin text-4xl font-bold text-[var(--color-gold)]">
                      {totalPrice.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-lg text-white/60">€</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">
                    {pricePerPerson?.toLocaleString('fr-FR')} € × {persons} pers.
                  </p>
                </>
              ) : (
                <p className="text-sm text-white/30 italic">
                  Complétez les étapes pour voir le prix estimé
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isComplete}
                className={[
                  'flex items-center gap-3 rounded-full px-7 py-3.5 font-semibold text-sm transition-all duration-200',
                  isComplete
                    ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg hover:shadow-[0_0_24px_rgba(37,211,102,0.4)]'
                    : 'bg-white/5 text-white/20 cursor-not-allowed',
                ].join(' ')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.214a.75.75 0 00.93.93l5.356-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.355l-.355-.21-3.678 1.015 1.015-3.678-.21-.355A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Envoyer sur WhatsApp
              </button>
            </div>
          </div>

          {!isComplete && (
            <p className="text-center text-xs text-white/25 mt-3">
              Sélectionnez la formule, la date, la ville et la chambre pour continuer
            </p>
          )}
        </motion.div>

      </div>
    </section>
  )
}

import { useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import { offers } from '@/data/index'

// availableTiers: which formules are open for this date
const TRIP_DATES = [
  { id: 'd1', label: '2 – 12 juillet 2026',  availableTiers: ['economique', 'premium'] },
  { id: 'd2', label: '16 – 26 juillet 2026', availableTiers: ['premium'] },
  { id: 'd3', label: '6 – 16 août 2026',     availableTiers: ['economique', 'premium'] },
  { id: 'd4', label: '20 – 30 août 2026',    availableTiers: ['premium'] },
]

const ROOMS = [
  { key: 'double', label: 'Double', capacity: '2 pers.' },
  { key: 'triple', label: 'Triple', capacity: '3 pers.' },
  { key: 'quad',   label: 'Quad',   capacity: '4 pers.' },
]

const CITIES = ['Paris', 'Bruxelles', 'Genève', 'Casablanca']

// ── Sub-components ─────────────────────────────────────────────

function StepLabel({ number, label, active }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors duration-200"
        style={{
          background: active ? 'var(--color-gold)' : 'rgba(255,255,255,0.12)',
          color: active ? 'var(--color-black)' : 'rgba(255,255,255,0.3)',
        }}
      >
        {number}
      </span>
      <span
        className={[
          'font-body text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-200',
          active ? 'text-[var(--color-gold)]' : 'text-white/30',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  )
}

function SelectCard({ selected, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        'w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 font-body text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
        disabled
          ? 'border-white/5 text-white/20 cursor-not-allowed bg-white/2'
          : selected
            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-white'
            : 'border-white/10 text-white/60 hover:border-white/30 cursor-pointer',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function LockedOverlay({ label = 'Complétez l\'étape précédente' }) {
  return (
    <p className="text-xs text-white/25 italic mt-1 mb-2">{label}</p>
  )
}

// ── Main component ──────────────────────────────────────────────

export default function BookingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [dateId,  setDateId]  = useState(null)
  const [formule, setFormule] = useState(null)
  const [roomKey, setRoomKey] = useState(null)
  const [city,    setCity]    = useState(null)
  const [persons, setPersons] = useState(1)
  const [name,    setName]    = useState('')

  const selectedDate  = TRIP_DATES.find((d) => d.id === dateId) ?? null
  const selectedOffer = useMemo(() => offers.find((o) => o.tier === formule) ?? null, [formule])

  // Sequential unlock gates
  const canPickFormule = !!dateId
  const canPickRoom    = !!formule
  const canPickCity    = !!roomKey
  const isComplete     = !!dateId && !!formule && !!roomKey && !!city && name.trim().length > 0

  // Reset downstream when upstream changes
  function handleDateChange(id) {
    setDateId(id)
    setFormule(null)
    setRoomKey(null)
    setCity(null)
  }
  function handleFormuleChange(tier) {
    setFormule(tier)
    setRoomKey(null)
    setCity(null)
  }
  function handleRoomChange(key) {
    setRoomKey(key)
    setCity(null)
  }

  const pricePerPerson = useMemo(() => {
    if (!selectedOffer?.prices || !roomKey) return null
    return selectedOffer.prices[roomKey]
  }, [selectedOffer, roomKey])

  const totalPrice = pricePerPerson ? pricePerPerson * persons : null

  function buildMessageLines() {
    const tierLabel = selectedOffer?.tier === 'economique' ? 'Éco' : 'Premium'
    const roomLabel = ROOMS.find((r) => r.key === roomKey)?.label ?? roomKey
    return [
      `Salam alaycom, je suis ${name.trim()}, je souhaite inscrire ${persons} personne${persons > 1 ? 's' : ''} pour la Omra de ${selectedDate?.label}, au départ de ${city}, en formule ${tierLabel}.`,
      ``,
      `✦ Chambre : ${roomLabel}`,
      totalPrice ? `✦ Prix estimé : ${totalPrice.toLocaleString('fr-FR')} € (estimation, non contractuel)` : '',
      ``,
      `Merci de me recontacter pour finaliser ma réservation.`,
    ].filter(Boolean)
  }

  function handleWhatsApp() {
    if (!isComplete) return
    const msg = encodeURIComponent(buildMessageLines().join('\n'))
    window.open(`https://wa.me/32486101473?text=${msg}`, '_blank')
  }

  function handleEmail() {
    if (!isComplete) return
    const subject = encodeURIComponent(`Demande de réservation Omra — ${name.trim()}`)
    const body    = encodeURIComponent(buildMessageLines().join('\n'))
    window.open(`mailto:omratrip@yahoo.com?subject=${subject}&body=${body}`, '_blank')
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
          className="mt-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >

          {/* ══ Colonne gauche : étapes 1-2 ══ */}
          <div className="flex flex-col gap-10">

            {/* ── Étape 1 : Date ── */}
            <div>
              <StepLabel number="1" label="Date de départ" active={true} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {TRIP_DATES.map((d) => (
                  <SelectCard
                    key={d.id}
                    selected={dateId === d.id}
                    onClick={() => handleDateChange(d.id)}
                  >
                    {d.label}
                  </SelectCard>
                ))}
              </div>
            </div>

            {/* ── Étape 2 : Formule ── */}
            <div className={canPickFormule ? '' : 'opacity-40 pointer-events-none'}>
              <StepLabel number="2" label="Formule" active={canPickFormule} />
              {!canPickFormule && <LockedOverlay />}
              <div className="grid grid-cols-2 gap-3">
                {offers.map((o) => {
                  const available = selectedDate?.availableTiers.includes(o.tier) ?? false
                  const label     = o.tier === 'economique' ? 'Éco' : 'Premium'
                  const from      = Math.min(...Object.values(o.prices))
                  return (
                    <SelectCard
                      key={o.tier}
                      selected={formule === o.tier}
                      onClick={() => handleFormuleChange(o.tier)}
                      disabled={!available}
                    >
                      <span className="block font-semibold text-base">{label}</span>
                      {available ? (
                        <span className="block text-xs mt-0.5 opacity-60">
                          à partir de {from.toLocaleString('fr-FR')} €
                        </span>
                      ) : (
                        <span className="block text-xs mt-0.5 text-white/30 italic">
                          Non disponible pour cette date
                        </span>
                      )}
                    </SelectCard>
                  )
                })}
              </div>
            </div>

          </div>

          {/* ══ Colonne droite : étapes 3-5 ══ */}
          <div className="flex flex-col gap-10">

            {/* ── Étape 3 : Chambre ── */}
            <div className={canPickRoom ? '' : 'opacity-40 pointer-events-none'}>
              <StepLabel number="3" label="Type de chambre" active={canPickRoom} />
              {!canPickRoom && <LockedOverlay />}
              <div className="grid grid-cols-3 gap-2">
                {ROOMS.map((r) => {
                  const price = selectedOffer?.prices?.[r.key]
                  return (
                    <SelectCard
                      key={r.key}
                      selected={roomKey === r.key}
                      onClick={() => handleRoomChange(r.key)}
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

            {/* ── Étape 4 : Ville ── */}
            <div className={canPickCity ? '' : 'opacity-40 pointer-events-none'}>
              <StepLabel number="4" label="Ville de départ" active={canPickCity} />
              {!canPickCity && <LockedOverlay />}
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

          {/* ── Étape 5 : Personnes + Nom ── */}
          <div className={canPickCity ? '' : 'opacity-40 pointer-events-none'}>
            <StepLabel number="5" label="Nombre de personnes" active={canPickCity} />
            <div className="flex items-center gap-4 rounded-xl border-2 border-white/10 px-5 py-3 w-fit">
              <button
                type="button"
                onClick={() => setPersons((p) => Math.max(1, p - 1))}
                className="w-11 h-11 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors text-lg leading-none"
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
                className="w-11 h-11 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors text-lg leading-none"
                aria-label="Augmenter"
              >
                +
              </button>
              <span className="text-sm text-white/40 ml-1">
                personne{persons > 1 ? 's' : ''}
              </span>
            </div>

            {/* Nom Prénom */}
            <div className="mt-6">
              <label
                htmlFor="booking-name"
                className="block font-body text-xs uppercase tracking-[0.15em] font-medium text-[var(--color-gold)] mb-1"
              >
                Nom &amp; Prénom
              </label>
              <p className="text-xs text-white/35 mb-3">(une seule personne responsable de la réservation)</p>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Ahmed Benali"
                autoComplete="name"
                className={[
                  'w-full rounded-xl border-2 bg-transparent px-4 py-3 text-sm font-body text-white placeholder-white/25',
                  'outline-none transition-colors duration-200',
                  'focus:border-[var(--color-gold)]',
                  name.trim() ? 'border-[var(--color-gold)]/60' : 'border-white/10',
                ].join(' ')}
              />
            </div>
          </div>

          </div>{/* fin colonne droite */}

        </motion.div>

        {/* ── Récapitulatif + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-10 max-w-5xl mx-auto"
        >
          <div
            className="rounded-2xl border border-[var(--color-gold)]/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'rgba(201,168,76,0.05)' }}
          >
            {/* Prix */}
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
                  Complétez les étapes pour voir l'estimation
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex-shrink-0 flex flex-col gap-3">
              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={!isComplete}
                className={[
                  'flex items-center gap-2.5 rounded-full px-6 py-3 font-semibold text-sm transition-all duration-200',
                  isComplete
                    ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg hover:shadow-[0_0_24px_rgba(37,211,102,0.4)]'
                    : 'bg-white/5 text-white/20 cursor-not-allowed',
                ].join(' ')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.214a.75.75 0 00.93.93l5.356-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.355l-.355-.21-3.678 1.015 1.015-3.678-.21-.355A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Envoyer ma demande sur WhatsApp
              </button>

              {/* Email */}
              <button
                type="button"
                onClick={handleEmail}
                disabled={!isComplete}
                className={[
                  'flex items-center gap-2.5 rounded-full px-6 py-3 font-semibold text-sm transition-all duration-200 border-2',
                  isComplete
                    ? 'border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10'
                    : 'border-white/10 text-white/20 cursor-not-allowed',
                ].join(' ')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Envoyer ma demande par e-mail
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-white/25 mt-3 leading-relaxed">
            {totalPrice
              ? '* Prix indicatif par personne, toutes taxes incluses. Cette estimation ne constitue pas un devis contractuel.'
              : 'Sélectionnez la date, la formule, la chambre, la ville et renseignez votre nom pour continuer.'}
          </p>
        </motion.div>

      </div>
    </section>
  )
}

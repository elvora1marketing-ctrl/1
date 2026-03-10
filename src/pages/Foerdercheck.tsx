import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import CountUp from '../components/CountUp'
import {
  berechneForederung,
  formatEuro,
  type Massnahme,
  type Gebaeudetyp,
  type AktuelleHeizung,
  type Einkommen,
  type FoerderInput,
  type FoerderResult,
} from '../utils/foerderung'
import { easing } from '../utils/animations'

const TOTAL_STEPS = 5

/* ─── Selection Card ─── */
function SelectionCard({
  icon,
  label,
  subtitle,
  selected,
  onClick,
}: {
  icon: string
  label: string
  subtitle?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: easing }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 rounded-card border-2 transition-all text-center cursor-pointer ${
        selected
          ? 'border-accent bg-accent-light shadow-card'
          : 'border-border bg-white hover:border-accent/30 hover:shadow-card'
      }`}
      aria-pressed={selected}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-semibold">{label}</span>
      {subtitle && (
        <span className="text-xs text-secondary mt-1">{subtitle}</span>
      )}
    </motion.button>
  )
}

/* ─── Progress Bar ─── */
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i < step ? 'bg-accent' : i === step ? 'bg-accent/50' : 'bg-border'
          }`}
        />
      ))}
    </div>
  )
}

/* ─── Slide Variants ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

/* ─── Step 1: Maßnahme ─── */
const massnahmen: { id: Massnahme; icon: string; label: string }[] = [
  { id: 'waermepumpe', icon: '🌡️', label: 'Wärmepumpe' },
  { id: 'pellet', icon: '🪵', label: 'Pelletheizung' },
  { id: 'hybrid', icon: '🔄', label: 'Hybridheizung' },
  { id: 'solarthermie', icon: '☀️', label: 'Solarthermie' },
  { id: 'daemmung', icon: '🧱', label: 'Dämmung' },
  { id: 'fenster', icon: '🪟', label: 'Fenster & Türen' },
  { id: 'photovoltaik', icon: '⚡', label: 'Photovoltaik' },
  { id: 'komplettsanierung', icon: '🏠', label: 'Komplettsanierung' },
]

function Step1({
  value,
  onChange,
}: {
  value: Massnahme | null
  onChange: (v: Massnahme) => void
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Was planen Sie?</h2>
      <p className="text-secondary mb-8">Wählen Sie die geplante Maßnahme</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {massnahmen.map((m) => (
          <SelectionCard
            key={m.id}
            icon={m.icon}
            label={m.label}
            selected={value === m.id}
            onClick={() => onChange(m.id)}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Step 2: Gebäude ─── */
const gebaeudetypen: { id: Gebaeudetyp; icon: string; label: string }[] = [
  { id: 'einfamilienhaus', icon: '🏠', label: 'Einfamilienhaus' },
  { id: 'zweifamilienhaus', icon: '🏘️', label: 'Zweifamilienhaus' },
  { id: 'mehrfamilienhaus', icon: '🏢', label: 'Mehrfamilienhaus' },
  { id: 'reihenhaus', icon: '🏡', label: 'Reihenhaus' },
]

function Step2({
  gebaeudetyp,
  baujahr,
  wohnflaeche,
  onChangeTyp,
  onChangeBaujahr,
  onChangeFlaeche,
}: {
  gebaeudetyp: Gebaeudetyp | null
  baujahr: string
  wohnflaeche: string
  onChangeTyp: (v: Gebaeudetyp) => void
  onChangeBaujahr: (v: string) => void
  onChangeFlaeche: (v: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Ihr Gebäude</h2>
      <p className="text-secondary mb-8">Details zu Ihrem Wohngebäude</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {gebaeudetypen.map((g) => (
          <SelectionCard
            key={g.id}
            icon={g.icon}
            label={g.label}
            selected={gebaeudetyp === g.id}
            onClick={() => onChangeTyp(g.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Baujahr</label>
          <input
            type="number"
            placeholder="z.B. 1985"
            value={baujahr}
            onChange={(e) => onChangeBaujahr(e.target.value)}
            min={1800}
            max={2026}
            className="w-full h-[50px] px-4 rounded-input border-[1.5px] border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            Wohnfläche m²
          </label>
          <input
            type="number"
            placeholder="z.B. 140"
            value={wohnflaeche}
            onChange={(e) => onChangeFlaeche(e.target.value)}
            min={20}
            max={5000}
            className="w-full h-[50px] px-4 rounded-input border-[1.5px] border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Step 3: Aktuelle Situation ─── */
const heizungen: { id: AktuelleHeizung; icon: string; label: string }[] = [
  { id: 'gas_alt', icon: '🔥', label: 'Gas/Öl (älter als 20 Jahre)' },
  { id: 'gas_neu', icon: '🔥', label: 'Gas/Öl (jünger als 20 Jahre)' },
  { id: 'nachtspeicher', icon: '⚡', label: 'Nachtspeicherheizung' },
  { id: 'kohle', icon: '🪨', label: 'Kohle/Holz' },
]

function Step3({
  aktuelleHeizung,
  investitionskosten,
  isfpVorhanden,
  onChangeHeizung,
  onChangeKosten,
  onChangeIsfp,
}: {
  aktuelleHeizung: AktuelleHeizung | null
  investitionskosten: string
  isfpVorhanden: boolean
  onChangeHeizung: (v: AktuelleHeizung) => void
  onChangeKosten: (v: string) => void
  onChangeIsfp: (v: boolean) => void
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Aktuelle Situation</h2>
      <p className="text-secondary mb-8">
        Was wird ersetzt und wie hoch ist die geplante Investition?
      </p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {heizungen.map((h) => (
          <SelectionCard
            key={h.id}
            icon={h.icon}
            label={h.label}
            selected={aktuelleHeizung === h.id}
            onClick={() => onChangeHeizung(h.id)}
          />
        ))}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Geplante Investitionskosten (€)
        </label>
        <input
          type="number"
          placeholder="z.B. 35000"
          value={investitionskosten}
          onChange={(e) => onChangeKosten(e.target.value)}
          className="w-full h-[50px] px-4 rounded-input border-[1.5px] border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="isfp"
          checked={isfpVorhanden}
          onChange={(e) => onChangeIsfp(e.target.checked)}
          className="mt-1 w-5 h-5 rounded accent-accent cursor-pointer"
        />
        <div>
          <label htmlFor="isfp" className="text-sm font-semibold cursor-pointer">
            Individueller Sanierungsfahrplan (iSFP) vorhanden
          </label>
          <button
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-alt text-xs text-secondary hover:bg-border transition-colors"
            aria-label="Info zu iSFP"
          >
            ?
          </button>
          {showTooltip && (
            <p className="mt-2 text-xs text-secondary bg-surface-alt p-3 rounded-input">
              Ein iSFP ist ein individueller Sanierungsfahrplan der von einem
              Energieberater erstellt wird und zusätzliche 5% Förderung ermöglicht.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 4: Einkommen ─── */
function Step4({
  einkommen,
  onChange,
}: {
  einkommen: Einkommen | null
  onChange: (v: Einkommen) => void
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Haushaltseinkommen
      </h2>
      <p className="text-secondary mb-8">
        Für die Berechnung einkommensabhängiger Boni
      </p>
      <div className="flex flex-col gap-4">
        <SelectionCard
          icon="💰"
          label="Unter 40.000 €/Jahr"
          subtitle="Berechtigt für zusätzlichen Einkommensbonus"
          selected={einkommen === 'unter40k'}
          onClick={() => onChange('unter40k')}
        />
        <SelectionCard
          icon="💶"
          label="Über 40.000 €/Jahr"
          subtitle="Grundförderung + verfügbare Boni"
          selected={einkommen === 'ueber40k'}
          onClick={() => onChange('ueber40k')}
        />
      </div>
      <p className="mt-6 text-sm text-secondary text-center">
        Ihr Einkommen wird nicht gespeichert.
      </p>
    </div>
  )
}

/* ─── Step 5: Ergebnis ─── */
function Step5({ result }: { result: FoerderResult }) {
  const [showEmail, setShowEmail] = useState(false)

  if (result.hinweis) {
    return (
      <div>
        <div className="rounded-card bg-accent-light p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Hinweis</h2>
          <p className="text-secondary leading-relaxed">{result.hinweis}</p>
        </div>
        <div className="space-y-3">
          <Button fullWidth>Kostenlose Beratung buchen</Button>
          <Link to="/" className="block">
            <Button variant="outline" fullWidth>
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Result hero */}
      <div className="rounded-card bg-gradient-to-br from-accent to-accent-dark p-8 md:p-10 text-center text-white mb-6">
        <p className="text-sm uppercase tracking-wider opacity-85 mb-2">
          Ihre geschätzte Förderung
        </p>
        <div className="text-5xl md:text-[56px] font-bold">
          <CountUp end={result.totalEuro} suffix=" €" />
        </div>
        <p className="text-lg opacity-90 mt-2">{result.prozent}% Fördersatz</p>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-card shadow-card p-6 mb-6">
        <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-4">
          Aufschlüsselung
        </h3>
        <div className="space-y-3">
          {result.breakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-semibold text-accent">+{item.value}%</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-4 pt-4 flex items-center justify-between font-bold">
          <span>Gesamt</span>
          <span className="text-accent">{result.prozent}%</span>
        </div>
        <p className="text-xs text-secondary mt-2">Programm: {result.programm}</p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button fullWidth>Jetzt Antrag starten lassen</Button>
        {!showEmail ? (
          <Button variant="outline" fullWidth onClick={() => setShowEmail(true)}>
            Ergebnis per E-Mail erhalten
          </Button>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="ihre@email.de"
              className="flex-1 h-[52px] px-4 rounded-input border-[1.5px] border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            />
            <Button className="shrink-0">Senden</Button>
          </div>
        )}
        <button className="w-full text-center text-accent underline underline-offset-4 text-sm py-2 hover:text-accent-dark transition-colors">
          Kostenlose Beratung buchen
        </button>
      </div>

      <p className="mt-6 text-xs text-secondary text-center leading-relaxed">
        Unverbindliche Schätzung basierend auf den aktuellen Förderbedingungen.
        Die tatsächliche Förderhöhe kann abweichen.
      </p>
    </div>
  )
}

/* ─── Main Wizard ─── */
export default function Foerdercheck() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  // Form state
  const [massnahme, setMassnahme] = useState<Massnahme | null>(null)
  const [gebaeudetyp, setGebaeudetyp] = useState<Gebaeudetyp | null>(null)
  const [baujahr, setBaujahr] = useState('')
  const [wohnflaeche, setWohnflaeche] = useState('')
  const [aktuelleHeizung, setAktuelleHeizung] = useState<AktuelleHeizung | null>(null)
  const [investitionskosten, setInvestitionskosten] = useState('')
  const [isfpVorhanden, setIsfpVorhanden] = useState(false)
  const [einkommen, setEinkommen] = useState<Einkommen | null>(null)
  const [result, setResult] = useState<FoerderResult | null>(null)

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 0:
        return massnahme !== null
      case 1: {
        const bj = Number(baujahr)
        const wf = Number(wohnflaeche)
        return (
          gebaeudetyp !== null &&
          bj >= 1800 && bj <= 2026 &&
          wf >= 20 && wf <= 5000
        )
      }
      case 2:
        return aktuelleHeizung !== null && Number(investitionskosten) > 0
      case 3:
        return einkommen !== null
      default:
        return false
    }
  }, [step, massnahme, gebaeudetyp, baujahr, wohnflaeche, aktuelleHeizung, investitionskosten, einkommen])

  const goNext = () => {
    if (!canProceed()) return

    if (step === 3) {
      // Calculate result
      const input: FoerderInput = {
        massnahme: massnahme!,
        gebaeudetyp: gebaeudetyp!,
        baujahr: Number(baujahr),
        wohnflaeche: Number(wohnflaeche),
        aktuelleHeizung: aktuelleHeizung!,
        investitionskosten: Number(investitionskosten),
        isfpVorhanden,
        einkommen: einkommen!,
      }
      setResult(berechneForederung(input))
    }

    setDirection(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[640px] mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Förder<span className="text-accent">king</span>
          </Link>
          {step < TOTAL_STEPS - 1 && (
            <span className="text-sm text-secondary">
              Schritt {step + 1} von {TOTAL_STEPS - 1}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-5 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar step={step} />
        </div>

        {/* Back button */}
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <button
            onClick={goBack}
            className="mb-6 text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            ← Zurück
          </button>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: easing }}
          >
            {step === 0 && <Step1 value={massnahme} onChange={setMassnahme} />}
            {step === 1 && (
              <Step2
                gebaeudetyp={gebaeudetyp}
                baujahr={baujahr}
                wohnflaeche={wohnflaeche}
                onChangeTyp={setGebaeudetyp}
                onChangeBaujahr={setBaujahr}
                onChangeFlaeche={setWohnflaeche}
              />
            )}
            {step === 2 && (
              <Step3
                aktuelleHeizung={aktuelleHeizung}
                investitionskosten={investitionskosten}
                isfpVorhanden={isfpVorhanden}
                onChangeHeizung={setAktuelleHeizung}
                onChangeKosten={setInvestitionskosten}
                onChangeIsfp={setIsfpVorhanden}
              />
            )}
            {step === 3 && <Step4 einkommen={einkommen} onChange={setEinkommen} />}
            {step === 4 && result && <Step5 result={result} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation button */}
        {step < TOTAL_STEPS - 1 && (
          <div className="mt-10">
            <Button
              fullWidth
              disabled={!canProceed()}
              onClick={goNext}
            >
              {step === 3 ? 'Ergebnis anzeigen →' : 'Weiter →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

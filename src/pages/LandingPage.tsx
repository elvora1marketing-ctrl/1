import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Section, { SectionHeadline } from '../components/Section'
import Card from '../components/Card'
import Button from '../components/Button'
import CountUp from '../components/CountUp'
import FAQ from '../components/FAQ'
import { fadeInUp, staggerContainer } from '../utils/animations'

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-surface px-5 pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-[56px] font-bold leading-[1.08] tracking-tight max-w-[700px] mx-auto"
        >
          Bis zu 70% Förderung.{' '}
          <span className="text-accent">Wir kümmern uns.</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-base md:text-xl text-secondary max-w-[560px] mx-auto leading-relaxed"
        >
          Finden Sie in 2 Minuten heraus, wie viel Fördergeld Ihnen zusteht – und
          lassen Sie uns den Antrag erledigen.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10">
          <Link to="/foerdercheck">
            <Button size="large">Kostenlos Förderung berechnen →</Button>
          </Link>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="mt-6 flex items-center justify-center gap-4 md:gap-6 text-sm text-secondary"
        >
          <span>✓ Kostenlos</span>
          <span>✓ Unverbindlich</span>
          <span>✓ In 2 Minuten</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Social Proof ─── */
function SocialProof() {
  return (
    <div className="bg-surface-alt py-5 px-5">
      <p className="text-center text-sm text-secondary">
        Zertifizierter Energieberater · BAFA-zugelassen · 500+ Anträge bearbeitet
      </p>
    </div>
  )
}

/* ─── So funktioniert's ─── */
const steps = [
  {
    num: '1',
    icon: '📋',
    title: 'Fördercheck ausfüllen',
    desc: 'Beantworten Sie 5 einfache Fragen zu Ihrem Vorhaben und Gebäude.',
  },
  {
    num: '2',
    icon: '📊',
    title: 'Ergebnis erhalten',
    desc: 'Sofort sehen, welche Förderung Ihnen zusteht und wie hoch sie ausfällt.',
  },
  {
    num: '3',
    icon: '🚀',
    title: 'Wir erledigen den Rest',
    desc: 'Wir stellen den Antrag und begleiten Sie bis zur Auszahlung.',
  },
]

function HowItWorks() {
  return (
    <Section id="so-funktionierts">
      <SectionHeadline>So einfach geht's</SectionHeadline>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step) => (
          <Card key={step.num} className="text-center">
            <div className="text-4xl mb-4">{step.icon}</div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-light text-accent text-sm font-bold mb-3">
              {step.num}
            </div>
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ─── Förderrechner CTA ─── */
function RechnerCTA() {
  return (
    <Section bg="alt">
      <div className="text-center">
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-[40px] font-bold"
        >
          Finden Sie heraus, was Ihnen zusteht
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-secondary text-base md:text-lg max-w-xl mx-auto"
        >
          Unser Förderrechner berechnet Ihre individuelle Förderhöhe in unter 2 Minuten.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8">
          <div className="text-5xl md:text-6xl font-bold text-accent">
            Bis zu <CountUp end={21000} suffix=" €" />
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="mt-8">
          <Link to="/foerdercheck">
            <Button size="large">Jetzt berechnen →</Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}

/* ─── Was wird gefördert ─── */
const foerderungen = [
  { icon: '🌡️', title: 'Wärmepumpe', foerder: 'Bis zu 70% Förderung' },
  { icon: '🪵', title: 'Pelletheizung', foerder: 'Bis zu 70% Förderung' },
  { icon: '🔄', title: 'Hybridheizung', foerder: 'Bis zu 70% Förderung' },
  { icon: '☀️', title: 'Solarthermie', foerder: 'Bis zu 30% Förderung' },
  { icon: '🧱', title: 'Dämmung', foerder: 'Bis zu 20% Förderung' },
  { icon: '🪟', title: 'Fenster & Türen', foerder: 'Bis zu 20% Förderung' },
]

function WasWirdGefoerdert() {
  return (
    <Section id="foerderungen">
      <SectionHeadline>Was wird gefördert?</SectionHeadline>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {foerderungen.map((item) => (
          <Card key={item.title} hoverable className="text-center">
            <div className="text-[40px] mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
            <p className="text-accent font-semibold text-sm">{item.foerder}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ─── Warum Förderking ─── */
const usps = [
  {
    icon: '🎓',
    title: 'Zertifizierter Energieberater',
    desc: 'Keine anonyme Plattform. Echte Expertise durch zertifizierte Energieberatung nach §88 GEG.',
  },
  {
    icon: '💻',
    title: '100% digital',
    desc: 'Kein Papierkram, keine Termine. Alles online – von der Analyse bis zur Einreichung.',
  },
  {
    icon: '💰',
    title: 'Maximale Förderung',
    desc: 'Wir kennen jeden Bonus und jede Kombinationsmöglichkeit. Sie bekommen das Maximum.',
  },
  {
    icon: '🔒',
    title: 'Transparent & fair',
    desc: 'Fixpreise ohne versteckte Kosten. Sie zahlen erst, wenn Sie uns beauftragen.',
  },
]

function WarumFoerderking() {
  return (
    <Section bg="alt">
      <SectionHeadline>Warum Förderking?</SectionHeadline>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usps.map((usp) => (
          <Card key={usp.title}>
            <div className="flex gap-4">
              <span className="text-3xl shrink-0">{usp.icon}</span>
              <div>
                <h3 className="text-lg font-bold mb-1">{usp.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{usp.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ─── Preise ─── */
const pricingPlans = [
  {
    name: 'Förder-Antrag',
    price: '299 €',
    subtitle: 'Für alle, die den Antrag abgeben wollen',
    features: [
      'Kostenloser Fördercheck',
      'Komplette Antragsstellung',
      'Dokumenten-Check',
      'Einreichung bei BAFA/KfW',
      'Status-Updates per E-Mail',
    ],
    recommended: false,
    ctaVariant: 'outline' as const,
  },
  {
    name: 'Rundum-Sorglos',
    price: '799 €',
    subtitle: 'Für maximale Förderung ohne Aufwand',
    features: [
      'Alles aus Förder-Antrag',
      'iSFP-Erstellung',
      'Energieausweis',
      'Handwerker-Vermittlung',
      'Persönliche Begleitung bis Auszahlung',
    ],
    recommended: true,
    ctaVariant: 'primary' as const,
  },
]

function Preise() {
  return (
    <Section id="preise">
      <SectionHeadline subtitle="Keine versteckten Kosten. Zahlen Sie erst wenn Sie beauftragen.">
        Transparente Preise
      </SectionHeadline>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.recommended ? 'border-2 border-accent shadow-card-hover' : ''
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                Empfohlen
              </span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold">{plan.price}</span>
            </div>
            <p className="text-secondary text-sm mt-2">{plan.subtitle}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/foerdercheck">
                <Button variant={plan.ctaVariant} fullWidth>
                  Jetzt starten
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ─── FAQ Section ─── */
function FAQSection() {
  return (
    <Section bg="alt">
      <SectionHeadline>Häufige Fragen</SectionHeadline>
      <FAQ />
    </Section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <Section bg="accent-light" className="!py-24 md:!py-32">
      <div className="text-center">
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-[40px] font-bold">
          Lassen Sie kein Fördergeld liegen.
        </motion.h2>
        <motion.p variants={fadeInUp} className="mt-4 text-secondary text-base md:text-lg">
          Starten Sie jetzt Ihren kostenlosen Fördercheck.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8">
          <Link to="/foerdercheck">
            <Button size="large">Förderung berechnen →</Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}

/* ─── Landing Page ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <RechnerCTA />
      <WasWirdGefoerdert />
      <WarumFoerderking />
      <Preise />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}

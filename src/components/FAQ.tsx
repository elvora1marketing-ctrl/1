import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '../utils/animations'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Ist der Fördercheck wirklich kostenlos?',
    answer: 'Ja, komplett kostenlos und unverbindlich. Sie erfahren sofort, welche Förderung möglich ist.',
  },
  {
    question: 'Welche Förderprogramme deckt ihr ab?',
    answer: 'Wir decken alle relevanten Programme ab: BAFA-Heizungsförderung, KfW-Kredite, Einzelmaßnahmen und Komplettsanierungen.',
  },
  {
    question: 'Wie lange dauert die Antragsbearbeitung?',
    answer: 'Nach Eingang aller Unterlagen reichen wir Ihren Antrag innerhalb von 5 Werktagen ein.',
  },
  {
    question: 'Was passiert wenn mein Antrag abgelehnt wird?',
    answer: 'Ablehnungen sind selten, da wir die Voraussetzungen vorab prüfen. Sollte es dennoch passieren, suchen wir gemeinsam nach Alternativen.',
  },
  {
    question: 'Brauche ich einen Energieberater?',
    answer: 'Für die meisten Förderungen ja – und genau das sind wir. Die Energieberatung ist in unseren Paketen bereits enthalten.',
  },
  {
    question: 'Kann ich den Antrag auch selbst stellen?',
    answer: 'Grundsätzlich ja. Aber die Komplexität der Programme führt oft zu Fehlern oder ungenutzten Boni. Wir holen das Maximum heraus.',
  },
  {
    question: 'Welche Unterlagen brauche ich?',
    answer: 'Nach der Beauftragung erhalten Sie eine individuelle Checkliste. Typisch: Grundriss, Energieverbrauch, Kostenvoranschlag.',
  },
  {
    question: 'Muss ich die Maßnahme schon beauftragt haben?',
    answer: 'Nein! Der Förderantrag muss VOR Beginn der Maßnahme gestellt werden. Deshalb: erst zu uns, dann beauftragen.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className="border-b border-border"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="text-base md:text-lg font-semibold pr-4 group-hover:text-accent transition-colors">
              {faq.question}
            </span>
            <span className="text-2xl text-secondary shrink-0 w-6 text-center leading-none">
              {open === i ? '−' : '+'}
            </span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

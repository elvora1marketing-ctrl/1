import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '../utils/animations'

interface FAQItem {
  question: string
  answer: string
}

interface FAQGroup {
  title: string
  items: FAQItem[]
}

const faqGroups: FAQGroup[] = [
  {
    title: 'Vertrauen & Grundsätzliches',
    items: [
      {
        question: 'Ist der Fördercheck wirklich kostenlos?',
        answer: 'Ja, zu 100%. Sie erfahren sofort, welche Förderung Ihnen zusteht und wie hoch sie ausfällt. Keine Kreditkarte, keine Verpflichtung. Erst wenn Sie uns mit dem Antrag beauftragen, zahlen Sie.',
      },
      {
        question: 'Wer steckt hinter Förderking?',
        answer: 'Förderking wurde von einem zertifizierten Energieberater für Wohngebäude (§88 GEG) gegründet – mit Hintergrund in der Gebäudetechnik und jahrelanger Erfahrung mit BAFA- und KfW-Anträgen. Kein anonymes Callcenter, sondern echte Fachkompetenz.',
      },
      {
        question: 'Seid ihr BAFA-zugelassen?',
        answer: 'Ja. Wir sind als Energieeffizienz-Experten bei der BAFA gelistet und berechtigt, Förderanträge offiziell einzureichen und zu begleiten.',
      },
    ],
  },
  {
    title: 'Warum nicht selbst machen?',
    items: [
      {
        question: 'Kann ich den Antrag nicht einfach selbst stellen?',
        answer: 'Können Sie – aber die Realität zeigt: Die meisten Eigenantragsteller verschenken Geld. Es gibt über 40 Förderprogramme mit unterschiedlichen Voraussetzungen, Boni die kombiniert werden können, und Fristen die sich laufend ändern. Ein vergessener Bonus oder ein Formfehler kann Sie schnell fünfstellige Beträge kosten. Wir machen das jeden Tag und wissen genau, welche Hebel wir für Ihren Fall ziehen müssen. Unsere Servicegebühr von 299€ holen die meisten Kunden schon durch einen einzigen zusätzlichen Bonus wieder rein.',
      },
      {
        question: 'Was bringt es mir konkret, wenn ihr den Antrag stellt statt ich selbst?',
        answer: 'Drei Dinge: Erstens prüfen wir ALLE Bonus-Möglichkeiten für Ihren konkreten Fall – Klimabonus, Geschwindigkeitsbonus, Einkommensbonus, iSFP-Bonus. Die meisten Antragsteller kennen nur die Grundförderung und lassen den Rest liegen. Zweitens machen wir den Antrag fehlerfrei – ein falsches Kreuz oder ein fehlender Nachweis führt zu Verzögerungen oder Ablehnung. Drittens sparen Sie sich Wochen Einarbeitungszeit in Förderbedingungen die sich ständig ändern.',
      },
      {
        question: 'Wie viel mehr Förderung bekomme ich durch euch?',
        answer: 'Das hängt vom Einzelfall ab. Ein typisches Beispiel: Bei einem Heizungstausch auf Wärmepumpe beantragen Selbstantragsteller oft nur die 30% Grundförderung. Mit den richtigen Boni sind bis zu 70% möglich – das sind bei 30.000€ Investitionskosten der Unterschied zwischen 9.000€ und 21.000€. Unser Fördercheck zeigt Ihnen kostenlos, was in Ihrem Fall möglich ist.',
      },
    ],
  },
  {
    title: 'Ablauf & Prozess',
    items: [
      {
        question: 'Wie läuft der Prozess ab?',
        answer: 'Schritt 1: Sie füllen den kostenlosen Fördercheck aus (2 Minuten). Schritt 2: Sie sehen sofort Ihr Ergebnis. Schritt 3: Wenn Sie uns beauftragen, erhalten Sie eine Checkliste mit den benötigten Unterlagen. Schritt 4: Wir erstellen und prüfen den kompletten Antrag. Schritt 5: Wir reichen ein und halten Sie über den Status auf dem Laufenden.',
      },
      {
        question: 'Wie lange dauert die Antragsbearbeitung?',
        answer: 'Nach Eingang aller Unterlagen reichen wir Ihren Antrag innerhalb von 5 Werktagen ein. Die Bearbeitungszeit beim BAFA beträgt aktuell 3-6 Monate – darauf haben wir keinen Einfluss, aber wir sorgen dafür, dass Ihr Antrag vollständig und fehlerfrei eingereicht wird, um Verzögerungen durch Rückfragen zu vermeiden.',
      },
      {
        question: 'Welche Unterlagen brauche ich?',
        answer: 'Nach der Beauftragung erhalten Sie eine individuelle Checkliste für Ihren Fall. Typisch sind: Grundriss oder Wohnflächenberechnung, letzte Heizkostenabrechnung, Kostenvoranschlag des Handwerkers. Kein Grund zur Sorge – wir sagen Ihnen genau was wir brauchen und helfen bei Fragen.',
      },
    ],
  },
  {
    title: 'Risiken & Sicherheit',
    items: [
      {
        question: 'Was passiert wenn mein Antrag abgelehnt wird?',
        answer: 'Ablehnungen sind bei uns extrem selten, weil wir die Voraussetzungen vorab prüfen und den Antrag doppelt kontrollieren bevor er rausgeht. Sollte es trotzdem passieren, analysieren wir den Grund und legen wenn möglich Widerspruch ein oder finden eine alternative Fördermöglichkeit.',
      },
      {
        question: 'Muss ich die Maßnahme schon beauftragt haben?',
        answer: 'Nein – und das ist ein häufiger und teurer Fehler! Der Förderantrag MUSS vor Beginn der Maßnahme gestellt und bewilligt werden. Wer vorher schon den Handwerker beauftragt, verliert den Förderanspruch komplett. Deshalb: Erst zu uns, dann beauftragen.',
      },
      {
        question: 'Was ist wenn sich die Förderbedingungen ändern?',
        answer: 'Genau dafür sind wir da. Förderprogramme ändern sich regelmäßig – neue Boni, geänderte Sätze, neue Fristen. Wir beobachten das täglich und stellen sicher, dass Ihr Antrag nach den aktuellen Bedingungen optimiert ist. Das ist einer der größten Vorteile gegenüber dem Selbermachen.',
      },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  let globalIndex = 0

  return (
    <div className="max-w-2xl mx-auto">
      {faqGroups.map((group) => (
        <div key={group.title} className="mb-8 last:mb-0">
          <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-3 mt-6 first:mt-0">
            {group.title}
          </h3>
          {group.items.map((faq) => {
            const idx = globalIndex++
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="border-b border-border"
              >
                <button
                  onClick={() => setOpen(open === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  aria-expanded={open === idx}
                >
                  <span className="text-base md:text-lg font-semibold pr-4 group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-secondary shrink-0 w-6 text-center leading-none">
                    {open === idx ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {open === idx && (
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
            )
          })}
        </div>
      ))}
    </div>
  )
}

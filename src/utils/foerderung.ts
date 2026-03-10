export type Massnahme =
  | 'waermepumpe'
  | 'pellet'
  | 'hybrid'
  | 'solarthermie'
  | 'daemmung'
  | 'fenster'
  | 'photovoltaik'
  | 'komplettsanierung'

export type Gebaeudetyp = 'einfamilienhaus' | 'zweifamilienhaus' | 'mehrfamilienhaus' | 'reihenhaus'

export type AktuelleHeizung = 'gas_alt' | 'gas_neu' | 'nachtspeicher' | 'kohle'

export type Einkommen = 'unter40k' | 'ueber40k'

export interface FoerderInput {
  massnahme: Massnahme
  gebaeudetyp: Gebaeudetyp
  baujahr: number
  wohnflaeche: number
  aktuelleHeizung: AktuelleHeizung
  investitionskosten: number
  isfpVorhanden: boolean
  einkommen: Einkommen
}

export interface FoerderResult {
  totalEuro: number
  prozent: number
  breakdown: { label: string; value: number }[]
  programm: string
  hinweis?: string
}

interface FoerderSchema {
  base: number
  klimabonus: number
  speedbonus: number
  einkommensbonus: number
  isfpBonus: number
  maxProzent: number
  maxKosten: number
  maxKostenISFP?: number
}

const HEIZUNG_FOERDERUNG: FoerderSchema = {
  base: 30,
  klimabonus: 20,
  speedbonus: 20,
  einkommensbonus: 30,
  isfpBonus: 5,
  maxProzent: 70,
  maxKosten: 30000,
}

const EINZEL_FOERDERUNG: FoerderSchema = {
  base: 15,
  klimabonus: 0,
  speedbonus: 0,
  einkommensbonus: 30,
  isfpBonus: 5,
  maxProzent: 50,
  maxKosten: 30000,
  maxKostenISFP: 60000,
}

const SOLAR_FOERDERUNG: FoerderSchema = {
  base: 30,
  klimabonus: 0,
  speedbonus: 0,
  einkommensbonus: 30,
  isfpBonus: 0,
  maxProzent: 60,
  maxKosten: 30000,
}

function getSchema(massnahme: Massnahme): FoerderSchema | null {
  switch (massnahme) {
    case 'waermepumpe':
    case 'pellet':
    case 'hybrid':
      return HEIZUNG_FOERDERUNG
    case 'solarthermie':
      return SOLAR_FOERDERUNG
    case 'daemmung':
    case 'fenster':
      return EINZEL_FOERDERUNG
    default:
      return null
  }
}

function hatKlimabonus(heizung: AktuelleHeizung): boolean {
  return heizung === 'gas_alt' || heizung === 'nachtspeicher'
}

export function berechneForederung(input: FoerderInput): FoerderResult {
  if (input.massnahme === 'photovoltaik') {
    return {
      totalEuro: 0,
      prozent: 0,
      breakdown: [],
      programm: 'EEG-Einspeisevergütung',
      hinweis: 'Photovoltaik wird über die EEG-Einspeisevergütung gefördert, nicht über BAFA. Kontaktieren Sie uns für eine individuelle Beratung.',
    }
  }

  if (input.massnahme === 'komplettsanierung') {
    return {
      totalEuro: 0,
      prozent: 0,
      breakdown: [],
      programm: 'Individuelle Beratung',
      hinweis: 'Für Komplettsanierungen empfehlen wir eine individuelle Beratung. Kontaktieren Sie uns für ein maßgeschneidertes Angebot.',
    }
  }

  const schema = getSchema(input.massnahme)!
  const breakdown: { label: string; value: number }[] = []
  let totalProzent = 0

  // 1. Grundförderung
  breakdown.push({ label: 'Grundförderung', value: schema.base })
  totalProzent += schema.base

  // 2. Klimabonus
  if (schema.klimabonus > 0 && hatKlimabonus(input.aktuelleHeizung)) {
    breakdown.push({ label: 'Klimabonus', value: schema.klimabonus })
    totalProzent += schema.klimabonus
  }

  // 3. Geschwindigkeitsbonus
  if (schema.speedbonus > 0) {
    breakdown.push({ label: 'Geschwindigkeitsbonus', value: schema.speedbonus })
    totalProzent += schema.speedbonus
  }

  // 4. Einkommensbonus
  if (input.einkommen === 'unter40k') {
    breakdown.push({ label: 'Einkommensbonus', value: schema.einkommensbonus })
    totalProzent += schema.einkommensbonus
  }

  // 5. iSFP-Bonus
  if (schema.isfpBonus > 0 && input.isfpVorhanden) {
    breakdown.push({ label: 'iSFP-Bonus', value: schema.isfpBonus })
    totalProzent += schema.isfpBonus
  }

  // 6. Auf maxProzent deckeln
  const gedeckelt = Math.min(totalProzent, schema.maxProzent)

  // 7. Förderfähige Kosten
  const maxKosten = input.isfpVorhanden && schema.maxKostenISFP
    ? schema.maxKostenISFP
    : schema.maxKosten
  const foerderfaehigeKosten = Math.min(input.investitionskosten, maxKosten)

  // 8. Ergebnis
  const totalEuro = Math.round(foerderfaehigeKosten * (gedeckelt / 100))

  return {
    totalEuro,
    prozent: gedeckelt,
    breakdown,
    programm: input.massnahme === 'solarthermie' ? 'BEG EM – Solarthermie' :
      ['daemmung', 'fenster'].includes(input.massnahme) ? 'BEG EM – Einzelmaßnahmen' :
        'BEG EM – Heizungstausch',
  }
}

export function formatEuro(value: number): string {
  return value.toLocaleString('de-DE')
}

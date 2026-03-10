import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-primary text-white">
      <div className="max-w-container mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              Förder<span className="text-accent">king</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Ihr Partner für maximale Förderung bei energetischer Sanierung. Zertifizierte Energieberatung und vollständige Antragsbearbeitung.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["So funktioniert's", 'Preise', 'Kontakt', 'Blog'].map((label) => (
                <li key={label}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {['Impressum', 'Datenschutz', 'AGB'].map((label) => (
                <li key={label}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 Förderking. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40 border border-white/20 rounded px-2 py-1">
              BAFA-zugelassen
            </span>
            <span className="text-xs text-white/40 border border-white/20 rounded px-2 py-1">
              Zertifiziert nach §88 GEG
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

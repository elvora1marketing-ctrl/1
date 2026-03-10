import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: "So funktioniert's", href: '#so-funktionierts' },
  { label: 'Förderungen', href: '#foerderungen' },
  { label: 'Preise', href: '#preise' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (!isLanding) return
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-nav' : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" className="text-xl font-bold tracking-tight font-satoshi">
          Förder<span className="text-accent">king</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isLanding &&
            navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[15px] text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          <Link
            to="/foerdercheck"
            className="text-[15px] font-semibold border border-accent text-accent rounded-button px-5 py-2.5 hover:bg-accent hover:text-white transition-all"
          >
            Fördercheck starten
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          <span
            className={`block w-5 h-0.5 bg-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {isLanding &&
                navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-[15px] text-secondary py-2"
                  >
                    {link.label}
                  </button>
                ))}
              <Link
                to="/foerdercheck"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-semibold text-center border border-accent text-accent rounded-button px-5 py-3 mt-2"
              >
                Fördercheck starten
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

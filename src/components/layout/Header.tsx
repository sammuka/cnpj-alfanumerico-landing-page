import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Problema', href: '#problem' },
  { label: 'Escopo', href: '#scope' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Funil', href: '#funnel' },
  { label: 'Decisoes', href: '#decisions' },
  { label: 'Distribuicao', href: '#distribution' },
  { label: 'SQL', href: '#sql-catalog' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Docs', href: '#documentation' },
];

export default function Header() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `backdrop-blur-xl border-b ${isDark ? 'bg-bg-deep/85 border-white/[0.06]' : 'bg-white/85 border-black/[0.06]'}`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#hero" className="flex-shrink-0">
          <img
            src="/logo-sistran.png"
            alt="Sistran"
            className="h-8 logo-adaptive"
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === link.href.slice(1)
                  ? `text-text-primary ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className={`ml-2 p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/[0.06]' : 'hover:bg-black/[0.06]'} text-text-secondary hover:text-text-primary`}
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl border-b overflow-hidden ${isDark ? 'bg-bg-deep/95 border-white/[0.06]' : 'bg-white/95 border-black/[0.06]'}`}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? `text-text-primary ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggle}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-text-secondary hover:text-text-primary ${isDark ? 'hover:bg-white/[0.06]' : 'hover:bg-black/[0.06]'}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? 'Tema claro' : 'Tema escuro'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

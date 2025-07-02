import React, { useState, useEffect } from 'react';
import { Menu, X, Atom } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentLanguage, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.products'), href: '#products' },
    { label: t('nav.contact'), href: '#contact' }
  ].filter(item => item.label && item.label.trim() !== '');
  console.log('navItems:', navItems);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-white/80 to-transparent'
      } animate-fade-in-down`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-20 lg:h-24 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <img src="/images/Logo.png" alt="Bagoush Global Logo" className="h-20 w-auto object-contain drop-shadow-lg" />
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-10 ${isRTL ? 'space-x-reverse' : ''}`} aria-label="Desktop Navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-lg font-bold text-black hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 px-2 py-1 rounded-lg ${isRTL ? 'font-arabic' : ''}`}
                tabIndex={0}
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            <a
              href="#contact"
              className={`bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow-glass transition-colors duration-200 border-2 border-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}
              aria-label={t('nav.getQuote')}
            >
              <Atom className="w-6 h-6 mr-2" />
              {t('nav.getQuote')}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className={`lg:hidden flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 w-screen h-screen z-50 bg-black flex flex-col animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Close menu"
            >
              <X size={36} />
            </button>
            {/* Centered Menu Content */}
            <div className="flex flex-col justify-center items-center h-full w-full px-4">
              <nav className={`w-full max-w-xs space-y-6 flex flex-col items-center ${isRTL ? 'text-right' : ''}`} aria-label="Mobile Navigation">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block w-full text-center text-3xl font-extrabold text-white hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 py-2 ${isRTL ? 'font-arabic' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={0}
                    aria-label={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href="#contact"
                className={`mt-8 w-full max-w-xs bg-black text-white px-8 py-5 rounded-full font-extrabold text-2xl shadow-glass transition-colors duration-200 border-2 border-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 flex items-center justify-center gap-2 ${isRTL ? 'font-arabic' : ''}`}
                aria-label={t('nav.getQuote')}
                onClick={() => setIsMenuOpen(false)}
              >
                <Atom className="w-7 h-7 mr-2" />
                {t('nav.getQuote')}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
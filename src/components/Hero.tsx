import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import Lottie from 'lottie-react';
import animationData from '../../public/images/Animation - 1751384680318.json';

const Hero: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 bg-gradient-to-br from-white via-white to-accent/10 animate-fade-in"
      aria-label="Hero Section"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4 text-center md:text-left relative z-10">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="bg-white/70 rounded-3xl shadow-glass p-4 md:p-8 backdrop-blur-xs">
            <Lottie animationData={animationData} loop={true} className="w-64 h-64 md:w-80 md:h-80" />
          </div>
        </div>
        {/* Hero Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <span className="inline-block px-5 py-2 mb-6 bg-accent/20 text-accent font-bold rounded-full shadow-subtle tracking-wide animate-fade-in-up">
            {t('hero.badge')}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up text-black">
            {t('hero.title1')} <span className="text-accent drop-shadow">{t('hero.title2')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-highlight mb-8 animate-fade-in-up max-w-xl">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-10 animate-fade-in-up">
            <a
              href="#services"
              className="bg-black text-white font-bold px-10 py-4 rounded-full shadow-glass text-lg transition hover:bg-white hover:text-black border-2 border-black flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 ripple animate-oscillate"
              aria-label={t('hero.exploreSolutions')}
              style={{ scrollBehavior: 'smooth' }}
            >
              <ArrowRight className="w-6 h-6 mr-2" />
              {t('hero.exploreSolutions')}
            </a>
            <a
              href="#contact"
              className="bg-white text-black font-bold px-10 py-4 rounded-full shadow-glass text-lg transition border-2 border-black hover:bg-black hover:text-white flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 ripple"
              aria-label={t('hero.contactUs')}
              style={{ scrollBehavior: 'smooth' }}
            >
              <Play className="w-6 h-6 mr-2" />
              {t('hero.contactUs')}
            </a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 animate-fade-in-up">
            {[
              { value: '35+', label: t('hero.stats.experience') },
              { value: '500+', label: t('hero.stats.projects') },
              { value: '25+', label: t('hero.stats.countries') },
              { value: '24/7', label: t('hero.stats.support') }
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-xs p-6 rounded-2xl shadow-glass staggered-fade-in border border-accent/20 min-w-[120px]"
                style={{ animationDelay: `${idx * 0.15 + 0.2}s` }}
              >
                <div className="text-3xl font-extrabold text-black flex items-center gap-2"><CheckCircle className="text-accent w-6 h-6" />{stat.value}</div>
                <div className="text-highlight text-base mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
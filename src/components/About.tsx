import React from 'react';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const About: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  const values = [
    {
      icon: Award,
      title: t('about.values.excellence'),
      description: t('about.values.excellenceDesc')
    },
    {
      icon: Users,
      title: t('about.values.expertise'),
      description: t('about.values.expertiseDesc')
    },
    {
      icon: Globe,
      title: t('about.values.global'),
      description: t('about.values.globalDesc')
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation'),
      description: t('about.values.innovationDesc')
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#FAFAFA] animate-fade-in-up">
      <div className="max-w-4xl mx-auto glass-card p-10 animate-fade-in group hover:scale-105 hover:shadow-xl transition-transform duration-300">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">
          {t('about.heading1')} <span className="text-highlight">{t('about.heading2')}</span>
        </h2>
        <p className="text-lg mb-4 text-black">{t('about.description1')}</p>
        <p className="text-lg mb-0 text-black">{t('about.description2')}</p>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="glass-card flex flex-col items-center p-8 rounded-2xl shadow-glass staggered-fade-in group hover:scale-105 hover:shadow-xl transition-transform duration-300 min-w-[180px]"
              style={{ animationDelay: `${idx * 0.15 + 0.2}s` }}
            >
              <value.icon className="w-12 h-12 mb-3 text-highlight transition-transform duration-300 group-hover:scale-110" />
              <div className="font-extrabold text-black mb-2 text-lg text-center">{value.title}</div>
              <div className="text-sm text-black text-center opacity-80">{value.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
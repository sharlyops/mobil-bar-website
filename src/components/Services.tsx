import React from 'react';
import { Settings, Palette, Shield, Truck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const Services: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  const services = [
    {
      icon: Settings,
      title: t('services.micronization.title'),
      description: t('services.micronization.desc'),
      features: [
        t('services.micronization.feature1'),
        t('services.micronization.feature2'),
        t('services.micronization.feature3')
      ],
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Palette,
      title: t('services.coating.title'),
      description: t('services.coating.desc'),
      features: [
        t('services.coating.feature1'),
        t('services.coating.feature2'),
        t('services.coating.feature3')
      ],
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Shield,
      title: t('services.quality.title'),
      description: t('services.quality.desc'),
      features: [
        t('services.quality.feature1'),
        t('services.quality.feature2'),
        t('services.quality.feature3')
      ],
      image: "https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Truck,
      title: t('services.logistics.title'),
      description: t('services.logistics.desc'),
      features: [
        t('services.logistics.feature1'),
        t('services.logistics.feature2'),
        t('services.logistics.feature3')
      ],
      image: "https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-black">
          {currentLanguage.code === 'ar'
            ? t('services.headingFull')
            : (<>{t('services.heading1')} <span className="text-highlight">{t('services.heading2')}</span></>)}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card flex flex-col items-start p-8 staggered-fade-in group hover:scale-105 hover:shadow-xl transition-transform duration-300"
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              <service.icon className="w-12 h-12 mb-4 text-highlight transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-extrabold mb-2 text-black">{service.title}</h3>
              <p className="text-black mb-4 opacity-80">{service.description}</p>
              <ul className="mb-0">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-black text-sm mb-1 opacity-80">{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
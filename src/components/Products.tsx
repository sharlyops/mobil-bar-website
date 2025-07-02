import React from 'react';
import { Package, Palette, Atom, Pill } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const Products: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  const products = [
    {
      icon: Package,
      title: t('products.ground.title'),
      description: t('products.ground.desc'),
      specs: [
        t('products.ground.spec1'),
        t('products.ground.spec2'),
        t('products.ground.spec3')
      ],
      applications: [
        t('products.ground.app1'),
        t('products.ground.app2'),
        t('products.ground.app3'),
        t('products.ground.app4')
      ]
    },
    {
      icon: Palette,
      title: t('products.coated.title'),
      description: t('products.coated.desc'),
      specs: [
        t('products.coated.spec1'),
        t('products.coated.spec2'),
        t('products.coated.spec3')
      ],
      applications: [
        t('products.coated.app1'),
        t('products.coated.app2'),
        t('products.coated.app3'),
        t('products.coated.app4')
      ]
    },
    {
      icon: Atom,
      title: t('products.ultrafine.title'),
      description: t('products.ultrafine.desc'),
      specs: [
        t('products.ultrafine.spec1'),
        t('products.ultrafine.spec2'),
        t('products.ultrafine.spec3')
      ],
      applications: [
        t('products.ultrafine.app1'),
        t('products.ultrafine.app2'),
        t('products.ultrafine.app3'),
        t('products.ultrafine.app4')
      ]
    },
    {
      icon: Pill,
      title: t('products.food.title'),
      description: t('products.food.desc'),
      specs: [
        t('products.food.spec1'),
        t('products.food.spec2'),
        t('products.food.spec3')
      ],
      applications: [
        t('products.food.app1'),
        t('products.food.app2'),
        t('products.food.app3'),
        t('products.food.app4')
      ]
    }
  ];

  return (
    <section id="products" className="py-24 bg-[#FAFAFA] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-black">
          {currentLanguage.code === 'ar'
            ? t('products.headingFull')
            : (<>{t('products.heading1')} <span className="text-highlight">{t('products.heading2')}</span></>)}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="glass-card flex flex-col items-start p-8 staggered-fade-in group hover:scale-105 hover:shadow-xl transition-transform duration-300"
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              <product.icon className="w-12 h-12 mb-4 text-highlight transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-extrabold mb-2 text-black">{product.title}</h3>
              <p className="text-black mb-4 opacity-80">{product.description}</p>
              <ul className="mb-0">
                {product.specs.map((spec, specIndex) => (
                  <li key={specIndex} className="text-black text-sm mb-1 opacity-80">{spec}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.applications.map((app, appIndex) => (
                  <span key={appIndex} className="px-3 py-1 bg-highlight text-black rounded-full text-xs font-medium animate-fade-in-up">{app}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
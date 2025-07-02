import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Atom } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const Footer: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.services.micronization'), href: '#services' },
        { label: t('footer.services.coating'), href: '#services' },
        { label: t('footer.services.quality'), href: '#services' },
        { label: t('footer.services.logistics'), href: '#services' }
      ]
    },
    {
      title: t('footer.products'),
      links: [
        { label: t('footer.products.gcc'), href: '#products' },
        { label: t('footer.products.coated'), href: '#products' },
        { label: t('footer.products.ultrafine'), href: '#products' },
        { label: t('footer.products.food'), href: '#products' }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.company.about'), href: '#about' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-gradient-to-t from-[#e0e7ef] via-[#fafafa] to-white text-black animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4 glass-card p-6 rounded-2xl shadow-subtle">
            <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <img src="/images/Logo.png" alt="Bagoush Global Logo" className="h-16 w-auto object-contain" />
            </div>
            
            <p className={`text-black mb-6 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
              {t('footer.description')}
            </p>
            
            <div className="space-y-3">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3`}>
                <Phone className="w-5 h-5 text-highlight" />
                <span className={`text-black ${isRTL ? 'font-arabic' : ''}`}>+90 312 555 0123</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3`}>
                <Mail className="w-5 h-5 text-highlight" />
                <span className={`text-black ${isRTL ? 'font-arabic' : ''}`}>info@bagoushglobal.com</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3`}>
                <MapPin className="w-5 h-5 text-highlight" />
                <span className={`text-black ${isRTL ? 'font-arabic' : ''}`}>Industrial Zone</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <div key={index} className={isRTL ? 'text-right' : ''}>
                  <h3 className={`font-semibold text-lg mb-4 text-black ${isRTL ? 'font-arabic' : ''}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.href} 
                          className={`text-black hover:text-highlight transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 ${isRTL ? 'font-arabic' : ''}`}
                          tabIndex={0}
                          aria-label={link.label}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E5E5E5] mt-12 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-6 order-1 md:order-2 mt-0 mb-4 md:mb-0 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/80 hover:bg-highlight rounded-lg flex items-center justify-center transition-colors duration-300 group border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2"
                    tabIndex={0}
                  >
                    <social.icon className="w-5 h-5 text-black group-hover:text-highlight" />
                  </a>
                ))}
              </div>
            </div>
            <div className={`text-black text-sm order-2 md:order-1 ${isRTL ? 'font-arabic' : ''}`}>
              © {currentYear} {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const Contact: React.FC = () => {
  const { currentLanguage, isRTL } = useLanguage();
  const t = (key: string) => (translations as any)[key]?.[currentLanguage.code] || key;

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: [t('contact.address1'), t('contact.address2')]
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: ["+90 312 555 0123", "+90 312 555 0124"]
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: ["info@bagoushglobal.com", "sales@bagoushglobal.com"]
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: [t('contact.hours1'), t('contact.hours2')]
    }
  ];

  // Add state for form fields
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setError(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setError('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4 md:px-0 grid md:grid-cols-2 gap-12 items-start">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-black">
            {t('contact.title1')} <span className="text-highlight">{t('contact.title2')}</span>
          </h2>
          <p className="text-lg text-highlight mb-8">{t('contact.subtitle')}</p>
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-black">{t('contact.info')}</h3>
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start mb-4 group">
                <info.icon className="w-7 h-7 mr-4 text-highlight transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="font-semibold mb-1 text-black">{info.title}</div>
                  {info.content.map((line, lineIndex) => (
                    <div key={lineIndex} className="text-black text-sm mb-0 opacity-80">{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card animate-fade-in-up hover:scale-105 hover:shadow-xl transition-transform duration-300">
          {status === 'success' ? (
            <div className="p-10 bg-white rounded-2xl border border-black shadow-subtle flex flex-col items-center justify-center min-h-[300px]">
              <svg className="mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="white" stroke="black" strokeWidth="2"/>
                <path d="M16 24.5L22 30.5L32 18.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-2xl font-bold mb-2 text-black text-center font-display">{t('contact.form.success') || 'Message sent successfully!'}</h3>
              <p className="text-lg text-gray-800 text-center font-sans">{t('contact.form.successDesc') || 'Thank you for contacting us. We will get back to you soon.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-black rounded-lg"
                  placeholder={t('contact.form.firstName')}
                  required
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-black rounded-lg"
                  placeholder={t('contact.form.lastName')}
                  required
                />
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-black rounded-lg mb-4"
                placeholder={t('contact.form.email')}
                required
              />
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-black rounded-lg mb-4"
                placeholder={t('contact.form.company')}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-black rounded-lg mb-4"
                rows={5}
                placeholder={t('contact.form.messagePlaceholder')}
                required
              />
              {status === 'error' && (
                <div className="text-red-600 mb-2 text-center">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white font-bold px-8 py-4 rounded-full shadow-subtle transition hover:bg-highlight hover:text-black border border-black active:scale-95 transition-transform duration-150"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('contact.form.sending') || 'Sending...' : t('contact.form.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { isRTL, currentLanguage } = useLanguage();

  return (
    <div className={`min-h-screen ${isRTL ? 'font-arabic' : ''}`} dir={currentLanguage.direction}>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
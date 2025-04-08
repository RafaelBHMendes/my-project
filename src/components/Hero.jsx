import React from 'react';
import closeContract from '../assets/closeContract.png';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='hero'
      className="relative min-h-screen flex items-center justify-center pt-16"
      style={{
        backgroundImage: `url(${closeContract})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            DOMINUS Assessoria & Estratégias Financeira
          </h1>
          <p
            className="text-xl md:text-2xl mb-10 text-white"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)' }}
          >
            Soluções estratégicas para maximizar seu capital
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

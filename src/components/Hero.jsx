import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#3B0D59] to-[#09153F] text-white min-h-screen flex items-center pt-16">
     
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            DOMINUS Assessoria & Estratégias Financeira
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Soluções estratégicas para maximizar seu capital
          </p>
          {/*<button
            onClick={() => scrollToSection('quem-somos')}
            className="btn bg-secondary hover:bg-yellow-600 text-primary font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Saiba Mais
          </button>*/}
        </div>
      </div>
    </section>
  );
};

export default Hero;

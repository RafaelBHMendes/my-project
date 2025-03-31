import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import logoScrolled from '../assets/logoScrolled.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-primary py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 max-w-screen-xl">
        <div className="logo flex items-center">
          <img 
            src={scrolled ? logoScrolled : logo} 
            alt="DOMINUS Logo" 
            className="h-10 mr-3 transition-all duration-300" 
          />
          <h1 className={`text-xl md:text-2xl font-bold mt-4 ${scrolled ? 'text-primary' : 'text-white'}`}>
            DOMINUS <span className="font-light">Assessoria & Estratégias Financeiras</span>
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection('quem-somos')}
                className={`hover:text-secondary ${scrolled ? 'text-primary' : 'text-white'}`}>
                Quem Somos
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('nucleos-atuacao')}
                className={`hover:text-secondary ${scrolled ? 'text-primary' : 'text-white'}`}>
                Núcleos de Atuação
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('diferenciais')}
                className={`hover:text-secondary ${scrolled ? 'text-primary' : 'text-white'}`}>
                Diferenciais
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contato')}
                className={`hover:text-secondary ${scrolled ? 'text-primary' : 'text-white'}`}>
                Contato
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
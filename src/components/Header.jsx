import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import logoScrolled from '../assets/logoScrolled.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Fecha o menu móvel ao navegar
    }
  };

  return (
    <header
      className={`fixed w-full z-10 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center relative">
        <div className="logo flex items-center">
          <img
            src={scrolled ? logoScrolled : logo}
            alt="DOMINUS Logo"
            className="h-10 mr-3 transition-all duration-300"
          />
          <h1
            className={`text-xl md:text-2xl font-bold mt-4 ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
          >
            DOMINUS
          </h1>
        </div>
        {/* Menu Desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => scrollToSection('quem-somos')}
                className={`hover:text-secondary ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                Quem Somos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('nucleos-atuacao')}
                className={`hover:text-secondary ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                Núcleos de Atuação
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('diferenciais')}
                className={`hover:text-secondary ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                Diferenciais
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contato')}
                className={`hover:text-secondary ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                Contato
              </button>
            </li>
          </ul>
        </nav>
        {/* Botão de Menu Hambúrguer para Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`focus:outline-none ${scrolled ? 'text-black' : 'text-white'}`}
          >
            {menuOpen ? (
              // Ícone "X" para fechar o menu
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ícone de hambúrguer
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Menu Mobile (estilizado e alinhado à direita) */}
        {menuOpen && (
          <nav
            className={`md:hidden absolute right-0 top-full mt-2 shadow-lg rounded-lg w-48 transition-all duration-300 ${
              scrolled ? 'bg-white' : 'bg-gray-900'
            }`}
          >
            <ul className="flex flex-col">
              <li>
                <button
                  onClick={() => scrollToSection('quem-somos')}
                  className={`block px-4 py-2 text-right transition-colors duration-200 ${
                    scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nucleos-atuacao')}
                  className={`block px-4 py-2 text-right transition-colors duration-200 ${
                    scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Núcleos de Atuação
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('diferenciais')}
                  className={`block px-4 py-2 text-right transition-colors duration-200 ${
                    scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Diferenciais
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contato')}
                  className={`block px-4 py-2 text-right transition-colors duration-200 ${
                    scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Contato
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

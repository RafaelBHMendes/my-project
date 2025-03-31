import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg text-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2">DOMINUS</h2>
          <p className="text-lg italic mb-4">Seu patrimônio trabalhando a seu favor.</p>
          <div className="border-t border-gray-600 pt-4 mt-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} DOMINUS Assessoria & Estratégias Financeiras. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
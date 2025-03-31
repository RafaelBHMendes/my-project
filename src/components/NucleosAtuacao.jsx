import React from 'react';

const NucleosAtuacao = () => {
  const nucleos = [
    {
      id: 1,
      title: 'Auto Capitalização',
      description: [
        'Transformar patrimônio em capital de trabalho.',
        'Utilizar bens como garantia para obter crédito com taxas de 0,5% a 0,7% ao mês.'
      ],
      icon: '💰'
    },
    {
      id: 2,
      title: 'Substituir Financiamento',
      description: [
        'Reduzir os juros do financiamento atual.',
        'Exemplo: Parcela de R$20.000 reduzida para R$8.000 a R$9.000.'
      ],
      icon: '📉'
    },
    {
      id: 3,
      title: 'Venda do Crédito',
      description: [
        'Comercializar crédito para liquidez imediata.'
      ],
      icon: '💳'
    }
  ];

  return (
    <section id="nucleos-atuacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-12">
          Nossos Núcleos de Atuação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nucleos.map((nucleo) => (
            <div 
              key={nucleo.id} 
              className="bg-light rounded-lg shadow-lg p-8 transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="text-5xl mb-4 text-center">{nucleo.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-center text-primary">{nucleo.title}</h3>
              <ul className="space-y-2">
                {nucleo.description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NucleosAtuacao; 
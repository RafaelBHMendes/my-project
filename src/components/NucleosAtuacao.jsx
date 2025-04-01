import React from 'react';

const NucleosAtuacao = () => {
  const nucleos = [
    {
      id: 1,
      title: 'AUTO CAPITALIZAÇÃO',
      shortDescription: 'Transforme seu patrimônio em capital com taxas de 0,5% a 0,7% ao mês.',
      bulletPoints: [
        'Menos juros, mais controle',
        'Dinheiro direto na conta',
        'Assessoria especializada'
      ],
      icon: '💰'
    },
    {
      id: 2,
      title: 'SUBSTITUIÇÃO DE FINANCIAMENTO',
      shortDescription: 'Troque financiamentos com juros altos por taxas mais baixas (0,5% a 0,7% ao mês).',
      bulletPoints: [
        'Parcelas reduzidas',
        'Taxa mais previsível',
        'Melhor gestão financeira'
      ],
      icon: '📉'
    },
    {
      id: 3,
      title: 'VENDA DE ATIVOS FINANCEIROS',
      shortDescription: 'Negocie seus ativos para obter lucro imediato e liquidez.',
      bulletPoints: [
        'Liquidez imediata',
        'Valorização do ativo',
        'Transação sem burocracia'
      ],
      icon: '💳'
    }
  ];

  return (
    <section id="nucleos-atuacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nossos Núcleos de Atuação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nucleos.map((nucleo) => (
            <div 
              key={nucleo.id} 
              className="bg-light rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 text-center">{nucleo.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center text-primary">
                {nucleo.title}
              </h3>
              <p className="text-center mb-4">
                {nucleo.shortDescription}
              </p>
              <ul className="mt-4 space-y-2">
                {nucleo.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>{point}</span>
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

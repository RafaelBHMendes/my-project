import React, { useState } from 'react';
import building from '../assets/building.jpg';

// Componente FlipCard encapsula a lógica de flip mantendo o layout original na frente
const FlipCard = ({
  title,
  shortDescription,
  bulletPoints,
  fullText,
  fullBulletPoints,
  icon,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative bg-light rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105 group"
      style={{ perspective: '1000px', minHeight: '400px' }} // tamanho mínimo para o card
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '400px',
        }}
      >
        {/* Frente do card – layout conforme original */}
        <div
          className="absolute inset-0 flex flex-col h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="text-5xl mb-4 text-center">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-center text-primary">
              {title}
            </h3>
            <p className="text-center mb-4 mt-4">{shortDescription}</p>
            <ul className="mt-10 space-y-2">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start justify-center">
                  <span className="text-secondary mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Botão "Ler Mais" centralizado na parte inferior; aparece apenas no hover */}
          <div className="mt-auto  self-center">
            <button
              onClick={() => setFlipped(true)}
              className="mx-auto text-yellow-500 font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'none' }}
            >
              Ler Mais
            </button>
          </div>
        </div>
        {/* Verso do card – sem barra de scroll visível e com texto nítido */}
        <div
          className="absolute inset-0 overflow-y-auto p-8 text-black"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            msOverflowStyle: 'none', // IE and Edge
            scrollbarWidth: 'none', // Firefox
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {/* Oculta a barra de scroll para Webkit */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="hide-scrollbar">
            <h3 className="text-xl font-bold mb-2 text-primary text-center">{title}</h3>
            {fullText.map((para, idx) => (
              <p key={idx} className="mb-2 text-justify text-sm">
                {para}
              </p>
            ))}
            <ul className="mt-4 space-y-2">
              {fullBulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const NucleosAtuacao = () => {
  const nucleos = [
    {
      id: 1,
      title: 'AUTO CAPITALIZAÇÃO',
      shortDescription:
        'Transforme seu patrimônio em capital com taxas de 0,5% a 0,7% ao mês.',
      bulletPoints: [
        'Menos juros, mais controle',
        'Dinheiro direto na conta',
        'Assessoria especializada',
      ],
      fullText: [
        'Seu patrimônio pode ser a chave para o crescimento do seu negócio.',
        'Na DOMINUS, transformamos seu patrimônio parado em capital líquido, colocando o dinheiro diretamente na sua conta com taxas reduzidas de apenas 0,5% a 0,7% ao mês.',
        'Em vez de recorrer a financiamentos com juros altos e burocracia interminável, você pode utilizar seus próprios bens como alavanca financeira.',
      ],
      fullBulletPoints: [
        'Menos juros, mais controle financeiro',
        'Dinheiro direto na conta, sem complicação',
        'Assessoria especializada para a melhor estratégia de crédito',
      ],
      icon: '💰',
    },
    {
      id: 2,
      title: 'SUBSTITUIÇÃO DE FINANCIAMENTO',
      shortDescription:
        'Troque financiamentos com juros altos por taxas mais baixas (0,5% a 0,7% ao mês).',
      bulletPoints: [
        'Parcelas reduzidas',
        'Taxa mais previsível',
        'Melhor gestão financeira',
      ],
      fullText: [
        'Pague menos juros e recupere seu fluxo de caixa.',
        'Se sua empresa está pagando juros abusivos em financiamentos tradicionais, é hora de mudar essa realidade. Na DOMINUS, auxiliamos você a substituir taxas elevadas (ex.: 2,5% ao mês) por soluções financeiras mais inteligentes, com taxas de 0,5% a 0,7% ao mês.',
      ],
      fullBulletPoints: [
        'Reduza suas parcelas e recupere capital',
        'Troque juros altos por uma taxa mais baixa e previsível',
        'Melhore sua gestão financeira sem comprometer seu patrimônio',
      ],
      icon: '📉',
    },
    {
      id: 3,
      title: 'VENDA DE ATIVOS FINANCEIROS',
      shortDescription:
        'Negocie seus ativos para obter lucro imediato e liquidez.',
      bulletPoints: [
        'Liquidez imediata',
        'Valorização do ativo',
        'Transação sem burocracia',
      ],
      fullText: [
        'Converta seu crédito disponível em lucro imediato.',
        'Se você possui um ativo financeiro que não pretende utilizar, saiba que ele pode ser negociado com valorização média de 1,5% a 2% sobre o valor total. Na DOMINUS, conectamos você a compradores interessados, garantindo uma venda rápida, segura e altamente rentável.',
      ],
      fullBulletPoints: [
        'Liquidez imediata, dinheiro direto na conta',
        'Valorização do ativo, aumentando seu retorno financeiro',
        'Transação segura e sem burocracia',
      ],
      icon: '📈',
    },
  ];

  return (
    <section id="nucleos-atuacao" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nossos Núcleos de Atuação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nucleos.map((nucleo) => (
            <FlipCard
              key={nucleo.id}
              title={nucleo.title}
              shortDescription={nucleo.shortDescription}
              bulletPoints={nucleo.bulletPoints}
              fullText={nucleo.fullText}
              fullBulletPoints={nucleo.fullBulletPoints}
              icon={nucleo.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NucleosAtuacao;

import React from 'react';

const Diferenciais = () => {
  const diferenciais = [
    {
      id: 1,
      title: 'Redução de custos financeiros',
      icon: '📊'
    },
    {
      id: 2,
      title: 'Soluções personalizadas',
      icon: '🔍'
    },
    {
      id: 3,
      title: 'Assessoria especializada em crédito e estratégias financeiras',
      icon: '💼'
    },
    {
      id: 4,
      title: 'Mais de 70 empresas parceiras e R$300 milhões em recursos trabalhados',
      icon: '🤝'
    },
    {
      id: 5,
      title: 'Atuação nacional',
      icon: '🌎'
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Nossos Diferenciais
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diferenciais.map((diferencial) => (
              <div key={diferencial.id} className="flex items-start p-4 bg-dark-bg bg-opacity-30 rounded-lg">
                <div className="text-3xl mr-4 text-secondary">{diferencial.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{diferencial.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diferenciais; 
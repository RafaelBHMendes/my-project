import React, { useMemo, useState } from 'react';
import {
  PRAZO_ANOS_MAX,
  PRAZO_ANOS_MIN,
  formatBRL,
  formatPercent,
  simularAquisicao,
  simularSubstituicao,
  urlWhatsApp,
} from '../lib/simulacao';

const abas = [
  { id: 'aquisicao', label: 'Aquisição de bem' },
  { id: 'substituicao', label: 'Substituir financiamento' },
];

function GraficoComparativo({ totalBanco, totalDominus, ganho }) {
  const max = Math.max(totalBanco, totalDominus, 1);
  const hBanco = (totalBanco / max) * 140;
  const hDominus = (totalDominus / max) * 140;

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-4 text-center">
        Comparativo de custo total estimado
      </p>
      <div className="flex items-end justify-center gap-10 h-44">
        <div className="flex flex-col items-center w-24">
          <span className="text-xs font-medium mb-2 text-gray-700">
            {formatBRL(totalBanco)}
          </span>
          <div
            className="w-16 rounded-t-md bg-red-400/80 transition-all duration-500"
            style={{ height: `${Math.max(8, hBanco)}px` }}
            title="Lá fora"
          />
          <span className="text-xs mt-2 text-center font-semibold text-gray-800">
            Lá fora
          </span>
        </div>
        <div className="flex flex-col items-center w-24">
          <span className="text-xs font-medium mb-2 text-primary">
            {formatBRL(totalDominus)}
          </span>
          <div
            className="w-16 rounded-t-md bg-primary transition-all duration-500"
            style={{ height: `${Math.max(8, hDominus)}px` }}
            title="DOMINUS"
          />
          <span className="text-xs mt-2 text-center font-semibold text-primary">
            DOMINUS
          </span>
        </div>
      </div>
      {ganho > 0 && (
        <p className="text-center mt-4 text-lg font-bold text-green-700">
          Você pode economizar cerca de {formatBRL(ganho)}
        </p>
      )}
    </div>
  );
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';

const Simuladores = () => {
  const [aba, setAba] = useState('aquisicao');
  const [valor, setValor] = useState('100000');
  const [lancePercent, setLancePercent] = useState('20');
  const [prazoAnos, setPrazoAnos] = useState(String(PRAZO_ANOS_MIN));
  const [taxaAtual, setTaxaAtual] = useState('2.5');
  const [parcelaAtual, setParcelaAtual] = useState('');

  const resultado = useMemo(() => {
    const input = {
      valor: Number(String(valor).replace(/\./g, '').replace(',', '.')) || 0,
      lancePercent: Number(String(lancePercent).replace(',', '.')) || 0,
      prazoAnos: Number(prazoAnos) || PRAZO_ANOS_MIN,
      taxaAtual: Number(String(taxaAtual).replace(',', '.')) || 0,
      parcelaAtual: Number(String(parcelaAtual).replace(/\./g, '').replace(',', '.')) || 0,
    };

    if (aba === 'substituicao') {
      return simularSubstituicao(input);
    }
    return simularAquisicao(input);
  }, [aba, valor, lancePercent, prazoAnos, taxaAtual, parcelaAtual]);

  const scrollToContato = () => {
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="simuladores" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-4">
          Simule sua carta de crédito
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Compare o custo estimado no mercado com a solução DOMINUS. Valores iniciais
          são aproximados (placeholder) e serão refinados com a tabela oficial.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {abas.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setAba(item.id)}
              className={`px-5 py-2 rounded-md font-semibold transition-colors ${
                aba === item.id
                  ? 'bg-primary text-white'
                  : 'bg-light text-primary hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-light rounded-lg p-6 md:p-8 shadow-sm space-y-4">
            <Campo label="Valor do crédito / bem (R$)">
              <input
                type="number"
                min="1000"
                step="1000"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className={inputClass}
              />
            </Campo>

            <Campo label="Entrada / lance (%)">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={lancePercent}
                onChange={(e) => setLancePercent(e.target.value)}
                className={inputClass}
              />
            </Campo>

            <Campo label={`Prazo (${PRAZO_ANOS_MIN} a ${PRAZO_ANOS_MAX} anos)`}>
              <select
                value={prazoAnos}
                onChange={(e) => setPrazoAnos(e.target.value)}
                className={inputClass}
              >
                {Array.from(
                  { length: PRAZO_ANOS_MAX - PRAZO_ANOS_MIN + 1 },
                  (_, i) => PRAZO_ANOS_MIN + i
                ).map((anos) => (
                  <option key={anos} value={anos}>
                    {anos} anos ({anos * 12} parcelas)
                  </option>
                ))}
              </select>
            </Campo>

            {aba === 'substituicao' && (
              <>
                <Campo label="Taxa atual do financiamento (% a.m.)">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={taxaAtual}
                    onChange={(e) => setTaxaAtual(e.target.value)}
                    className={inputClass}
                    placeholder="Ex.: 2,5"
                  />
                </Campo>
                <Campo label="Parcela atual (R$) — opcional">
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={parcelaAtual}
                    onChange={(e) => setParcelaAtual(e.target.value)}
                    className={inputClass}
                    placeholder="Se informar, usamos este valor"
                  />
                </Campo>
              </>
            )}

            <p className="text-xs text-gray-500 pt-2">
              A taxa administrativa estimada na DOMINUS fica em até{' '}
              {formatPercent(0.01)} a.m., variando principalmente conforme o lance.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-4 text-center">
              Resultado estimado
            </h3>

            <dl className="space-y-3 text-sm md:text-base">
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="text-gray-600">Lance</dt>
                <dd className="font-semibold">
                  {resultado.lancePercent}% · {formatBRL(resultado.lanceValor)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="text-gray-600">Taxa admin DOMINUS (est.)</dt>
                <dd className="font-semibold">{formatPercent(resultado.taxaAdmin)} a.m.</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="text-gray-600">Parcela DOMINUS</dt>
                <dd className="font-semibold text-primary">
                  {formatBRL(resultado.parcelaDominus)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="text-gray-600">Parcela lá fora / atual</dt>
                <dd className="font-semibold">{formatBRL(resultado.parcelaBanco)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="text-gray-600">Total DOMINUS</dt>
                <dd className="font-semibold">{formatBRL(resultado.totalDominus)}</dd>
              </div>
              <div className="flex justify-between gap-4 pb-2">
                <dt className="text-gray-600">Total lá fora / atual</dt>
                <dd className="font-semibold">{formatBRL(resultado.totalBanco)}</dd>
              </div>
            </dl>

            <GraficoComparativo
              totalBanco={resultado.totalBanco}
              totalDominus={resultado.totalDominus}
              ganho={resultado.ganho}
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={urlWhatsApp(resultado)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
              >
                Falar no WhatsApp com esta simulação
              </a>
              <button
                type="button"
                onClick={scrollToContato}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary hover:bg-dark-bg text-white font-semibold transition-colors"
              >
                Ver contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simuladores;

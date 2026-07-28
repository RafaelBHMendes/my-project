/**
 * Fórmulas placeholder — serão refinadas com a tabela real da DOMINUS.
 * Taxa admin: até ~1% a.m. equivalente diluído; o lance é o fator principal do custo.
 */

export const PRAZO_ANOS_MIN = 5;
export const PRAZO_ANOS_MAX = 8;
export const TAXA_ADMIN_MAX = 0.01; // 1% a.m. teto placeholder
export const TAXA_BANCO_MEDIA_PLACEHOLDER = 0.025; // 2,5% a.m. média "lá fora"

/** Taxa admin placeholder: sobe um pouco com lance baixo e desce com lance alto (máx 1%). */
export function taxaAdminPlaceholder(lancePercent) {
  const lance = Math.min(100, Math.max(0, Number(lancePercent) || 0));
  // 1% com lance 0 → ~0,55% com lance 45%
  const taxa = TAXA_ADMIN_MAX - lance * 0.0001;
  return Math.min(TAXA_ADMIN_MAX, Math.max(0.005, taxa));
}

/** Parcela Price (sistema de amortização). */
export function parcelaPrice(principal, taxaMensal, meses) {
  if (meses <= 0 || principal <= 0) return 0;
  if (taxaMensal <= 0) return principal / meses;
  const fator = (1 + taxaMensal) ** meses;
  return (principal * taxaMensal * fator) / (fator - 1);
}

export function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatPercent(taxa) {
  return `${(taxa * 100).toFixed(2).replace('.', ',')}%`;
}

/**
 * Simulador 1 — aquisição de bem / carta de crédito
 * @param {{ valor: number, lancePercent: number, prazoAnos: number }} input
 */
export function simularAquisicao({ valor, lancePercent, prazoAnos }) {
  const credito = Math.max(0, Number(valor) || 0);
  const lancePct = Math.min(100, Math.max(0, Number(lancePercent) || 0));
  const anos = Math.min(PRAZO_ANOS_MAX, Math.max(PRAZO_ANOS_MIN, Number(prazoAnos) || PRAZO_ANOS_MIN));
  const meses = anos * 12;

  const lanceValor = credito * (lancePct / 100);
  const taxaAdmin = taxaAdminPlaceholder(lancePct);
  const saldoDominus = Math.max(0, credito - lanceValor);
  const parcelaDominus = parcelaPrice(saldoDominus, taxaAdmin, meses);
  const totalDominus = lanceValor + parcelaDominus * meses;

  const parcelaBanco = parcelaPrice(credito, TAXA_BANCO_MEDIA_PLACEHOLDER, meses);
  const totalBanco = parcelaBanco * meses;

  const ganho = Math.max(0, totalBanco - totalDominus);

  return {
    tipo: 'aquisicao',
    credito,
    meses,
    prazoAnos: anos,
    lancePercent: lancePct,
    lanceValor,
    taxaAdmin,
    parcelaDominus,
    totalDominus,
    taxaBanco: TAXA_BANCO_MEDIA_PLACEHOLDER,
    parcelaBanco,
    totalBanco,
    ganho,
  };
}

/**
 * Simulador 2 — substituição de financiamento abusivo
 * Cliente informa taxa e/ou parcela atual.
 * @param {{ valor: number, lancePercent: number, prazoAnos: number, taxaAtual?: number, parcelaAtual?: number }} input
 */
export function simularSubstituicao({
  valor,
  lancePercent,
  prazoAnos,
  taxaAtual,
  parcelaAtual,
}) {
  const base = simularAquisicao({ valor, lancePercent, prazoAnos });
  const credito = base.credito;
  const meses = base.meses;

  const taxaInformada = Number(taxaAtual);
  const parcelaInformada = Number(parcelaAtual);

  let parcelaBanco;
  let taxaBanco;
  let totalBanco;

  if (parcelaInformada > 0) {
    parcelaBanco = parcelaInformada;
    totalBanco = parcelaInformada * meses;
    // taxa implícita aproximada (placeholder) — não resolve IRR de verdade ainda
    taxaBanco = taxaInformada > 0 ? taxaInformada / 100 : TAXA_BANCO_MEDIA_PLACEHOLDER;
  } else if (taxaInformada > 0) {
    taxaBanco = taxaInformada / 100;
    parcelaBanco = parcelaPrice(credito, taxaBanco, meses);
    totalBanco = parcelaBanco * meses;
  } else {
    taxaBanco = TAXA_BANCO_MEDIA_PLACEHOLDER;
    parcelaBanco = parcelaPrice(credito, taxaBanco, meses);
    totalBanco = parcelaBanco * meses;
  }

  const ganho = Math.max(0, totalBanco - base.totalDominus);

  return {
    ...base,
    tipo: 'substituicao',
    taxaBanco,
    parcelaBanco,
    totalBanco,
    ganho,
  };
}

export function montarMensagemWhatsApp(resultado) {
  const titulo =
    resultado.tipo === 'substituicao'
      ? 'Simulação — Substituição de financiamento'
      : 'Simulação — Aquisição / carta de crédito';

  return [
    `Olá! Vim pelo site da DOMINUS.`,
    titulo,
    `Crédito: ${formatBRL(resultado.credito)}`,
    `Prazo: ${resultado.prazoAnos} anos (${resultado.meses} meses)`,
    `Lance: ${resultado.lancePercent}% (${formatBRL(resultado.lanceValor)})`,
    `Parcela DOMINUS (est.): ${formatBRL(resultado.parcelaDominus)}`,
    `Total DOMINUS (est.): ${formatBRL(resultado.totalDominus)}`,
    `Total mercado/atual (est.): ${formatBRL(resultado.totalBanco)}`,
    `Economia estimada: ${formatBRL(resultado.ganho)}`,
    `(Valores placeholder — sujeito a análise.)`,
  ].join('\n');
}

export const WHATSAPP_NUMERO = '5588992391516';

export function urlWhatsApp(resultado) {
  const text = encodeURIComponent(montarMensagemWhatsApp(resultado));
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMERO}&text=${text}&type=phone_number&app_absent=0`;
}

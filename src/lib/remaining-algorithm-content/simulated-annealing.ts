import type { RemainingAlgorithmContent } from './types';

export const simulatedAnnealingContent: RemainingAlgorithmContent = {
  title: 'Simulated Annealing',
  category: 'Optimizasyon Algoritmaları',
  categoryHref: '/algorithms/optimization-algorithms',
  family: 'Metaheuristics / Stochastic Optimization',
  difficulty: 'Zor',
  sources: ['Kirkpatrick 1983', 'MathWorks', 'Cornell Optimization Wiki'],
  summary:
    'Sıcaklık kontrollü olasılıkla kötü hamleleri de kabul ederek lokal optimumlardan kaçmaya çalışan stokastik optimizasyon yöntemidir.',
  descriptionParagraphs: [
    'Simulated annealing, metalurjide kontrollü soğutma fikrinden esinlenir. Başlangıçta sıcaklık yüksek tutulur ve arama daha geniş hareket eder; sıcaklık düştükçe kötü hamleleri kabul etme olasılığı azalır.',
    'Kirkpatrick, Gelatt ve Vecchi çalışması bu analojiyi büyük ve karmaşık optimizasyon problemleri için çerçeve haline getirir.',
  ],
  sourceNotes: [
    'Kirkpatrick 1983: annealing analojisi büyük ve karmaşık sistemlerin optimizasyonu için çerçeve sağlar.',
    'MathWorks: acceptance olasılığı delta ve sıcaklığa bağlıdır; sıcaklık küçüldükçe kabul olasılığı düşer.',
    'Cornell Optimization Wiki: SA büyük arama uzaylarında yaklaşık çözüm bulan probabilistic tekniktir.',
  ],
  steps: [
    'Başlangıç çözümü, sıcaklık ve soğutma planını belirle.',
    'Mevcut çözüme yakın rastgele bir aday üret.',
    'Aday daha iyiyse kabul et.',
    'Aday daha kötüyse exp(-delta/T) olasılığıyla kabul et.',
    'Sıcaklığı düşür ve durma koşuluna kadar devam et.',
  ],
  pseudocode: `SIMULATED-ANNEALING(state, temperature)
  best <- state
  while temperature > minimum
    candidate <- random neighbor(state)
    delta <- energy(candidate) - energy(state)
    if delta <= 0 or random() < exp(-delta / temperature)
      state <- candidate
      if energy(state) < energy(best)
        best <- state
    temperature <- cool(temperature)
  return best`,
  codeExamples: {
    typescript: `function acceptMove(delta: number, temp: number): boolean {
  return delta <= 0 || Math.random() < Math.exp(-delta / temp);
}
function simulatedAnnealing(start: number, target: number): number {
  let current = start, best = current, temp = 10.0;
  const coolingRate = 0.95;
  while (temp > 0.01) {
    const candidate = current + (Math.random() < 0.5 ? -1 : 1);
    const delta = Math.abs(target - candidate) - Math.abs(target - current);
    if (acceptMove(delta, temp)) {
      current = candidate;
      if (Math.abs(target - current) < Math.abs(target - best)) { best = current; }
    }
    temp *= coolingRate;
  }
  return best;
}`,
  },
  demo: {
    kind: 'simulated-annealing',
    title: 'Simulated Annealing Demo',
    description: 'Başlangıç ve hedef değerini girin. Örnek: 0; 37',
    placeholder: '0; 37',
  },
  timeComplexity: {
    best: 'O(I * C)',
    average: 'O(I * C)',
    worst: 'O(I * C)',
  },
  spaceComplexity: 'O(1)',
  analysisTitle: 'Sıcaklık ve Kabul',
  analysisPoints: [
    'I iterasyon sayısı, C aday/enerji hesaplama maliyetidir.',
    'Sıcaklık yüksekken kötü hamleler daha sık kabul edilir.',
    'Cooling schedule çok hızlıysa algoritma lokal optimumda takılabilir.',
  ],
  advantages: [
    'Lokal optimumlardan kaçmak için kötü hamleleri kontrollü kabul eder.',
    'Büyük ve ayrık arama uzaylarında uygulanabilir.',
    'Tek aday çözüm tuttuğu için bellek kullanımı düşüktür.',
  ],
  disadvantages: [
    'Optimal sonuç garantisi pratik zaman bütçesinde yoktur.',
    'Sıcaklık, komşuluk ve soğutma planı probleme duyarlıdır.',
    'Yavaş soğutma daha iyi sonuç verebilir ama maliyeti artırır.',
  ],
  relatedAlgorithms: [
    {
      title: 'Genetic Algorithms',
      description: 'Popülasyon tabanlı evrimsel arama yapar.',
      href: '/algorithms/optimization-algorithms/genetic-algorithms',
    },
    {
      title: 'Local Search',
      description: 'Komşu çözümler arasında iyileştirme arayan temel yöntemdir.',
    },
    {
      title: '2-opt for TSP',
      description: 'Komşuluk hamleleriyle rota iyileştiren sezgisel optimizasyon yaklaşımıdır.',
    },
  ],
};

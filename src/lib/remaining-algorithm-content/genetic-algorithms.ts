import type { RemainingAlgorithmContent } from './types';

export const geneticAlgorithmsContent: RemainingAlgorithmContent = {
  title: 'Genetic Algorithms',
  category: 'Optimizasyon Algoritmaları',
  categoryHref: '/algorithms/optimization-algorithms',
  family: 'Metaheuristics / Evolutionary Search',
  difficulty: 'Zor',
  sources: ['Whitley Tutorial', 'MathWorks'],
  summary:
    'Popülasyon, fitness, seçim, crossover ve mutasyon adımlarıyla çözüm uzayında evrimsel arama yapan metasezgisel yöntemdir.',
  descriptionParagraphs: [
    'Whitley tutorial, genetic algorithms ailesini evrimden esinlenen hesaplama modelleri olarak tanımlar: potansiyel çözümler chromosome-like veri yapılarıyla kodlanır ve iyi çözümlere daha fazla üreme fırsatı verilir.',
    'Tipik akışta başlangıç popülasyonu üretilir, her birey fitness fonksiyonuyla değerlendirilir, daha iyi bireyler seçilir, crossover ile ebeveyn parçaları birleştirilir ve mutation ile çeşitlilik korunur.',
  ],
  sourceNotes: [
    'Whitley: genetic algorithms population-based modeldir; çözümler chromosome-like yapılarda kodlanır.',
    'Whitley: daha iyi çözümler daha fazla reproduce şansı alır.',
    'MathWorks: crossover iyi genleri recombine eder, mutation diversity sağlar.',
  ],
  steps: [
    'Çözümü temsil eden chromosome formatını ve fitness fonksiyonunu tanımla.',
    'Başlangıç popülasyonu üret.',
    'Her bireyin fitness değerini hesapla.',
    'Seçim mekanizmasıyla ebeveynleri belirle.',
    'Crossover ve mutation ile yeni nesli üret.',
    'Durma koşulu sağlanana kadar döngüyü sürdür.',
  ],
  pseudocode: `GENETIC-ALGORITHM()
  population <- random chromosomes
  repeat until stopping condition
    evaluate fitness of population
    parents <- select fitter chromosomes
    children <- crossover(parents)
    mutate(children)
    population <- survivor selection(population, children)
  return best chromosome`,
  codeExamples: {
    typescript: `function getFitness(candidate: string, target: string): number {
  let score = 0;
  for (let i = 0; i < candidate.length; i++) { if (candidate[i] === target[i]) score++; }
  return score;
}
function crossover(parentA: string, parentB: string): string {
  const midpoint = Math.floor(Math.random() * parentA.length);
  return parentA.slice(0, midpoint) + parentB.slice(midpoint);
}
function mutate(candidate: string, rate: number, alphabet: string): string {
  const chars = [...candidate];
  for (let i = 0; i < chars.length; i++) {
    if (Math.random() < rate) { chars[i] = alphabet[Math.floor(Math.random() * alphabet.length)]; }
  }
  return chars.join('');
}
function geneticAlgorithm(target: string, alphabet = '01', size = 100, rate = 0.01): string {
  let pop: string[] = Array.from({ length: size }, () =>
    Array.from({ length: target.length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  );
  while (true) {
    pop.sort((a, b) => getFitness(b, target) - getFitness(a, target));
    if (pop[0] === target) return pop[0];
    const nextGen: string[] = pop.slice(0, Math.ceil(size * 0.1));
    while (nextGen.length < size) {
      const parentA = pop[Math.floor(Math.random() * (size / 2))];
      const parentB = pop[Math.floor(Math.random() * (size / 2))];
      let child = crossover(parentA, parentB);
      child = mutate(child, rate, alphabet);
      nextGen.push(child);
    }
    pop = nextGen;
  }
}`,
  },
  demo: {
    kind: 'genetic-algorithm',
    title: 'Genetic Algorithm Demo',
    description:
      'Hedef kromozomu ve başlangıç popülasyonunu girin. Örnek: 1111; 0000,1010,0101,1100',
    placeholder: '1111; 0000,1010,0101,1100',
  },
  timeComplexity: {
    best: 'O(G * P * F)',
    average: 'O(G * P * F)',
    worst: 'O(G * P * F)',
  },
  spaceComplexity: 'O(P * L)',
  analysisTitle: 'Parametreler',
  analysisPoints: [
    'G nesil sayısı, P popülasyon boyutu, F fitness hesaplama maliyetidir.',
    'Crossover ve mutation oranları problemden probleme ayarlanır.',
    'Sonuç garanti optimal değildir; iyi yaklaşık çözüm hedeflenir.',
  ],
  advantages: [
    'Karmaşık ve türevlenemeyen arama uzaylarında çalışabilir.',
    'Popülasyon çeşitliliği lokal optimumdan kaçmaya yardımcı olur.',
    'Kodlama ve fitness fonksiyonu değiştirildikçe farklı problemlere uyarlanır.',
  ],
  disadvantages: [
    'Optimal sonuç garantisi yoktur.',
    'Parametre seçimi hassastır.',
    'Fitness hesaplaması pahalıysa toplam maliyet yüksek olabilir.',
  ],
  relatedAlgorithms: [
    {
      title: 'Simulated Annealing',
      description: 'Tek aday çözüm üzerinde sıcaklık kontrollü olasılıksal arama yapar.',
      href: '/algorithms/optimization-algorithms/simulated-annealing',
    },
    {
      title: 'Local Search',
      description: 'Komşu çözümler arasında iyileştirme arayan metasezgisel temeldir.',
    },
    {
      title: '2-opt for TSP',
      description: 'TSP rotalarını lokal hamlelerle iyileştiren sezgisel yöntemdir.',
    },
  ],
};

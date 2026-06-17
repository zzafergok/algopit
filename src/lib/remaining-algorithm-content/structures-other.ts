import type { RemainingAlgorithmContent } from './types';

export const queueContent: RemainingAlgorithmContent = {
  title: 'Queue',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Data Structures / FIFO',
  difficulty: 'Kolay',
  sources: ['DSA', 'Sedgewick'],
  summary:
    'İlk giren ilk çıkar prensibiyle çalışan, elemanları geliş sırasına göre işleyen veri yapısıdır.',
  descriptionParagraphs: [
    'DSA kaynağı queue yapısını FIFO stratejisiyle açıklar: ilk eklenen eleman ilk servis edilir. Temel işlemler enqueue, dequeue ve peek/front olarak verilir.',
    'Standart queue, singly linked list ile verimli uygulanabilir. Tail üzerinden enqueue, head üzerinden dequeue yapılır; böylece uç işlemler sabit zamanda kalır. Arama ise linked list gibi O(n) sürer.',
  ],
  sourceNotes: [
    'DSA: Enqueue arka uca ekler, Dequeue ön uçtaki elemanı alıp siler, Peek ön elemanı silmeden okur.',
    'DSA: singly linked list ile queue implementasyonu O(1) insertion/deletion sağlar.',
    'Sedgewick: bazı non-recursive algoritmalarda stack yerine queue kullanılabilirliğini tartışır.',
  ],
  steps: [
    'Enqueue işleminde elemanı kuyruğun arkasına ekle.',
    'Dequeue işleminde öndeki elemanı çıkar ve döndür.',
    'Peek işleminde öndeki elemanı çıkarmadan oku.',
    'Kuyruk boşsa dequeue/peek için boş sonuç üret.',
  ],
  pseudocode: `ENQUEUE(value)
  node <- new Node(value)
  if tail = null
    head <- node
    tail <- node
  else
    tail.next <- node
    tail <- node
DEQUEUE()
  if head = null return null
  value <- head.value
  head <- head.next
  if head = null tail <- null
  return value`,
  codeExamples: {
    typescript: `class Queue<T> {
  private items: T[] = [];
  enqueue(value: T) { this.items.push(value); }
  dequeue(): T | undefined { return this.items.shift(); }
  peek(): T | undefined { return this.items[0]; }
}`,
  },
  demo: {
    kind: 'operations',
    title: 'Queue Demo',
    description:
      'Komutları virgülle ayırın. Örnek: enqueue:10, enqueue:12, dequeue, peek, enqueue:9',
    placeholder: 'enqueue:10, enqueue:12, dequeue, peek, enqueue:9',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'FIFO Kullanımı',
  analysisPoints: [
    'Linked-list temsilde enqueue ve dequeue O(1) yapılır.',
    'BFS, iş kuyruğu, event processing ve scheduler senaryolarında doğal modeldir.',
    'Arama işlemi sırayı bozmadığı sürece doğrusal tarama gerektirir.',
  ],
  advantages: [
    'Geliş sırasını koruyan adil bir işleme modeli sunar.',
    'BFS ve seviye tabanlı işlemler için temel veri yapısıdır.',
    'Doğru temsil ile temel uç işlemleri sabit zamanda kalır.',
  ],
  disadvantages: [
    'Ortadaki elemana doğrudan erişim sağlamaz.',
    'Array üzerinde shift kullanımı bazı dillerde O(n) olabilir.',
    'Öncelikli işleme gerekiyorsa priority queue gerekir.',
  ],
  relatedAlgorithms: [
    {
      title: 'BFS',
      description: 'Seviye seviye graf dolaşımı için queue kullanır.',
      href: '/algorithms/graph-algorithms/bfs',
    },
    {
      title: 'Priority Queue Operations',
      description:
        'FIFO yerine öncelik karşılaştırmasına göre öndeki elemanı seçer.',
    },
    {
      title: 'Stack',
      description: 'LIFO davranışıyla queue modelinin tamamlayıcısıdır.',
      href: '/algorithms/data-structures/stack',
    },
  ],
};

export const hashTableContent: RemainingAlgorithmContent = {
  title: 'Hash Table',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Data Structures / Hashing',
  difficulty: 'Orta',
  sources: ['Aho', 'DSA', 'Sedgewick'],
  summary:
    'Anahtarları hash fonksiyonuyla kovaya dönüştürerek ortalama sabit zamanlı sözlük işlemleri sağlar.',
  descriptionParagraphs: [
    'Aho kitabı hashing tekniğini dictionary işlemleri için ortalama sabit zaman sağlayan bir temsil olarak açıklar. İki temel yaklaşım vardır: open/external hashing kovaların listeler tuttuğu chaining modelidir; closed hashing ise elemanları bucket tablosunun içinde tutar.',
    'DSA kaynağı unordered set implementasyonu için hash table kullanımını önerir; çünkü üyelik kontrolü ve ekleme hızlı olmalıdır. Performans, hash fonksiyonunun dağılımına, kova sayısına ve çakışma çözme stratejisine bağlıdır.',
  ],
  sourceNotes: [
    'Aho: hashing dictionary operation başına ortalama constant time hedefler.',
    'Aho: open hashing kovalar içinde listeler kullanır; closed hashing tablonun içinde probe eder.',
    'DSA: unordered set için hash table, O(1) insertion ve O(1)e yaklaşan lookup sağlar.',
  ],
  steps: [
    'Anahtarı hash fonksiyonundan geçir.',
    'Hash değerini tablo boyutuna göre kova indeksine indir.',
    'Kova boşsa anahtar-değer çiftini yerleştir.',
    'Çakışma varsa chaining veya probing stratejisini uygula.',
    'Aramada aynı hash ve aynı çakışma stratejisiyle anahtarı bul.',
  ],
  pseudocode: `PUT(key, value)
  index <- hash(key) mod bucketCount
  for entry in buckets[index]
    if entry.key = key
      entry.value <- value
      return
  append (key, value) to buckets[index]`,
  codeExamples: {
    typescript: `class HashTable {
  private buckets: Array<Array<[string, string]>>;
  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []);
  }
  set(key: string, value: string) {
    const bucket = this.buckets[this.hash(key)];
    const existing = bucket.find((entry) => entry[0] === key);
    if (existing) { existing[1] = value; } else { bucket.push([key, value]); }
  }
  get(key: string) {
    return this.buckets[this.hash(key)].find((entry) => entry[0] === key)?.[1];
  }
  private hash(key: string) {
    return [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0) % this.buckets.length;
  }
}`,
  },
  demo: {
    kind: 'operations',
    title: 'Hash Table Demo',
    description:
      'Komutları virgülle ayırın. Örnek: put:alice, put:carol, get:alice, remove:carol',
    placeholder: 'put:alice, put:carol, get:alice, remove:carol',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'Çakışma ve Yük Faktörü',
  analysisPoints: [
    'Ortalama O(1) davranış iyi dağılan hash fonksiyonuna ve düşük yük faktörüne bağlıdır.',
    'Chaining modelinde aynı kovaya düşen anahtarlar liste içinde tutulur.',
    'Closed hashing modelinde probing ve silme işaretleri dikkat ister.',
  ],
  advantages: [
    'Sözlük, set ve üyelik kontrolünde çok hızlıdır.',
    'Open hashing ile çakışmalar anlaşılır şekilde yönetilir.',
    'Yeniden boyutlandırma ile performans korunabilir.',
  ],
  disadvantages: [
    'Kötü hash dağılımı performansı doğrusal zamana düşürebilir.',
    'Sıralı dolaşım veya minimum eleman bulma için uygun değildir.',
    'Silme ve yeniden boyutlandırma uygulama ayrıntısı gerektirir.',
  ],
  relatedAlgorithms: [
    {
      title: 'Separate Chaining',
      description: 'Çakışmaları kova içi listeyle çözer.',
      href: '/algorithms/data-structures/separate-chaining',
    },
    {
      title: 'Open Addressing',
      description: 'Çakışma durumunda tablo içinde alternatif konum arar.',
      href: '/algorithms/data-structures/open-addressing',
    },
    {
      title: 'Trie',
      description:
        'String anahtarlar için prefix tabanlı alternatif sözlük yapısıdır.',
      href: '/algorithms/data-structures/trie',
    },
  ],
};

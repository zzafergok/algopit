import type { RemainingAlgorithmContent } from './types';

export const linkedListContent: RemainingAlgorithmContent = {
  title: 'Linked List',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Data Structures / Linear',
  difficulty: 'Kolay',
  sources: ['DSA', 'Sedgewick', 'Aho'],
  summary:
    'Düğümlerin veri ve sonraki düğüm referansı tuttuğu, dinamik boyutlu doğrusal veri yapısıdır.',
  descriptionParagraphs: [
    'DSA kaynağı linked list yapısını bir düğüm serisi olarak tanımlar: her düğüm en azından sonraki düğüme işaret eden bir referans taşır; son düğümde bu referans boştur. Head ve tail referansları tutulduğunda başa veya sona ekleme sabit zamanda yapılabilir.',
    'Arama ve rastgele konuma erişim için liste baştan sona dolaşılır. Bu yüzden linked list, sık uç ekleme/silme yapılan ve boyutu önceden bilinmeyen koleksiyonlarda güçlüdür; rastgele erişim gerektiren durumlarda dizi kadar uygun değildir.',
  ],
  sourceNotes: [
    'DSA: head/tail tutulduğunda geleneksel baş/son ekleme O(1), arama O(n).',
    'DSA: Contains algoritması head düğümünden başlayıp değer bulunana kadar Next referansını izler.',
    'Sedgewick: stack gibi yapıların linked-list temsiliyle push/pop işlemlerinin doğrudan bağlama üzerinden kurulabileceğini açıklar.',
  ],
  steps: [
    'Yeni değer için bir düğüm oluştur.',
    'Liste boşsa head ve tail referanslarını bu düğüme bağla.',
    'Liste boş değilse tail.Next referansını yeni düğüme bağla.',
    'Tail referansını yeni düğüme güncelle.',
    'Arama veya silme için head üzerinden sırayla ilerle.',
  ],
  pseudocode: `ADD(value)
  node <- new Node(value)
  if head = null
    head <- node
    tail <- node
  else
    tail.next <- node
    tail <- node`,
  codeExamples: {
    typescript: `class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  add(value: T) {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail!.next = node;
    this.tail = node;
  }

  contains(value: T) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
}`,
  },
  demo: {
    kind: 'operations',
    title: 'Linked List Demo',
    description:
      'Komutları virgülle ayırın. Örnek: add:1, add:45, add:60, contains:45, remove:1',
    placeholder: 'add:1, add:45, add:60, contains:45, remove:1',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'İşlem Maliyetleri',
  analysisPoints: [
    'Head/tail ile uç ekleme O(1) olur.',
    'Arama ve rastgele silme için predecessor bulmak gerektiğinden O(n) tarama gerekir.',
    'Her düğüm ek referans tuttuğu için diziye göre pointer maliyeti vardır.',
  ],
  advantages: [
    'Dinamik büyür ve dizi yeniden kopyalama maliyeti taşımaz.',
    'Başa veya sona ekleme head/tail ile sabit zamanda yapılabilir.',
    'Stack ve queue gibi yapıların temel temsili olarak kullanılabilir.',
  ],
  disadvantages: [
    'Rastgele erişim yoktur; indeksle erişim O(n) sürer.',
    'Her düğüm ek referans alanı kullanır.',
    'Ara konuma ekleme/silme predecessor araması gerektirebilir.',
  ],
  relatedAlgorithms: [
    {
      title: 'Stack',
      description: 'Linked list ile top düğümü üzerinden LIFO davranışı kurulabilir.',
      href: '/algorithms/data-structures/stack',
    },
    {
      title: 'Queue',
      description: 'Head ve tail referansları FIFO kuyruğu sabit zamanlı yapar.',
      href: '/algorithms/data-structures/queue',
    },
    {
      title: 'Tree Traversals',
      description: 'Bağlantılı düğüm fikrinin ağaç yapılarındaki genellemesidir.',
    },
  ],
};

export const stackContent: RemainingAlgorithmContent = {
  title: 'Stack',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Data Structures / LIFO',
  difficulty: 'Kolay',
  sources: ['Sedgewick', 'DSA'],
  summary:
    'Son giren ilk çıkar prensibiyle çalışan, yalnızca tepedeki elemana erişim sağlayan veri yapısıdır.',
  descriptionParagraphs: [
    'Stack, çalışma zamanı çağrı yığınından algoritmalardaki explicit work-list kullanımına kadar birçok yerde karşımıza çıkar. Sedgewick recursion removal bölümünde, recursive çağrıların sakladığı bilgilerin explicit stack ile tutulabileceğini ve push/pop akışıyla işlenebileceğini gösterir.',
    'Linked-list temsili kullanıldığında push yeni düğümü top referansına bağlar, pop ise top değerini döndürüp top referansını bir sonraki düğüme taşır. Array temsili de mümkündür; temel davranış LIFO olmasıdır.',
  ],
  sourceNotes: [
    'Sedgewick: recursion removal için explicit stack kullanımı ve stack üzerinde iş parçalarının push/pop edilmesi.',
    'Sedgewick: linked-list temsilde push yeni node bağlar, pop top node değerini döndürüp pointer günceller.',
    'DSA: recursive çağrıların stack alanı tükettiğini ve iterative çözümlerin bunu kontrol ettiğini açıklar.',
  ],
  steps: [
    'Push işleminde yeni elemanı tepeye ekle.',
    'Pop işleminde tepedeki elemanı çıkar ve döndür.',
    'Peek işleminde tepedeki elemanı çıkarmadan oku.',
    'Boş yığında pop/peek için hata veya boş sonuç üret.',
  ],
  pseudocode: `PUSH(value)
  node <- new Node(value)
  node.next <- top
  top <- node
POP()
  if top = null return null
  value <- top.value
  top <- top.next
  return value`,
  codeExamples: {
    typescript: `class Stack<T> {
  private items: T[] = [];
  push(value: T) { this.items.push(value); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items.at(-1); }
}`,
  },
  demo: {
    kind: 'operations',
    title: 'Stack Demo',
    description:
      'Komutları virgülle ayırın. Örnek: push:10, push:12, peek, pop, push:9',
    placeholder: 'push:10, push:12, peek, pop, push:9',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'LIFO Kullanımı',
  analysisPoints: [
    'Push, pop ve peek tepe referansından çalıştığı için O(1) kabul edilir.',
    'Recursive algoritmaların explicit hale getirilmesinde stack doğal iş listesidir.',
    'Array temsilde kapasite büyütme anlık maliyet doğurabilir; linked-list temsilde düğüm maliyeti vardır.',
  ],
  advantages: [
    'Basit ve öngörülebilir LIFO davranışı sağlar.',
    'Undo, parsing, DFS ve recursion removal için uygundur.',
    'Temel işlemleri sabit zamanda yapılır.',
  ],
  disadvantages: [
    'Yalnızca tepedeki elemana doğrudan erişilebilir.',
    'Yanlış kullanımda stack overflow veya kontrolsüz büyüme görülebilir.',
    'Ortadaki elemanları aramak için ek yapı gerekir.',
  ],
  relatedAlgorithms: [
    {
      title: 'DFS',
      description: 'Derinlik öncelikli dolaşım recursive veya explicit stack ile yapılır.',
      href: '/algorithms/graph-algorithms/dfs',
    },
    {
      title: 'Queue',
      description: 'FIFO davranışıyla stackin tersine en eski elemanı işler.',
      href: '/algorithms/data-structures/queue',
    },
    {
      title: 'Topological Sort',
      description: 'DFS bitiş sırası ve stack fikriyle ilişkilidir.',
      href: '/algorithms/advanced-algorithms/topological-sort',
    },
  ],
};

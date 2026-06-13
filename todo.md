# Duplicate Algorithm Completion Todo

Bu dosya, `docs/duplicate-algorithms.md` icindeki 4 PDF kaynakli duplicate algoritma listesinin uygulamada bire bir ekran karsiligi olmasi icin yapilan isleri izler.

## Yapilacaklar

- [x] Duplicate listesindeki mevcut veri setini route'larla karsilastir.
- [x] Dolayli kapsanan basliklari ayri ekran gerektiren baslik olarak ele al.
- [x] Eksik siralama basliklarini ekle:
  - [x] Mergesort variants
  - [x] List merge
- [x] Eksik heap / priority queue basliklarini ekle:
  - [x] Downheap / pushdown
  - [x] Priority queue operations
- [x] Eksik traversal basliklarini ayri ekran yap:
  - [x] Non-recursive tree traversal
  - [x] Preorder / inorder / postorder traversal
- [x] Eksik graf basliklarini ayri ekran yap:
  - [x] Transitive closure
  - [x] Single-source shortest path
- [x] Eksik tasarim paradigmasi basliklarini ekle:
  - [x] Divide and conquer
  - [x] Dynamic programming method
  - [x] Greedy method
  - [x] Backtracking method
  - [x] Pruning
- [x] `divide-and-conquer` kategorisi icin dinamik route ekle.
- [x] Navigation altina yeni duplicate baslik linklerini bagla.
- [x] TypeScript, lint, build ve production smoke test ile dogrula.

## Bubble Sort Ekran Formatina Revizyon Todo

Referans ekran bolumleri:

- Aciklama karti
- Kod Ornekleri
- Kendi Verilerinizle Test Edin
- Algoritma Analizi
- Avantajlar ve Dezavantajlar
- Ilgili Algoritmalar

Kapsam disi tutulan yapim asamasindaki route'lar:

- [x] `/algorithms/data-structures/hash-table`
- [x] `/algorithms/data-structures/linked-list`
- [x] `/algorithms/data-structures/queue`
- [x] `/algorithms/data-structures/stack`
- [x] `/algorithms/dynamic-programming/fibonacci`
- [x] `/algorithms/dynamic-programming/longest-common-subsequence`
- [x] `/algorithms/graph-algorithms/bellman-ford`
- [x] `/algorithms/greedy-algorithms/fractional-knapsack`
- [x] `/algorithms/mathematical-algorithms/sieve-of-eratosthenes`
- [x] `/algorithms/misc-algorithms/bloom-filter`
- [x] `/algorithms/misc-algorithms/reservoir-sampling`
- [x] `/algorithms/optimization-algorithms/genetic-algorithms`
- [x] `/algorithms/optimization-algorithms/simulated-annealing`
- [x] `/algorithms/searching/linear-search`
- [x] `/algorithms/string-algorithms/kmp`
- [x] `/algorithms/string-algorithms/rabin-karp`

Revize edilecek ekran gruplari:

- [x] Duplicate PDF ekranlari: `DuplicateAlgorithmPage` kullanan tum dynamic/proxy route'lar.
- [x] Custom compact ekranlar: `AlgorithmExplanation` kullanan tum route'lar.
- [x] Sadece Bubble Sort formatinda eksiksiz olan mevcut sorting ekranlari aynen korunacak.

Yapilacaklar:

- [x] `DuplicateAlgorithmPage` icine Bubble Sort formatindaki ana bolumleri ekle.
- [x] Duplicate ekranlara cok dilli kod ornegi sekmeleri ekle.
- [x] Duplicate ekranlara kullanici verisiyle test bolumu ekle.
- [x] `Kendi Verilerinizle Test Edin` bolumlerini gercek input alanli `InteractiveDemo` ile calisir hale getir.
- [x] `AlgorithmExplanation` ekranlarini Bubble Sort bolum sirasina gore tek akisa indir.
- [x] Subset Sum ekranindaki tekrar eden eski `Interaktif Demo`, ikinci `Kod Ornekleri` ve `Algoritma Nasil Calisir?` bloklarini kaldir.
- [x] Duplicate ekranlara acik `Algoritma Analizi` bolumu ekle.
- [x] Duplicate ekranlara `Avantajlar ve Dezavantajlar` bolumu ekle.
- [x] Duplicate ekranlara `Ilgili Algoritmalar` kartlari ekle.
- [x] `AlgorithmExplanation` ortak bilesenine eksik referans bolumlerini ekle.
- [x] TypeScript, lint, build ve production smoke test ile revizyonu dogrula.

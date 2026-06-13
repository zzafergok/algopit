export type DuplicateAlgorithmCategory =
  | 'sorting'
  | 'searching'
  | 'data-structures'
  | 'graph-algorithms'
  | 'dynamic-programming'
  | 'backtracking'
  | 'greedy-algorithms'
  | 'mathematical-algorithms'
  | 'string-algorithms'
  | 'advanced-algorithms'
  | 'divide-and-conquer';

export interface DuplicateAlgorithmContent {
  title: string;
  slug: string;
  category: DuplicateAlgorithmCategory;
  family: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  sources: string[];
  description: string;
  synthesis: string;
  steps: string[];
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  pseudocode: string;
}

const entry = (
  algorithm: DuplicateAlgorithmContent
): DuplicateAlgorithmContent => algorithm;

const simpleEntry = ({
  title,
  slug,
  category,
  family,
  difficulty = 'Orta',
  sources,
  description,
  synthesis,
  steps,
  time = 'O(n)',
  space = 'O(n)',
  applications,
  pseudocode,
}: {
  title: string;
  slug: string;
  category: DuplicateAlgorithmCategory;
  family: string;
  difficulty?: 'Kolay' | 'Orta' | 'Zor';
  sources: string[];
  description: string;
  synthesis: string;
  steps: string[];
  time?: string;
  space?: string;
  applications: string[];
  pseudocode: string;
}) =>
  entry({
    title,
    slug,
    category,
    family,
    difficulty,
    sources,
    description,
    synthesis,
    steps,
    timeComplexity: { best: time, average: time, worst: time },
    spaceComplexity: space,
    advantages: [
      'Kaynaklarda birden fazla baglamda ele alindigi icin temel kavramlari gucludur.',
      'Dogru veri yapisi ile pratik problemlere dogrudan uygulanabilir.',
      'Algoritma tasarimi, analiz ve uygulama arasindaki baglantiyi acik gosterir.',
    ],
    disadvantages: [
      'Girdi kosullari ve veri temsili yanlis secilirse beklenen performansi vermez.',
      'Kenar durumlari uygulamada dikkatli ele alinmalidir.',
    ],
    applications,
    pseudocode,
  });

export const duplicateAlgorithmContents = [
  entry({
    title: 'Euclid GCD',
    slug: 'gcd',
    category: 'mathematical-algorithms',
    family: 'Matematik / Sayisal',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DAA Notes', 'DSA', 'Aho'],
    description:
      'Iki tamsayinin en buyuk ortak bolenini kalan islemini tekrar ederek bulan klasik algoritmadir.',
    synthesis:
      'PDF kaynaklari Euclid yaklasimini algoritma fikrinin en yalın orneklerinden biri olarak ele aliyor: problem, gcd(a, b) = gcd(b, a mod b) ozelligiyle surekli daha kucuk ayni probleme indirgenir. Bu nedenle hem bol-ve-fethet dusuncesine giris hem de logaritmik calisma suresine sezgisel bir ornek olarak kullanilir.',
    steps: [
      'Buyuk ve kucuk sayiyi ayir; isaretleri yok sayarak mutlak degerlerle calis.',
      'Ikinci sayi sifir olana kadar a mod b kalanini hesapla.',
      'a degerini b ile, b degerini kalan ile degistir.',
      'b sifir oldugunda a en buyuk ortak bolendir.',
    ],
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    advantages: [
      'Cok az bellek kullanir ve kolay uygulanir.',
      'Buyuk sayilarda deneme bolmesine gore cok daha hizlidir.',
      'Kesir sadeleştirme, kriptografi ve sayisal algoritmalar icin temel alt yordamdir.',
    ],
    disadvantages: [
      'Yalnizca bolme ve kalan isleminin tanimli oldugu ayrik degerlerde kullanilir.',
      'Cok buyuk tamsayilarda mod isleminin maliyeti uygulama ayrintilarina baglidir.',
    ],
    applications: [
      'Kesir sadeleştirme',
      'RSA ve moduler aritmetik on kontrolleri',
      'Polinom ve sayi teorisi algoritmalari',
    ],
    pseudocode: `EUCLID(a, b)
  a <- abs(a)
  b <- abs(b)
  while b != 0
    r <- a mod b
    a <- b
    b <- r
  return a`,
  }),
  entry({
    title: 'Matrix Multiplication',
    slug: 'matrix-multiplication',
    category: 'mathematical-algorithms',
    family: 'Matematik / Sayisal',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Iki matrisi satir-sutun carpimlariyla birlestirerek yeni bir matris ureten temel sayisal algoritmadir.',
    synthesis:
      'Kaynaklar klasik matris carpimini hem kubik zamanli bir temel algoritma hem de Strassen gibi iyilestirmelerin karsilastirma noktasi olarak kullaniyor. Ana fikir, C[i][j] degerinin A matrisinin i. satiri ile B matrisinin j. sutununun noktasal carpimi olmasidir.',
    steps: [
      'A matrisi n x m, B matrisi m x p boyutunda olmali.',
      'C matrisini n x p sifir matrisi olarak baslat.',
      'Her C[i][j] icin ortak boyut uzerinden A[i][k] * B[k][j] toplamlarini hesapla.',
      'Tum satir ve sutun ciftleri tamamlandiginda C sonuc matrisidir.',
    ],
    timeComplexity: { best: 'O(n³)', average: 'O(n³)', worst: 'O(n³)' },
    spaceComplexity: 'O(n²)',
    advantages: [
      'Basit, deterministik ve sayisal kutuphaneler icin temel referanstir.',
      'Bellek erisimi ve bloklama teknikleriyle pratikte iyi optimize edilebilir.',
      'Dikdortgen matrislere dogrudan genellenir.',
    ],
    disadvantages: [
      'Buyuk kare matrislerde kubik zaman maliyeti yuksektir.',
      'Onbellek dostu uygulanmazsa donanim performansi dusuk kalabilir.',
    ],
    applications: [
      'Lineer cebir',
      'Graf gecis matrisi islemleri',
      'Makine ogrenmesi ve bilgisayar grafikleri',
    ],
    pseudocode: `MATRIX-MULTIPLY(A, B)
  for i <- 1 to rows(A)
    for j <- 1 to columns(B)
      C[i][j] <- 0
      for k <- 1 to columns(A)
        C[i][j] <- C[i][j] + A[i][k] * B[k][j]
  return C`,
  }),
  entry({
    title: 'Strassen Matrix Multiplication',
    slug: 'strassen-matrix-multiplication',
    category: 'mathematical-algorithms',
    family: 'Matematik / Sayisal',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Kare matris carpimini 8 yerine 7 alt carpima indirerek klasik yontemden asimptotik olarak daha hizli yapan bol-ve-fethet algoritmasidir.',
    synthesis:
      'PDF kaynaklari Strassen yontemini bol-ve-fethet tasariminin guclu bir ornegi olarak sunuyor: matrisler dort alt bloğa ayrilir, daha fazla toplama-cikarma yapilir ama en pahali is olan alt matris carpimi sayisi 8 yerine 7 olur.',
    steps: [
      'Matrisleri esit boyutlu dort alt bloga ayir.',
      'Yedi yardimci carpimi toplama ve cikarma kombinasyonlariyla hesapla.',
      'Bu yedi sonucu kullanarak C matrisinin dort blogunu kur.',
      'Taban boyuta ulasilana kadar ozyinelemeyi surdur.',
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n²)',
    advantages: [
      'Klasik O(n³) yontemden daha iyi asimptotik sinir verir.',
      'Bol-ve-fethetin maliyet denklemiyle analizini somutlastirir.',
      'Cok buyuk matrislerde teorik ve pratik hiz kazanci saglayabilir.',
    ],
    disadvantages: [
      'Ek toplama, cikarma ve gecici matris maliyeti vardir.',
      'Kucuk matrislerde klasik carpim genellikle daha hızlıdır.',
      'Sayisal kararlilik ve bellek kullanimi dikkat ister.',
    ],
    applications: [
      'Buyuk olcekli lineer cebir',
      'Sembolik hesaplama',
      'Algoritma analizi ve bol-ve-fethet egitimi',
    ],
    pseudocode: `STRASSEN(A, B)
  if size(A) is small
    return MATRIX-MULTIPLY(A, B)
  split A into A11, A12, A21, A22
  split B into B11, B12, B21, B22
  compute M1..M7 with Strassen block formulas
  combine M1..M7 into C11, C12, C21, C22
  return joined matrix C`,
  }),
  entry({
    title: 'Multiway Merging',
    slug: 'multiway-merging',
    category: 'sorting',
    family: 'Sorting / Selection / Merging',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'Aho'],
    description:
      'k adet sirali listeyi ya da dosya parcasini tek bir sirali akisa birlestiren genelleştirilmiş merge yontemidir.',
    synthesis:
      'Kaynaklarda multiway merging, iki yollu merge isleminin dis siralama ve buyuk dosya isleme icin genisletilmis hali olarak ele alinir. En kucuk aktif elemani hizli secmek icin oncelik kuyrugu kullanildiginda her cikti elemani log k maliyetle uretilir.',
    steps: [
      'Her sirali girdinin ilk elemanini bir min-heap icine koy.',
      'Heapten en kucuk elemani cikar ve ciktiya yaz.',
      'Cikarilan eleman hangi girdiden geldiyse, o girdinin sonraki elemanini heap e ekle.',
      'Heap bosalana kadar devam et.',
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'Cok sayida sirali parcayi tek geciste birlestirir.',
      'Dis bellek siralama icin dogal bir temel olusturur.',
      'Heap ile k sayisina gore olceklenebilir.',
    ],
    disadvantages: [
      'Cok fazla girdi akisi acik dosya ve tampon yonetimi gerektirir.',
      'k buyudukce heap ve I/O koordinasyonu karmasiklasir.',
    ],
    applications: [
      'Dis siralama',
      'Log ve arama indeksi birlestirme',
      'Dagitik sirali veri akislari',
    ],
    pseudocode: `MULTIWAY-MERGE(lists)
  heap <- empty min-heap
  for each list i
    push(heap, first(list i), i)
  while heap is not empty
    value, i <- popMin(heap)
    output value
    if list i has next value
      push(heap, next(list i), i)`,
  }),
  entry({
    title: 'Polyphase Merging',
    slug: 'polyphase-merging',
    category: 'sorting',
    family: 'Sorting / Selection / Merging',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Dis siralamada ara kosulari dengesiz ama planli bicimde dagitarak bant/dosya gecislerini azaltan merge stratejisidir.',
    synthesis:
      'Polyphase merging, kaynaklarda harici depolama maliyetinin belirleyici oldugu siralama senaryolari icin anlatilir. Fikir, kosu sayilarini Fibonacci benzeri dagitip her fazda bir cikti dosyasi bos kalacak sekilde donusum yapmaktir.',
    steps: [
      'Sirali kosulari yardimci dosyalara dengesiz ama planli dagit.',
      'Bir dosyayi cikti hedefi, kalanlari girdi kaynagi olarak sec.',
      'Girdi kosularini merge edip cikti dosyasina yeni kosular yaz.',
      'Bosalan dosyayi yeni cikti hedefi yaparak fazlari tekrarla.',
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'Sinirli sayida dosya veya bantla calisabilir.',
      'Dengeleme icin gereksiz kopyalama miktarini azaltir.',
      'Dis bellek kosu birlestirmelerinde tarihsel olarak onemlidir.',
    ],
    disadvantages: [
      'Kosu dagitimi ve faz planlamasi klasik merge e gore daha karmasiktir.',
      'Modern depolama sistemlerinde kazanci uygulamaya baglidir.',
    ],
    applications: [
      'Harici siralama',
      'Sinirli tamponlu veri isleme',
      'Buyuk arsiv dosyalarinin siralanmasi',
    ],
    pseudocode: `POLYPHASE-MERGE(files)
  distribute initial runs by planned run counts
  while more than one run remains
    choose empty file as output
    merge one run from each non-empty input file
    write merged run to output
    rotate file roles when an input becomes empty
  return final sorted run`,
  }),
  entry({
    title: 'External Sorting',
    slug: 'external-sorting',
    category: 'sorting',
    family: 'Sorting / Selection / Merging',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Ana belleğe sigmayan verileri parcalar halinde siralayip daha sonra merge ederek siralayan yaklasimdir.',
    synthesis:
      'PDF kaynaklarinda external sorting, algoritmanin CPU kadar I/O maliyetini de tasarlamasi gerektigini vurgular. Tipik cozum once bellek boyutunda sirali kosular uretmek, sonra bu kosulari iki yollu veya multiway merge ile birlestirmektir.',
    steps: [
      'Veriyi bellege sigan bloklar halinde oku.',
      'Her blogu ic siralama algoritmasi ile sirala ve kosu olarak diske yaz.',
      'Kosulari tamponlar kullanarak multiway merge et.',
      'Tek sirali kosu kalana kadar merge fazlarini surdur.',
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'Bellege sigmayan veri setlerinde calisir.',
      'I/O tamponlama ve multiway merge ile verimli hale getirilebilir.',
      'Veritabani ve arama sistemlerinin temel yapitasidir.',
    ],
    disadvantages: [
      'Disk I/O maliyeti toplam sureyi belirleyebilir.',
      'Tampon boyutu, dosya sayisi ve kosu uzunlugu dikkatli ayarlanmalidir.',
    ],
    applications: [
      'Veritabani ORDER BY ve index olusturma',
      'Arama motoru indeks birlestirme',
      'Buyuk log dosyasi siralama',
    ],
    pseudocode: `EXTERNAL-SORT(file)
  runs <- []
  while file has unread blocks
    block <- read memory-sized chunk
    sort block in memory
    append writeRun(block) to runs
  while count(runs) > 1
    runs <- multiwayMergePass(runs)
  return runs[0]`,
  }),
  simpleEntry({
    title: 'Mergesort Variants',
    slug: 'mergesort-variants',
    category: 'sorting',
    family: 'Sorting / Selection / Merging',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Merge sort un recursive, non-recursive ve pratik iyilestirmelerle uygulanan cesitlerini karsilastirir.',
    synthesis:
      'Kaynaklarda mergesort yalnizca tek bir kod parcasi olarak degil, recursive bolme, bottom-up non-recursive birlestirme ve liste/dosya tabanli merge islemleriyle birlikte ele alinir. Ortak fikir, sirali parcalari sistematik olarak buyutup tek sirali sonuc uretmektir.',
    steps: [
      'Recursive surum diziyi ikiye boler ve alt parcalari geri donuste merge eder.',
      'Non-recursive surum once 1 elemanli kosulari, sonra 2, 4, 8 uzunluklu kosulari birlestirir.',
      'Kucuk alt diziler icin insertion sort gibi pratik esikler kullanilabilir.',
      'Kararlilik, merge adiminda esit elemanlarda sol parcayi once almakla korunur.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Kararli siralama', 'Linked list siralama', 'External sorting kosu uretimi'],
    pseudocode: `BOTTOM-UP-MERGESORT(A)
  width <- 1
  while width < length(A)
    for left <- 0 to length(A) - 1 step 2 * width
      mid <- min(left + width, length(A))
      right <- min(left + 2 * width, length(A))
      merge A[left..mid) with A[mid..right)
    width <- 2 * width`,
  }),
  simpleEntry({
    title: 'List Merge',
    slug: 'list-merge',
    category: 'sorting',
    family: 'Sorting / Selection / Merging',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Iki sirali listeyi dugumleri veya elemanlari sirayla secerek tek sirali listeye donusturen merge alt yordamidir.',
    synthesis:
      'Sedgewick ve Aho, merge islemini siralama ailesinin merkezi alt problemi olarak kullanir. Dizi merge inde ek tampon gerekirken, linked list merge dugum baglarini yeniden baglayarak daha dogal uygulanabilir.',
    steps: [
      'Iki listenin basindan gostericiler tut.',
      'Kucuk anahtara sahip dugumu sonuc listesinin sonuna ekle.',
      'Secilen listenin gostericisini ilerlet.',
      'Listelerden biri bitince kalan dugumleri sonuca bagla.',
    ],
    time: 'O(n)',
    space: 'O(1)',
    applications: ['Merge sort alt yordami', 'Sirali linked list birlestirme', 'Zaman sirali kayit akislari'],
    pseudocode: `LIST-MERGE(a, b)
  dummy <- new node
  tail <- dummy
  while a != NIL and b != NIL
    if a.key <= b.key
      tail.next <- a
      a <- a.next
    else
      tail.next <- b
      b <- b.next
    tail <- tail.next
  tail.next <- a if a != NIL else b
  return dummy.next`,
  }),
  simpleEntry({
    title: 'Binary Search',
    slug: 'binary-search',
    category: 'searching',
    family: 'Searching / Hashing / Trees',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Sirali dizide arama araligini her adimda ikiye bolerek hedef degeri bulan logaritmik arama algoritmasidir.',
    synthesis:
      'Kaynaklar binary search u sirali veri varsayiminin algoritmik gucunu gostermek icin kullanir. Her karsilastirma arama uzayinin yarisini eler; bu nedenle dogrusal aramaya gore buyuk veri setlerinde belirgin kazanc saglar.',
    steps: [
      'low ve high sinirlarini dizinin basina ve sonuna koy.',
      'Orta indisi hesapla ve hedefle karsilastir.',
      'Hedef kucukse sag yarimi, buyukse sol yarimi ele.',
      'Deger bulunana veya aralik bosalana kadar devam et.',
    ],
    time: 'O(log n)',
    space: 'O(1)',
    applications: [
      'Sirali dizilerde arama',
      'Alt sinir ve ust sinir bulma',
      'Cevap uzerinde ikili arama',
    ],
    pseudocode: `BINARY-SEARCH(A, target)
  low <- 0
  high <- length(A) - 1
  while low <= high
    mid <- floor((low + high) / 2)
    if A[mid] == target return mid
    if A[mid] < target then low <- mid + 1
    else high <- mid - 1
  return NOT_FOUND`,
  }),
  simpleEntry({
    title: 'Binary Search Tree Operations',
    slug: 'binary-search-tree-operations',
    category: 'data-structures',
    family: 'Searching / Hashing / Trees',
    sources: ['Sedgewick', 'DSA', 'Aho'],
    description:
      'BST uzerinde arama, ekleme, silme ve sirali cikti islemlerini ikili arama ozelligiyle yapan temel agac islemleridir.',
    synthesis:
      'Kaynaklar BST yi sirali sozluk soyutlamasinin dogal uygulamasi olarak anlatir. Sol alt agactaki anahtarlar kokten kucuk, sag alt agactakiler buyuk oldugu icin arama yolu her adimda tek dala iner; inorder dolasim ise sirali cikti verir.',
    steps: [
      'Aramada kokten basla ve anahtara gore sola veya saga in.',
      'Eklemede bos konuma ulasana kadar ayni karsilastirmayi uygula.',
      'Silmede yaprak, tek cocuk ve iki cocuk durumlarini ayri ele al.',
      'Sirali cikti icin inorder traversal kullan.',
    ],
    time: 'O(log n)',
    space: 'O(n)',
    applications: ['Sirali sozlukler', 'Set ve map uygulamalari', 'Aralik sorgulari'],
    pseudocode: `BST-SEARCH(x, key)
  while x != NIL and x.key != key
    if key < x.key then x <- x.left
    else x <- x.right
  return x`,
  }),
  simpleEntry({
    title: 'Optimal Binary Search Tree',
    slug: 'optimal-binary-search-tree',
    category: 'dynamic-programming',
    family: 'Searching / Hashing / Trees',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Anahtar arama olasiliklari bilindiginde beklenen arama maliyeti en dusuk BST yapisini dinamik programlama ile kurar.',
    synthesis:
      'Sedgewick ve DAA notlari OBST yi optimal alt yapiya sahip bir dinamik programlama problemi olarak verir. Her aralik icin hangi anahtarin kok secilecegi denenir ve sol/sag alt agaclarin maliyetleri frekans toplamiyla birlestirilir.',
    steps: [
      'Tek anahtarli araliklarin maliyetlerini baslat.',
      'Artan aralik uzunluklari icin her olasi koku dene.',
      'Sol ve sag alt aralik maliyetlerini aralik agirligiyle topla.',
      'Minimum maliyeti ve kok secimini tabloya yaz.',
    ],
    time: 'O(n³)',
    space: 'O(n²)',
    applications: [
      'Statik sozlukler',
      'Derleyici sembol tablolari',
      'Arama maliyeti optimizasyonu',
    ],
    pseudocode: `OBST(p)
  for length <- 1 to n
    for i <- 1 to n - length + 1
      j <- i + length - 1
      cost[i][j] <- infinity
      for r <- i to j
        try <- cost[i][r-1] + cost[r+1][j] + weight(i, j)
        keep minimum try and root r`,
  }),
  simpleEntry({
    title: '0/1 Knapsack',
    slug: 'knapsack',
    category: 'dynamic-programming',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Her esyanin ya tamamen alindigi ya da alinmadigi kapasite kisitli maksimum deger problemidir.',
    synthesis:
      'Kaynaklarda knapsack, dinamik programlama, greedy yaklasimin sinirlari ve branch-and-bound karsilastirmalari icin ortak bir ornek olarak kullanilir. 0/1 surumde esyalar bolunemez; bu nedenle durum, ilk i esya ve kalan kapasite ile tanimlanir.',
    steps: [
      'dp[i][w] degerini ilk i esya ile w kapasitedeki en iyi deger olarak tanimla.',
      'Esyayi almama degeri dp[i-1][w] olur.',
      'Esya sigiyorsa alma degeri value[i] + dp[i-1][w-weight[i]] olur.',
      'Iki secenekten buyugunu tabloya yaz ve sonuc dp[n][capacity] olur.',
    ],
    time: 'O(n²)',
    space: 'O(n)',
    applications: ['Kaynak ayirma', 'Portfoy secimi', 'Branch-and-bound egitimi'],
    pseudocode: `KNAPSACK(items, capacity)
  for w <- 0 to capacity
    dp[w] <- 0
  for each item in items
    for w <- capacity down to item.weight
      dp[w] <- max(dp[w], item.value + dp[w - item.weight])
  return dp[capacity]`,
  }),
  simpleEntry({
    title: 'AVL Tree Operations',
    slug: 'avl-operations',
    category: 'data-structures',
    family: 'Searching / Hashing / Trees',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DSA'],
    description:
      'BST islemlerinden sonra yukseklik farkini en fazla 1 tutmak icin rotasyon yapan kendini dengeleyen agac islemleridir.',
    synthesis:
      'DSA ve Sedgewick kaynaklari AVL agacini BST nin kotu lineer durumunu engelleyen bir dengeleme teknigi olarak sunar. Ekleme veya silme sonrasi denge faktoru bozulursa LL, RR, LR veya RL rotasyonlari uygulanir.',
    steps: [
      'BST ekleme veya silme islemini uygula.',
      'Geri donus yolunda her dugumun yuksekligini guncelle.',
      'Denge faktoru -1, 0, 1 araligindan cikarsa rotasyon turunu belirle.',
      'Tek veya cift rotasyonla alt agaci yeniden koklendir.',
    ],
    time: 'O(log n)',
    space: 'O(log n)',
    applications: ['Dengeli set/map', 'Aralik sorgulari', 'Bellek ici indeksler'],
    pseudocode: `AVL-INSERT(root, key)
  root <- BST-INSERT(root, key)
  update height(root)
  balance <- height(left) - height(right)
  if balance is outside [-1, 1]
    rotate according to LL, RR, LR, or RL case
  return new root`,
  }),
  simpleEntry({
    title: 'B-Tree Insertion and Deletion',
    slug: 'b-tree-insertion-deletion',
    category: 'data-structures',
    family: 'Searching / Hashing / Trees',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Cok yollu dengeli arama agacinda dugum bolme, odunc alma ve birlestirme ile arama agacini disk dostu tutan islemlerdir.',
    synthesis:
      'Kaynaklarda B-tree, external searching ve veritabani indekslerinin temel yapisi olarak geciyor. Dugumler cok sayida anahtar tuttugu icin agacin yuksekligi dusuk kalir; ekleme dolu dugumu boler, silme ise eksik dugumu kardesten odunc alma veya birlestirme ile onarir.',
    steps: [
      'Aranacak veya eklenecek yaprak konumunu cok yollu karsilastirmalarla bul.',
      'Eklemede dolu dugumu median anahtardan bol ve mediani ebeveyne tasi.',
      'Silmede eksik anahtar sayisini kardesten odunc alarak veya dugumleri birlestirerek duzelt.',
      'Kok bosalirsa agac yuksekligini bir azalt.',
    ],
    time: 'O(log n)',
    space: 'O(n)',
    applications: ['Veritabani indeksleri', 'Dosya sistemleri', 'Disk tabanli sozlukler'],
    pseudocode: `B-TREE-INSERT(T, key)
  if root is full
    split root and create new root
  descend to non-full child
  split full child before descending
  insert key into leaf`,
  }),
  simpleEntry({
    title: 'Separate Chaining',
    slug: 'separate-chaining',
    category: 'data-structures',
    family: 'Searching / Hashing / Trees',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Hash cakismalarini her tablo kovasinda ayri bir liste veya koleksiyon tutarak cozen hashing yontemidir.',
    synthesis:
      'Kaynaklar separate chaining i hash fonksiyonunun ayni adrese gonderdigi anahtarlar icin sade ve esnek bir cozum olarak anlatir. Ortalama maliyet yukleme faktorune baglidir; iyi hash fonksiyonu ile kova listeleri kisa kalir.',
    steps: [
      'Anahtar icin h(key) indeksini hesapla.',
      'Arama ve silmede yalnizca o kovadaki zinciri tara.',
      'Eklemede anahtari ilgili zincire ekle veya mevcut degeri guncelle.',
      'Yukleme faktoru buyurse tabloyu yeniden boyutlandir.',
    ],
    time: 'O(1)',
    space: 'O(n)',
    applications: ['Hash map', 'Sembol tablosu', 'Cache indeksleri'],
    pseudocode: `CHAINED-INSERT(T, key, value)
  i <- hash(key) mod m
  if key exists in T[i] update it
  else prepend (key, value) to T[i]`,
  }),
  simpleEntry({
    title: 'Open Addressing',
    slug: 'open-addressing',
    category: 'data-structures',
    family: 'Searching / Hashing / Trees',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Cakisma durumunda ayni tablo icinde yeni hucreler deneyerek anahtari yerlestiren kapali tablo hashing yontemidir.',
    synthesis:
      'Sedgewick ve Aho, open addressing i zincir kullanmadan tablo ici arama dizileriyle cakisma cozme yaklasimi olarak verir. Linear probing, quadratic probing ve double hashing farkli deneme dizileri uretir.',
    steps: [
      'Anahtar icin ilk hash adresini hesapla.',
      'Hucre doluysa probe fonksiyonunun verdigi siradaki adresi dene.',
      'Bos veya silinmis hucre bulununca ekle.',
      'Aramada ayni probe sirasi bos hucreye kadar izlenir.',
    ],
    time: 'O(1)',
    space: 'O(n)',
    applications: ['Bellek dostu hash tablo', 'Runtime sozlukleri', 'Gomulu sistem indeksleri'],
    pseudocode: `OPEN-ADDRESS-SEARCH(T, key)
  for i <- 0 to m - 1
    j <- probe(key, i)
    if T[j].key == key return T[j]
    if T[j] is EMPTY return NOT_FOUND
  return NOT_FOUND`,
  }),
  simpleEntry({
    title: 'Heap Insertion / Upheap',
    slug: 'heap-insertion-upheap',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DSA', 'Aho'],
    description:
      'Yeni elemani heap in sonuna koyup ebeveynleriyle yer degistirerek heap kosulunu yukari dogru onarir.',
    synthesis:
      'Kaynaklarda upheap, oncelik kuyrugunun ekleme isleminin cekirdegidir. Dizi tabanli heap temsilinde eleman sona eklenir ve onceligi ebeveyninden yuksek oldugu surece yukari tasinir.',
    steps: [
      'Elemani dizinin sonuna ekle.',
      'Ebeveyn ile karsilastir.',
      'Heap kosulu bozuksa yer degistir.',
      'Kok veya uygun konuma kadar devam et.',
    ],
    time: 'O(log n)',
    space: 'O(1)',
    applications: ['Priority queue insert', 'Olay simulasyonu', 'Scheduler tasarimi'],
    pseudocode: `UPHEAP(H, i)
  while i > 1 and H[parent(i)] > H[i]
    swap H[parent(i)], H[i]
    i <- parent(i)`,
  }),
  simpleEntry({
    title: 'Heap Deletion / Downheap',
    slug: 'heap-deletion-downheap',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DSA', 'Aho'],
    description:
      'Kok elemani kaldirip son elemani koke alarak heap kosulunu asagi dogru onaran remove islemleridir.',
    synthesis:
      'Heap silme kaynaklarda genellikle remove-min veya remove-max olarak anlatilir. En oncelikli eleman koktedir; kok cikarildiktan sonra son eleman koke tasinir ve cocuklarla yer degistirerek uygun konuma indirilir.',
    steps: [
      'Kok degeri sakla.',
      'Son elemani koke tasi ve heap boyutunu azalt.',
      'Daha uygun cocukla karsilastir.',
      'Heap kosulu saglanana kadar asagi in.',
    ],
    time: 'O(log n)',
    space: 'O(1)',
    applications: ['Priority queue remove', 'Heap sort', 'En kucuk/en buyuk akisi'],
    pseudocode: `DOWNHEAP(H, i)
  while i has a child
    c <- child with higher priority
    if H[i] already has priority over H[c] break
    swap H[i], H[c]
    i <- c`,
  }),
  simpleEntry({
    title: 'Downheap / Pushdown',
    slug: 'downheap-pushdown',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Heap kosulu kok veya ara dugumde bozuldugunda elemani cocuklariyla karsilastirarak asagi indiren onarim islemidir.',
    synthesis:
      'Kaynaklarda pushdown/downheap, heap remove ve heap construction islemlerinin ortak cekirdegi olarak anlatilir. Eleman uygun cocukla yer degistire degistire heap kosulunun tekrar saglandigi seviyeye iner.',
    steps: [
      'Baslangic dugumunu sec.',
      'Daha yuksek oncelikli cocugu belirle.',
      'Ebeveyn-cocuk sirasi dogruysa dur.',
      'Degilse yer degistirip cocuk konumundan devam et.',
    ],
    time: 'O(log n)',
    space: 'O(1)',
    applications: ['Heapify', 'Remove-min/remove-max', 'Priority queue onarimi'],
    pseudocode: `PUSHDOWN(H, i)
  while left(i) exists
    child <- best child of i
    if H[i] has priority over H[child] break
    swap H[i], H[child]
    i <- child`,
  }),
  simpleEntry({
    title: 'Priority Queue Operations',
    slug: 'priority-queue-operations',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Elemanlari oncelik degerine gore ekleyen, cikaran ve oncelik degisikliginde yeniden konumlandiran soyut veri tipi islemleridir.',
    synthesis:
      'Sedgewick ve Aho, priority queue yu heap, sirali dizi veya listeyle uygulanabilen ortak bir soyutlama olarak sunar. Insert, remove ve change priority islemleri grafik algoritmalari, olay simulasyonu ve siralama icin kritik yapi taslaridir.',
    steps: [
      'insert yeni elemani veri yapisina ekler ve oncelik siralamasi onarilir.',
      'remove en yuksek veya en dusuk oncelikli elemani cikarir.',
      'change priority elemanin anahtarini degistirip yukari veya asagi tasir.',
      'peek en oncelikli elemani silmeden okur.',
    ],
    time: 'O(log n)',
    space: 'O(n)',
    applications: ['Dijkstra ve Prim', 'Olay simulasyonu', 'Is zamanlama'],
    pseudocode: `PQ-CHANGE-PRIORITY(PQ, item, priority)
  old <- item.priority
  item.priority <- priority
  if priority is better than old
    upheap(item)
  else
    downheap(item)`,
  }),
  simpleEntry({
    title: 'Weighted Union',
    slug: 'weighted-union',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Union-Find yapisinda kucuk agaci buyuk agacin kokune baglayarak agac yuksekligini sinirlayan birlestirme stratejisidir.',
    synthesis:
      'Kaynaklarda weighted union, basit quick-union in zincirlesme problemini azaltan ilk iyilestirme olarak kullanilir. Her kokte boyut veya rank tutulur ve daha kucuk kume daha buyuk kumenin altina baglanir.',
    steps: [
      'Iki elemanin koklerini bul.',
      'Kokler ayniysa islem yapma.',
      'Kucuk boyutlu agacin kokunu buyuk olana bagla.',
      'Yeni kokun boyutunu guncelle.',
    ],
    time: 'O(log n)',
    space: 'O(n)',
    applications: ['Baglanti sorgulari', 'Kruskal MST', 'Dinamik kume birlestirme'],
    pseudocode: `WEIGHTED-UNION(p, q)
  i <- find(p)
  j <- find(q)
  if i == j return
  if size[i] < size[j]
    parent[i] <- j
    size[j] <- size[j] + size[i]
  else
    parent[j] <- i
    size[i] <- size[i] + size[j]`,
  }),
  simpleEntry({
    title: 'Path Compression',
    slug: 'path-compression',
    category: 'data-structures',
    family: 'Heap / Priority Queue / Set / Union-Find',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Find islemi sirasinda ziyaret edilen dugumleri dogrudan koke baglayarak sonraki sorgulari hizlandiran Union-Find optimizasyonudur.',
    synthesis:
      'Uc kaynakta da path compression, Union-Find in pratikte neredeyse sabit zamanli davranmasini saglayan ana tekniklerden biridir. Weighted union ile birlikte kullanildiginda cok uzun islem dizilerinde bile agaclar sig kalir.',
    steps: [
      'Find icin ebeveyn baglarini koke kadar izle.',
      'Geri donerken her dugumun ebeveynini kok yap.',
      'Sonraki find sorgulari daha kisa yoldan koke ulasir.',
      'Union islemi ayni kokleri kullanmaya devam eder.',
    ],
    time: 'O(log n)',
    space: 'O(n)',
    applications: ['Kruskal MST', 'Baglantili bilesen takibi', 'Goruntu ve grid kumeleme'],
    pseudocode: `FIND(x)
  if parent[x] != x
    parent[x] <- FIND(parent[x])
  return parent[x]`,
  }),
  simpleEntry({
    title: 'Breadth-First Search',
    slug: 'bfs',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DAA Notes', 'DSA', 'Aho'],
    description:
      'Grafi baslangic dugumunden itibaren seviye seviye gezen kuyruk tabanli traversal algoritmasidir.',
    synthesis:
      'Kaynaklarda BFS, hem graf traversal hem de agirliksiz graflarda en kisa kenar sayisini bulma yontemi olarak anlatilir. Kuyruk veri yapisi, once kesfedilen dugumlerin once islenmesini saglar.',
    steps: [
      'Baslangic dugumunu isaretle ve kuyruga ekle.',
      'Kuyruktan dugum cikar.',
      'Isaretlenmemis komsularini isaretleyip kuyruga ekle.',
      'Kuyruk bosalana kadar devam et.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Agirliksiz en kisa yol', 'Seviye hesaplama', 'Baglanti analizi'],
    pseudocode: `BFS(G, s)
  mark s
  enqueue s
  while queue is not empty
    v <- dequeue
    for each neighbor w of v
      if w is unmarked
        mark w
        enqueue w`,
  }),
  simpleEntry({
    title: 'Depth-First Search',
    slug: 'dfs',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DAA Notes', 'DSA', 'Aho'],
    description:
      'Grafi bir dal boyunca mumkun oldugunca derine inerek gezen stack veya ozyineleme tabanli traversal algoritmasidir.',
    synthesis:
      'DFS kaynaklarda baglantili bilesen, topolojik analiz, articulation point ve SCC gibi daha ileri graf algoritmalarinin omurgasi olarak kullanilir. Zaman damgalari ve geri kenarlar DFS agacindan ek bilgi uretmeyi saglar.',
    steps: [
      'Baslangic dugumunu ziyaret et.',
      'Isaretlenmemis ilk komsuya ozyinelemeli git.',
      'Cikmaz yola gelince geri don.',
      'Tum dugumler isaretlenene kadar yeni baslangiclar sec.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Baglantili bilesenler', 'Cevrim tespiti', 'Topolojik siralama'],
    pseudocode: `DFS(G, v)
  mark v
  for each neighbor w of v
    if w is unmarked
      DFS(G, w)`,
  }),
  simpleEntry({
    title: 'Tree Traversals',
    slug: 'tree-traversals',
    category: 'data-structures',
    family: 'Graph Algorithms',
    difficulty: 'Kolay',
    sources: ['DAA Notes', 'DSA', 'Aho'],
    description:
      'Agac dugumlerini preorder, inorder, postorder, breadth-first veya non-recursive sekillerde sistematik ziyaret etme yontemleridir.',
    synthesis:
      'Kaynaklar agac dolasimlarini veri yapilarinin ortak okuma yontemi olarak verir. Recursive tanimlar sade, non-recursive surumler ise explicit stack kullanarak cagri yigini gereksinimini kontrol edilebilir hale getirir.',
    steps: [
      'Preorder kok-sol-sag sirasini kullanir.',
      'Inorder sol-kok-sag sirasiyla BST den sirali cikti alir.',
      'Postorder sol-sag-kok sirasiyla alt agaclari once isler.',
      'Non-recursive surumlerde stack veya kuyruk kullanilir.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['BST sirali cikti', 'Ifade agaci yazdirma', 'Agac serilestirme'],
    pseudocode: `INORDER(root)
  stack <- empty
  current <- root
  while current != NIL or stack not empty
    while current != NIL
      push current
      current <- current.left
    current <- pop stack
    visit current
    current <- current.right`,
  }),
  simpleEntry({
    title: 'Non-Recursive Tree Traversal',
    slug: 'non-recursive-tree-traversal',
    category: 'data-structures',
    family: 'Graph Algorithms',
    difficulty: 'Orta',
    sources: ['DAA Notes', 'DSA', 'Aho'],
    description:
      'Agac dolasimini cagri yigini yerine acik stack veya kuyruk kullanarak yapan iterative traversal ailesidir.',
    synthesis:
      'Kaynaklarda non-recursive traversal, recursive tanimin ayni ziyaret sirasini korurken bellek ve kontrol akisini programcinin yonetmesine izin veren yontem olarak verilir. Ozellikle inorder ve postorder icin stack durumu kritik rol oynar.',
    steps: [
      'Bos bir stack olustur ve kokten basla.',
      'Sol dala inerken dugumleri stack e koy.',
      'Geri donus noktasinda dugumu ziyaret et.',
      'Sag alt agaca gecerek islem bitene kadar surdur.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Derin agaclarda stack kontrolu', 'Iterator implementasyonu', 'BST sirali dolasim'],
    pseudocode: `ITERATIVE-INORDER(root)
  stack <- empty
  current <- root
  while current != NIL or stack not empty
    while current != NIL
      push stack, current
      current <- current.left
    current <- pop stack
    visit current
    current <- current.right`,
  }),
  simpleEntry({
    title: 'Preorder, Inorder and Postorder Traversal',
    slug: 'preorder-inorder-postorder-traversal',
    category: 'data-structures',
    family: 'Graph Algorithms',
    difficulty: 'Kolay',
    sources: ['DSA', 'Aho'],
    description:
      'Kok, sol ve sag alt agac ziyaret sirasini degistirerek agac yapisindan farkli semantik ciktilar ureten temel traversal siralaridir.',
    synthesis:
      'DSA ve Aho kaynaklari preorder, inorder ve postorder siralarini agac veri yapilarini anlamanin temel operasyonlari olarak anlatir. Inorder BST de sirali cikti verir; preorder serilestirme ve postorder alt agaclari once isleyen hesaplamalar icin uygundur.',
    steps: [
      'Preorder: once koku, sonra sol ve sag alt agaclari ziyaret et.',
      'Inorder: once sol alt agaci, sonra koku, sonra sag alt agaci ziyaret et.',
      'Postorder: once sol ve sag alt agaclari, sonra koku ziyaret et.',
      'Her sira recursive veya iterative olarak uygulanabilir.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Ifade agaclari', 'BST sirali cikti', 'Agac kopyalama ve silme'],
    pseudocode: `TRAVERSE(root)
  preorder:  visit root, traverse left, traverse right
  inorder:   traverse left, visit root, traverse right
  postorder: traverse left, traverse right, visit root`,
  }),
  simpleEntry({
    title: 'Connected Components',
    slug: 'connected-components',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Yonsuz grafi, birbirine yol ile ulasabilen dugum kumelerine ayiran traversal tabanli algoritmadir.',
    synthesis:
      'Kaynaklarda connected components, DFS/BFS in dogrudan bir uygulamasi olarak verilir. Her yeni isaretsiz dugum yeni bir bilesen baslatir ve traversal o bilesendeki tum dugumleri etiketler.',
    steps: [
      'Tum dugumleri isaretsiz baslat.',
      'Isaretsiz bir dugum sec ve yeni component id ata.',
      'DFS veya BFS ile ulasilan tum dugumlere ayni id yi ver.',
      'Isaretsiz dugum kalmayana kadar tekrarla.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Ag kumeleri', 'Goruntu bolge etiketleme', 'Sosyal ag analizi'],
    pseudocode: `COMPONENTS(G)
  id <- 0
  for each vertex v
    if v is unmarked
      DFS-LABEL(G, v, id)
      id <- id + 1`,
  }),
  simpleEntry({
    title: 'Biconnected Components and Articulation Points',
    slug: 'biconnected-components-articulation-points',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Bir dugum silindiginde grafi ayiran articulation point leri ve iki baglantili bilesenleri DFS low-link degerleriyle bulur.',
    synthesis:
      'Kaynaklarda biconnectivity, ag guvenilirligi ornegiyle aciklanir: articulation point tek hata noktasi demektir. DFS sirasinda her dugumun kesif zamani ve alt agacindan ulasabildigi en eski ata takip edilerek kritik dugumler bulunur.',
    steps: [
      'DFS ile discovery ve low degerlerini hesapla.',
      'Cocugun low degeri ebeveyn discovery degerinden buyuk/esitse articulation kosulunu kontrol et.',
      'Kok icin iki veya daha fazla DFS cocugu ozel durumdur.',
      'Kenar stack i ile biconnected component leri ayir.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Ag dayanikliligi', 'Devre analizi', 'Kritik altyapi noktalari'],
    pseudocode: `ARTICULATION-DFS(v)
  disc[v] <- low[v] <- time++
  for each neighbor w
    if w undiscovered
      parent[w] <- v
      ARTICULATION-DFS(w)
      low[v] <- min(low[v], low[w])
      test articulation condition
    else if w != parent[v]
      low[v] <- min(low[v], disc[w])`,
  }),
  simpleEntry({
    title: 'Warshall Transitive Closure',
    slug: 'warshall-transitive-closure',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Yonlu grafin erisilebilirlik matrisini ara dugumleri kademeli ekleyerek hesaplayan dinamik programlama algoritmasidir.',
    synthesis:
      'Warshall yontemi kaynaklarda transitive closure problemi icin verilir. k. asamada yalnizca 1..k ara dugumlerini kullanmaya izin verilir; i den j ye yol, ya zaten vardir ya da i -> k ve k -> j yollarinin birlesmesiyle olusur.',
    steps: [
      'Erisilebilirlik matrisini adjacency matrix ile baslat.',
      'Her k dugumunu olasi ara dugum olarak sec.',
      'Tum i,j ciftleri icin reach[i][j] degerini reach[i][k] ve reach[k][j] ile guncelle.',
      'Matris tum dolayli erisimleri temsil eder.',
    ],
    time: 'O(n³)',
    space: 'O(n²)',
    applications: ['Erisilebilirlik analizi', 'Bagimlilik kapanisi', 'Yonlu ag sorgulari'],
    pseudocode: `WARSHALL(R)
  for k <- 1 to n
    for i <- 1 to n
      for j <- 1 to n
        R[i][j] <- R[i][j] or (R[i][k] and R[k][j])
  return R`,
  }),
  simpleEntry({
    title: 'Transitive Closure',
    slug: 'transitive-closure',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Yonlu grafta her dugum ciftinin birbirine dolayli veya dogrudan ulasip ulasamadigini gosteren kapanis iliskisini hesaplar.',
    synthesis:
      'Kaynaklar transitive closure u erisilebilirlik probleminin matris veya DFS tabanli cozumu olarak sunar. Warshall algoritmasi matris tabanli klasik cozumdur; seyrek graflarda her dugumden DFS/BFS yapmak pratik bir alternatiftir.',
    steps: [
      'Erisilebilirlik icin bos veya adjacency tabanli bir sonuc yapisi baslat.',
      'Her kaynak dugumden traversal baslat veya matris DP kullan.',
      'Ulasilan her hedef dugum icin closure[source][target] degerini isaretle.',
      'Tum kaynaklar islendikten sonra kapanis matrisi sorgulara hazirdir.',
    ],
    time: 'O(n³)',
    space: 'O(n²)',
    applications: ['Bagimlilik analizi', 'Yetki ve erisim sorgulari', 'Veritabani transitive query leri'],
    pseudocode: `TRANSITIVE-CLOSURE(G)
  for each vertex s
    run DFS or BFS from s
    for each reached vertex v
      closure[s][v] <- true
  return closure`,
  }),
  simpleEntry({
    title: 'Strongly Connected Components',
    slug: 'strongly-connected-components',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Yonlu grafta her dugumun digerine karsilikli ulasabildigi maksimal dugum kumelerini bulur.',
    synthesis:
      'Kaynaklarda SCC, yonlu graf yapisini anlamanin temel adimidir. DFS tabanli low-link veya iki gecisli yontemlerle graf, yogun karsilikli erisilebilirlik adalarina ayrilir.',
    steps: [
      'DFS sirasinda discovery ve low-link degerlerini tut.',
      'Aktif dugumleri stack uzerinde sakla.',
      'low[v] discovery[v] oldugunda v bir SCC kokudur.',
      'Stack ten v ye kadar dugumleri cikararak bileseni elde et.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Modul bagimliligi', '2-SAT', 'Web ve sosyal graf analizi'],
    pseudocode: `TARJAN(v)
  disc[v] <- low[v] <- time++
  push v on stack
  for each edge v -> w
    update low[v] using DFS tree or stack edge
  if low[v] == disc[v]
    pop stack until v to form one SCC`,
  }),
  simpleEntry({
    title: 'Dijkstra Shortest Path',
    slug: 'dijkstra',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Negatif olmayan kenar agirlikli grafta tek kaynakli en kisa yollari greedy secimle hesaplar.',
    synthesis:
      'Kaynaklar Dijkstra yi priority-first traversal fikrinin en kisa yol onceligiyle ozel hali olarak ele alir. En kucuk gecici mesafeli dugum secildiginde, negatif kenar yoksa bu mesafe artik kesindir.',
    steps: [
      'Kaynak mesafesini 0, digerlerini sonsuz baslat.',
      'En kucuk gecici mesafeli dugumu sec.',
      'Cikan dugumun kenarlarini relax et.',
      'Oncelik kuyrugu bosalana kadar devam et.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Navigasyon', 'Ag yonlendirme', 'Oyunlarda yol bulma'],
    pseudocode: `DIJKSTRA(G, s)
  dist[s] <- 0
  push s into priority queue
  while pq not empty
    v <- extract-min(pq)
    for each edge v -> w with weight c
      if dist[w] > dist[v] + c
        dist[w] <- dist[v] + c
        update pq priority of w`,
  }),
  simpleEntry({
    title: 'Single-Source Shortest Path',
    slug: 'single-source-shortest-path',
    category: 'graph-algorithms',
    family: 'Graph Algorithms',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Bir kaynak dugumden grafteki tum diger dugumlere minimum maliyetli yollari hesaplayan problem ailesidir.',
    synthesis:
      'Kaynaklarda single-source shortest path, kenar agirlik kosullarina gore farkli algoritmalarla cozulur. Agirliksiz graf icin BFS, negatif olmayan agirliklar icin Dijkstra, negatif kenarlar icin Bellman-Ford uygun secimdir.',
    steps: [
      'Tum mesafeleri sonsuz, kaynak mesafesini 0 yap.',
      'Graf kosuluna gore BFS, Dijkstra veya Bellman-Ford sec.',
      'Relaxation adimiyla daha iyi mesafe bulundukca tabloyu guncelle.',
      'Predecessor bilgisi tutulursa en kisa yollar yeniden kurulabilir.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Navigasyon', 'Ağ gecikme analizi', 'Rota ve lojistik optimizasyonu'],
    pseudocode: `RELAX(u, v, weight)
  if dist[v] > dist[u] + weight(u, v)
    dist[v] <- dist[u] + weight(u, v)
    parent[v] <- u`,
  }),
  simpleEntry({
    title: 'Greedy Graph Coloring',
    slug: 'greedy-graph-coloring',
    category: 'greedy-algorithms',
    family: 'Graph Algorithms',
    sources: ['DAA Notes', 'Aho'],
    description:
      'Dugumleri sirayla gezip komsularinda kullanilmayan en kucuk uygun rengi atayan sezgisel graf renklendirme algoritmasidir.',
    synthesis:
      'Kaynaklarda graph coloring zor problemler ailesine baglanirken greedy yontem pratik bir yaklasim olarak verilir. Sonuc dugum siralamasina baglidir; optimal garanti vermez ama hizli ve uygulanmasi kolaydir.',
    steps: [
      'Dugumler icin bir isleme sirasi sec.',
      'Her dugumde komsularin renklerini topla.',
      'Kullanilmayan en kucuk rengi ata.',
      'Tum dugumler renklendirilene kadar devam et.',
    ],
    time: 'O(n²)',
    space: 'O(n)',
    applications: ['Zaman cizelgeleme', 'Register allocation', 'Harita renklendirme'],
    pseudocode: `GREEDY-COLOR(G)
  for each vertex v in chosen order
    used <- colors of colored neighbors
    color[v] <- smallest color not in used`,
  }),
  simpleEntry({
    title: 'Hamiltonian Cycle Backtracking',
    slug: 'hamiltonian-cycle-backtracking',
    category: 'backtracking',
    family: 'Graph Algorithms',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Her dugumu tam bir kez ziyaret edip baslangica donen cycle i aday yol uzerinde geri izleme ile arar.',
    synthesis:
      'DAA notlari Hamiltonian cycle icin NextValue/Hamiltonian tarzi backtracking iskeletini verir; Sedgewick ise problemi zor arama problemleri ve TSP ile iliskilendirir. Algoritma aday sirayi genisletir, uygun olmayan kenar veya tekrar durumunda geri doner.',
    steps: [
      'Baslangic dugumunu yola koy.',
      'Son dugume komsu ve daha once kullanilmamis aday sec.',
      'n dugum doldugunda son dugumden baslangica kenar var mi kontrol et.',
      'Aday kalmazsa onceki konuma geri don.',
    ],
    time: 'O(2^n)',
    space: 'O(n)',
    applications: ['Rota planlama modelleri', 'NP-complete problem egitimi', 'Backtracking ornekleri'],
    pseudocode: `HAMILTONIAN(k)
  if k == n
    report path if edge(path[n], path[1]) exists
  else
    for each vertex v
      if v is feasible at position k
        path[k] <- v
        HAMILTONIAN(k + 1)
        path[k] <- EMPTY`,
  }),
  simpleEntry({
    title: 'Recursive Descent Parsing',
    slug: 'recursive-descent-parsing',
    category: 'string-algorithms',
    family: 'String / Parsing / Compression / Crypto',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Gramerdeki her nonterminal icin bir fonksiyon yazarak girdiyi yukaridan asagi ayrıştıran parser yontemidir.',
    synthesis:
      'Kaynaklar recursive descent i top-down parsing in okunabilir ve elle yazilabilir bicimi olarak kullanir. Fonksiyonlar token akisini tuketir; gramer LL uyumluysa kararlar lookahead ile verilebilir.',
    steps: [
      'Her nonterminal icin bir parse fonksiyonu yaz.',
      'Fonksiyon beklenen terminali gorurse token i tuketir.',
      'Alternatif uretimler lookahead ile secilir.',
      'Baslangic sembolu tum girdiyi tuketirse parse basarilidir.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['Basit derleyiciler', 'Ifade yorumlayicilari', 'Konfigurasyon dili parser lari'],
    pseudocode: `parseExpression()
  parseTerm()
  while lookahead is + or -
    consume operator
    parseTerm()`,
  }),
  simpleEntry({
    title: 'Huffman Encoding',
    slug: 'huffman-coding',
    category: 'greedy-algorithms',
    family: 'String / Parsing / Compression / Crypto',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Sembol frekanslarina gore degisken uzunluklu, prefix-free kod agaci kuran greedy sıkıştırma algoritmasidir.',
    synthesis:
      'Huffman kaynaklarda greedy yontemin kanonik orneklerinden biridir. En dusuk frekansli iki dugum tekrar tekrar birlestirilir; sik semboller koke yakin, seyrek semboller daha derin kodlar alir.',
    steps: [
      'Her sembol icin frekans dugumu olustur.',
      'Tum dugumleri min-priority queue ya koy.',
      'En kucuk iki dugumu cikar ve yeni ebeveynle birlestir.',
      'Tek kok kalinca sol/sag yollarindan bit kodlarini uret.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Metin sıkıştırma', 'Dosya formatlari', 'Entropy coding egitimi'],
    pseudocode: `HUFFMAN(freq)
  pq <- leaf nodes ordered by frequency
  while pq has more than one node
    x <- extract-min(pq)
    y <- extract-min(pq)
    z <- node(freq = x.freq + y.freq, left = x, right = y)
    insert z into pq
  return extract-min(pq)`,
  }),
  simpleEntry({
    title: 'RSA Public-Key Cryptosystem',
    slug: 'rsa-public-key-cryptosystem',
    category: 'mathematical-algorithms',
    family: 'String / Parsing / Compression / Crypto',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Buyuk asal sayilar, moduler us alma ve ters alma uzerine kurulu acik anahtarli sifreleme yontemidir.',
    synthesis:
      'Kaynaklarda RSA, algoritmalarin gercek hayattaki kriptografi etkisine ornek olarak geciyor. Guvenlik, n = p*q carpiminin asal carpanlara ayrilmasinin zorlugu ile moduler aritmetigin verimli hesaplanabilmesine dayanir.',
    steps: [
      'Iki buyuk asal p ve q sec.',
      'n = p*q ve phi = (p-1)(q-1) hesapla.',
      'phi ile aralarinda asal e sec ve d = e^-1 mod phi bul.',
      'Sifreleme c = m^e mod n, cozme m = c^d mod n yapar.',
    ],
    time: 'O(log n)',
    space: 'O(1)',
    applications: ['Dijital imza', 'Anahtar degisimi', 'Guvenli iletisim protokolleri'],
    pseudocode: `RSA-KEYGEN()
  choose primes p, q
  n <- p * q
  phi <- (p - 1) * (q - 1)
  choose e with gcd(e, phi) = 1
  d <- modularInverse(e, phi)
  return public(n, e), private(n, d)`,
  }),
  simpleEntry({
    title: 'Branch and Bound',
    slug: 'branch-and-bound',
    category: 'advanced-algorithms',
    family: 'Design / Optimization / NP',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Arama uzayini dallandirip umut vermeyen alt problemleri alt/ust sinirlarla eleyen optimizasyon stratejisidir.',
    synthesis:
      'Kaynaklarda branch and bound, backtracking e benzer ama optimizasyon amacli bir arama semasi olarak ele alinir. FIFO, LIFO veya least-cost stratejileri aktif dugum secimini degistirir; bound fonksiyonu en iyi mevcut cozumden kotu alt agaclari budar.',
    steps: [
      'Kok alt problemi aktif dugum listesine koy.',
      'Bir aktif dugum sec.',
      'Cozum adayi ise en iyi degeri guncelle.',
      'Degilse cocuk alt problemler uret ve bound degeri umutlulari listeye ekle.',
    ],
    time: 'O(2^n)',
    space: 'O(n)',
    applications: ['0/1 knapsack', 'TSP', 'Atama problemleri'],
    pseudocode: `BRANCH-AND-BOUND(root)
  best <- infinity
  live <- {root}
  while live not empty
    node <- select(live)
    if bound(node) is better than best
      for child in expand(node)
        if child is complete update best
        else if bound(child) is promising add child to live`,
  }),
  simpleEntry({
    title: 'Divide and Conquer',
    slug: 'divide-and-conquer-method',
    category: 'divide-and-conquer',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Problemi ayni tipte daha kucuk alt problemlere bolen, alt problemleri cozen ve sonuclari birlestiren tasarim paradigmasidir.',
    synthesis:
      'Uc kaynakta divide and conquer, merge sort, binary search, Strassen ve benzeri algoritmalarin ortak dusunce yapisi olarak ele alinir. Etkili olmasi icin alt problemlerin orijinal probleme benzer, birlestirme adiminin ise kontrol edilebilir maliyette olmasi gerekir.',
    steps: [
      'Problemi daha kucuk ve ayni yapida alt problemlere bol.',
      'Alt problemleri recursive olarak veya taban durumda dogrudan coz.',
      'Alt cozumleri orijinal problemin cevabina birlestir.',
      'Maliyet denklemini T(n) = aT(n/b) + f(n) biciminde analiz et.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Merge sort', 'Binary search', 'Strassen matris carpimi'],
    pseudocode: `DIVIDE-AND-CONQUER(problem)
  if problem is small
    return solveDirectly(problem)
  subproblems <- divide(problem)
  answers <- solve each subproblem recursively
  return combine(answers)`,
  }),
  simpleEntry({
    title: 'Dynamic Programming Method',
    slug: 'dynamic-programming-method',
    category: 'dynamic-programming',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Ortak alt problemleri bir kez cozip saklayarak optimal alt yapiya sahip problemleri verimli cozen tasarim yontemidir.',
    synthesis:
      'Kaynaklarda dynamic programming, bol-ve-fethetin ayni alt problemi tekrar cozdugu durumlarda tablo veya memoization ile guclendirilmis hali olarak anlatilir. OBST, knapsack, TSP ve Warshall bu yaklasimin farkli alanlardaki ornekleridir.',
    steps: [
      'Durumlari ve her durumun temsil ettigi alt problemi tanimla.',
      'Taban durumlari baslat.',
      'Gecis denklemiyle kucuk durumlardan buyuk durumlari hesapla.',
      'Gerekirse secim tablosuyla cozum yolunu geri kur.',
    ],
    time: 'O(n²)',
    space: 'O(n²)',
    applications: ['Knapsack', 'Optimal BST', 'TSP bitmask DP'],
    pseudocode: `DYNAMIC-PROGRAMMING(states)
  initialize base states
  for state in dependency order
    dp[state] <- best transition from smaller states
  return answer state`,
  }),
  simpleEntry({
    title: 'Greedy Method',
    slug: 'greedy-method',
    category: 'greedy-algorithms',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['DAA Notes', 'Aho'],
    description:
      'Her adimda yerel olarak en iyi gorunen secimi yaparak global cozum kurmaya calisan algoritma tasarim yontemidir.',
    synthesis:
      'DAA Notes ve Aho kaynaklari greedy method u Huffman, graf renklendirme ve secim problemleriyle iliskilendirir. Yontemin dogru calismasi icin greedy-choice property ve optimal substructure gerekliyken, her optimizasyon probleminde garanti vermez.',
    steps: [
      'Aday secimleri uygun bir olcute gore sirala veya onceliklendir.',
      'Mevcut cozumle uyumlu en iyi adayi sec.',
      'Secimi geri almadan cozum durumuna ekle.',
      'Cozum tamamlanana kadar devam et ve optimalite kosulunu kanitla.',
    ],
    time: 'O(n log n)',
    space: 'O(n)',
    applications: ['Huffman coding', 'Fractional knapsack', 'Minimum spanning tree'],
    pseudocode: `GREEDY(candidates)
  solution <- empty
  while solution is incomplete
    x <- best feasible candidate
    add x to solution
  return solution`,
  }),
  simpleEntry({
    title: 'Backtracking Method',
    slug: 'backtracking-method',
    category: 'backtracking',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Aday cozum agacini derinlemesine gezip kisitlari ihlal eden dallardan geri donen arama yontemidir.',
    synthesis:
      'Kaynaklarda backtracking, Hamiltonian cycle, graph coloring, subset ve kombinatoryal arama problemleri icin genel bir sema olarak anlatilir. Brute force tan daha etkilidir cunku uygunluk testi basarisiz dallari erken keser.',
    steps: [
      'Kismi cozum icin bir sonraki secim konumunu belirle.',
      'Uygun adaylari tek tek dene.',
      'Aday kisitlari bozuyorsa o dali birak.',
      'Cozum tamamlanirsa raporla, degilse recursive olarak devam et.',
    ],
    time: 'O(2^n)',
    space: 'O(n)',
    applications: ['Hamiltonian cycle', 'N-Queens', 'Graph coloring'],
    pseudocode: `BACKTRACK(partial)
  if partial is complete
    report partial
  for each candidate
    if candidate is feasible
      add candidate
      BACKTRACK(partial)
      remove candidate`,
  }),
  simpleEntry({
    title: 'Pruning',
    slug: 'pruning',
    category: 'advanced-algorithms',
    family: 'Design / Optimization / NP',
    difficulty: 'Orta',
    sources: ['Sedgewick', 'Aho'],
    description:
      'Arama agacinda cozum uretmeyecegi veya mevcut en iyiyi iyilestiremeyecegi bilinen dallari erken kesme teknigidir.',
    synthesis:
      'Sedgewick ve Aho pruning fikrini backtracking ve zor arama problemlerinin pratikte calisabilir hale gelmesini saglayan ortak iyilestirme olarak ele alir. Budama, dogru uygunluk veya bound testlerine dayanirsa sonucu degistirmeden arama alanini kucultur.',
    steps: [
      'Kismi cozum icin hizli bir uygunluk veya bound testi tasarla.',
      'Test basarisizsa alt dallari hic uretme.',
      'Test basariliysa normal arama genisletmesine devam et.',
      'Budama kosulunun dogru cozumleri elemedigini kanitla.',
    ],
    time: 'O(2^n)',
    space: 'O(n)',
    applications: ['Backtracking', 'Branch and bound', 'Oyun agaci aramasi'],
    pseudocode: `SEARCH(node)
  if cannotImprove(node) or violatesConstraints(node)
    return
  if node is solution
    report node
  for child in expand(node)
    SEARCH(child)`,
  }),
  simpleEntry({
    title: 'Traveling Salesman Problem',
    slug: 'traveling-salesman-problem',
    category: 'dynamic-programming',
    family: 'Design / Optimization / NP',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes', 'Aho'],
    description:
      'Bir gezginin tum sehirleri bir kez ziyaret edip baslangica dondugu minimum maliyetli turu bulma problemidir.',
    synthesis:
      'Uc kaynak da TSP yi dinamik programlama, backtracking, branch-and-bound ve NP-zorluk baglaminda kullanir. Kucuk n icin bitmask DP kesin cozum verir; buyuk n icin bound, sezgisel veya yaklasik yontemler gerekir.',
    steps: [
      'Durumu ziyaret edilen sehir kumesi ve son sehir olarak tanimla.',
      'Baslangic sehrinden tek elemanli durumlari baslat.',
      'Her durumda ziyaret edilmemis sehirlere gecis maliyetini guncelle.',
      'Tum sehirler ziyaret edilince baslangica donus maliyetini ekle.',
    ],
    time: 'O(2^n)',
    space: 'O(2^n)',
    applications: ['Lojistik rota planlama', 'Devre yerlesimi', 'NP-complete problem analizi'],
    pseudocode: `TSP-DP(dist)
  dp[{start}][start] <- 0
  for each subset S containing start
    for each last in S
      for each next not in S
        relax dp[S union {next}][next]
  return min last dp[all][last] + dist[last][start]`,
  }),
  simpleEntry({
    title: 'Nondeterministic Algorithms',
    slug: 'nondeterministic-algorithms',
    category: 'advanced-algorithms',
    family: 'Design / Optimization / NP',
    difficulty: 'Zor',
    sources: ['Sedgewick', 'DAA Notes'],
    description:
      'Birden fazla secenegi kuramsal olarak ayni anda deneyebilen modelle tanimlanan, NP analizinde kullanilan algoritma fikridir.',
    synthesis:
      'Kaynaklarda nondeterministic algoritmalar, zor problemlerin dogrulama ve NP sinifi baglaminda anlasilmasi icin kullanilir. Gercek makinede tum dallar denenmez; model, dogru sertifikanin tahmin edilip polinom zamanda dogrulanmasi fikrini ifade eder.',
    steps: [
      'Cozum sertifikasi icin nondeterministic bir secim yapildigini varsay.',
      'Secilen sertifikayi deterministik olarak dogrula.',
      'Herhangi bir dal kabul ederse algoritma kabul eder.',
      'Tum dallar reddederse algoritma reddeder.',
    ],
    time: 'O(n)',
    space: 'O(n)',
    applications: ['NP sinifi', 'Sertifika dogrulama', 'Karmasiklik teorisi'],
    pseudocode: `NONDETERMINISTIC-VERIFY(instance)
  certificate <- choose possible certificate
  if verify(instance, certificate)
    accept
  else
    reject`,
  }),
] satisfies DuplicateAlgorithmContent[];

export function getDuplicateAlgorithm(
  category: string,
  slug: string
): DuplicateAlgorithmContent | undefined {
  return duplicateAlgorithmContents.find(
    (algorithm) => algorithm.category === category && algorithm.slug === slug
  );
}

export function getDuplicateAlgorithmsByCategory(
  category: DuplicateAlgorithmCategory
): DuplicateAlgorithmContent[] {
  return duplicateAlgorithmContents.filter(
    (algorithm) => algorithm.category === category
  );
}

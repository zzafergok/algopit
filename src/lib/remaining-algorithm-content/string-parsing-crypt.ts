import type { RemainingAlgorithmContent } from './types';

export const stringSearchMatchingContent: RemainingAlgorithmContent = {
  title: 'String Arama ve Eşleştirme (String Search & Matching)',
  category: 'Metin İşleme Algoritmaları',
  categoryHref: '/algorithms/string-algorithms',
  family: 'String / Pattern Matching',
  difficulty: 'Zor',
  sources: ['Sedgewick', 'Aho'],
  summary: 'Metin içerisinde bir veya birden fazla deseni aramak için Kaba Kuvvet, Boyer-Moore varyantları, Durum Makinesi (FSM), NFA ve Düzenli İfade eşleştirmelerini kullanan yaklaşımlardır.',
  descriptionParagraphs: [
    'Metin arama algoritmaları bilgisayar bilimlerinin en temel alanlarından biridir. Basit Kaba Kuvvet (Brute-Force) araması her adımı tek tek denerken, Boyer-Moore ve onun uyuşmayan karakter (mismatched-character) varyantı sağdan sola eşleştirme yaparak gereksiz karşılaştırmaları atlar.',
    'Durum Makinesi (Finite State Machine - FSM) ile desen arama, deseni bir DFA haline getirerek metindeki her karakter için O(1) geçiş süresi sunar. NFA (Nondeterministic Finite Automata) simülasyonu ve Düzenli İfade (Regular Expression) eşleştirme ise joker karakterler, gruplar ve tekrarlar barındıran daha karmaşık kurallı kalıpları kontrol etmeyi sağlar.',
    'Çoklu String Aramaları (Aho-Corasick vb.) ise tek bir geçişte metin içerisinde yüzlerce farklı kelimeyi aynı anda aramak için bir arama ağacı (trie) ve hata geçişleri kullanır.'
  ],
  sourceNotes: [
    'Sedgewick: Brute force matches in O(NM) in the worst case.',
    'Sedgewick: Boyer-Moore variant uses the right-to-left scan and the bad-character mismatch heuristic.',
    'Aho: Regular expressions are converted to NFA via Thompson\'s construction and simulated using active state sets.'
  ],
  steps: [
    'Boyer-Moore için: Desen karakterlerinin en sağdaki konumlarını tutan bir bad-character tablosu hazırla.',
    'Metin penceresini hizala, deseni sağdan sola doğru metinle karşılaştır.',
    'Uyuşmazlık olduğunda, uyuşmayan karakterin tablodaki değerine göre pencereyi sağa doğru kaydır.',
    'DFA/NFA için: Düzenli ifadeyi/deseni durumlarına ayır. Metinden okunan her karakterle durumlar arası geçişleri tetikle.'
  ],
  pseudocode: `BOYER-MOORE-BAD-CHAR(T, P)
  n <- length(T)
  m <- length(P)
  badChar <- BAD-CHARACTER-TABLE(P)
  s <- 0
  while s <= n - m
    j <- m - 1
    while j >= 0 and P[j] = T[s + j]
      j <- j - 1
    if j < 0
      PRINT s
      s <- s + (s + m < n ? m - badChar[T[s + m]] : 1)
    else
      s <- s + MAX(1, j - badChar[T[s + j]])`,
  codeExamples: {
    typescript: `function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];

  // Bad character tablosu oluştur
  const badChar: Record<string, number> = {};
  for (let i = 0; i < m; i++) {
    badChar[pattern[i]] = i;
  }

  const shifts: number[] = [];
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }
    if (j < 0) {
      shifts.push(s);
      s += (s + m < n) ? m - (badChar[text[s + m]] ?? -1) : 1;
    } else {
      s += Math.max(1, j - (badChar[text[s + j]] ?? -1));
    }
  }
  return shifts;
}`,
    python: `def boyer_moore_search(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0: return []
    bad_char = {char: i for i, char in enumerate(pattern)}
    shifts = []
    s = 0
    while s <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        if j < 0:
            shifts.append(s)
            s += (m - bad_char.get(text[s + m], -1)) if s + m < n else 1
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    return shifts`
  },
  demo: {
    kind: 'string-search-matching',
    title: 'Metin Arama ve Düzenli İfade Demo',
    description: 'Modu, deseni ve metni noktalı virgülle ayırarak girin. Modlar: BF (Kaba Kuvvet), BM (Boyer-Moore), FSM (Durum Makinesi), REGEX (NFA/Regex). Örnek: BM; NEEDLE; FINDINNEEDLESTACK',
    placeholder: 'BM; NEEDLE; FINDINNEEDLESTACK'
  },
  timeComplexity: {
    best: 'O(N / M) Boyer-Moore ile',
    average: 'O(N + M)',
    worst: 'O(N * M) Kaba Kuvvet ile'
  },
  spaceComplexity: 'O(M + Σ) bad-char tablosu veya FSM geçişleri için',
  analysisTitle: 'Eşleştirme Seçenekleri',
  analysisPoints: [
    'Boyer-Moore, alfabetik genişliği büyük olan dillerde ve uzun desenlerde O(N/M) performansı ile alt-doğrusal (sub-linear) çalışabilir.',
    'DFA tabanlı arama, her karakterde tek bir dizi okuması yaptığı için O(N) süresini garanti eder, ancak durum geçiş tablosunun oluşturulması O(M * Σ) yer kaplar.',
    'Regex NFA eşleştirmesinde, geriye izleme (backtracking) içeren naif yapılar üstel O(2^N) zaman alabilirken, Thompson NFA simülasyonu O(N * M) zamanında tamamlanır.'
  ],
  advantages: [
    'Boyer-Moore uzun kelimelerde metnin büyük bir kısmını atlayarak inanılmaz hızlı çalışır.',
    'NFA ve Regex esnek kalıp tanımlama imkanı tanır.'
  ],
  disadvantages: [
    'Boyer-Moore kısa veya çok tekrarlı desenlerde (örn. "AAAA") Brute-Force seviyesine düşebilir.',
    'FSM geçiş tabloları büyük alfabelerde (Unicode) çok yer kaplar.'
  ],
  relatedAlgorithms: [
    {
      title: 'KMP Algorithm',
      description: 'Metinde geriye sarmadan arama yapabilen deterministik algoritma.',
      href: '/algorithms/string-algorithms/kmp'
    },
    {
      title: 'Rabin-Karp Algorithm',
      description: 'Rolling hash kullanarak desen arama yapan algoritma.',
      href: '/algorithms/string-algorithms/rabin-karp'
    }
  ]
};

export const compilersParsingContent: RemainingAlgorithmContent = {
  title: 'Derleyiciler ve Ayrıştırma (Compilers & Parsing)',
  category: 'Metin İşleme Algoritmaları',
  categoryHref: '/algorithms/string-algorithms',
  family: 'Compilers / Parsing',
  difficulty: 'Zor',
  sources: ['Aho Compiler Dragon Book', 'Sedgewick'],
  summary: 'Dil derleyicilerinde kaynak kodun gramer yapısını doğrulamak için kullanılan Aşağıdan Yukarıya (Shift-Reduce) ve Yukarıdan Aşağıya (Recursive Descent) ayrıştırma teknikleridir.',
  descriptionParagraphs: [
    'Ayrıştırma (Parsing), doğrusal karakter dizilerini (token dizileri) gramer kurallarına göre analiz ederek bir soyut sözdizim ağacı (AST) oluşturma sürecidir.',
    'Aşağıdan Yukarıya (Bottom-Up) ayrıştırmada en yaygın yaklaşım Kaydır-İndirge (Shift-Reduce) yöntemidir. Tokenlar yığına atılır (Shift), yığının tepesindeki grup bir gramer kuralıyla eşleştiğinde sol taraftaki sembole indirgenir (Reduce).',
    'Yukarıdan Aşağıya (Top-Down) ayrıştırmada ise Recursive Descent (Özyinelemeli İniş) yöntemi popülerdir. Her gramer kuralı (Expression, Term, Factor vb.) bir fonksiyona karşılık gelir. Fonksiyonlar birbirini çağırarak en tepedeki başlangıç sembolünden yapraklara doğru ağacı inşa eder.'
  ],
  sourceNotes: [
    'Aho Compiler Book: Bottom-up parsing parses inputs from leaves to root using a pushdown stack.',
    'Aho Compiler Book: Recursive descent parsing uses mutual recursion to evaluate expression, term, and factor grammars.'
  ],
  steps: [
    'Shift-Reduce için: Boş bir yığın oluştur. Giriş tokenlarını sırayla oku.',
    'Yığına ekle (Shift) ve yığındaki son elemanların herhangi bir üretim kuralının sağ tarafıyla eşleşip eşleşmediğini kontrol et.',
    'Eşleşiyorsa, bu elemanları yığından çıkarıp kuralın solundaki sembolü yığına koy (Reduce).',
    'Recursive Descent için: expression() fonksiyonunu çağır. O term()\'i, term() ise factor()\'ü çağırsın. Operatörleri (+, *, parantezler) özyinelemeli olarak tüket.'
  ],
  pseudocode: `SHIFT-REDUCE-PARSER(tokens, rules)
  stack <- EmptyStack
  i <- 0
  while i < length(tokens) or can-reduce
    if can-reduce(stack)
      rule <- find-matching-rule(stack)
      stack.pop(rule.right.length)
      stack.push(rule.left)
      PRINT "REDUCE using " + rule
    else
      stack.push(tokens[i])
      i <- i + 1
      PRINT "SHIFT"
  if stack.length = 1 and stack.top = START-SYMBOL
    return SUCCESS
  return FAILURE`,
  codeExamples: {
    typescript: `// Basit Recursive Descent Parser (Expression -> Term [+/- Term]*, Term -> Factor [*// Factor]*)
class ExpressionParser {
  private tokens: string[];
  private index: number = 0;

  constructor(expression: string) {
    this.tokens = expression.match(/\\d+|[+*/()-]/g) ?? [];
  }

  private peek(): string | null {
    return this.index < this.tokens.length ? this.tokens[this.index] : null;
  }

  private consume(expected?: string): string {
    const t = this.peek();
    if (expected && t !== expected) {
      throw new Error(\`Beklenen token: \${expected}, Alınan: \${t}\`);
    }
    this.index++;
    return t ?? '';
  }

  parse(): number {
    const val = this.expression();
    if (this.index < this.tokens.length) {
      throw new Error(\`Ayrıştırılmamış fazlalık tokenlar: \${this.tokens.slice(this.index).join(' ')}\`);
    }
    return val;
  }

  private expression(): number {
    let val = this.term();
    while (this.peek() === '+' || this.peek() === '-') {
      const op = this.consume();
      const right = this.term();
      val = op === '+' ? val + right : val - right;
    }
    return val;
  }

  private term(): number {
    let val = this.factor();
    while (this.peek() === '*' || this.peek() === '/') {
      const op = this.consume();
      const right = this.factor();
      val = op === '*' ? val * right : val / right;
    }
    return val;
  }

  private factor(): number {
    const t = this.peek();
    if (t === '(') {
      this.consume('(');
      const val = this.expression();
      this.consume(')');
      return val;
    }
    if (t && /\\d+/.test(t)) {
      return Number(this.consume());
    }
    throw new Error(\`Geçersiz token: \${t}\`);
  }
}`,
    python: `import re

class ExpressionParser:
    def __init__(self, expr):
        self.tokens = re.findall(r'\\d+|[+*/()-]', expr)
        self.index = 0
    def peek(self):
        return self.tokens[self.index] if self.index < len(self.tokens) else None
    def consume(self, expected=None):
        t = self.peek()
        if expected and t != expected:
            raise ValueError(f"Expected {expected}, got {t}")
        self.index += 1
        return t
    def parse(self):
        return self.expression()
    def expression(self):
        val = self.term()
        while self.peek() in ('+', '-'):
            op = self.consume()
            right = self.term()
            val = val + right if op == '+' else val - right
        return val
    def term(self):
        val = self.factor()
        while self.peek() in ('*', '/'):
            op = self.consume()
            right = self.factor()
            val = val * right if op == '*' else val / right
        return val
    def factor(self):
        t = self.peek()
        if t == '(':
            self.consume('(')
            val = self.expression()
            self.consume(')')
            return val
        if t and t.isdigit():
            return int(self.consume())
        raise ValueError(f"Invalid token: {t}")`
  },
  demo: {
    kind: 'compilers-parsing',
    title: 'Aritmetik İfade Ayrıştırıcı Demo',
    description: 'Modu ve aritmetik ifadeyi noktalı virgülle ayırın. Modlar: SR (Shift-Reduce bottom-up), RD (Recursive Descent top-down). Örnek: RD; (3 + 5) * 2',
    placeholder: 'RD; (3 + 5) * 2'
  },
  timeComplexity: {
    best: 'O(N) doğrusal zamanda',
    average: 'O(N)',
    worst: 'O(N) backtrack içermeyen gramerlerde'
  },
  spaceComplexity: 'O(N) yığın derinliği veya AST boyutu',
  analysisTitle: 'Derleyici Mimarisi',
  analysisPoints: [
    'Recursive Descent (LL parse), soldan sağa okuma yaparak en soldan türetim üretir. Yazılması çok kolaydır ancak sol özyinelemeli (left-recursive) kurallarda sonsuz döngüye girebilir.',
    'Shift-Reduce (LR parse), yığın tabanlı olup en sağdan türetimi tersten üretir. Daha geniş gramer sınıflarını (sol özyineleme dahil) destekler.',
    'Gramer kurallarının çakışmaması için önceden operatör öncelik tablosu (operator precedence) veya parantez kısıtları tanımlanmalıdır.'
  ],
  advantages: [
    'Matematiksel ve mantıksal formülleri, programlama dillerini yorumlamayı (interpret) sağlar.',
    'Gramer kurallarını modüler fonksiyonlar halinde temiz şekilde kodlama imkanı sunar.'
  ],
  disadvantages: [
    'Belirsiz (ambiguous) gramerlerde Shift/Reduce veya Reduce/Reduce çakışmaları (conflict) çözmek karmaşıktır.'
  ],
  relatedAlgorithms: [
    {
      title: 'String Search & Matching',
      description: 'Ayrıştırma öncesinde tokenlaştırma (lexical analysis) yapmak için kullanılan desen eşleştirmeler.',
      href: '/algorithms/string-algorithms/string-search-matching'
    }
  ]
};

export const compressionContent: RemainingAlgorithmContent = {
  title: 'Veri Sıkıştırma (Compression)',
  category: 'Metin İşleme Algoritmaları',
  categoryHref: '/algorithms/string-algorithms',
  family: 'Compression / Encoding',
  difficulty: 'Orta',
  sources: ['Sedgewick', 'Huffman 1952'],
  summary: 'Verinin kapladığı boyutu küçültmek için ardışık tekrarları sayı çiftlerine dönüştüren RLE ve frekanslara göre değişken bit uzunluğu atayan Değişken Uzunluklu Kodlama yöntemleridir.',
  descriptionParagraphs: [
    'Veri sıkıştırma, bilginin saklanması veya iletilmesi sırasında bellek/bant genişliği verimliliğini artırmayı hedefler. Kayıpsız sıkıştırma yöntemleri, orijinal veriyi bit kaybı olmadan tamamen geri yüklemeyi garanti eder.',
    'RLE (Run-Length Encoding), veri içinde arka arkaya tekrar eden karakter gruplarını (örn. "AAAAA") karakter ve tekrar sayısı (örn. "A5" veya "5A") olarak kodlayan basit ve etkili bir yöntemdir. Özellikle piksellerin tekrar ettiği basit resimlerde veya seyrek verilerde çok başarılıdır.',
    'Değişken Uzunluklu Kodlama (Variable-Length Encoding) ise verideki karakterlerin frekanslarını (görülme sıklıklarını) çıkarır. Çok sık geçen karakterlere kısa bit kodları (örn. "A" için "0"), nadir geçen karakterlere ise uzun bit kodları (örn. "Z" için "1101") atayarak genel bit yükünü optimize eder.'
  ],
  sourceNotes: [
    'Sedgewick: RLE is highly effective when long runs of identical values are present.',
    'Huffman: Huffman variable-length code creates a prefix-free binary tree where path lengths are inversely proportional to character frequencies.'
  ],
  steps: [
    'RLE için: Karakterleri sırayla tara. Her yeni karaktere geçtiğinde, önceki karakterin kaç defa tekrar ettiğini kaydet (örn. A4, B2).',
    'VLE (Huffman) için: Tüm karakterlerin frekanslarını bul.',
    'Her karakteri yaprak düğüm kabul ederek bir öncelik kuyruğuna koy.',
    'Kuyruktan en küçük iki frekanslı düğümü çıkar, bunları yeni bir ebeveyn düğümün altına bağla (ebeveynin frekansı ikisinin toplamıdır). Ebeveyni kuyruğa geri koy.',
    'Kuyrukta tek bir kök düğüm kalana kadar tekrarla. Sola giden yollara 0, sağa giden yollara 1 vererek kodları oluştur.'
  ],
  pseudocode: `RLE-ENCODE(text)
  compressed <- EmptyString
  i <- 0
  while i < length(text)
    count <- 1
    while i + 1 < length(text) and text[i] = text[i+1]
      count <- count + 1
      i <- i + 1
    compressed <- compressed + text[i] + count
    i <- i + 1
  return compressed`,
  codeExamples: {
    typescript: `// Run-Length Encoding (RLE)
function runLengthEncode(input: string): string {
  if (input.length === 0) return '';
  let encoded = '';
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    if (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
    } else {
      encoded += input[i] + count;
      count = 1;
    }
  }
  return encoded;
}

// Variable-Length static encoding map generator
function buildFrequencyMap(input: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const char of input) {
    freq[char] = (freq[char] ?? 0) + 1;
  }
  return freq;
}`,
    python: `def run_length_encode(input_str):
    if not input_str: return ""
    encoded = []
    count = 1
    for i in range(len(input_str)):
        if i + 1 < len(input_str) and input_str[i] == input_str[i+1]:
            count += 1
        else:
            encoded.append(f"{input_str[i]}{count}")
            count = 1
    return "".join(encoded)`
  },
  demo: {
    kind: 'compression',
    title: 'Veri Sıkıştırma Demo',
    description: 'Sıkıştırma modunu ve metni noktalı virgülle ayırın. Modlar: RLE (Run-Length), VLE (Değişken Uzunluklu Huffman benzeri). Örnek: RLE; AAAABBBCCDAA',
    placeholder: 'RLE; AAAABBBCCDAA'
  },
  timeComplexity: {
    best: 'O(N) doğrusal sürede',
    average: 'O(N + V log V) V: alfabe boyutu',
    worst: 'O(N + V log V)'
  },
  spaceComplexity: 'O(V) frekans tablosu ve kod ağacı için',
  analysisTitle: 'Sıkıştırma Verimliliği',
  analysisPoints: [
    'RLE, verinin çok tekrarlı olmadığı (örn. "ABCDEF") durumlarda sıkıştırmak yerine veri boyutunu iki katına çıkartabilir (örn. "A1B1C1D1E1F1").',
    'Değişken Uzunluklu Kodlama (Huffman), herhangi bir kodun diğerinin öneki olmamasını (prefix-free property) garanti ederek bit akışının hatasız çözülmesini sağlar.',
    'Entropy kavramı: Shannon teorisine göre bir metnin sıkıştırılabileceği teorik alt sınır karakter olasılıklarının entropi toplamı kadardır.'
  ],
  advantages: [
    'Kayıpsız sıkıştırma sayesinde veri kaybı yaşanmadan geri açılabilir.',
    'RLE çok basit grafiklerde (bmp, rle formatları) aşırı hızlı sıkıştırma sağlar.'
  ],
  disadvantages: [
    'Karmaşık metinlerde RLE etkisiz kalır.',
    'Huffman kod ağacının (dictionary) çözümleme için sıkıştırılmış dosyanın başına eklenmesi gerekmesi küçük dosyalarda ek yük yaratır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Huffman Coding',
      description: 'Açgözlü (Greedy) yaklaşımla frekans ağacı oluşturan orijinal Huffman algoritması.',
      href: '/algorithms/greedy-algorithms/huffman-coding'
    }
  ]
};

export const cryptographyContent: RemainingAlgorithmContent = {
  title: 'Kriptografi (Cryptography)',
  category: 'Metin İşleme Algoritmaları',
  categoryHref: '/algorithms/string-algorithms',
  family: 'Cryptography / Security',
  difficulty: 'Orta',
  sources: ['Kahn Codebreakers', 'Sedgewick'],
  summary: 'Gizliliği sağlamak amacıyla metinleri şifrelemek için kullanılan Sezar, Vigenere, Vernam (One-Time Pad) ve Çarpım (Substitution + Transposition) şifreleme yöntemleridir.',
  descriptionParagraphs: [
    'Kriptografi, bilginin yetkisiz kişilerin eline geçmesini önlemek için okunabilir veriyi (plaintext) anlamsız bir biçime (ciphertext) dönüştürme bilimidir.',
    'Sezar Şifrelemesi (Caesar Cipher), alfabedeki her karakteri sabit bir anahtar kadar kaydıran klasik bir ikame (substitution) şifresidir. Vigenere Şifrelemesi ise kelime şeklinde bir anahtar kullanarak her harfi anahtarın ilgili harfinin sırasına göre farklı miktarlarda kaydırarak frekans analizini zorlaştırır.',
    'Vernam Şifrelemesi (One-Time Pad), metinle aynı uzunlukta tamamen rastgele tek kullanımlık bir anahtar ile XOR veya modüler toplama yaparak kırılması matematiksel olarak imkansız (perfect secrecy) şifreli metin üretir. Çarpım Şifrelemesi (Product Cipher) ise substitution (yerine koyma) ve transposition (yer değiştirme / permütasyon) işlemlerini ardışık uygulayarak daha güçlü şifreleme blokları elde eder (modern AES/DES algoritmalarının atasıdır).'
  ],
  sourceNotes: [
    'Caesar: Shifting characters by key k mod 26.',
    'Vigenere: Repeating key shifts to eliminate simple single-character frequency analysis.',
    'Vernam: One-time pad with random key size >= message size has perfect secrecy (Shannon 1949).'
  ],
  steps: [
    'Sezar için: Plaintext karakterlerini oku. Her karakterin sayısal koduna anahtarı (k) ekle. Mod 26 alıp yeni karakteri yazdır.',
    'Vigenere için: Anahtar kelimeyi (örn: KEY) metin boyunca tekrar et. Metindeki i. karakteri anahtarın i. karakterinin sayısal değeri kadar kaydır.',
    'Vernam için: Metin uzunluğuna eşit veya daha uzun rastgele anahtar üret. Karakterleri bit veya alfabetik düzeyde XOR\'la veya modüler topla.',
    'Çarpım Şifresi için: Metni önce Sezar benzeri bir ikameyle değiştir, ardından matris yöntemiyle karakterlerin sıralarını karıştır (transposition).'
  ],
  pseudocode: `VIGENERE-ENCRYPT(plaintext, key)
  ciphertext <- EmptyString
  m <- length(key)
  for i <- 0 to length(plaintext) - 1
    pChar <- plaintext[i]
    kChar <- key[i mod m]
    cVal <- (char-to-num(pChar) + char-to-num(kChar)) mod 26
    ciphertext <- ciphertext + num-to-char(cVal)
  return ciphertext`,
  codeExamples: {
    typescript: `// Caesar Cipher
function caesarEncrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      return char;
    })
    .join('');
}

// Vigenere Cipher
function vigenereEncrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return cleanText;

  let cipher = '';
  for (let i = 0; i < cleanText.length; i++) {
    const pCode = cleanText.charCodeAt(i) - 65;
    const kCode = cleanKey.charCodeAt(i % cleanKey.length) - 65;
    const cCode = (pCode + kCode) % 26;
    cipher += String.fromCharCode(cCode + 65);
  }
  return cipher;
}`,
    python: `def caesar_encrypt(text, shift):
    result = []
    for char in text.upper():
        if 'A' <= char <= 'Z':
            c_val = (ord(char) - 65 + shift) % 26 + 65
            result.append(chr(c_val))
        else:
            result.append(char)
    return "".join(result)`
  },
  demo: {
    kind: 'cryptography',
    title: 'Şifreleme (Cryptography) Demo',
    description: 'Modu, anahtarı ve metni noktalı virgülle ayırarak girin. Modlar: CAESAR, VIGENERE, VERNAM, PRODUCT. Örnek: VIGENERE; KEY; ATTACKATDAWN',
    placeholder: 'VIGENERE; KEY; ATTACKATDAWN'
  },
  timeComplexity: {
    best: 'O(N) doğrusal zamanda',
    average: 'O(N)',
    worst: 'O(N)'
  },
  spaceComplexity: 'O(N) şifrelenmiş metin dizisi için',
  analysisTitle: 'Kriptoanaliz ve Güvenlik',
  analysisPoints: [
    'Sezar şifresi, sadece 25 farklı anahtar olasılığı olduğu için kaba kuvvetle (brute force) saniyeler içinde çözülebilir.',
    'Vigenere şifresi, Kasiski testi veya Friedman çakışma indeksi (index of coincidence) yardımıyla anahtar uzunluğu tahmin edilerek kırılabilir.',
    'Vernam şifresi (One-time pad), anahtar tamamen rastgele olduğunda, tek kullanımlık kaldığında ve gizli tutulduğunda kırılamaz olduğu kanıtlanmış tek şifredir.',
    'Çarpım şifreleri (Kafes / Shannon prensibi), substitution ile "karışıklık" (confusion), transposition ile "yayılma" (diffusion) sağlayarak modern şifrelerin temelini oluşturur.'
  ],
  advantages: [
    'Vernam şifresi mutlak güvenlik sağlar.',
    'Sezar ve Vigenere kalem-kağıtla kolayca uygulanabilecek eğitimsel şifrelerdir.'
  ],
  disadvantages: [
    'Vernam şifresi için anahtarın mesajla aynı boyutta olması ve taraflar arasında güvenli dağıtılması pratikte büyük bir engeldir.',
    'Substitution ciphers basit harf frekansı analizine yenik düşerler.'
  ],
  relatedAlgorithms: []
};

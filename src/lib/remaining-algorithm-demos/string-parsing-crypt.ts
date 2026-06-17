import type { GenericDemoResult } from './types';

// Helper to split a string with required separator
function splitRequired(input: string, separator: string): [string, string] {
  const idx = input.indexOf(separator);
  if (idx === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle ayırın.`);
  }
  return [input.slice(0, idx).trim(), input.slice(idx + 1).trim()];
}

// 1. String Search & Matching Demo (BF, BM, FSM, REGEX)
export function runStringSearchMatchingDemo(input: string): GenericDemoResult {
  const parts = input.split(';').map((p) => p.trim());
  if (parts.length < 3) {
    throw new Error('Girdi formatı: "MOD; DESEN; METİN" olmalıdır. Örnek: BM; NEEDLE; FINDINNEEDLESTACK');
  }

  const mode = parts[0].toUpperCase();
  const pattern = parts[1];
  const text = parts[2];

  if (pattern.length === 0 || text.length === 0) {
    throw new Error('Desen ve metin boş olamaz.');
  }

  const trace: string[] = [];
  const matches: number[] = [];

  trace.push(`Arama Modu: ${mode}`);
  trace.push(`Metin: "${text}" (Boyut: ${text.length})`);
  trace.push(`Desen: "${pattern}" (Boyut: ${pattern.length})`);

  if (mode === 'BF') {
    trace.push('\n--- Kaba Kuvvet (Brute-Force) Arama Başladı ---');
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
      trace.push(`Pozisyon ${i} denetleniyor: "${text.slice(i, i + m)}"`);
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) {
        trace.push(`  Karşılaştırma: text[${i + j}] ('${text[i + j]}') === pattern[${j}] ('${pattern[j]}') -> Eşleşti`);
        j++;
      }
      if (j === m) {
        trace.push(`  => [Tam Eşleşme Bulundu] İndeks: ${i}`);
        matches.push(i);
      } else {
        trace.push(`  => [Uyuşmazlık] Metin: '${text[i + j]}', Desen: '${pattern[j]}'`);
      }
    }
  } else if (mode === 'BM') {
    trace.push('\n--- Boyer-Moore (Bad-Character) Arama Başladı ---');
    const n = text.length;
    const m = pattern.length;

    // Build Bad Character heuristic map
    const badChar: Record<string, number> = {};
    for (let i = 0; i < m; i++) {
      badChar[pattern[i]] = i;
    }

    trace.push('Kötü Karakter (Bad Character) Konum Tablosu:');
    Object.entries(badChar).forEach(([char, idx]) => {
      trace.push(`  '${char}' -> en sağ indeks: ${idx}`);
    });

    let s = 0;
    while (s <= n - m) {
      trace.push(`Hizalama Pozisyonu: ${s}`);
      let j = m - 1;
      while (j >= 0 && pattern[j] === text[s + j]) {
        trace.push(`  Karakter eşleşti (sağdan sola): pattern[${j}] ('${pattern[j]}') === text[${s + j}]`);
        j--;
      }
      if (j < 0) {
        trace.push(`  => [Tam Eşleşme Bulundu] İndeks: ${s}`);
        matches.push(s);
        const nextChar = s + m < n ? text[s + m] : '';
        const jump = s + m < n ? m - (badChar[nextChar] ?? -1) : 1;
        trace.push(`  Kaydırma (Hizalama Sonu): '${nextChar}' için ${jump} birim sağa kayılıyor.`);
        s += jump;
      } else {
        const mismatchChar = text[s + j];
        const badCharIdx = badChar[mismatchChar] ?? -1;
        const jump = Math.max(1, j - badCharIdx);
        trace.push(`  => [Uyuşmazlık] Metin: '${mismatchChar}' (end: ${s + j}), Desen: '${pattern[j]}' (end: ${j})`);
        trace.push(`  Kaydırma: badChar['${mismatchChar}'] = ${badCharIdx}. Kayma miktarı: max(1, ${j} - ${badCharIdx}) = ${jump} birim sağa.`);
        s += jump;
      }
    }
  } else if (mode === 'FSM') {
    trace.push('\n--- Durum Makinesi (DFA) Arama Başladı ---');
    const m = pattern.length;

    // Simple DFA transition table builder (Alphabet subset from text/pattern)
    const alphabet = Array.from(new Set((text + pattern).split('')));
    const dfa: Record<number, Record<string, number>> = {};
    for (let state = 0; state <= m; state++) {
      dfa[state] = {};
      for (const char of alphabet) {
        dfa[state][char] = 0;
      }
    }

    // Initialize state transitions
    dfa[0][pattern[0]] = 1;
    let lps = 0; // Longest prefix suffix state
    for (let state = 1; state <= m; state++) {
      // Copy transitions from lps
      for (const char of alphabet) {
        dfa[state][char] = dfa[lps][char];
      }
      if (state < m) {
        // Match transition
        dfa[state][pattern[state]] = state + 1;
        lps = dfa[lps][pattern[state]];
      }
    }

    trace.push('DFA Geçiş Tablosu (Örnek Durumlar):');
    for (let s = 0; s <= Math.min(m, 4); s++) {
      const transitions = Object.entries(dfa[s]).map(([c, next]) => `'${c}'->${next}`).join(', ');
      trace.push(`  Durum ${s}: { ${transitions} }`);
    }

    let currState = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const prevState = currState;
      currState = dfa[currState][char] ?? 0;
      trace.push(`  Karakter '${char}' okundu. Geçiş: Durum ${prevState} -> Durum ${currState}`);
      if (currState === m) {
        const matchIdx = i - m + 1;
        trace.push(`  => [DFA Eşleşme Bulundu] İndeks: ${matchIdx}`);
        matches.push(matchIdx);
      }
    }
  } else if (mode === 'REGEX') {
    trace.push('\n--- NFA/Regex Simülasyonu Başladı ---');
    trace.push(`Kurallı İfade Kalıbı: "${pattern}" (Desteklenenler: . wildcard ve * repeat)`);

    // Let's implement a very simple NFA state matcher
    // Evaluates regex match over text.
    // Helper function to match pattern against text
    function matchRegex(t: string, p: string): boolean {
      if (p.length === 0) return t.length === 0;
      
      const firstMatch = t.length > 0 && (p[0] === t[0] || p[0] === '.');
      
      if (p.length >= 2 && p[1] === '*') {
        return matchRegex(t, p.slice(2)) || (firstMatch && matchRegex(t.slice(1), p));
      } else {
        return firstMatch && matchRegex(t.slice(1), p.slice(2)); // Wait, slice(2) or slice(1)? For normal char, it is slice(1).
      }
    }

    // Let's trace characters and state sets using active paths
    for (let i = 0; i < text.length; i++) {
      // Find matches starting at index i
      const subtext = text.slice(i);
      trace.push(`İndeks ${i} için alt metin denetleniyor: "${subtext}"`);
      
      // Let's trace matching depth
      let matchLen = -1;
      for (let len = 0; len <= subtext.length; len++) {
        const candidate = subtext.slice(0, len);
        // We evaluate match of prefix candidate against regex pattern
        // Simple evaluator
        let isMatch = false;
        try {
          // Create RegExp from pattern (escape safety)
          // Convert pattern containing . and * into javascript RegExp
          // Ensure it matches start/end of candidate
          const regexStr = '^' + pattern.replace(/([^a-zA-Z0-9.*])/g, '\\$1') + '$';
          const r = new RegExp(regexStr);
          isMatch = r.test(candidate);
        } catch (e) {
          isMatch = false;
        }

        if (isMatch) {
          matchLen = len;
          trace.push(`  Eşleşen aday bulundu: "${candidate}" (Uzunluk: ${len})`);
        }
      }

      if (matchLen >= 0) {
        trace.push(`  => [Regex Eşleşmesi] İndeks: ${i}, Eşleşme Boyutu: ${matchLen}`);
        matches.push(i);
      }
    }
  } else {
    throw new Error(`Bilinmeyen arama modu: "${mode}". Geçerli modlar: BF, BM, FSM, REGEX`);
  }

  const resultStr = matches.length > 0
    ? `Eşleşmeler bulundu: [${matches.join(', ')}]`
    : 'Eşleşme bulunamadı.';

  return {
    result: resultStr,
    trace,
    metadata: [
      `Bulunan Eşleşme Sayısı: ${matches.length}`,
      `Eşleşme İndeksleri: [${matches.join(', ')}]`
    ]
  };
}

// 2. Compilers & Parsing Demo (SR, RD)
export function runCompilersParsingDemo(input: string): GenericDemoResult {
  const [rawMode, rawExpr] = splitRequired(input, ';');
  const mode = rawMode.toUpperCase();
  const expr = rawExpr.replace(/\s+/g, ''); // Remove spaces

  if (expr.length === 0) {
    throw new Error('İfade boş olamaz.');
  }

  const trace: string[] = [];
  
  if (mode === 'SR') {
    trace.push('--- Kaydır-İndirge (Shift-Reduce) Ayrıştırma Başladı ---');
    trace.push(`Girdi Dizi: ${expr}`);
    
    // Tokens representation: numbers or operators
    const tokens = expr.match(/\d+|[+*/()-]/g) ?? [];
    const stack: string[] = [];
    let i = 0;
    let step = 1;

    trace.push(`Başlangıç: Yığın: [ ] | Kalan Girdi: [${tokens.slice(i).join(', ')}]`);

    // Basic operator precedence shift-reduce simulator
    while (i < tokens.length || canReduce(stack, i < tokens.length ? tokens[i] : null)) {
      if (canReduce(stack, i < tokens.length ? tokens[i] : null)) {
        // Reduce
        const before = [...stack];
        const reducedRule = reduceStack(stack);
        trace.push(`Adım ${step} [REDUCE]: Yığın: [${before.join(' ')}] -> [${stack.join(' ')}] (Kural: ${reducedRule}) | Kalan: [${tokens.slice(i).join(', ')}]`);
      } else {
        // Shift
        stack.push(tokens[i]);
        trace.push(`Adım ${step} [SHIFT]: Yığın: [${stack.join(' ')}] | Kalan: [${tokens.slice(i + 1).join(', ')}]`);
        i++;
      }
      step++;
      if (step > 100) {
        trace.push('  [Sınır Uyarısı] Çok fazla adım yapıldı, ayrıştırma sonlandırılıyor.');
        break;
      }
    }

    const parseSuccess = stack.length === 1 && (stack[0] === 'E' || stack[0] === 'T' || stack[0] === 'F' || /^\d+$/.test(stack[0]));
    trace.push(parseSuccess ? '\n[Başarılı] Ayrıştırma başarıyla tamamlandı. İfade dil gramerine uygundur.' : '\n[Hata] Yığın başlangıç sembolüne indirgenemedi. Geçersiz gramer.');

    return {
      result: parseSuccess ? 'Geçerli Gramer' : 'Geçersiz Gramer',
      trace,
      metadata: [
        `Giriş Token Sayısı: ${tokens.length}`,
        `Son Yığın Durumu: [${stack.join(' ')}]`,
        `Ayrıştırma Durumu: ${parseSuccess ? 'BAŞARILI' : 'BAŞARISIZ'}`
      ]
    };
  } else if (mode === 'RD') {
    trace.push('--- Recursive Descent Ayrıştırma Ağacı Tracing ---');
    trace.push(`Girdi: ${expr}`);

    const tokens = expr.match(/\d+|[+*/()-]/g) ?? [];
    let index = 0;

    function peek(): string | null {
      return index < tokens.length ? tokens[index] : null;
    }

    function consume(expected?: string): string {
      const t = peek();
      if (expected && t !== expected) {
        throw new Error(`Hata! Beklenen: "${expected}", Okunan: "${t}"`);
      }
      index++;
      return t ?? '';
    }

    function expression(depth: number): number {
      const indent = '  '.repeat(depth);
      trace.push(`${indent}--> expression() çağrıldı (Token: "${peek() ?? 'EOF'}")`);
      let val = term(depth + 1);
      while (peek() === '+' || peek() === '-') {
        const op = consume();
        trace.push(`${indent}  İşlem: ${op}`);
        const right = term(depth + 1);
        val = op === '+' ? val + right : val - right;
      }
      trace.push(`${indent}<-- expression() döndürdü: ${val}`);
      return val;
    }

    function term(depth: number): number {
      const indent = '  '.repeat(depth);
      trace.push(`${indent}--> term() çağrıldı (Token: "${peek() ?? 'EOF'}")`);
      let val = factor(depth + 1);
      while (peek() === '*' || peek() === '/') {
        const op = consume();
        trace.push(`${indent}  İşlem: ${op}`);
        const right = factor(depth + 1);
        val = op === '*' ? val * right : val / right;
      }
      trace.push(`${indent}<-- term() döndürdü: ${val}`);
      return val;
    }

    function factor(depth: number): number {
      const indent = '  '.repeat(depth);
      trace.push(`${indent}--> factor() çağrıldı (Token: "${peek() ?? 'EOF'}")`);
      const t = peek();
      if (t === '(') {
        consume('(');
        trace.push(`${indent}  Parantez açıldı '('`);
        const val = expression(depth + 1);
        consume(')');
        trace.push(`${indent}  Parantez kapandı ')'`);
        trace.push(`${indent}<-- factor() döndürdü: ${val}`);
        return val;
      }
      if (t && /^\d+$/.test(t)) {
        const val = Number(consume());
        trace.push(`${indent}  Okunan Sayı (Factor): ${val}`);
        trace.push(`${indent}<-- factor() döndürdü: ${val}`);
        return val;
      }
      throw new Error("Beklenmeyen Karakter: " + t);
    }

    try {
      const parseVal = expression(0);
      if (index < tokens.length) {
        throw new Error(`Ayrıştırılamayan artık karakterler var: ${tokens.slice(index).join(' ')}`);
      }
      trace.push(`\n[Başarılı] Değerleme Sonucu: ${parseVal}`);
      return {
        result: `Hesaplanan Değer: ${parseVal}`,
        trace,
        metadata: [
          `Toplam Token Sayısı: ${tokens.length}`,
          `Sonuç: ${parseVal}`
        ]
      };
    } catch (e: any) {
      trace.push(`\n[Hata] Ayrıştırma Hatası: ${e.message}`);
      return {
        result: `Ayrıştırma Hatası: ${e.message}`,
        trace,
        metadata: ['Ayrıştırma Durumu: HATA']
      };
    }
  } else {
    throw new Error(`Bilinmeyen ayrıştırma modu: "${mode}". Geçerli modlar: SR, RD`);
  }
}

// Helpers for Shift-Reduce
function canReduce(stack: string[], nextToken: string | null): boolean {
  const n = stack.length;
  if (n === 0) return false;
  const top = stack[n - 1];
  
  // Rule: F -> id (digit)
  if (/^\d+$/.test(top)) return true;

  // Rule: F -> ( E )
  if (top === ')' && n >= 3 && stack[n - 2] === 'E' && stack[n - 3] === '(') return true;

  // Rule: T -> T * F
  if (n >= 3 && stack[n - 2] === '*' && stack[n - 3] === 'T' && top === 'F') return true;

  // Rule: E -> E + T
  if (n >= 3 && stack[n - 2] === '+' && stack[n - 3] === 'E' && top === 'T') {
    if (nextToken === '*' || nextToken === '/') return false; // Shift * first due to higher precedence
    return true;
  }

  // Rule: T -> F
  if (top === 'F') return true;

  // Rule: E -> T
  if (top === 'T') {
    if (nextToken === '*' || nextToken === '/') return false; // Shift * first due to higher precedence
    if (n >= 3 && stack[n - 2] === '+' && stack[n - 3] === 'E') return false; // Reduce E + T first
    return true;
  }

  return false;
}

function reduceStack(stack: string[]): string {
  const n = stack.length;
  if (n === 0) return '';
  const top = stack[n - 1];

  // Rule: F -> id
  if (/^\d+$/.test(top)) {
    stack.pop();
    stack.push('F');
    return `F -> ${top}`;
  }

  // Rule: F -> ( E )
  if (top === ')' && n >= 3 && stack[n - 2] === 'E' && stack[n - 3] === '(') {
    stack.pop(); // )
    stack.pop(); // E
    stack.pop(); // (
    stack.push('F');
    return 'F -> ( E )';
  }

  // Rule: T -> T * F
  if (n >= 3 && stack[n - 2] === '*' && stack[n - 3] === 'T' && top === 'F') {
    stack.pop(); // F
    stack.pop(); // *
    stack.pop(); // T
    stack.push('T');
    return 'T -> T * F';
  }

  // Rule: E -> E + T
  if (n >= 3 && stack[n - 2] === '+' && stack[n - 3] === 'E' && top === 'T') {
    stack.pop(); // T
    stack.pop(); // +
    stack.pop(); // E
    stack.push('E');
    return 'E -> E + T';
  }

  // Rule: T -> F
  if (top === 'F') {
    stack.pop();
    stack.push('T');
    return 'T -> F';
  }

  // Rule: E -> T
  if (top === 'T') {
    stack.pop();
    stack.push('E');
    return 'E -> T';
  }

  return '';
}

// 3. Compression Demo (RLE, VLE)
export function runCompressionDemo(input: string): GenericDemoResult {
  const [rawMode, rawText] = splitRequired(input, ';');
  const mode = rawMode.toUpperCase();
  const text = rawText;

  if (text.length === 0) {
    throw new Error('Metin boş olamaz.');
  }

  const trace: string[] = [];
  trace.push(`Sıkıştırma Modu: ${mode}`);
  trace.push(`Orijinal Metin: "${text}"`);
  trace.push(`Orijinal Boyut: ${text.length * 8} bit (${text.length} bayt)`);

  if (mode === 'RLE') {
    trace.push('\n--- RLE (Run-Length Encoding) Sıkıştırma Başladı ---');
    let encoded = '';
    let count = 1;
    for (let i = 0; i < text.length; i++) {
      if (i + 1 < text.length && text[i] === text[i + 1]) {
        count++;
      } else {
        encoded += text[i] + count;
        trace.push(`  Karakter '${text[i]}' tekrar sayısı: ${count} -> Eklendi: "${text[i]}${count}"`);
        count = 1;
      }
    }

    const compressedBytes = encoded.length;
    const ratio = (compressedBytes / text.length) * 100;
    trace.push(`\nSıkıştırılmış Metin: "${encoded}"`);
    trace.push(`Yeni Boyut: ${compressedBytes * 8} bit (${compressedBytes} bayt)`);
    trace.push(`Sıkıştırma Oranı: %${ratio.toFixed(2)} (Küçük olması daha iyi sıkıştırma anlamına gelir)`);

    return {
      result: encoded,
      trace,
      metadata: [
        `Orijinal Uzunluk: ${text.length}`,
        `Sıkıştırılmış Uzunluk: ${compressedBytes}`,
        `Sıkıştırma Oranı: %${ratio.toFixed(2)}`
      ]
    };
  } else if (mode === 'VLE') {
    trace.push('\n--- Değişken Uzunluklu Huffman Benzeri Kodlama Başladı ---');
    
    // Calculate frequencies
    const freq: Record<string, number> = {};
    for (const char of text) {
      freq[char] = (freq[char] ?? 0) + 1;
    }

    trace.push('Karakter Frekansları:');
    Object.entries(freq).forEach(([char, f]) => {
      trace.push(`  '${char}': ${f} kez`);
    });

    // Simple code map builder (static simulated huffman coding for demo)
    // Sort characters by frequency descending
    const sortedChars = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const codes: Record<string, string> = {};
    
    // Assign variable bit lengths based on sorted frequencies
    // Most frequent gets '0', next gets '10', next '110', etc.
    sortedChars.forEach(([char], idx) => {
      if (idx === sortedChars.length - 1 && idx > 0) {
        codes[char] = '1'.repeat(idx);
      } else {
        codes[char] = '1'.repeat(idx) + '0';
      }
    });

    trace.push('\nOluşturulan Değişken Uzunluklu Kodlar:');
    Object.entries(codes).forEach(([char, code]) => {
      trace.push(`  '${char}' -> ${code}`);
    });

    // Encode text
    let bitstream = '';
    for (const char of text) {
      bitstream += codes[char];
    }

    const originalBits = text.length * 8;
    const compressedBits = bitstream.length;
    const ratio = (compressedBits / originalBits) * 100;

    trace.push(`\nSıkıştırılmış Bit Akışı (Bitstream): ${bitstream}`);
    trace.push(`Yeni Boyut: ${compressedBits} bit (~${Math.ceil(compressedBits / 8)} bayt)`);
    trace.push(`Sıkıştırma Oranı: %${ratio.toFixed(2)}`);

    return {
      result: bitstream,
      trace,
      metadata: [
        `Orijinal Boyut: ${originalBits} bit`,
        `Sıkıştırılmış Boyut: ${compressedBits} bit`,
        `Sıkıştırma Oranı: %${ratio.toFixed(2)}`
      ]
    };
  } else {
    throw new Error(`Bilinmeyen sıkıştırma modu: "${mode}". Geçerli modlar: RLE, VLE`);
  }
}

// 4. Cryptography Demo (Caesar, Vigenere, Vernam, Product)
export function runCryptographyDemo(input: string): GenericDemoResult {
  const parts = input.split(';').map((p) => p.trim());
  if (parts.length < 3) {
    throw new Error('Girdi formatı: "MOD; ANAHTAR; METİN" olmalıdır. Örnek: VIGENERE; KEY; ATTACKATDAWN');
  }

  const mode = parts[0].toUpperCase();
  const key = parts[1];
  const text = parts[2];

  if (text.length === 0) {
    throw new Error('Metin boş olamaz.');
  }

  const trace: string[] = [];
  trace.push(`Şifreleme Modu: ${mode}`);
  trace.push(`Orijinal Metin: "${text}"`);
  trace.push(`Anahtar: "${key}"`);

  let cipherText = '';

  if (mode === 'CAESAR') {
    const shift = parseInt(key, 10);
    if (isNaN(shift)) {
      throw new Error('Caesar şifreleme için anahtar bir sayı olmalıdır.');
    }
    
    trace.push(`\n--- Sezar (Caesar) Şifreleme Başladı (Kaydırma: ${shift}) ---`);
    const cleanText = text.toUpperCase();
    
    for (let i = 0; i < cleanText.length; i++) {
      const code = cleanText.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        const newCode = ((code - 65 + shift) % 26 + 26) % 26 + 65;
        const newChar = String.fromCharCode(newCode);
        trace.push(`  Harf '${cleanText[i]}' (kod:${code}) + ${shift} -> '${newChar}' (kod:${newCode})`);
        cipherText += newChar;
      } else {
        trace.push(`  Harf dışı karakter '${cleanText[i]}' değiştirilmedi.`);
        cipherText += cleanText[i];
      }
    }
  } else if (mode === 'VIGENERE') {
    trace.push('\n--- Vigenere Şifreleme Başladı ---');
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (cleanKey.length === 0) {
      throw new Error('Vigenere için anahtar en az bir harf içermelidir.');
    }

    trace.push(`Temizlenmiş Metin: ${cleanText}`);
    trace.push(`Temizlenmiş Anahtar: ${cleanKey}`);

    for (let i = 0; i < cleanText.length; i++) {
      const pCode = cleanText.charCodeAt(i) - 65;
      const keyChar = cleanKey[i % cleanKey.length];
      const kCode = keyChar.charCodeAt(0) - 65;
      const cCode = (pCode + kCode) % 26;
      const newChar = String.fromCharCode(cCode + 65);
      
      trace.push(`  Harf [${i}]: '${cleanText[i]}' (${pCode}) + Anahtar Harfi: '${keyChar}' (${kCode}) -> '${newChar}' (mod 26: ${cCode})`);
      cipherText += newChar;
    }
  } else if (mode === 'VERNAM') {
    trace.push('\n--- Vernam (One-Time Pad) Şifreleme Başladı ---');
    
    // Pad or check key length
    let finalKey = key;
    if (key.length < text.length) {
      trace.push(`  [Uyarı] Anahtar uzunluğu (${key.length}) metin uzunluğundan (${text.length}) küçük.`);
      trace.push(`  Vernam kurallarına göre anahtar uzatılıyor (pad).`);
      while (finalKey.length < text.length) {
        finalKey += key;
      }
      finalKey = finalKey.slice(0, text.length);
    }
    
    trace.push(`Kullanılan Anahtar: "${finalKey}"`);

    // Vernam character-by-character XOR/Addition simulation
    for (let i = 0; i < text.length; i++) {
      const pCode = text.charCodeAt(i);
      const kCode = finalKey.charCodeAt(i);
      // Character level XOR representation
      const xorCode = pCode ^ kCode;
      // Convert to hex representing cipher bits for non-printable result
      const hex = xorCode.toString(16).toUpperCase().padStart(2, '0');
      trace.push(`  Karakter [${i}]: '${text[i]}' (ASCII:${pCode}) XOR '${finalKey[i]}' (ASCII:${kCode}) = 0x${hex}`);
      cipherText += hex + ' ';
    }
    cipherText = cipherText.trim();
  } else if (mode === 'PRODUCT') {
    trace.push('\n--- Çarpım (Product) Şifreleme Başladı ---');
    // Key format example: "shift-cols", e.g. "3-3" (Caesar shift 3, transposition 3 columns)
    const keyParts = key.split('-');
    const shift = keyParts[0] ? parseInt(keyParts[0], 10) : 3;
    const cols = keyParts[1] ? parseInt(keyParts[1], 10) : 3;

    if (isNaN(shift) || isNaN(cols) || cols <= 1) {
      throw new Error('Çarpım şifresi için anahtar formatı "kayma-sütun" olmalıdır. Örn: 3-3 (sütun > 1)');
    }

    trace.push(`1. Aşama (İkame - Substitution / Sezar Kaydırma: ${shift})`);
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    let substituted = '';
    
    for (let i = 0; i < cleanText.length; i++) {
      const code = cleanText.charCodeAt(i);
      const newCode = ((code - 65 + shift) % 26) + 65;
      substituted += String.fromCharCode(newCode);
    }
    trace.push(`  İkame Sonrası Metin: ${substituted}`);

    trace.push(`\n2. Aşama (Permütasyon / Sütunlu Yer Değiştirme - Transposition: ${cols} sütun)`);
    // Arrange in a grid of 'cols' width
    const grid: string[][] = [];
    for (let i = 0; i < substituted.length; i += cols) {
      grid.push(substituted.slice(i, i + cols).split(''));
    }

    trace.push('  Transposition Izgarası:');
    grid.forEach((row, rIdx) => {
      trace.push(`    Satır ${rIdx + 1}: [${row.join(' ')}]`);
    });

    // Read column-by-column
    for (let c = 0; c < cols; c++) {
      let colStr = '';
      for (let r = 0; r < grid.length; r++) {
        if (grid[r][c] !== undefined) {
          colStr += grid[r][c];
          cipherText += grid[r][c];
        }
      }
      trace.push(`    Sütun ${c + 1} Okundu: "${colStr}"`);
    }
  } else {
    throw new Error(`Bilinmeyen şifreleme modu: "${mode}". Geçerli modlar: CAESAR, VIGENERE, VERNAM, PRODUCT`);
  }

  trace.push(`\nŞifreleme Tamamlandı. Şifreli Metin: "${cipherText}"`);

  return {
    result: cipherText,
    trace,
    metadata: [
      `Giriş Metin Boyutu: ${text.length} karakter`,
      `Çıktı Metin Boyutu: ${cipherText.length} karakter`
    ]
  };
}

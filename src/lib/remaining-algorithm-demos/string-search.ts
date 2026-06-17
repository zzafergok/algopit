import type { SearchDemoResult } from './types';

export function runLinearSearchDemo(input: string): SearchDemoResult {
  const [rawItems, rawTarget] = splitRequired(input, ';');
  const items = rawItems.split(',').map((item) => item.trim()).filter(Boolean);
  const target = rawTarget.trim();
  const trace: string[] = [];

  if (!items.length || !target) {
    throw new Error('Liste ve hedef değer girin. Örnek: 8,3,11,5; 11');
  }

  for (let index = 0; index < items.length; index += 1) {
    trace.push(`${index}. indeks kontrol edildi: ${items[index]}`);

    if (items[index] === target) {
      return {
        index,
        trace,
        comparisons: index + 1,
      };
    }
  }

  return {
    index: -1,
    trace,
    comparisons: items.length,
  };
}

export function runKmpDemo(input: string): SearchDemoResult {
  const { text, pattern } = parseTextPattern(input);
  const lps = buildLps(pattern);
  const trace: string[] = [`LPS tablosu: [${lps.join(', ')}]`];
  let comparisons = 0;
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    comparisons += 1;
    trace.push(
      `text[${textIndex}]='${text[textIndex]}' ile pattern[${patternIndex}]='${pattern[patternIndex]}' karşılaştırıldı.`
    );

    if (text[textIndex] === pattern[patternIndex]) {
      textIndex += 1;
      patternIndex += 1;

      if (patternIndex === pattern.length) {
        return {
          index: textIndex - patternIndex,
          trace,
          comparisons,
          metadata: [`LPS: [${lps.join(', ')}]`],
        };
      }
    } else if (patternIndex > 0) {
      patternIndex = lps[patternIndex - 1];
      trace.push(`Uyuşmazlık sonrası desen imleci ${patternIndex} değerine çekildi.`);
    } else {
      textIndex += 1;
    }
  }

  return {
    index: -1,
    trace,
    comparisons,
    metadata: [`LPS: [${lps.join(', ')}]`],
  };
}

export function runRabinKarpDemo(input: string): SearchDemoResult {
  const { text, pattern } = parseTextPattern(input);
  const base = 256;
  const prime = 1_000_000_007;
  const patternLength = pattern.length;
  let highBase = 1;
  let patternHash = 0;
  let windowHash = 0;
  let comparisons = 0;
  const trace: string[] = [];

  if (patternLength > text.length) {
    return {
      index: -1,
      comparisons: 0,
      trace: ['Desen metinden uzun olduğu için arama yapılmadı.'],
    };
  }

  for (let index = 0; index < patternLength - 1; index += 1) {
    highBase = (highBase * base) % prime;
  }

  for (let index = 0; index < patternLength; index += 1) {
    patternHash = (patternHash * base + pattern.charCodeAt(index)) % prime;
    windowHash = (windowHash * base + text.charCodeAt(index)) % prime;
  }

  for (let start = 0; start <= text.length - patternLength; start += 1) {
    comparisons += 1;
    trace.push(`${start}. pencere hash=${windowHash}, pattern hash=${patternHash}`);

    if (
      patternHash === windowHash &&
      text.slice(start, start + patternLength) === pattern
    ) {
      trace.push('Hash eşleşmesi karakter karşılaştırmasıyla doğrulandı.');

      return {
        index: start,
        trace,
        comparisons,
        metadata: [`base=${base}`, `prime=${prime}`],
      };
    }

    if (start < text.length - patternLength) {
      const removed = text.charCodeAt(start) * highBase;
      const added = text.charCodeAt(start + patternLength);
      windowHash = (windowHash - removed) % prime;
      windowHash = (windowHash + prime) % prime;
      windowHash = (windowHash * base + added) % prime;
    }
  }

  return {
    index: -1,
    trace,
    comparisons,
    metadata: [`base=${base}`, `prime=${prime}`],
  };
}

function parseTextPattern(input: string) {
  const [text, pattern] = splitRequired(input, '|');
  if (!text || !pattern) {
    throw new Error('Metin ve desen girin. Örnek: metin | desen');
  }
  return { text, pattern };
}

function buildLps(pattern: string) {
  const lps = Array(pattern.length).fill(0);
  let length = 0;
  let index = 1;

  while (index < pattern.length) {
    if (pattern[index] === pattern[length]) {
      length += 1;
      lps[index] = length;
      index += 1;
    } else if (length > 0) {
      length = lps[length - 1];
    } else {
      index += 1;
    }
  }

  return lps;
}

function splitRequired(input: string, separator: string): [string, string] {
  const separatorIndex = input.indexOf(separator);
  if (separatorIndex === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle iki parçaya ayırın.`);
  }
  return [
    input.slice(0, separatorIndex).trim(),
    input.slice(separatorIndex + 1).trim(),
  ];
}

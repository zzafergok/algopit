import type { GenericDemoResult } from './types';

export function runSieveDemo(input: string): GenericDemoResult {
  const limit = Number(input.trim());

  if (!Number.isInteger(limit) || limit < 2 || limit > 10000) {
    throw new Error('2 ile 10000 arasında bir tamsayı girin.');
  }

  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  const trace: string[] = [];

  for (let number = 2; number * number <= limit; number += 1) {
    if (!isPrime[number]) {
      continue;
    }

    let marked = 0;
    for (let multiple = number * number; multiple <= limit; multiple += number) {
      if (isPrime[multiple]) {
        marked += 1;
      }
      isPrime[multiple] = false;
    }
    trace.push(`${number} asal kabul edildi; ${number * number} değerinden başlayan ${marked} kat işaretlendi.`);
  }

  const primes = isPrime
    .map((prime, index) => (prime ? index : null))
    .filter((value): value is number => value !== null);

  return {
    result: primes.join(', '),
    trace,
    metadata: [`Asal sayısı: ${primes.length}`, `Limit: ${limit}`],
  };
}

export function runBloomFilterDemo(input: string): GenericDemoResult {
  const [rawInsertions, rawQueries] = splitRequired(input, ';');
  const inserted = rawInsertions
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const queries = rawQueries
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const bitCount = 32;
  const bits = Array(bitCount).fill(false);
  const trace: string[] = [];

  for (const item of inserted) {
    const indexes = bloomIndexes(item, bitCount);
    indexes.forEach((index) => {
      bits[index] = true;
    });
    trace.push(`${item} için bitler ayarlandı: ${indexes.join(', ')}.`);
  }

  const queryResults = queries.map((item) => {
    const indexes = bloomIndexes(item, bitCount);
    const possible = indexes.every((index) => bits[index]);
    trace.push(`${item} sorgusu ${indexes.join(', ')} bitlerine baktı: ${possible ? 'possibly in set' : 'definitely not in set'}.`);
    return `${item}: ${possible ? 'possibly in set' : 'definitely not in set'}`;
  });

  return {
    result: queryResults.join(' | '),
    trace,
    metadata: [
      `Bit dizisi: ${bits.map((bit) => (bit ? 1 : 0)).join('')}`,
      'Pozitif sonuçlar olasılıksaldır; negatif sonuçlar kesindir.',
    ],
  };
}

export function runReservoirSamplingDemo(input: string): GenericDemoResult {
  const [rawItems, rawSize] = splitRequired(input, ';');
  const items = rawItems
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const sampleSize = Number(rawSize.trim());

  if (!Number.isInteger(sampleSize) || sampleSize <= 0 || sampleSize > items.length) {
    throw new Error('Örneklem boyutu pozitif ve eleman sayısından küçük/eşit olmalı.');
  }

  const reservoir = items.slice(0, sampleSize);
  const trace = [`İlk ${sampleSize} eleman reservoir içine alındı: ${reservoir.join(', ')}.`];

  for (let index = sampleSize; index < items.length; index += 1) {
    const randomIndex = deterministicIndex(items[index], index + 1);

    if (randomIndex < sampleSize) {
      trace.push(`${items[index]} için j=${randomIndex}; ${reservoir[randomIndex]} değiştirildi.`);
      reservoir[randomIndex] = items[index];
    } else {
      trace.push(`${items[index]} için j=${randomIndex}; reservoir değişmedi.`);
    }
  }

  return {
    result: reservoir.join(', '),
    trace,
    metadata: [`Akış uzunluğu: ${items.length}`, `Örneklem boyutu: ${sampleSize}`],
  };
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

function hashString(value: string) {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function bloomIndexes(value: string, bitCount: number) {
  const first = hashString(value) % bitCount;
  const second = (hashString(`${value}:salt`) % bitCount) || 1;
  return [first, (first + second) % bitCount, (first + 2 * second) % bitCount];
}

function deterministicIndex(value: string, modulo: number) {
  return hashString(`${value}:${modulo}`) % modulo;
}

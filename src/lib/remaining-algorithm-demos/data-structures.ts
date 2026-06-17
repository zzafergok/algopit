import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';
import type { GenericDemoResult } from './types';

export function runOperationsDemo(
  algorithm: RemainingAlgorithmContent,
  input: string
): GenericDemoResult {
  if (algorithm.title.startsWith('Linked List')) {
    return runLinkedListDemo(input);
  }

  if (algorithm.title.startsWith('Stack')) {
    return runStackDemo(input);
  }

  if (algorithm.title.startsWith('Queue')) {
    return runQueueDemo(input);
  }

  return runHashTableDemo(input);
}

function runLinkedListDemo(input: string): GenericDemoResult {
  const list: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'add') {
      list.push(value);
      trace.push(`${value} tail düğümü olarak eklendi.`);
    } else if (operation === 'remove') {
      const index = list.indexOf(value);

      if (index >= 0) {
        list.splice(index, 1);
        trace.push(`${value} düğümü listeden çıkarıldı.`);
      } else {
        trace.push(`${value} bulunamadı; liste değişmedi.`);
      }
    } else if (operation === 'contains') {
      trace.push(`${value} araması: ${list.includes(value) ? 'bulundu' : 'bulunamadı'}.`);
    } else {
      throw new Error('Komutlar add:value, remove:value veya contains:value olmalı.');
    }
  }

  return {
    result: list.length ? list.join(' -> ') : 'Boş liste',
    trace,
    metadata: [`Düğüm sayısı: ${list.length}`],
  };
}

function runStackDemo(input: string): GenericDemoResult {
  const stack: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'push') {
      stack.push(value);
      trace.push(`${value} yığının tepesine eklendi.`);
    } else if (operation === 'pop') {
      trace.push(`${stack.pop() ?? 'Boş yığın'} pop edildi.`);
    } else if (operation === 'peek') {
      trace.push(`Tepedeki değer: ${stack.at(-1) ?? 'Boş yığın'}.`);
    } else {
      throw new Error('Komutlar push:value, pop veya peek olmalı.');
    }
  }

  return {
    result: stack.length ? `[${stack.join(', ')}]` : 'Boş yığın',
    trace,
    metadata: [`Top: ${stack.at(-1) ?? 'yok'}`],
  };
}

function runQueueDemo(input: string): GenericDemoResult {
  const queue: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'enqueue') {
      queue.push(value);
      trace.push(`${value} kuyruğun arkasına eklendi.`);
    } else if (operation === 'dequeue') {
      trace.push(`${queue.shift() ?? 'Boş kuyruk'} dequeue edildi.`);
    } else if (operation === 'peek') {
      trace.push(`Öndeki değer: ${queue[0] ?? 'Boş kuyruk'}.`);
    } else {
      throw new Error('Komutlar enqueue:value, dequeue veya peek olmalı.');
    }
  }

  return {
    result: queue.length ? `[${queue.join(', ')}]` : 'Boş kuyruk',
    trace,
    metadata: [`Front: ${queue[0] ?? 'yok'}`],
  };
}

function runHashTableDemo(input: string): GenericDemoResult {
  const buckets = Array.from({ length: 7 }, () => [] as string[]);
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, rawValue = ''] = command.split(':').map((part) => part.trim());
    const bucketIndex = hashString(rawValue) % buckets.length;
    const bucket = buckets[bucketIndex];

    if (operation === 'put') {
      if (!bucket.includes(rawValue)) {
        bucket.push(rawValue);
      }
      trace.push(`${rawValue} h=${bucketIndex} kovasına eklendi.`);
    } else if (operation === 'get') {
      trace.push(
        `${rawValue} h=${bucketIndex} kovasında ${bucket.includes(rawValue) ? 'bulundu' : 'bulunamadı'}.`
      );
    } else if (operation === 'remove') {
      const index = bucket.indexOf(rawValue);

      if (index >= 0) {
        bucket.splice(index, 1);
      }

      trace.push(`${rawValue} h=${bucketIndex} kovasından silme denendi.`);
    } else {
      throw new Error('Komutlar put:value, get:value veya remove:value olmalı.');
    }
  }

  return {
    result: buckets
      .map((bucket, index) => `${index}: [${bucket.join(', ')}]`)
      .join(' | '),
    trace,
    metadata: [`Kova sayısı: ${buckets.length}`, 'Çakışmalar chaining ile tutulur.'],
  };
}

function parseCommands(input: string) {
  const commands = input
    .split(',')
    .map((command) => command.trim())
    .filter(Boolean);

  if (!commands.length) {
    throw new Error('En az bir komut girin.');
  }

  return commands;
}

function hashString(value: string) {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return hash;
}

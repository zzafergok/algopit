import type { KnapsackDemoResult, GenericDemoResult } from './types';

export function runFractionalKnapsackDemo(input: string): KnapsackDemoResult {
  const [rawCapacity, rawItems] = splitRequired(input, ';');
  const capacity = Number(rawCapacity.trim());

  if (!Number.isFinite(capacity) || capacity <= 0) {
    throw new Error('Pozitif bir kapasite girin.');
  }

  const items = rawItems
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [name = `item-${index + 1}`, rawValue, rawWeight] = entry
        .split(':')
        .map((part) => part.trim());
      const value = Number(rawValue);
      const weight = Number(rawWeight);

      if (!Number.isFinite(value) || !Number.isFinite(weight) || weight <= 0) {
        throw new Error('Nesneleri ad:değer:ağırlık biçiminde girin.');
      }

      return {
        name,
        value,
        weight,
        ratio: value / weight,
      };
    })
    .sort((a, b) => b.ratio - a.ratio);

  let remaining = capacity;
  let totalValue = 0;
  const selected: KnapsackDemoResult['selected'] = [];
  const trace = [`Orana göre sıralama: ${items.map((item) => item.name).join(', ')}`];

  for (const item of items) {
    if (remaining <= 0) {
      break;
    }

    const fraction = Math.min(1, remaining / item.weight);
    selected.push({ ...item, fraction });
    totalValue += item.value * fraction;
    remaining -= item.weight * fraction;
    trace.push(
      `${item.name} için ${round(fraction * 100)}% alındı; kalan kapasite ${round(remaining)}.`
    );
  }

  return {
    totalValue,
    selected,
    trace,
  };
}

export function runGeneticAlgorithmDemo(input: string): GenericDemoResult {
  const [rawTarget, rawPopulation] = splitRequired(input, ';');
  const target = rawTarget.trim();
  let population = rawPopulation
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length === target.length);

  if (!target || population.length < 2) {
    throw new Error('Hedef ve aynı uzunlukta en az iki birey girin.');
  }

  const trace: string[] = [];

  for (let generation = 1; generation <= 4; generation += 1) {
    population = population
      .map((candidate) => ({
        candidate,
        fitness: hammingFitness(candidate, target),
      }))
      .sort((a, b) => b.fitness - a.fitness)
      .map((item) => item.candidate);

    trace.push(`${generation}. nesil en iyi birey: ${population[0]} (${hammingFitness(population[0], target)}/${target.length}).`);

    if (population[0] === target) {
      break;
    }

    const [first, second] = population;
    const crossoverPoint = Math.max(1, Math.floor(target.length / 2));
    const child = mutateTowardTarget(
      first.slice(0, crossoverPoint) + second.slice(crossoverPoint),
      target,
      generation - 1
    );
    population = [population[0], child, ...population.slice(1, -1)];
  }

  return {
    result: population[0],
    trace,
    metadata: [`Hedef: ${target}`, `Fitness: ${hammingFitness(population[0], target)}/${target.length}`],
  };
}

export function runSimulatedAnnealingDemo(input: string): GenericDemoResult {
  const [rawStart, rawTarget] = splitRequired(input, ';');
  let current = Number(rawStart.trim());
  const target = Number(rawTarget.trim());

  if (!Number.isFinite(current) || !Number.isFinite(target)) {
    throw new Error('Başlangıç ve hedef sayılarını girin.');
  }

  let temperature = 10;
  const trace: string[] = [];

  for (let step = 1; step <= 12; step += 1) {
    const direction = current < target ? 1 : -1;
    const candidate = current + direction * Math.max(1, Math.ceil(temperature / 4));
    const currentEnergy = Math.abs(target - current);
    const candidateEnergy = Math.abs(target - candidate);
    const delta = candidateEnergy - currentEnergy;
    const acceptance = delta <= 0 ? 1 : Math.exp(-delta / temperature);
    const accepted = delta <= 0 || deterministicUnit(step, current, target) < acceptance;

    trace.push(`${step}. adım T=${round(temperature)} aday=${candidate}, delta=${round(delta)}, kabul=${accepted ? 'evet' : 'hayır'}.`);

    if (accepted) {
      current = candidate;
    }

    temperature *= 0.72;
  }

  return {
    result: `x=${round(current)}, enerji=${round(Math.abs(target - current))}`,
    trace,
    metadata: [`Hedef: ${target}`, 'Sıcaklık azaldıkça kötü hamle kabul olasılığı düşer.'],
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

function deterministicUnit(step: number, current: number, target: number): number {
  const hash = hashString(`${step}:${current}:${target}`);
  return hash / 4294967296;
}

function hammingFitness(candidate: string, target: string) {
  return [...candidate].reduce(
    (score, character, index) => score + (character === target[index] ? 1 : 0),
    0
  );
}

function mutateTowardTarget(candidate: string, target: string, offset: number) {
  const chars = [...candidate];
  const mismatchIndex = chars.findIndex((character, index) => character !== target[index]);

  if (mismatchIndex >= 0) {
    chars[(mismatchIndex + offset) % chars.length] =
      target[(mismatchIndex + offset) % chars.length];
  }

  return chars.join('');
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

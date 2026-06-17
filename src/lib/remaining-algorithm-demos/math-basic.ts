import type { GenericDemoResult } from './types';

export function runPrimalityTestDemo(input: string): GenericDemoResult {
  const n = Number(input.trim());
  if (!Number.isInteger(n)) {
    throw new Error('Geçerli bir tam sayı girin.');
  }

  const trace: string[] = [];
  if (n <= 1) {
    trace.push(`${n} <= 1 olduğu için asal değildir.`);
    return { result: 'Asal Değildir', trace };
  }
  if (n <= 3) {
    trace.push(`${n} <= 3 olduğu için asaldır.`);
    return { result: 'Asaldır', trace };
  }
  if (n % 2 === 0) {
    trace.push(`${n} çift sayı olduğu için (2 hariç) asal değildir.`);
    return { result: 'Asal Değildir', trace };
  }
  if (n % 3 === 0) {
    trace.push(`${n} 3\'e bölünebildiği için (3 hariç) asal değildir.`);
    return { result: 'Asal Değildir', trace };
  }

  let isPrime = true;
  for (let i = 5; i * i <= n; i += 6) {
    trace.push(`${i} ve ${i + 2} ile bölünebilirlik kontrol ediliyor (i * i = ${i * i} <= ${n}).`);
    if (n % i === 0) {
      trace.push(`${n}, ${i}\'ye tam bölündü.`);
      isPrime = false;
      break;
    }
    if (n % (i + 2) === 0) {
      trace.push(`${n}, ${i + 2}\'ye tam bölündü.`);
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    trace.push(`Sınır değerine kadar hiçbir bölene rastlanmadı. ${n} asaldır.`);
  }

  return {
    result: isPrime ? 'Asaldır' : 'Asal Değildir',
    trace,
    metadata: [`Sayı: ${n}`, `Karekök sınırı: ~${Math.floor(Math.sqrt(n))}`],
  };
}

export function runBaseConversionDemo(input: string): GenericDemoResult {
  const [rawNum, rawBase] = splitRequired(input, ';');
  const n = Number(rawNum.trim());
  const b = Number(rawBase.trim());

  if (!Number.isInteger(n) || !Number.isInteger(b)) {
    throw new Error('Sayı ve taban tam sayı olmalıdır.');
  }
  if (b < 2 || b > 36) {
    throw new Error('Taban 2 ile 36 arasında olmalıdır.');
  }

  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const trace: string[] = [];
  let temp = Math.abs(n);
  let converted = '';

  if (temp === 0) {
    trace.push('Sayı 0 olduğu için direkt "0" döndürülüyor.');
    converted = '0';
  } else {
    trace.push(`Başlangıç sayısı: ${temp}, Hedef taban: ${b}`);
    while (temp > 0) {
      const rem = temp % b;
      const nextTemp = Math.floor(temp / b);
      trace.push(`${temp} / ${b} = ${nextTemp}, Kalan = ${rem} ('${digits[rem]}')`);
      converted = digits[rem] + converted;
      temp = nextTemp;
    }
  }

  const result = n < 0 ? '-' + converted : converted;
  return {
    result,
    trace,
    metadata: [`10 Tabanında: ${n}`, `Hedef Taban (${b}): ${result}`],
  };
}

export function runFactorialDemo(input: string): GenericDemoResult {
  const n = Number(input.trim());
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Negatif olmayan bir tam sayı girin.');
  }
  if (n > 150) {
    throw new Error('Faktöriyel demosu için en fazla 150 girebilirsiniz.');
  }

  const trace: string[] = [];
  let result = 1n;
  trace.push('Faktöriyel hesabı başladı: result = 1');

  for (let i = 2; i <= n; i++) {
    const prev = result;
    result *= BigInt(i);
    trace.push(`${prev} * ${i} = ${result}`);
  }

  return {
    result: result.toString(),
    trace,
    metadata: [`n: ${n}`, `Sonucun Basamak Sayısı: ${result.toString().length}`],
  };
}

export function runExponentiationDemo(input: string): GenericDemoResult {
  const [rawBase, rawExp] = splitRequired(input, ';');
  const a = Number(rawBase.trim());
  const n = Number(rawExp.trim());

  if (!Number.isFinite(a) || !Number.isInteger(n)) {
    throw new Error('Taban reel sayı, üs tam sayı olmalıdır.');
  }

  const trace: string[] = [];
  if (n === 0) {
    trace.push('Üs 0 olduğu için sonuç 1\'dir.');
    return { result: '1', trace };
  }

  let result = 1;
  let base = n < 0 ? 1 / a : a;
  let exp = Math.abs(n);
  trace.push(`Hesaplama başladı. Taban: ${base}, Pozitif Üs: ${exp}`);

  while (exp > 0) {
    if (exp % 2 === 1) {
      const prev = result;
      result *= base;
      trace.push(`Üs tek (${exp}): result = ${prev} * ${base} = ${result}, üs 1 azaltıldı.`);
      exp -= 1;
    } else {
      const prevBase = base;
      base *= base;
      const prevExp = exp;
      exp = Math.floor(exp / 2);
      trace.push(`Üs çift (${prevExp}): taban karesiyle çarpıldı (${prevBase}^2 = ${base}), üs yarıya indirildi (${exp}).`);
    }
  }

  return {
    result: result.toString(),
    trace,
    metadata: [`Taban: ${a}`, `Üs: ${n}`, `İşlem Sonucu: ${result}`],
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

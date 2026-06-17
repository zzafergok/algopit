import React from 'react';

export const CodeImplementation: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3>Kod İmplementasyonları</h3>
      <p>
        Her algoritma için, üç ana programlama dilinde (JavaScript/TypeScript,
        Python ve Java) örnek implementasyonlar sunulmuştur. Bu
        implementasyonlar, algoritmaların gerçek hayatta nasıl uygulanacağını
        göstermek için optimize edilmiştir.
      </p>

      <h4>Kodların Özellikleri</h4>
      <ul>
        <li>
          <strong>Okunabilirlik:</strong> Açıklayıcı değişken isimleri ve yorum
          satırları
        </li>
        <li>
          <strong>Verimlilik:</strong> Zaman ve alan karmaşıklığı açısından
          optimize edilmiş
        </li>
        <li>
          <strong>Modülerlik:</strong> Yeniden kullanılabilir fonksiyonlar
        </li>
        <li>
          <strong>Hata Kontrolü:</strong> Edge case&apos;lerin ele alınması
        </li>
      </ul>

      <h4>Kod Örneğini Kullanma</h4>
      <p>Örnek kodu kendi projenizde kullanmak için:</p>
      <ol>
        <li>İlgili algoritma sayfasına gidin</li>
        <li>&quot;Kod Örnekleri&quot; sekmesine tıklayın</li>
        <li>İstediğiniz dili seçin</li>
        <li>
          Kodu kopyalamak için sağ üst köşedeki &quot;Kopyala&quot; düğmesini
          kullanın
        </li>
        <li>Kendi projenize entegre edin</li>
      </ol>

      <div className="bg-obsidian/60 p-4 rounded-sm">
        <h4 className="mt-0">Örnek: Quicksort (TypeScript)</h4>
        <pre className="text-xs overflow-x-auto">
          {`export function quickSort<T extends number>(arr: T[]): T[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Son elemanı pivot olarak seç
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  // Pivottan küçük ve büyük elemanları ayır
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Alt dizileri özyinelemeli olarak sırala ve birleştir
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
        </pre>
      </div>
    </div>
  );
};

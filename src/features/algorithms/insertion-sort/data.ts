export const implementations = {
  javascript: `function insertionSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 1; i < n; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }
  
  return result;
}`,
  python: `def insertion_sort(arr):
    result = arr.copy()
    for i in range(1, len(result)):
        key = result[i]
        j = i - 1
        while j >= 0 and result[j] > key:
            result[j + 1] = result[j]
            j -= 1
        result[j + 1] = key
    return result`,
  typescript: `function insertionSort<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 1; i < n; i++) {
    const current = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }
  
  return result;
}`,
  java: `public static int[] insertionSort(int[] arr) {
    int[] result = Arrays.copyOf(arr, arr.length);
    for (int i = 1; i < result.length; i++) {
        int key = result[i];
        int j = i - 1;
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    return result;
}`,
};

export const insertionSortDescription = `Insertion Sort (Eklemeli Sıralama), iskambil kağıtlarını elimizde sıralama şeklimize benzer şekilde çalışan basit ve sezgisel bir sıralama algoritmasıdır.

## Çalışma Prensibi:
1. **İkinci Elemanla Başlama**: Dizi soldan sağa taranır. İlk eleman sıralı kabul edilir.
2. **Doğru Konumu Bulma**: Sıradaki eleman alınır ve solundaki sıralı alt dizide uygun konumu bulunana kadar elemanlar sağa kaydırılır.
3. **Araya Ekleme**: Eleman boşalan konuma yerleştirilir.`;

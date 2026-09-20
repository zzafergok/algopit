export const implementations = {
  javascript: `function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}`,
  python: `def bubble_sort(arr):
    result = arr.copy()
    n = len(result)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        if not swapped:
            break
    return result`,
  typescript: `function bubbleSort<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}`,
  java: `public static int[] bubbleSort(int[] arr) {
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    for (let i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                int temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return result;
}`,
};

export const bubbleSortDescription = `Bubble Sort, en basit sıralama algoritmalarından biridir. Her geçişte, komşu elemanları karşılaştırarak, büyük elemanların dizinin sonuna doğru kabarcık gibi yükselmesini sağlar.

## Çalışma Prensibi:
1. Dizinin başından başlayarak her bir elemanı sağındaki komşusuyla karşılaştırır.
2. Soldaki eleman sağdakinden büyükse yerlerini değiştirir.
3. Bu işlem dizinin sonuna kadar tekrarlanır ve en büyük eleman en sona oturur.
4. Hiçbir takas gerçekleşmediğinde dizi sıralanmış demektir (erken çıkış).`;

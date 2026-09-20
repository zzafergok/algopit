export const implementations = {
  javascript: `function selectionSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  return result;
}`,
  python: `def selection_sort(arr):
    result = arr.copy()
    n = len(result)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if result[j] < result[min_idx]:
                min_idx = j
        if min_idx != i:
            result[i], result[min_idx] = result[min_idx], result[i]
    return result`,
  typescript: `function selectionSort<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  return result;
}`,
  java: `public static int[] selectionSort(int[] arr) {
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) minIndex = j;
        }
        if (minIndex != i) {
            int temp = result[i];
            result[i] = result[minIndex];
            result[minIndex] = temp;
        }
    }
    return result;
}`,
};

export const selectionSortDescription = `Selection Sort (Seçmeli Sıralama), dizideki en küçük elemanı tekrar tekrar bularak sıralanmamış kısmın başına yerleştiren sezgisel bir sıralama algoritmasıdır.

## Çalışma Prensibi:
1. **Minimum Bulma**: Sıralanmamış alt dizideki en küçük eleman aranır.
2. **Başa Alma**: Bulunan en küçük eleman, sıralanmamış kısmın ilk elemanı ile takas edilir.
3. **Tekrar**: Kalan alt dizi için bu adımlar tekrarlanır.`;

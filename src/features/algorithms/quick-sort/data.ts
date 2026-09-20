export const implementations = {
  javascript: `/**
 * Quick Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function quickSort(arr) {
  const result = [...arr];
  
  const sort = (arr, low, high) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };
  
  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };
  
  sort(result, 0, result.length - 1);
  return result;
}`,
  python: `def quick_sort(arr):
    result = arr.copy()
    
    def sort(arr, low, high):
        if low < high:
            pivot_index = partition(arr, low, high)
            sort(arr, low, pivot_index - 1)
            sort(arr, pivot_index + 1, high)
    
    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1
    
    sort(result, 0, len(result) - 1)
    return result`,
  typescript: `function quickSort<T>(arr: T[]): T[] {
  const result = [...arr];
  
  const sort = (arr: T[], low: number, high: number): void => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };
  
  const partition = (arr: T[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };
  
  sort(result, 0, result.length - 1);
  return result;
}`,
  java: `public static int[] quickSort(int[] arr) {
    int[] result = Arrays.copyOf(arr, arr.length);
    sort(result, 0, result.length - 1);
    return result;
}

private static void sort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        sort(arr, low, pivotIndex - 1);
        sort(arr, pivotIndex + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
};

export const quickSortDescription = `Quick Sort, "Böl ve Fethet" (Divide and Conquer) paradigmasını kullanan hızlı ve verimli bir sıralama algoritmasıdır. Tony Hoare tarafından 1960 yılında geliştirilmiştir ve adını hızlı çalışmasından almıştır.

## Çalışma Prensibi:
1. **Pivot Seçimi**: Diziden bir "pivot" eleman seçilir.
2. **Bölme (Partitioning)**: Dizi, pivot etrafında yeniden düzenlenir:
   - Pivottan küçük elemanlar pivotun soluna
   - Pivottan büyük elemanlar pivotun sağına yerleştirilir
3. **Özyineleme (Recursion)**: Pivotun solundaki ve sağındaki alt diziler için aynı işlem özyinelemeli olarak tekrarlanır.
4. **Birleştirme**: Quick Sort'ta açık bir birleştirme adımı yoktur, alt diziler yerinde sıralanır.

## Önemli Özellikler:
1. **Yerinde Sıralama**: Genellikle ekstra O(log n) yığın belleği dışında ek bellek kullanmaz.
2. **Kararsız Sıralama**: Eşit değere sahip elemanların göreceli sırası korunmayabilir.
3. **Uyarlanabilir**: Pivot seçimine bağlı olarak özelleştirilebilir ve optimize edilebilir.
4. **Pratik Verimlilik**: Ortalama durumda O(n log n) zaman karmaşıklığı ile çoğu durumda diğer O(n log n) algoritmalardan daha hızlı çalışır.`;

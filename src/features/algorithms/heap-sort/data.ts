export const implementations = {
  javascript: `function heapSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0);
  }
  
  return result;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
  python: `def heap_sort(arr):
    result = arr.copy()
    n = len(result)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify(result, n, i)
        
    for i in range(n - 1, 0, -1):
        result[0], result[i] = result[i], result[0]
        heapify(result, i, 0)
        
    return result

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
        
    if right < n and arr[right] > arr[largest]:
        largest = right
        
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
  typescript: `function heapSort<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];
    heapify(result, i, 0);
  }
  
  return result;
}

function heapify<T>(arr: T[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
  java: `public static int[] heapSort(int[] arr) {
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(result, n, i);
    }
    
    for (int i = n - 1; i > 0; i--) {
        int temp = result[0];
        result[0] = result[i];
        result[i] = temp;
        heapify(result, i, 0);
    }
    return result;
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}`,
};

export const heapSortDescription = `Heap Sort, ikili yığın (Binary Heap) veri yapısını kullanan, karşılaştırma tabanlı bir sıralama algoritmasıdır. J. W. J. Williams tarafından 1964 yılında geliştirilmiştir.

## Çalışma Prensibi:
1. **Max-Heap Oluşturma**: Verilen diziden bir max-heap inşa edilir.
2. **Kökü Çıkarma**: En büyük eleman (kök), dizinin son elemanıyla takas edilir.
3. **Heapify**: Yığın boyutu 1 azaltılır ve bozulan max-heap özelliği düzeltilir.
4. **Tekrar**: Tüm elemanlar sıralanana kadar bu işlem devam eder.`;

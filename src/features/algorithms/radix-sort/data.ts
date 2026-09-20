export const implementations = {
  javascript: `function radixSort(arr) {
  const result = [...arr];
  if (result.length === 0) return result;
  
  const max = Math.max(...result);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(result, exp);
  }
  
  return result;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
  python: `def radix_sort(arr):
    if len(arr) == 0:
        return arr
        
    result = arr.copy()
    max_val = max(result)
    
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(result, exp)
        exp *= 10
        
    return result

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
        
    for i in range(1, 10):
        count[i] += count[i - 1]
        
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
        
    for i in range(n):
        arr[i] = output[i]`,
  typescript: `function radixSort(arr: number[]): number[] {
  const result = [...arr];
  if (result.length === 0) return result;
  
  const max = Math.max(...result);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(result, exp);
  }
  return result;
}

function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
  java: `public static int[] radixSort(int[] arr) {
    if (arr.length == 0) return arr;
    int[] result = Arrays.copyOf(arr, arr.length);
    int max = Arrays.stream(result).max().getAsInt();
    
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countSort(result, exp);
    }
    return result;
}

private static void countSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    System.arraycopy(output, 0, arr, 0, n);
}`,
};

export const radixSortDescription = `Radix Sort (Taban Sıralaması), sayıları veya dizgileri tek tek basamaklarına (veya karakterlerine) göre sıralayan, karşılaştırma yapmayan bir sıralama algoritmasıdır.

## Çalışma Prensibi:
1. **LSD (En Önemsiz Basamaktan Başlama)**: Genellikle en sağdaki basamaktan (birler) başlar.
2. **Kararlı Alt Sıralama**: Her basamak için kararlı bir sıralama algoritması (genellikle Counting Sort) çalıştırılır.
3. **Tekrar**: En yüksek basamağa kadar tüm basamaklar için işlem tekrarlanır.`;

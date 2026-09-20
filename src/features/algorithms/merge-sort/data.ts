export const implementations = {
  javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
  python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    sorted_left = merge_sort(left)
    sorted_right = merge_sort(right)
    
    return merge(sorted_left, sorted_right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  typescript: `function mergeSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  return merge(sortedLeft, sortedRight);
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
  java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    
    int[] sortedLeft = mergeSort(left);
    int[] sortedRight = mergeSort(right);
    
    return merge(sortedLeft, sortedRight);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    
    return result;
}`,
};

export const mergeSortDescription = `Merge Sort, "Böl ve Fethet" (Divide and Conquer) paradigmasına dayanan popüler ve verimli bir karşılaştırma tabanlı sıralama algoritmasıdır. 1945 yılında John von Neumann tarafından geliştirilmiştir.

## Çalışma Prensibi:
1. **Bölme (Divide)**: Dizi, her biri orijinal dizinin yaklaşık yarısı büyüklüğünde iki alt diziye bölünür.
2. **Fethetme (Conquer)**: İki alt dizi özyinelemeli (recursive) olarak Merge Sort ile sıralanır.
3. **Birleştirme (Combine/Merge)**: İki sıralı alt dizi, tek bir sıralı dizi oluşturacak şekilde birleştirilir.

## Önemli Özellikler:
1. **Kararlı (Stable)**: Eşit değere sahip elemanların orijinal dizideki göreceli sırası korunur.
2. **Garantili Zaman Karmaşıklığı**: En iyi, ortalama ve en kötü durumlarda her zaman O(n log n) süreyle çalışır.
3. **Harici Sıralama için Uygun**: Verilerin tamamının belleğe sığmadığı durumlarda (External Sorting) son derece etkilidir.
4. **Ek Bellek Gereksinimi**: O(n) ek alan karmaşıklığına sahiptir.`;

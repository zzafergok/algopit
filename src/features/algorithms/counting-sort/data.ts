export const implementations = {
  javascript: `function countingSort(arr) {
  const result = [...arr];
  if (result.length === 0) return result;
  
  const max = Math.max(...result);
  const count = new Array(max + 1).fill(0);
  
  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }
  
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  const output = new Array(result.length);
  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }
  
  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }
  return result;
}`,
  python: `def counting_sort(arr):
    if len(arr) == 0:
        return arr
        
    result = arr.copy()
    max_val = max(result)
    count = [0] * (max_val + 1)
    
    for x in result:
        count[x] += 1
        
    for i in range(1, len(count)):
        count[i] += count[i - 1]
        
    output = [0] * len(result)
    for i in range(len(result) - 1, -1, -1):
        output[count[result[i]] - 1] = result[i]
        count[result[i]] -= 1
        
    return output`,
  typescript: `function countingSort(arr: number[]): number[] {
  const result = [...arr];
  if (result.length === 0) return result;
  
  const max = Math.max(...result);
  const count = new Array(max + 1).fill(0);
  
  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }
  
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  const output = new Array(result.length);
  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }
  
  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }
  return result;
}`,
  java: `public static int[] countingSort(int[] arr) {
    if (arr.length == 0) return arr;
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    
    for (int num : arr) count[num]++;
    for (int i = 1; i <= max; i++) count[i] += count[i - 1];
    
    int[] output = new int[arr.length];
    for (int i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
};

export const countingSortDescription = `Counting Sort (Sayarak Sıralama), elemanların dizideki frekanslarını (kaç kez geçtiğini) sayarak çalışan, karşılaştırma yapmayan bir sıralama algoritmasıdır. Harold H. Seward tarafından 1954 yılında geliştirilmiştir.

## Çalışma Prensibi:
1. **Frekans Sayma**: Her bir değerin kaç kez tekrarlandığı sayılır.
2. **Kümülatif Toplam**: Her elemanın dizideki tam konumunu belirlemek için kümülatif frekans hesaplanır.
3. **Kararlı Yerleştirme**: Orijinal dizi sondan başa taranarak elemanlar nihai dizideki doğru yerlerine yerleştirilir.`;

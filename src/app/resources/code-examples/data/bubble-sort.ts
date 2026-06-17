import { CodeExample } from '../types';

export const bubbleSortExample: CodeExample = {
  id: '1',
  title: 'Bubble Sort Implementasyonu',
  description:
    'Adım adım bubble sort algoritmasının farklı dillerde implementasyonu',
  category: 'sorting',
  difficulty: 'Kolay',
  languages: ['JavaScript', 'Python', 'Java'],
  githubUrl:
    'https://github.com/zzafergok/algopit/tree/main/src/lib/algorithms/sorting.ts',
  concepts: ['Sıralama', 'Karşılaştırma', 'Swap İşlemi'],
  codeExamples: [
    {
      language: 'JavaScript',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  const result = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}

// Kullanım örneği
const array = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(array)); // [11, 12, 22, 25, 34, 64, 90]`,
    },
    {
      language: 'Python',
      code: `def bubble_sort(arr):
    n = len(arr)
    result = arr.copy()
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            if result[j] > result[j + 1]:
                # Swap elements
                result[j], result[j + 1] = result[j + 1], result[j]
    
    return result

# Kullanım örneği
array = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(array))  # [11, 12, 22, 25, 34, 64, 90]`,
    },
    {
      language: 'Java',
      code: `public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        int[] result = arr.clone();
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (result[j] > result[j + 1]) {
                    // Swap elements
                    int temp = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = temp;
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        int[] sorted = bubbleSort(array);
        System.out.println(Arrays.toString(sorted));
    }
}`,
    },
  ],
};

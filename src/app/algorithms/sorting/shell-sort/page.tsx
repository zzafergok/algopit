'use client';

import React from 'react';

import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';

import { shellSort } from '@/lib/algorithms/sorting';

export default function ShellSortPage() {
  const pseudocode = `function shellSort(arr):
    n = length(arr)
    
    # Gap değerini başlat (genellikle n/2)
    gap = floor(n/2)
    
    while gap > 0:
        # Gap aralığında insertion sort uygula
        for i = gap to n-1:
            temp = arr[i]
            j = i
            
            # Gap aralığında uygun konumu bul
            while j >= gap and arr[j-gap] > temp:
                arr[j] = arr[j-gap]
                j = j - gap
            
            arr[j] = temp
        
        # Gap değerini yarıya böl
        gap = floor(gap/2)
    
    return arr`;

  const implementations = {
    typescript: `function shellSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;
  
  // Gap değerini n/2'den başlayarak her iterasyonda yarıya böl
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Gap kadar ayrı olan elemanları insertion sort ile sırala
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j = i;
      
      // Gap aralığında insertion sort uygula
      while (j >= gap && result[j - gap] > temp) {
        result[j] = result[j - gap];
        j -= gap;
      }
      result[j] = temp;
    }
  }
  
  return result;
}

// Kullanım örneği
const array = [64, 34, 25, 12, 22, 11, 90];
console.log(shellSort(array)); // [11, 12, 22, 25, 34, 64, 90]`,
    python: `def shell_sort(arr):
    """
    Shell Sort algoritması implementasyonu
    """
    n = len(arr)
    result = arr.copy()
    
    # Gap değerini n/2'den başlat
    gap = n // 2
    
    while gap > 0:
        # Gap aralığında insertion sort uygula
        for i in range(gap, n):
            temp = result[i]
            j = i
            
            # Gap aralığında uygun konumu bul
            while j >= gap and result[j - gap] > temp:
                result[j] = result[j - gap]
                j -= gap
            
            result[j] = temp
        
        # Gap değerini yarıya böl
        gap //= 2
    
    return result

# Kullanım örneği
array = [64, 34, 25, 12, 22, 11, 90]
print(shell_sort(array))  # [11, 12, 22, 25, 34, 64, 90]`,
    java: `public class ShellSort {
    public static int[] shellSort(int[] arr) {
        int n = arr.length;
        int[] result = arr.clone();
        
        // Gap değerini n/2'den başlat
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // Gap aralığında insertion sort uygula
            for (int i = gap; i < n; i++) {
                int temp = result[i];
                int j = i;
                
                // Gap aralığında uygun konumu bul
                while (j >= gap && result[j - gap] > temp) {
                    result[j] = result[j - gap];
                    j -= gap;
                }
                result[j] = temp;
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        int[] sorted = shellSort(array);
        System.out.println(Arrays.toString(sorted));
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Shell Sort Algoritması"
        description="Shell Sort, Insertion Sort'un geliştirilmiş bir versiyonudur. Donald Shell tarafından 1959'da geliştirilen bu algoritma, elemanları belirli aralıklarla (gap) karşılaştırarak sıralama işlemini optimize eder. Gap değeri her iterasyonda azaltılarak son aşamada normal insertion sort uygulanır."
        timeComplexity={{
          best: 'O(n log n)',
          average: 'O(n log²n)',
          worst: 'O(n²)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          "Insertion Sort'tan önemli ölçüde daha hızlıdır",
          'In-place sıralama algoritmasıdır (O(1) alan karmaşıklığı)',
          'Adaptive algoritma - kısmen sıralı dizilerde daha hızlı çalışır',
          'Küçük ve orta boyutlu diziler için oldukça verimlidir',
          'Kararlı olmasa da pratik uygulamalarda iyi performans gösterir',
        ]}
        disadvantages={[
          "En kötü durum karmaşıklığı O(n²)'dir",
          'Kararlı bir sıralama algoritması değildir',
          'Gap dizisinin seçimi performansı önemli ölçüde etkiler',
          'Büyük veri setlerinde Quick Sort veya Merge Sort kadar verimli değildir',
          'Teorik analizi karmaşıktır',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Orta boyutlu veri setlerinin sıralanması',
          'Embedded sistemler (düşük bellek kullanımı)',
          'Kısmen sıralı verilerin optimize edilmesi',
          'Hibrit sıralama algoritmalarında alt algoritma olarak kullanım',
          'Eğitim amaçlı algoritma öğretimi',
          'Real-time sistemlerde öngörülebilir performans gereksinimleri',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}

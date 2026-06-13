'use client';

import React from 'react';

import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';

import { bubbleSort } from '@/lib/algorithms/sorting';

export default function BubbleSortPage() {
  const implementations = {
    javascript: `/**
 * Bubble Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function bubbleSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each pass places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Optimization: track if any swaps occurred during this pass
    let swapped = false;
    
    // Inner loop - compare adjacent elements and swap if needed
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Destructuring swap - cleaner than using a temp variable
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, the array is already sorted
    if (!swapped) break;
  }
  
  return result;
}`,
    python: `def bubble_sort(arr):
    """
    Implementation of Bubble Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Outer loop - each pass places one element in its final position
    for i in range(n - 1):
        # Optimization: track if any swaps occurred during this pass
        swapped = False
        
        # Inner loop - compare adjacent elements and swap if needed
        for j in range(n - i - 1):
            # Compare and swap if needed
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
                
        # If no swaps occurred, the list is already sorted
        if not swapped:
            break
                
    return result`,
    typescript: `/**
 * Bubble Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function bubbleSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each pass places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Optimization: track if any swaps occurred during this pass
    let swapped = false;
    
    // Inner loop - compare adjacent elements and swap if needed
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Destructuring swap - cleaner than using a temp variable
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, the array is already sorted
    if (!swapped) break;
  }
  
  return result;
}`,
    java: `/**
 * Bubble Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] bubbleSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Outer loop - each pass places one element in its final position
    for (int i = 0; i < n - 1; i++) {
        // Optimization: track if any swaps occurred during this pass
        boolean swapped = false;
        
        // Inner loop - compare adjacent elements and swap if needed
        for (int j = 0; j < n - i - 1; j++) {
            // Compare and swap if needed
            if (result[j] > result[j + 1]) {
                // Swap elements
                int temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swaps occurred, the array is already sorted
        if (!swapped) break;
    }
    
    return result;
}`,
  };

  const bubbleSortDescription = `
Bubble Sort, en basit sıralama algoritmalarından biridir. Her geçişte, komşu elemanları karşılaştırarak, büyük elemanların dizinin sonuna doğru kabarcık gibi yükselmesini sağlar.

## Çalışma Prensibi:

1. Dizinin başından başlayarak, her bir elemanı sağındaki komşusuyla karşılaştırır.
2. Eğer soldaki eleman, sağdakinden büyükse, yerlerini değiştirir.
3. Bu işlem, dizinin başından sonuna kadar tekrarlanır.
4. Her tam geçiş sonrası, en büyük eleman dizinin sonuna yerleşir.
5. Bir sonraki geçişte, son eleman zaten yerleştiği için, bir önceki elemana kadar karşılaştırma yapılır.
6. Hiçbir takas işlemi gerçekleşmediğinde, dizi sıralanmış demektir ve algoritma sonlanır.

## Optimizasyonlar:

1. **Erken Çıkış**: Eğer bir geçişte hiçbir takas yapılmamışsa, dizi sıralanmış demektir.
2. **Sınır Takibi**: Her geçişte, bir önceki geçişte yerleştirilen elemanlar için gereksiz karşılaştırma yapılmaz.

Bubble Sort, eğitim amaçlı ve küçük veri setleri için uygundur, ancak büyük veri setleri için verimli değildir.
`;

  return (
    <AlgorithmPageTemplate
      title="Bubble Sort Algoritması"
      descriptionTitle="Bubble Sort Açıklaması"
      description={bubbleSortDescription}
      codeExamples={implementations}
      codeIntro={
        <>
          Bubble Sort algoritmasının farklı programlama dillerindeki
          uygulamaları aşağıda verilmiştir. Her örnek, algoritmanın optimize
          edilmiş versiyonunu içerir ve detaylı açıklamalarla sunulmuştur.
        </>
      }
      demoDescription={
        <>
          Aşağıya kendi verilerinizi girerek Bubble Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </>
      }
      demo={
        <InteractiveDemo
          title="Bubble Sort Demo"
          description="Verdiğiniz dizi Bubble Sort algoritması ile sıralanacaktır."
          algorithmFunction={bubbleSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-ash">
                Not: Bubble Sort büyük veri setleri için verimli değildir.
                1000'den fazla eleman içeren diziler için daha verimli
                algoritmalar tercih edin.
              </p>
            </div>
          )}
        />
      }
      timeComplexity={{ best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' }}
      spaceComplexity="O(1)"
      analysisRightTitle="Kararlılık (Stability)"
      analysisRightContent={
        <p className="text-sm text-ash">
          Bubble Sort <span className="font-medium">kararlı</span> bir
          algoritma olduğundan, eşit değere sahip elemanların göreceli sırası
          korunur. Bu özellik, ikincil sıralama kriterleri olan uygulamalarda
          önemlidir.
        </p>
      }
      advantages={[
        'Anlaşılması ve uygulanması son derece kolaydır.',
        'Ekstra bellek alanı gerektirmez (O(1) alan karmaşıklığı).',
        'Kararlı bir algoritma olduğundan, eşit değerli elemanların sırası değişmez.',
        'Erken çıkış optimizasyonu ile zaten sıralı veriler için O(n) karmaşıklığa sahiptir.',
        'Çok küçük veri setleri için basit ve verimli olabilir.',
      ]}
      disadvantages={[
        'Büyük veri setleri için O(n²) zaman karmaşıklığı nedeniyle oldukça verimsizdir.',
        'Selection Sort ve Insertion Sort gibi diğer basit algoritmalardan genellikle daha yavaştır.',
        'Takas işlemi sayısı fazladır, bu da performansı düşürür.',
        'Modern uygulamalarda, daha iyi performans sunan algoritmalar (Quick Sort, Merge Sort vb.) tercih edilir.',
      ]}
      relatedIntro={
        <>
          Bubble Sort'a benzer veya alternatif olarak kullanılabilecek diğer
          sıralama algoritmaları:
        </>
      }
      relatedAlgorithms={[
        {
          title: 'Insertion Sort',
          description:
            'Küçük veri setleri için verimli ve kısmen sıralı veriler için O(n) performans sunar.',
        },
        {
          title: 'Selection Sort',
          description:
            "Bubble Sort'a benzer karmaşıklığa sahip, ancak takas işlemi sayısı daha azdır.",
        },
        {
          title: 'Cocktail Sort',
          description:
            "Bubble Sort'un iki yönlü bir varyasyonu, daha hızlı yakınsama sağlayabilir.",
        },
      ]}
    />
  );
}

export const pseudocode = `function findSubsetSum(arr, targetSum):
    result = []  // Bulunan alt kümeleri saklar
    currentSubset = []  // Mevcut alt küme
    
    // Elemanları sırala (opsiyonel, ama budama için faydalı olabilir)
    sortedArr = sort(arr)
    
    function backtrack(start, currentSum):
        // Hedef toplam bulundu
        if currentSum == targetSum:
            result.add(copy of currentSubset)
            return
        
        // Toplam hedefi aştı, bu dalı buda
        if currentSum > targetSum:
            return
        
        // Olası tüm elemanları dene
        for i from start to length(sortedArr)-1:
            // Tekrar eden elemanları atla (opsiyonel)
            if i > start AND sortedArr[i] == sortedArr[i-1]:
                continue
            
            // Elemanı alt kümeye ekle
            currentSubset.add(sortedArr[i])
            
            // Rekürsif olarak bir sonraki elemandan devam et
            backtrack(i + 1, currentSum + sortedArr[i])
            
            // Geri izleme (backtrack)
            currentSubset.remove(sortedArr[i])
    
    // 0. indeksten başla, toplam 0
    backtrack(0, 0)
    
    return result`;

export const implementations = {
  typescript: `function findSubsetSum(arr: number[], targetSum: number): number[][] {
  const result: number[][] = [];
  const currentSubset: number[] = [];
  const sortedArr = [...arr].sort((a, b) => a - b);
  
  function backtrack(start: number, currentSum: number) {
    if (currentSum === targetSum) {
      result.push([...currentSubset]);
      return;
    }
    
    if (currentSum > targetSum) {
      return;
    }
    
    for (let i = start; i < sortedArr.length; i++) {
      if (i > start && sortedArr[i] === sortedArr[i - 1]) {
        continue;
      }
      
      currentSubset.push(sortedArr[i]);
      backtrack(i + 1, currentSum + sortedArr[i]);
      currentSubset.pop();
    }
  }
  
  backtrack(0, 0);
  return result;
}`,
  python: `def find_subset_sum(arr, target_sum):
    result = []
    current_subset = []
    sorted_arr = sorted(arr)
    
    def backtrack(start, current_sum):
        if current_sum == target_sum:
            result.append(current_subset[:])
            return
        
        if current_sum > target_sum:
            return
        
        for i in range(start, len(sorted_arr)):
            if i > start and sorted_arr[i] == sorted_arr[i-1]:
                continue
            current_subset.append(sorted_arr[i])
            backtrack(i + 1, current_sum + sorted_arr[i])
            current_subset.pop()
    
    backtrack(0, 0)
    return result`,
  java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SubsetSum {
    public static List<List<Integer>> findSubsetSum(int[] arr, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentSubset = new ArrayList<>();
        Arrays.sort(arr);
        backtrack(arr, targetSum, 0, 0, currentSubset, result);
        return result;
    }
    
    private static void backtrack(int[] arr, int targetSum, int start, int currentSum, 
                                  List<Integer> currentSubset, List<List<Integer>> result) {
        if (currentSum == targetSum) {
            result.add(new ArrayList<>(currentSubset));
            return;
        }
        if (currentSum > targetSum) {
            return;
        }
        for (int i = start; i < arr.length; i++) {
            if (i > start && arr[i] == arr[i-1]) continue;
            currentSubset.add(arr[i]);
            backtrack(arr, targetSum, i + 1, currentSum + arr[i], currentSubset, result);
            currentSubset.remove(currentSubset.size() - 1);
        }
    }
}`,
};

export const explanationData = {
  title: 'Subset Sum Problemi (Alt Küme Toplamı)',
  description:
    'Subset Sum (Alt Küme Toplamı) problemi, bir sayı dizisinden, toplamı belirli bir hedef değere eşit olan bir alt küme bulunup bulunamayacağını belirleyen bir problemdir. Bu, NP-Complete bir problemdir ve geri izleme (backtracking) algoritması, dinamik programlama (dynamic programming) veya brute force yaklaşımları ile çözülebilir.',
  timeComplexity: {
    best: 'O(2^n)',
    average: 'O(2^n)',
    worst: 'O(2^n)',
  },
  spaceComplexity: 'O(n)',
  advantages: [
    'Geri izleme (backtracking) yaklaşımı tüm olası çözümleri bulabilir',
    'Erken budama (pruning) teknikleri ile verimlilik arttırılabilir',
    'Basit ve anlaşılması kolay bir algoritma',
    'Optimal alt kümeyi garanti eder',
  ],
  disadvantages: [
    'Üstel zaman karmaşıklığı (O(2^n)) nedeniyle büyük veri setleri için verimsiz',
    'Küçük ve orta ölçekli veri setleri için pratik olsa da, büyük ölçekli problemlerde zaman sınırlamaları olabilir',
    'Dinamik programlama yaklaşımı daha verimli olabilir ancak sadece çözümün var/yok bilgisini verir (tüm olası çözümleri göstermez)',
    'Optimal çözümü bulmak için tüm kombinasyonları kontrol etmek gerekebilir',
  ],
  applications: [
    'Bütçe tahsisi ve kaynak dağıtımı problemleri',
    'Sırt çantası (knapsack) problemi türevleri',
    'Finansal portföy optimizasyonu',
    'Veri kümesi bölümleme (partition) işlemleri',
    'İş zamanlama ve kaynak atama problemleri',
    'Algoritma tasarımı ve analiz için eğitim amaçlı örnek problem',
  ],
  relatedAlgorithms: [
    {
      title: 'Knapsack Problem',
      description:
        'Hedef değer ve kapasite kısıtlarıyla çalışan yakın bir optimizasyon problemidir.',
    },
    {
      title: 'Partition Problem',
      description:
        'Bir dizinin toplamları eşit iki alt kümeye bölünüp bölünemeyeceğini inceler.',
    },
    {
      title: 'Combination Sum',
      description:
        'Belirli bir hedef toplamı oluşturan kombinasyonları üretir.',
    },
  ],
};

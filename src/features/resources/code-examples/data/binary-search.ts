import { CodeExample } from '../types';

export const binarySearchExample: CodeExample = {
  id: '2',
  title: 'Binary Search Algorithm',
  description: 'Verimli arama algoritması örneği ve farklı varyasyonları',
  category: 'searching',
  difficulty: 'Orta',
  languages: ['JavaScript', 'Python', 'C++'],
  concepts: ['Arama', 'Böl ve Fethet', 'Logaritmik Karmaşıklık'],
  codeExamples: [
    {
      language: 'JavaScript',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Element not found
}

// Kullanım örneği
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedArray, 7)); // 3
console.log(binarySearch(sortedArray, 6)); // -1`,
    },
    {
      language: 'Python',
      code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Element not found

# Kullanım örneği
sorted_array = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(sorted_array, 7))  # 3
print(binary_search(sorted_array, 6))  # -1`,
    },
    {
      language: 'C++',
      code: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}

int main() {
    std::vector<int> sortedArray = {1, 3, 5, 7, 9, 11, 13, 15};
    std::cout << binarySearch(sortedArray, 7) << std::endl; // 3
    std::cout << binarySearch(sortedArray, 6) << std::endl; // -1
    return 0;
}`,
    },
  ],
};

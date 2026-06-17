import { CodeExample } from '../types';

export const fibonacciExample: CodeExample = {
  id: '3',
  title: 'Dynamic Programming - Fibonacci',
  description: 'Fibonacci serisinin dinamik programlama ile optimal çözümü',
  category: 'dp',
  difficulty: 'Kolay',
  languages: ['JavaScript', 'Python', 'Java'],
  concepts: ['Dinamik Programlama', 'Memoization', 'Optimizasyon'],
  codeExamples: [
    {
      language: 'JavaScript',
      code: `// Memoization yaklaşımı
function fibonacciMemo(n, memo = {}) {
  if (n <= 1) return n;
  
  if (!memo[n]) {
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  }
  
  return memo[n];
}

// Tabulation yaklaşımı
function fibonacciTab(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space-optimized yaklaşım
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0;
  let prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Kullanım örneği
console.log(fibonacciMemo(10)); // 55
console.log(fibonacciTab(10)); // 55
console.log(fibonacciOptimized(10)); // 55`,
    },
    {
      language: 'Python',
      code: `# Memoization yaklaşımı
def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}
    
    if n <= 1:
        return n
    
    if n not in memo:
        memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    
    return memo[n]

# Tabulation yaklaşımı
def fibonacci_tab(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Space-optimized yaklaşım
def fibonacci_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1

# Kullanım örneği
print(fibonacci_memo(10))     # 55
print(fibonacci_tab(10))      # 55
print(fibonacci_optimized(10)) # 55`,
    },
    {
      language: 'Java',
      code: `import java.util.HashMap;
import java.util.Map;

public class Fibonacci {
    // Memoization yaklaşımı
    public static int fibonacciMemo(int n, Map<Integer, Integer> memo) {
        if (n <= 1) return n;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        memo.put(n, result);
        return result;
    }
    
    // Tabulation yaklaşımı
    public static int fibonacciTab(int n) {
        if (n <= 1) return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space-optimized yaklaşım
    public static int fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        int prev2 = 0;
        int prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        System.out.println(fibonacciMemo(10, memo));  // 55
        System.out.println(fibonacciTab(10));         // 55
        System.out.println(fibonacciOptimized(10));   // 55
    }
}`,
    },
  ],
};

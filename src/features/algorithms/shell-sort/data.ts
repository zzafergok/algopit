export const pseudocode = `function shellSort(arr):
    n = length(arr)
    gap = floor(n/2)
    
    while gap > 0:
        for i = gap to n-1:
            temp = arr[i]
            j = i
            while j >= gap and arr[j-gap] > temp:
                arr[j] = arr[j-gap]
                j = j - gap
            arr[j] = temp
        gap = floor(gap/2)
    
    return arr`;

export const implementations = {
  typescript: `function shellSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j = i;
      while (j >= gap && result[j - gap] > temp) {
        result[j] = result[j - gap];
        j -= gap;
      }
      result[j] = temp;
    }
  }
  return result;
}`,
  javascript: `function shellSort(arr) {
  const result = [...arr];
  const n = result.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j = i;
      while (j >= gap && result[j - gap] > temp) {
        result[j] = result[j - gap];
        j -= gap;
      }
      result[j] = temp;
    }
  }
  return result;
}`,
  python: `def shell_sort(arr):
    n = len(arr)
    result = arr.copy()
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = result[i]
            j = i
            while j >= gap and result[j - gap] > temp:
                result[j] = result[j - gap]
                j -= gap
            result[j] = temp
        gap //= 2
    return result`,
  java: `public class ShellSort {
    public static int[] shellSort(int[] arr) {
        int n = arr.length;
        int[] result = arr.clone();
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = result[i];
                int j = i;
                while (j >= gap && result[j - gap] > temp) {
                    result[j] = result[j - gap];
                    j -= gap;
                }
                result[j] = temp;
            }
        }
        return result;
    }
}`,
};

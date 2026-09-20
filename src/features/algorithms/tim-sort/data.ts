export const pseudocode = `function timSort(arr):
    n = length(arr)
    MIN_MERGE = 32
    minRun = getMinRunLength(n)
    
    if n < 64:
        insertionSort(arr, 0, n-1)
        return arr
    
    runs = findNaturalRuns(arr)
    for each run in runs:
        if run.isDescending:
            reverse(run)
        if run.length < minRun:
            extendRun(run, minRun)
            insertionSort(run)
    
    while more than one run exists:
        mergeRuns()
    
    return arr`;

export const implementations = {
  typescript: `class TimSort {
  private static MIN_MERGE = 32;
  
  public static sort(arr: number[]): number[] {
    const result = [...arr];
    const n = result.length;
    if (n < 2) return result;
    
    if (n < 64) {
      this.insertionSort(result, 0, n - 1);
      return result;
    }
    
    const minRun = this.getMinRunLength(n);
    const runs = this.findRuns(result, minRun);
    this.mergeRuns(result, runs);
    return result;
  }
  
  private static getMinRunLength(n: number): number {
    let r = 0;
    while (n >= this.MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
  
  private static insertionSort(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
  
  private static findRuns(arr: number[], minRun: number): { start: number; end: number }[] {
    const runs: { start: number; end: number }[] = [];
    let i = 0;
    const n = arr.length;
    
    while (i < n) {
      const start = i;
      while (i < n - 1 && arr[i] <= arr[i + 1]) i++;
      const runLength = i - start + 1;
      if (runLength < minRun && i < n - 1) {
        i = Math.min(start + minRun - 1, n - 1);
        this.insertionSort(arr, start, i);
      }
      runs.push({ start, end: i });
      i++;
    }
    return runs;
  }
  
  private static mergeRuns(arr: number[], runs: { start: number; end: number }[]): void {
    let currentSize = this.MIN_MERGE;
    const n = arr.length;
    while (currentSize < n) {
      for (let start = 0; start < n; start += 2 * currentSize) {
        const mid = Math.min(start + currentSize - 1, n - 1);
        const end = Math.min(start + 2 * currentSize - 1, n - 1);
        if (mid < end) this.merge(arr, start, mid, end);
      }
      currentSize *= 2;
    }
  }
  
  private static merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) arr[k++] = leftArr[i++];
      else arr[k++] = rightArr[j++];
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  }
}`,
  javascript: `function timSort(arr) {
  const MIN_MERGE = 32;
  const n = arr.length;
  if (n < 2) return [...arr];
  
  const result = [...arr];
  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSort(result, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }
  
  for (let size = MIN_MERGE; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(result, left, mid, right);
    }
  }
  return result;
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

function merge(arr, l, m, r) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`,
  python: `def tim_sort(arr):
    MIN_MERGE = 32
    n = len(arr)
    result = arr.copy()
    
    for i in range(0, n, MIN_MERGE):
        insertion_sort(result, i, min(i + MIN_MERGE - 1, n - 1))
        
    size = MIN_MERGE
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(result, left, mid, right)
        size = 2 * size
    return result

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, l, m, r):
    left = arr[l:m + 1]
    right = arr[m + 1:r + 1]
    i = j = 0
    k = l
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1
        else:
            arr[k] = right[j]
            j += 1
        k += 1
    while i < len(left):
        arr[k] = left[i]
        i += 1
        k += 1
    while j < len(right):
        arr[k] = right[j]
        j += 1
        k += 1`,
  java: `public class TimSort {
    private static final int MIN_MERGE = 32;
    public static int[] timSort(int[] arr) {
        int[] result = Arrays.copyOf(arr, arr.length);
        int n = result.length;
        for (int i = 0; i < n; i += MIN_MERGE) {
            insertionSort(result, i, Math.min(i + MIN_MERGE - 1, n - 1));
        }
        for (int size = MIN_MERGE; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) merge(result, left, mid, right);
            }
        }
        return result;
    }
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }
    private static void merge(int[] arr, int l, int m, int r) {
        int[] left = Arrays.copyOfRange(arr, l, m + 1);
        int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) arr[k++] = left[i++];
            else arr[k++] = right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
}`,
};

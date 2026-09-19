import { SubsetSumStep } from './types';

export function findSubsetSum(
  arr: number[],
  targetSum: number,
): { subsets: number[][]; steps: SubsetSumStep[] } {
  const result: number[][] = [];
  const steps: SubsetSumStep[] = [];
  const currentSubset: number[] = [];

  const sortedArr = [...arr].sort((a, b) => a - b);

  function backtrack(start: number, currentSum: number) {
    steps.push({
      subset: [...currentSubset],
      index: start,
      currentSum: currentSum,
      remaining: targetSum - currentSum,
    });

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

  return { subsets: result, steps };
}

export function dpSubsetSumAll(arr: number[], target: number): number[][] {
  const dp: number[][][] = Array(target + 1)
    .fill(null)
    .map(() => []);
  dp[0] = [[]];

  for (const num of arr) {
    for (let j = target; j >= num; j--) {
      if (dp[j - num].length > 0) {
        for (const subset of dp[j - num]) {
          dp[j].push([...subset, num]);
        }
      }
    }
  }

  return dp[target];
}

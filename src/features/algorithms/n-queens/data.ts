export function solveNQueens(n: number): number[][] {
  const solutions: number[][] = [];
  const board: number[] = Array(n).fill(-1);

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i] === col) return false;
      if (Math.abs(i - row) === Math.abs(board[i] - col)) return false;
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      solutions.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1;
      }
    }
  }

  backtrack(0);
  return solutions;
}

export const pseudocode = `function solveNQueens(n):
    solutions = []
    board = empty array of size n
    
    function isSafe(row, col):
        for each prior row i:
            if board[i] == col or |i - row| == |board[i] - col|:
                return false
        return true
        
    function backtrack(row):
        if row == n:
            solutions.add(copy of board)
            return
        for col from 0 to n-1:
            if isSafe(row, col):
                board[row] = col
                backtrack(row + 1)
                board[row] = -1
                
    backtrack(0)
    return solutions`;

export const implementations = {
  typescript: `function solveNQueens(n: number): number[][] {
  const solutions: number[][] = [];
  const board: number[] = Array(n).fill(-1);

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i] === col || Math.abs(i - row) === Math.abs(board[i] - col)) return false;
    }
    return true;
  }

  function backtrack(row: number): void {
    if (row === n) {
      solutions.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1;
      }
    }
  }

  backtrack(0);
  return solutions;
}`,
  python: `def solve_n_queens(n):
    solutions = []
    board = [-1] * n
    
    def is_safe(row, col):
        for i in range(row):
            if board[i] == col or abs(i - row) == abs(board[i] - col):
                return False
        return True
        
    def backtrack(row):
        if row == n:
            solutions.append(list(board))
            return
        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                backtrack(row + 1)
                board[row] = -1
                
    backtrack(0)
    return solutions`,
  java: `public class NQueens {
    // Java N-Queens solver
}`,
};

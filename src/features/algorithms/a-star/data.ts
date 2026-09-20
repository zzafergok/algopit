export const pseudocode = `function AStar(start, goal, heuristic):
    openSet = PriorityQueue()
    openSet.enqueue(start, 0)
    
    gScore[start] = 0
    fScore[start] = heuristic(start, goal)
    
    while openSet is not empty:
        current = openSet.dequeue()
        if current == goal:
            return reconstructPath(current)
            
        for neighbor in getNeighbors(current):
            tentativeGScore = gScore[current] + distance(current, neighbor)
            if tentativeGScore < gScore[neighbor]:
                cameFrom[neighbor] = current
                gScore[neighbor] = tentativeGScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                if neighbor not in openSet:
                    openSet.enqueue(neighbor, fScore[neighbor])
    return failure`;

export const implementations = {
  typescript: `interface Point { x: number; y: number; }
interface Node extends Point {
  g: number; h: number; f: number;
  parent?: Node;
}

function aStar(start: Point, goal: Point, grid: number[][]) {
  // A* implementation on 2D grid
}`,
  python: `import heapq

def a_star(start, goal, grid):
    # A* implementation in Python
    pass`,
  java: `public class AStar {
    // A* implementation in Java
}`,
};

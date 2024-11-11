export class ManhattanDistance implements Heuristic {
  calculateHeuristic({
    currNode,
    endNode,
  }: {
    currNode: [number, number];
    endNode: [number, number];
  }): number {
    const [currRow, currCol] = currNode;
    const [endRow, endCol] = endNode;

    const dy = endRow - currRow;
    const dx = endCol - currCol;

    return Math.abs(dy) + Math.abs(dx);
  }
}

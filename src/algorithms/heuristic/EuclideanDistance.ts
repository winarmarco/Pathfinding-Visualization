export class EuclideanDistance implements Heuristic {
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

    return Math.sqrt(dy ** 2 + dx ** 2);
  }
}

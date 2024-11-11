interface Heuristic {
  calculateHeuristic({
    currNode,
    endNode,
  }: {
    currNode: [number, number];
    endNode: [number, number];
  }): number;
}

export class ManhattanDistance {
    calculateHeuristic({ currNode, endNode, }) {
        const [currRow, currCol] = currNode;
        const [endRow, endCol] = endNode;
        const dy = endRow - currRow;
        const dx = endCol - currCol;
        return Math.abs(dy) + Math.abs(dx);
    }
}

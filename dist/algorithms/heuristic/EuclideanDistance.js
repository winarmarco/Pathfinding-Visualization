export class EuclideanDistance {
    calculateHeuristic({ currNode, endNode, }) {
        const [currRow, currCol] = currNode;
        const [endRow, endCol] = endNode;
        const dy = endRow - currRow;
        const dx = endCol - currCol;
        return Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
    }
}

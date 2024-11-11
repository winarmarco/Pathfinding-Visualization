import { encodePosition, getAdjacentCell } from "../utils.js";
import { Output } from "./output.js";
export class BFS {
    constructor() { }
    solve(graph) {
        const grid = graph.grid;
        const startPos = graph.startPosition;
        const endPos = graph.endPosition;
        const [endRow, endCol] = endPos;
        const visit_order = [];
        const visited = new Set();
        const queue = [startPos];
        while (queue.length) {
            console.log(queue);
            const currPos = queue.pop();
            console.log(currPos);
            const encodedCurrPos = encodePosition(currPos);
            const [row, col] = currPos;
            visit_order.push(currPos);
            if (row == endRow && col == endCol) {
                break;
            }
            if (visited.has(encodedCurrPos))
                continue;
            visited.add(encodedCurrPos);
            const adjCells = getAdjacentCell({ grid, position: currPos });
            console.log(adjCells);
            for (const adjCell of adjCells) {
                const isWall = adjCell.isChecked();
                if (isWall)
                    continue;
                // Adj cell not is not a wall
                const adjPosition = [adjCell.row, adjCell.col];
                if (!visited.has(encodePosition(adjPosition))) {
                    queue.push(adjPosition);
                }
            }
        }
        return new Output({ paths: [], visit_order: visit_order });
    }
}

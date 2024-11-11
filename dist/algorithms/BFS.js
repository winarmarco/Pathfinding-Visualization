import { DistanceInfo } from "../graph.js";
import { constructPaths, encodePosition, getAdjacentCell } from "../utils.js";
import { Output } from "./output.js";
export class BFS {
    constructor() { }
    solve(graph) {
        const minDistGrid = [];
        for (let i = 0; i < graph.grid.length; i++) {
            minDistGrid.push([]);
            for (let j = 0; j < graph.grid[i].length; j++) {
                minDistGrid[i].push(new DistanceInfo({}));
            }
        }
        const startPos = graph.startPosition;
        const endPos = graph.endPosition;
        const [startRow, startCol] = startPos;
        const [endRow, endCol] = endPos;
        minDistGrid[startRow][startCol].minDist = 0;
        const visit_order = [];
        const visited = new Set();
        const queue = [startPos];
        let paths = [];
        while (queue.length) {
            const currPos = queue.shift();
            const encodedCurrPos = encodePosition(currPos);
            const [currRow, currCol] = currPos;
            // Mark in visit order
            visit_order.push(currPos);
            const currMinDist = minDistGrid[currRow][currCol];
            if (currRow == endRow && currCol == endCol) {
                // There is a path from start to end, thus construct paths
                paths = constructPaths({ graph, minDistGrid });
                break;
            }
            // If has been visited, dont visit
            if (visited.has(encodedCurrPos))
                continue;
            // Not visited, thus expand and mark as visited
            visited.add(encodedCurrPos);
            const adjNodes = getAdjacentCell({ graph, position: currPos });
            for (const adjNode of adjNodes) {
                const adjCell = adjNode.cell;
                const cost = adjNode.cost;
                const isWall = adjCell.isChecked();
                if (isWall)
                    continue;
                // Adj cell not is not a wall and check the min distance
                const adjPosition = [adjCell.row, adjCell.col];
                const adjMinDist = minDistGrid[adjCell.row][adjCell.col];
                if (!visited.has(encodePosition(adjPosition)) &&
                    currMinDist.minDist + cost <= adjMinDist.minDist) {
                    // Update the minDist of the adj cell
                    adjMinDist.minDist = currMinDist.minDist + cost;
                    adjMinDist.from = currPos;
                    queue.push(adjPosition);
                }
            }
        }
        return new Output({ paths: paths, visit_order: visit_order });
    }
}

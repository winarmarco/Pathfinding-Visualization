import { DistanceInfo } from "../graph.js";
import { constructPaths, encodePosition, getAdjacentCell } from "../utils.js";
import { Output } from "./output.js";
export class Dijkstra {
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
        const priorityQueue = [
            [minDistGrid[startRow][startCol].minDist, startPos],
        ];
        let paths = [];
        while (priorityQueue.length) {
            // Extract the element with the minimum distance
            const [currDist, currPos] = priorityQueue.shift();
            const encodedCurrPos = encodePosition(currPos);
            const [currRow, currCol] = currPos;
            const currMinDist = minDistGrid[currRow][currCol];
            // Check if it's already visited
            if (visited.has(encodedCurrPos))
                continue;
            visited.add(encodedCurrPos);
            // Mark in visit order
            visit_order.push(currPos);
            if (currRow == endRow && currCol == endCol) {
                // There is a path from start to end, thus construct paths
                paths = constructPaths({ graph, minDistGrid });
                break;
            }
            const adjNodes = getAdjacentCell({ graph, position: currPos });
            for (const adjNode of adjNodes) {
                const adjCell = adjNode.cell;
                const cost = adjNode.cost;
                const isWall = adjCell.isChecked();
                if (isWall)
                    continue;
                // Adj cell is not a wall; check and update min distance
                const adjPosition = [adjCell.row, adjCell.col];
                const adjMinDist = minDistGrid[adjCell.row][adjCell.col];
                const newDist = currMinDist.minDist + cost;
                if (newDist < adjMinDist.minDist) {
                    // Update the minDist of the adj cell
                    adjMinDist.minDist = newDist;
                    adjMinDist.from = currPos;
                    // Add to priority queue only if not visited
                    if (!visited.has(encodePosition(adjPosition))) {
                        priorityQueue.push([adjMinDist.minDist, adjPosition]);
                    }
                }
            }
            // Sort priorityQueue to get the smallest element on top
            priorityQueue.sort((a, b) => a[0] - b[0]);
        }
        return new Output({
            paths: paths,
            visit_order: visit_order,
            pathLength: minDistGrid[endRow][endCol].minDist,
        });
    }
}

import { DistanceInfo, Graph } from "../graph.js";
import { constructPaths, encodePosition, getAdjacentCell } from "../utils.js";
import { Algorithm } from "./algorithm.js";
import { Output } from "./output.js";

export class Astar implements Algorithm {
  heuristic: Heuristic;

  constructor({ heuristic }: { heuristic: Heuristic }) {
    this.heuristic = heuristic;
  }

  solve(graph: Graph): Output {
    const minDistGrid: DistanceInfo[][] = [];

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

    const visit_order: [number, number][] = [];
    const visited: Set<string> = new Set();
    const priorityQueue: [number, [number, number]][] = [[0, startPos]];
    let paths: [number, number][] = [];

    while (priorityQueue.length) {
      // Extract the element with the minimum f = g + h
      priorityQueue.sort((a, b) => a[0] - b[0]); // Sort for smallest f-value
      const [_, currPos] = priorityQueue.shift()!;
      const encodedCurrPos = encodePosition(currPos);
      const [currRow, currCol] = currPos;
      const currMinDist = minDistGrid[currRow][currCol];

      // Check if it's already visited
      if (visited.has(encodedCurrPos)) continue;
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
        const heuristicCost = this.heuristic.calculateHeuristic({
          currNode: [adjCell.row, adjCell.col],
          endNode: endPos,
        });
        const isWall = adjCell.isChecked();
        if (isWall) continue;

        // Adj cell is not a wall; check and update min distance
        const adjPosition: [number, number] = [adjCell.row, adjCell.col];
        const adjMinDist = minDistGrid[adjCell.row][adjCell.col];
        const newDist = currMinDist.minDist + cost;

        if (newDist < adjMinDist.minDist) {
          // Update the minDist of the adj cell
          adjMinDist.minDist = newDist;
          adjMinDist.from = currPos;

          // Add to priority queue with f = g + h
          if (!visited.has(encodePosition(adjPosition))) {
            priorityQueue.push([newDist + heuristicCost, adjPosition]);
          }
        }
      }
    }

    return new Output({
      paths: paths,
      visit_order: visit_order,
      pathLength: minDistGrid[endRow][endCol].minDist,
    });
  }
}

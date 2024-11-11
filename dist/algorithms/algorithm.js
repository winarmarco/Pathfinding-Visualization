import { Astar } from "./Astar.js";
import { BFS } from "./BFS.js";
import { DFS } from "./DFS.js";
import { Dijkstra } from "./Dijkstra.js";
import { EuclideanDistance } from "./heuristic/EuclideanDistance.js";
import { ManhattanDistance } from "./heuristic/ManhattanDistance.js";
export class AlgorithmBuilder {
    static build(selectedAlgorithm) {
        switch (selectedAlgorithm) {
            case "DFS":
                return new DFS();
            case "BFS":
                return new BFS();
            case "Dijkstra":
                return new Dijkstra();
            case "A* - Euclidean Distance":
                return new Astar({ heuristic: new EuclideanDistance() });
            case "A* - Manhattan Distance":
                return new Astar({ heuristic: new ManhattanDistance() });
            default:
                return new DFS();
        }
    }
}

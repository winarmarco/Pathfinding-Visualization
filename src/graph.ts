import { Cell, CellContent } from "./cell.js";
import { PATH_COLOR, VISITED_COLOR } from "./config.js";

export class Graph {
  startPosition: [number, number];
  endPosition: [number, number];
  grid: Cell[][];
  walls: [number, number][];
  n_rows: number;
  n_cols: number;
  cost = {
    left: 1,
    top: 1,
    right: 1,
    bottom: 1,
  };

  constructor({
    grid,
    startNode,
    endNode,
    cost,
  }: {
    grid: Cell[][];
    startNode: CellContent;
    endNode: CellContent;
    cost?: { left: number; top: number; right: number; bottom: number };
  }) {
    this.startPosition = [startNode.row, startNode.col];
    this.endPosition = [endNode.row, endNode.col];

    this.n_rows = grid.length;
    this.n_cols = grid[0].length;
    this.grid = grid;

    this.walls = [];
    for (let i = 0; i < this.n_rows; i++) {
      for (let j = 0; j < this.n_cols; j++) {
        if (grid[i][j].isChecked()) {
          const wall = grid[i][j];
          const wallPosition: [number, number] = [wall.row, wall.col];
          this.walls.push(wallPosition);
        }
      }
    }

    if (cost) this.cost = cost;
  }

  toJson() {
    return {
      startNode: this.startPosition,
      endNode: this.endPosition,
      grid: this.walls,
      n_rows: this.n_rows,
      n_cols: this.n_cols,
      cost: this.cost,
    };
  }
}

export class DistanceInfo {
  minDist: number;
  from?: [number, number];

  constructor({
    minDist,
    from,
  }: {
    minDist?: number;
    from?: [number, number];
  }) {
    this.minDist = minDist ?? Infinity;
    this.from = from;
  }
}

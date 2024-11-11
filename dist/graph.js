export class Graph {
    constructor({ grid, startNode, endNode, cost, }) {
        this.cost = {
            left: 1,
            top: 1,
            right: 1,
            bottom: 1,
        };
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
                    const wallPosition = [wall.row, wall.col];
                    this.walls.push(wallPosition);
                }
            }
        }
        if (cost)
            this.cost = cost;
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
    constructor({ minDist, from, }) {
        this.minDist = minDist !== null && minDist !== void 0 ? minDist : Infinity;
        this.from = from;
    }
}

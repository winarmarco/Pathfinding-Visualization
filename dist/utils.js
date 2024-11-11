export const getAdjacentCell = ({ graph, position, }) => {
    var _a;
    const grid = graph.grid;
    const DIR = {
        bottom: [1, 0],
        right: [0, 1],
        top: [-1, 0],
        left: [0, -1],
    };
    const [row, col] = position;
    const adjCells = [];
    for (const key of Object.keys(DIR)) {
        console.log(key);
        const [d_row, d_col] = DIR[key];
        const [adjRow, adjCol] = [row + d_row, col + d_col];
        const invalidAdjPosition = adjRow < 0 ||
            adjRow >= grid.length ||
            adjCol < 0 ||
            adjCol >= grid[0].length;
        if (invalidAdjPosition)
            continue;
        adjCells.push({
            cell: grid[adjRow][adjCol],
            cost: (_a = graph.cost[key]) !== null && _a !== void 0 ? _a : 1,
        });
    }
    return adjCells;
};
export const encodePosition = (position) => {
    return `(${position[0]},${position[1]})`;
};
export const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const constructPaths = ({ graph, minDistGrid, }) => {
    /*
      Run a DFS search from the minDistGrid info back to the startPosition
    */
    const [startRow, startCol] = graph.startPosition;
    const [endRow, endCol] = graph.endPosition;
    let currPosition = graph.endPosition;
    const paths = [];
    while (true) {
        const [currRow, currCol] = currPosition;
        paths.push(currPosition);
        if (startRow == currRow && startCol == currCol)
            break;
        if (!minDistGrid[currRow][currCol].from)
            return [];
        currPosition = minDistGrid[currRow][currCol].from;
    }
    return paths.reverse();
};

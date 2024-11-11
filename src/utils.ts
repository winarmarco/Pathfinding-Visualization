import { DistanceInfo, Graph } from "./graph";

export const getAdjacentCell = ({
  graph,
  position,
}: {
  graph: Graph;
  position: [number, number];
}) => {
  const grid = graph.grid;
  const DIR: {
    [key in "left" | "top" | "right" | "bottom"]: [number, number];
  } = {
    bottom: [1, 0],
    right: [0, 1],
    top: [-1, 0],
    left: [0, -1],
  };
  const [row, col] = position;
  const adjCells = [];

  for (const key of Object.keys(DIR) as Array<
    "left" | "top" | "right" | "bottom"
  >) {
    const [d_row, d_col] = DIR[key];
    const [adjRow, adjCol] = [row + d_row, col + d_col];

    const invalidAdjPosition =
      adjRow < 0 ||
      adjRow >= grid.length ||
      adjCol < 0 ||
      adjCol >= grid[0].length;
    if (invalidAdjPosition) continue;

    adjCells.push({
      cell: grid[adjRow][adjCol],
      cost: graph.cost[key] ?? 1,
    });
  }

  return adjCells;
};

export const encodePosition = (position: [number, number]) => {
  return `(${position[0]},${position[1]})`;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const constructPaths = ({
  graph,
  minDistGrid,
}: {
  graph: Graph;
  minDistGrid: DistanceInfo[][];
}): [number, number][] => {
  /*
    Run a DFS search from the minDistGrid info back to the startPosition
  */
  const [startRow, startCol] = graph.startPosition;
  const [endRow, endCol] = graph.endPosition;

  let currPosition: [number, number] = graph.endPosition;
  const paths: [number, number][] = [];

  while (true) {
    const [currRow, currCol] = currPosition;
    paths.push(currPosition);

    if (startRow == currRow && startCol == currCol) break;

    if (!minDistGrid[currRow][currCol].from) return [];

    currPosition = minDistGrid[currRow][currCol].from;
  }

  return paths.reverse();
};

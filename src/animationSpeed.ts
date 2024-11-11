import { Output } from "./algorithms/output.js";
import { PATH_COLOR } from "./config.js";
import { Graph } from "./graph.js";
import { delay } from "./utils.js";

const getAnimationSpeed = (): number => {
  // Define the mapping for speed values
  const speedValues: { [key: string]: number } = {
    slow: 40,
    med: 20,
    fast: 10,
  };

  // Get the selected speed radio input
  const selectedRadio = document.querySelector<HTMLInputElement>(
    'input[name="speed"]:checked'
  );

  // If a selection is found, return the corresponding speed value; otherwise, return a default
  return selectedRadio ? speedValues[selectedRadio.value] : speedValues["slow"];
};

export const runAnimation = async ({
  output,
  graph,
}: {
  output: Output;
  graph: Graph;
}) => {
  const speed = getAnimationSpeed();
  const grid = graph.grid;

  for (const cell_visited of output.visit_order) {
    const [row, col] = cell_visited;
    grid[row][col].setIsChecked(true);

    await delay(speed);
  }

  for (const path_cell of output.paths) {
    const [row, col] = path_cell;
    grid[row][col].updateCellColor(PATH_COLOR);
    await delay(speed);
  }
};

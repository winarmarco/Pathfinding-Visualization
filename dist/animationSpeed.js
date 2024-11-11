var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PATH_COLOR } from "./config.js";
import { delay } from "./utils.js";
const getAnimationSpeed = () => {
    // Define the mapping for speed values
    const speedValues = {
        slow: 40,
        med: 20,
        fast: 10,
    };
    // Get the selected speed radio input
    const selectedRadio = document.querySelector('input[name="speed"]:checked');
    // If a selection is found, return the corresponding speed value; otherwise, return a default
    return selectedRadio ? speedValues[selectedRadio.value] : speedValues["slow"];
};
export const runAnimation = (_a) => __awaiter(void 0, [_a], void 0, function* ({ output, graph, }) {
    const speed = getAnimationSpeed();
    const grid = graph.grid;
    for (const cell_visited of output.visit_order) {
        const [row, col] = cell_visited;
        grid[row][col].setIsChecked(true);
        yield delay(speed);
    }
    for (const path_cell of output.paths) {
        const [row, col] = path_cell;
        grid[row][col].updateCellColor(PATH_COLOR);
        yield delay(speed);
    }
});

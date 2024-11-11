var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AlgorithmBuilder } from "./algorithms/algorithm.js";
import { runAnimation } from "./animationSpeed.js";
import { Cell, CellContent } from "./cell.js";
import { GRID_ROW, GRID_COL, CELL_SIZE, VISITED_COLOR, } from "./config.js";
import { Graph } from "./graph.js";
import { AppState } from "./state.js";
/* INTTIALIZE THE BOARD

Fill in the board with grid of size GRID_ROW x GRID_COL with Cells
*/
const gridHTML = document.getElementById("grid");
let grid = [];
// Create cells
if (gridHTML) {
    // a. Initilaize the grid
    gridHTML.style.display = `grid`;
    gridHTML.style.gridTemplateColumns = `repeat(${GRID_COL}, ${CELL_SIZE}px)`;
    // b. Initialize the cells
    for (let i = 0; i < GRID_ROW; i++) {
        grid.push([]);
        for (let j = 0; j < GRID_COL; j++) {
            const cell = new Cell({ row: i, col: j });
            grid[i].push(cell);
            gridHTML.appendChild(cell.getHTMLElement());
        }
    }
}
/* INTTIALIZE THE START NODE AND END NODE

Initializing the start node and end node
*/
const startElement = document.createElement("div");
startElement.textContent = "Start";
const startContent = new CellContent({ row: 0, col: 0, element: startElement });
grid[0][0].setContent(startContent);
const endElement = document.createElement("div");
endElement.textContent = "End";
const endContent = new CellContent({
    row: GRID_ROW - 1,
    col: GRID_COL - 1,
    element: endElement,
});
grid[GRID_ROW - 1][GRID_COL - 1].setContent(endContent);
const selectField = document.getElementById("algorithm");
const resetButton = document.getElementById("reset-button");
const clearButton = document.getElementById("clear-button");
const startButton = document.getElementById("start-button");
const leftCost = document.getElementById("cost-left");
const rightCost = document.getElementById("cost-right");
const topCost = document.getElementById("cost-up");
const bottomCost = document.getElementById("cost-down");
if (startButton && resetButton && clearButton) {
    startButton.onclick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        AppState.getInstance().isStop = false;
        startButton.setAttribute("disabled", "true");
        clearButton.setAttribute("disabled", "true");
        // 1. Lock the grid
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].input.disabled = true;
                grid[i][j].label.style.cursor = "default";
                if (!grid[i][j].isChecked()) {
                    grid[i][j].updateCellColor(VISITED_COLOR);
                }
            }
        }
        // 2. Run the Algorithm
        const graph = new Graph({
            startNode: startContent,
            endNode: endContent,
            grid: grid,
            cost: {
                top: Number(topCost.value),
                left: Number(leftCost.value),
                right: Number(rightCost.value),
                bottom: Number(bottomCost.value),
            },
        });
        const selectedAlgorithm = selectField.value;
        const algorithm = AlgorithmBuilder.build(selectedAlgorithm);
        const output = algorithm.solve(graph);
        yield runAnimation({ output, graph });
        clearButton.removeAttribute("disabled");
        resetButton.removeAttribute("disabled");
    });
    resetButton.onclick = (e) => {
        // Reset the whole grid again, remove every path that
        // have been visited
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].label.style.cursor = "pointer";
                grid[i][j].input.disabled = false;
                // If curr splash color is null, meaning its a default one (its a wall)
                const currSplashColor = grid[i][j].span.style.getPropertyValue("--splash-color");
                if (currSplashColor == "null")
                    continue;
                grid[i][j].setIsChecked(false);
                grid[i][j].updateCellColor("null");
            }
        }
        AppState.getInstance().isStop = true;
        startButton.removeAttribute("disabled");
        resetButton.setAttribute("disabled", "true");
    };
    clearButton.onclick = (e) => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].label.style.cursor = "pointer";
                grid[i][j].input.disabled = false;
                grid[i][j].setIsChecked(false);
                grid[i][j].updateCellColor("null");
            }
        }
        AppState.getInstance().isStop = true;
        startButton.removeAttribute("disabled");
        resetButton.setAttribute("disabled", "true");
    };
}
/* INTERFACE SETUP
Setup the settingsButton such that it will open a model
*/
const settingsButton = document.getElementById("settings-button");
const okButton = document.getElementById("ok-button");
const settingsList = document.getElementsByClassName("settings-list")[0];
if (settingsButton && settingsList && okButton) {
    settingsButton.onclick = (e) => {
        e.stopPropagation();
        settingsList.classList.remove("hide");
    };
    // Click event on the document body to hide the settings modal if clicked outside
    document.body.onclick = (e) => {
        if (!settingsList.classList.contains("hide") && // Check if settingsList is open
            !settingsList.contains(e.target) && // Check if the click is outside settingsList
            e.target !== settingsButton // Check if the click is not on settingsButton
        ) {
            settingsList.classList.add("hide");
        }
    };
    // Prevent clicks inside the settings modal from propagating to the document body
    settingsList.onclick = (e) => {
        e.stopPropagation();
    };
    okButton.onclick = (e) => {
        if (!settingsList.classList.contains("hide") // Check if settingsList is open
        ) {
            settingsList.classList.add("hide");
        }
    };
}

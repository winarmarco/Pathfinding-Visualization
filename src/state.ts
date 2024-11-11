// state.js
import { Cell, CellContent } from "./cell.js";

export class MouseState {
  static instance: MouseState;
  isMouseDown = false;
  isHoldingItem = false;
  heldContent: CellContent | null = null;
  lastHoveredCell: Cell | null = null; // Track the last hovered cell

  static getInstance() {
    if (!MouseState.instance) {
      MouseState.instance = new MouseState();
    }
    return MouseState.instance;
  }
}

export class AppState {
  static instance: AppState;
  isStop: boolean = true;

  static getInstance() {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }
}

document.addEventListener("mouseup", () => {
  const mouseState = MouseState.getInstance();
  // // Check if we have an item being held and a valid last hovered cell
  if (
    mouseState.isHoldingItem &&
    mouseState.lastHoveredCell &&
    mouseState.heldContent
  ) {
    mouseState.lastHoveredCell.setContent(mouseState.heldContent); // Drop the held content in the last hovered cell
  }

  mouseState.isHoldingItem = false;
  mouseState.isMouseDown = false;
  mouseState.heldContent = null;
  mouseState.lastHoveredCell = null; // Clear last hovered cell
});

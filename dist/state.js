export class MouseState {
    constructor() {
        this.isMouseDown = false;
        this.isHoldingItem = false;
        this.heldContent = null;
        this.lastHoveredCell = null; // Track the last hovered cell
    }
    static getInstance() {
        if (!MouseState.instance) {
            MouseState.instance = new MouseState();
        }
        return MouseState.instance;
    }
}
export class AppState {
    constructor() {
        this.isStop = true;
    }
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
    if (mouseState.isHoldingItem &&
        mouseState.lastHoveredCell &&
        mouseState.heldContent) {
        mouseState.lastHoveredCell.setContent(mouseState.heldContent); // Drop the held content in the last hovered cell
    }
    mouseState.isHoldingItem = false;
    mouseState.isMouseDown = false;
    mouseState.heldContent = null;
    mouseState.lastHoveredCell = null; // Clear last hovered cell
});

import { AppState, MouseState } from "./state.js";
export class Cell {
    constructor({ row, col, content, color, }) {
        // 1. Create the label
        const label = document.createElement("label");
        label.className = "toggle-box";
        // 2. Create the input and the span
        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "toggle-input";
        const span = document.createElement("span");
        span.className = "animated-box";
        label.appendChild(input);
        label.appendChild(span);
        // 4. Setup Draw Wall Mechanic
        label.addEventListener("mousedown", (e) => {
            if (!AppState.getInstance().isStop)
                return;
            const mouseState = MouseState.getInstance();
            mouseState.isMouseDown = true;
            if (this.content) {
                mouseState.isHoldingItem = true;
                mouseState.heldContent = this.content;
            }
        });
        label.addEventListener("mousemove", () => {
            if (!AppState.getInstance().isStop)
                return;
            const mouseState = MouseState.getInstance();
            if (mouseState.isMouseDown) {
                mouseState.lastHoveredCell = this; // Update the last hovered cell
                if (mouseState.isHoldingItem) {
                    if (!this.content && !this.isChecked())
                        this.setContent(mouseState.heldContent); // Temporarily place content in this cell
                }
                else {
                    if (!this.content)
                        this.setIsChecked(true);
                }
            }
        });
        label.addEventListener("mouseleave", () => {
            if (!AppState.getInstance().isStop)
                return;
            const mouseState = MouseState.getInstance();
            if (mouseState.isMouseDown && mouseState.isHoldingItem) {
                this.removeContent();
            }
        });
        label.addEventListener("mouseup", () => {
            const mouseState = MouseState.getInstance();
            mouseState.isMouseDown = false;
            mouseState.isHoldingItem = false;
        });
        // 5. Initialize everything to the attribute
        this.label = label;
        this.input = input;
        this.span = span;
        this.row = row;
        this.col = col;
        if (content)
            this.setContent(content);
    }
    getHTMLElement() {
        return this.label;
    }
    isChecked() {
        return this.input.checked;
    }
    setIsChecked(checked) {
        this.input.checked = checked;
    }
    setContent(content) {
        if (content) {
            this.content = content;
            this.content.row = this.row;
            this.content.col = this.col;
            const element = this.content.element;
            element.className = "content";
            this.input.disabled = true;
            this.span.append(element);
        }
    }
    removeContent() {
        this.content = undefined;
    }
    updateCellColor(color) {
        this.span.style.setProperty("--splash-color", color);
        this.input.style.setProperty("--splash-color", color);
    }
}
export class CellContent {
    constructor({ row, col, element, }) {
        this.row = row;
        this.col = col;
        this.element = element;
    }
}

import {BoardItem} from "./BoardItem";
import "./BoardItemClickable.scss";
import {GameController} from "../../../lib";

export class BoardItemClickable extends BoardItem {
  constructor(x, y) {
    super(x, y);

    this.button = document.createElement("button");
    this.button.addEventListener("mousedown", () => this.onMouseDown());
    this.button.addEventListener("mouseup", () => this.onClick());
    this.button.addEventListener("mouseleave", () => this.onLeave());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "disabled":
        this.button.toggleAttribute("disabled", newValue);
        break;
    }
  }

  onClick() {
    // Prevent cases where user focused button 1, while holding the mouse button moved over another and released
    if (!this.clicked)
      return;

    const {x, y} = this;
    GameController.onBoxClick(x, y);

    this.button.blur();
  }

  onLeave() {
    this.clicked = false;

    if (document.activeElement === this.button)
      this.button.blur();
  }

  render() {
    return this.button;
  }

  onMouseDown() {
    this.clicked = true;
  }
}

BoardItemClickable.componentName = `${BoardItem.componentName}-clickable`;
customElements.define(BoardItemClickable.componentName, BoardItemClickable);

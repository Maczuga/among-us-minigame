import {BaseElement} from "../BaseElement";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardItem.scss";

export class BoardItem extends BaseElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    this.tabIndex = 0;

    this.addEventListener("mouseup", () => this.onClick());
    this.addEventListener("mouseleave", () => this.onLeave());
  }

  onClick() {
    const {x, y} = this;

    console.log("Clicked: ", x, y);
    this.blur();
  }

  onLeave() {
    if (document.activeElement === this)
      this.blur();
  }
}

BoardItem.componentName = `${GameBoardBaseName}-item`;
customElements.define(BoardItem.componentName, BoardItem);

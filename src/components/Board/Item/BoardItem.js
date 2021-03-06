import {BaseElement} from "../../BaseElement";
import {GameBoardBaseName} from "../BoardUtils";
import "./BoardItem.scss";

export class BoardItem extends BaseElement {
  constructor(x, y) {
    super();

    if (x < 0 || x === undefined)
      throw new Error("Invalid BoardItem x coordinate");
    if (y < 0 || y === undefined)
      throw new Error("Invalid BoardItem y coordinate");

    this.x = x;
    this.y = y;

    this.classList.add(BoardItem.componentName);
  }

  get x() {
    return Number(this.getAttribute("x"));
  }

  set x(val) {
    this.setAttribute("x", val);
  }

  get y() {
    return Number(this.getAttribute("y"));
  }

  set y(val) {
    this.setAttribute("y", val);
  }
}

BoardItem.componentName = `${GameBoardBaseName}-item`;
customElements.define(BoardItem.componentName, BoardItem);

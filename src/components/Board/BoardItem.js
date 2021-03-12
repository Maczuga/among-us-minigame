import {BaseElement} from "../BaseElement";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardItem.scss";

export class BoardItem extends BaseElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

BoardItem.componentName = `${GameBoardBaseName}-item`;
customElements.define(BoardItem.componentName, BoardItem);

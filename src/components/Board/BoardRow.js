import {BaseElement} from "../BaseElement";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardRow.scss";
import {settings} from "../../settings";
import {BoardItem} from "./BoardItem";

export class BoardRow extends BaseElement {
  static get observedAttributes() {
    return ["y"];
  }

  constructor(y) {
    super();
    this.y = y;
  }

  generateRow() {
    for (let x = 0; x < settings.GAME_BOARD_SIZE; x++)
      this.appendChild(new BoardItem(x, this.y));
  }

  update() {
    super.update();
    this.generateRow();
  }
}

BoardRow.componentName = `${GameBoardBaseName}-row`;
customElements.define(BoardRow.componentName, BoardRow);

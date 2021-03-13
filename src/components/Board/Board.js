import {BaseElement} from "../BaseElement";
import {settings} from "../../settings";
import {BoardRow} from "./BoardRow";
import {GameBoardBaseName} from "./BoardUtils";
import "./Board.scss";

export class Board extends BaseElement {
  constructor() {
    super();
    this.classList.add(GameBoardBaseName);
  }

  generateGrid() {
    const cellTag = this.tag;
    if (!cellTag)
      throw new Error("this.tag property is missing!");

    for (let y = 0; y < settings.GAME_BOARD_SIZE; y++) {
      this.appendChild(new BoardRow(y, cellTag));
    }
  }

  findBoardItem(x, y) {
    return this.querySelector(`${this.tag.componentName}[x="${x}"][y="${y}"]`);
  }

  update() {
    this.generateGrid();
  }
}

Board.componentName = GameBoardBaseName;
customElements.define(Board.componentName, Board);

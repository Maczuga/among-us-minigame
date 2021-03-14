import {BaseElement} from "../BaseElement";
import {ApplicationState} from "../../lib";
import {GameBoardBaseName} from "./BoardUtils";
import "./Board.scss";
import {BoardStageContainer} from "./BoardStageContainer";

export class Board extends BaseElement {
  constructor() {
    super();
    this.classList.add(GameBoardBaseName);
  }

  generateGrid() {
    const cellTag = this.tag;
    if (!cellTag)
      throw new Error("this.tag property is missing!");

    const size = ApplicationState.boardSize;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        this.appendChild(new cellTag(x, y));
      }
    }
  }

  findBoardItem(x, y) {
    return this.querySelector(`${this.tag.componentName}[x="${x}"][y="${y}"]`);
  }

  findDotContainer() {
    return this.parentElement.querySelector(`${BoardStageContainer.componentName}`);
  }

  update() {
    this.generateGrid();
  }
}

Board.componentName = GameBoardBaseName;
customElements.define(Board.componentName, Board);

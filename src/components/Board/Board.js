import {BaseElement} from "../BaseElement";
import {ApplicationState} from "../../lib";
import {GameBoardBaseName} from "./BoardUtils";
import "./Board.scss";
import {BoardStageContainer} from "./BoardStageContainer";
import {BoardRow} from "./BoardRow";

export class Board extends BaseElement {
  constructor() {
    super();
    this.classList.add(GameBoardBaseName);
  }

  generateGrid() {
    const cellTag = this.tag;
    if (!cellTag)
      throw new Error("this.tag property is missing!");

    for (let y = 0; y < ApplicationState.boardSize; y++) {
      this.appendChild(new BoardRow(y, cellTag));
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

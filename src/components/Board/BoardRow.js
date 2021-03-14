import {BaseElement} from "../BaseElement";
import {ApplicationState} from "../../lib";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardRow.scss";

export class BoardRow extends BaseElement {
  constructor(y, cellTag) {
    super();

    this.y = y;
    this.cellTag = cellTag;
  }

  generateRow() {
    for (let x = 0; x < ApplicationState.boardSize; x++) {
      this.appendChild(new this.cellTag(x, this.y));
    }
  }

  update() {
    super.update();
    this.generateRow();
  }
}

BoardRow.componentName = `${GameBoardBaseName}-row`;
customElements.define(BoardRow.componentName, BoardRow);

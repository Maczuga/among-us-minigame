import {BaseElement} from "../BaseElement";
import {ApplicationState} from "../../lib";
import {GameBoardBaseName} from "./BoardUtils";
import {BoardStageDot, BoardStageDotStatus} from "./BoardStageDot";

import "./BoardStageContainer.scss";

export class BoardStageContainer extends BaseElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.regenerateDots();
  }

  regenerateDots() {
    this.innerHTML = "";
    for (let i = 0; i < ApplicationState.rounds; i++) {
      this.appendChild(new BoardStageDot(i));
    }
  }

  highlight(index, success) {
    const dot = this.querySelector(`${BoardStageDot.componentName}[index="${index}"]`);
    if (!dot)
      return;

    switch (success) {
      case true:
        dot.status = BoardStageDotStatus.OK;
        break;
      case false:
        dot.status = BoardStageDotStatus.FAIL;
        break;
      default:
        dot.status = undefined;
        break;
    }
  }
}

BoardStageContainer.componentName = `${GameBoardBaseName}-stage-container`;
customElements.define(BoardStageContainer.componentName, BoardStageContainer);

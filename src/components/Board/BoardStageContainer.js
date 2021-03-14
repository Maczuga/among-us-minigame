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
    this.generateDots();
  }

  generateDots() {
    this.innerHTML = "";
    for (let i = 0; i < ApplicationState.rounds; i++) {
      this.appendChild(new BoardStageDot(i));
    }
  }

  highlight(index, success) {
    const dot = this.querySelector(`${BoardStageDot.componentName}[index="${index}"]`);
    if (!dot)
      return;

    dot.status = success ? BoardStageDotStatus.OK : BoardStageDotStatus.FAIL;
  }
}

BoardStageContainer.componentName = `${GameBoardBaseName}-stage-container`;
customElements.define(BoardStageContainer.componentName, BoardStageContainer);

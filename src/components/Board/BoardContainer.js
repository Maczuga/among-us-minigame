import {BaseElement} from "../BaseElement";
import {GameController} from "../../lib";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardContainer.scss";

export class BoardContainer extends BaseElement {
  set fail(value) {
    if (value) {
      this.classList.add("fail");
      setTimeout(() => {
        this.fail = false;
      }, 1000);
    } else {
      this.classList.remove("fail");
      setTimeout(() => {
        GameController.playPreview();
      }, 500);
    }
  }
}

BoardContainer.componentName = `${GameBoardBaseName}-container`;
customElements.define(BoardContainer.componentName, BoardContainer);

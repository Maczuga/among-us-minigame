import {GameController} from "../../../lib/GameLogic";
import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemClickable} from "../Item/BoardItemClickable";
import "./BoardPlayable.scss";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItemClickable;

    GameController.eventManager.subscribe("onGameBoxFail", (data) => this.onGameBoxFail(data));
  }

  onGameBoxFail() {
    this.classList.add("fail");
    setTimeout(() => {
      this.classList.remove("fail");
      setTimeout(() => {
        GameController.playPreview();
      }, 500);
    }, 1000);
  }
}

BoardPlayable.componentName = `${GameBoardBaseName}-playable`;
customElements.define(BoardPlayable.componentName, BoardPlayable);

import {EventManager, GameController} from "../../../lib";
import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemClickable} from "../Item/BoardItemClickable";
import "./BoardPlayable.scss";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItemClickable;

    EventManager.subscribe("onGameBoxFail", (data) => this.onGameBoxFail(data));

    EventManager.subscribe("onGameBoxFail", () => this.lockButtons(true));
    EventManager.subscribe("onGameFinish", () => this.lockButtons(true));
    EventManager.subscribe("onGamePreviewStart", () => this.lockButtons(true));
    EventManager.subscribe("onGamePreviewEnd", () => this.lockButtons(false));
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

  lockButtons(disabled) {
    const boardItems = this.querySelectorAll(this.tag.componentName);
    boardItems.forEach(item => {
      item.disabled = true;
      item.button.toggleAttribute("disabled", disabled);
    });
  }
}

BoardPlayable.componentName = `${GameBoardBaseName}-playable`;
customElements.define(BoardPlayable.componentName, BoardPlayable);

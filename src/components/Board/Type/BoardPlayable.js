import {EventManager, GAME_EVENT_BOX_FAIL, GAME_EVENT_END, GAME_EVENT_PREVIEW_END, GAME_EVENT_PREVIEW_START, GameController} from "../../../lib";
import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemClickable} from "../Item/BoardItemClickable";
import "./BoardPlayable.scss";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItemClickable;

    EventManager.subscribe(GAME_EVENT_BOX_FAIL, (data) => this.onGameBoxFail(data));

    EventManager.subscribe(GAME_EVENT_END, () => this.lockButtons(true));
    EventManager.subscribe(GAME_EVENT_PREVIEW_START, () => this.lockButtons(true));
    EventManager.subscribe(GAME_EVENT_PREVIEW_END, () => this.lockButtons(false));
  }

  connectedCallback() {
    super.connectedCallback();
    this.lockButtons(true);
  }

  onGameBoxFail() {
    this.lockButtons(true);

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

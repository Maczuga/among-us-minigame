import {EventManager, GAME_EVENT_BOX_FAIL, GAME_EVENT_BOX_VALIDATED, GAME_EVENT_END, GAME_EVENT_PREVIEW_END, GAME_EVENT_PREVIEW_START, GAME_EVENT_ROUND_START, GAME_EVENT_START, GameController} from "../../../lib";
import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemClickable} from "../Item/BoardItemClickable";
import "./BoardPlayable.scss";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItemClickable;

    EventManager.subscribe(GAME_EVENT_START, () => this.onGameStart());
    EventManager.subscribe(GAME_EVENT_END, () => this.onGameEnd());

    EventManager.subscribe(GAME_EVENT_ROUND_START, () => this.onRoundStart());
    EventManager.subscribe(GAME_EVENT_BOX_FAIL, (data) => this.onBoxFail(data));

    EventManager.subscribe(GAME_EVENT_PREVIEW_START, () => this.onPreviewStart());
    EventManager.subscribe(GAME_EVENT_PREVIEW_END, () => this.onPreviewEnd());

    EventManager.subscribe(GAME_EVENT_BOX_VALIDATED, (data) => this.onBoxValidated(data));
  }

  connectedCallback() {
    super.connectedCallback();
    this.lockButtons(true);
  }

  onGameStart() {
    this.lockButtons(true);
    this.regenerateDots();
  }

  onGameEnd() {
    this.lockButtons(true);
  }

  onRoundStart() {
    this.lockButtons(true);
  }

  onPreviewStart() {
    this.regenerateDots();
  }

  onPreviewEnd() {
    this.lockButtons(false);
  }

  onBoxFail() {
    this.lockButtons(true);

    this.classList.add("fail");
    setTimeout(() => {
      this.classList.remove("fail");
      setTimeout(() => {
        GameController.playPreview();
      }, 500);
    }, 1000);
  }

  onBoxValidated({clickCount, result}) {
    this.highlightDot(clickCount, result);
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

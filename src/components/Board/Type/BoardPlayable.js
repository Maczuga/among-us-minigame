import {ApplicationState, EventManager, GAME_EVENT_BOX_FAIL, GAME_EVENT_BOX_VALIDATED, GAME_EVENT_END, GAME_EVENT_PREVIEW_END, GAME_EVENT_PREVIEW_START, GAME_EVENT_START, GameController} from "../../../lib";
import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemClickable} from "../Item/BoardItemClickable";
import "./BoardPlayable.scss";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItemClickable;

    EventManager.subscribe(GAME_EVENT_BOX_FAIL, (data) => this.onGameBoxFail(data));

    EventManager.subscribe(GAME_EVENT_START, () => this.onGameStart());
    EventManager.subscribe(GAME_EVENT_END, () => this.lockButtons(true));
    EventManager.subscribe(GAME_EVENT_PREVIEW_START, () => this.lockButtons(true));
    EventManager.subscribe(GAME_EVENT_PREVIEW_END, () => this.lockButtons(false));

    EventManager.subscribe(GAME_EVENT_BOX_VALIDATED, (data) => this.onGameBoxValidated(data));

    this.updateCssVariables();
    window.addEventListener("resize", () => this.updateCssVariables());
  }

  updateCssVariables() {
    document.documentElement.style.setProperty("--boardWidth", `${this.clientWidth}px`);
    document.documentElement.style.setProperty("--boardColumns", String(ApplicationState.boardSize));
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

  onGameStart() {
    const dotContainer = this.findDotContainer();
    if (!dotContainer)
      return;

    dotContainer.generateDots();
  }

  onGameBoxValidated({result, clickCount}) {
    const dotContainer = this.findDotContainer();
    if (!dotContainer)
      return;

    dotContainer.highlight(clickCount, result);
  }
}

BoardPlayable.componentName = `${GameBoardBaseName}-playable`;
customElements.define(BoardPlayable.componentName, BoardPlayable);

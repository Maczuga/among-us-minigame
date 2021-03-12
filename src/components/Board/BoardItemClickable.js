import {BoardItem} from "./BoardItem";
import "./BoardItemClickable.scss";
import {GameController} from "../../lib/GameLogic";

export class BoardItemClickable extends BoardItem {
  constructor(x, y) {
    super(x, y);

    this.button = document.createElement("button");

    this.button.addEventListener("mouseup", () => this.onClick());
    this.button.addEventListener("mouseleave", () => this.onLeave());

    GameController.eventManager.subscribe("onGameBoxFail", () => this.setLock(true));
    GameController.eventManager.subscribe("onGamePreviewStart", () => this.setLock(true));
    GameController.eventManager.subscribe("onGamePreviewEnd", () => this.setLock(false));
  }

  onClick(e) {
    const {x, y} = this;

    console.log(e);

    GameController.onBoxClick(x, y);
    this.button.blur();
  }

  onLeave() {
    if (document.activeElement === this.button)
      this.button.blur();
  }

  render() {
    return this.button;
  }

  setLock(disabled) {
    this.button.toggleAttribute("disabled", disabled);
  }
}

BoardItemClickable.componentName = `${BoardItem.componentName}-clickable`;
customElements.define(BoardItemClickable.componentName, BoardItemClickable);

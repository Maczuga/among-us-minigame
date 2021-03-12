import {BoardItem} from "./BoardItem";
import "./BoardItemClickable.scss";
import {EventManager, GameController} from "../../../lib";

export class BoardItemClickable extends BoardItem {
  constructor(x, y) {
    super(x, y);

    this.button = document.createElement("button");

    this.button.addEventListener("mouseup", () => this.onClick());
    this.button.addEventListener("mouseleave", () => this.onLeave());

    EventManager.subscribe("onGameBoxFail", () => this.setLock(true));
    EventManager.subscribe("onGameFinish", () => this.setLock(true));
    EventManager.subscribe("onGamePreviewStart", () => this.setLock(true));
    EventManager.subscribe("onGamePreviewEnd", () => this.setLock(false));
  }

  onClick() {
    const {x, y} = this;

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

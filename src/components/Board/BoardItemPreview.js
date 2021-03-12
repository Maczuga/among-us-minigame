import {BoardItem} from "./BoardItem";
import "./BoardItemPreview.scss";
import {GameController} from "../../lib/GameLogic";

export class BoardItemPreview extends BoardItem {
  constructor(x, y) {
    super(x, y);

    GameController.eventManager.subscribe("onGameBoxHighlight", (data) => this.onBoxHighlight(data));
    console.log(GameController.eventManager);
  }

  onBoxHighlight({point}) {
    const [x, y] = point;

    if (this.x !== x || this.y !== y)
      return;

    this.classList.add("highlight");
    setTimeout(() => {
      this.classList.remove("highlight");
    }, 500);
  }
}

BoardItemPreview.componentName = `${BoardItem.componentName}-preview`;
customElements.define(BoardItemPreview.componentName, BoardItemPreview);

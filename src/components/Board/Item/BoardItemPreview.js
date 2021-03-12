import {BoardItem} from "./BoardItem";
import "./BoardItemPreview.scss";
import {GameController} from "../../../lib";
import {settings} from "../../../settings";

export class BoardItemPreview extends BoardItem {
  constructor(x, y) {
    super(x, y);

    GameController.eventManager.subscribe("onGameBoxHighlight", (data) => this.onBoxHighlight(data));
  }

  onBoxHighlight({point}) {
    const [x, y] = point;

    if (this.x !== x || this.y !== y)
      return;

    this.classList.add("highlight");
    setTimeout(() => {
      this.classList.remove("highlight");
    }, settings.HIGHLIGHT_DELAY_MS);
  }
}

BoardItemPreview.componentName = `${BoardItem.componentName}-preview`;
customElements.define(BoardItemPreview.componentName, BoardItemPreview);

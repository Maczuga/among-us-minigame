import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemPreview} from "../Item/BoardItemPreview";
import {EventManager} from "../../../lib";
import "./BoardPreview.scss";

export class BoardPreview extends Board {
  constructor() {
    super();
    this.tag = BoardItemPreview;

    EventManager.subscribe("onGameBoxHighlight", (data) => this.onGameBoxHighlight(data));
  }

  onGameBoxHighlight({point}) {
    const [x, y] = point;

    const boardItem = this.findBoardItem(x, y);
    if (!boardItem)
      return;

    boardItem.highlight = true;
  }
}

BoardPreview.componentName = `${GameBoardBaseName}-preview`;
customElements.define(BoardPreview.componentName, BoardPreview);

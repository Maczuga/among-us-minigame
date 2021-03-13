import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemPreview} from "../Item/BoardItemPreview";
import {EventManager, GAME_EVENT_PREVIEW_BOX_HIGHLIGHT} from "../../../lib";
import "./BoardPreview.scss";

export class BoardPreview extends Board {
  constructor() {
    super();
    this.tag = BoardItemPreview;

    EventManager.subscribe(GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, (data) => this.onGamePreviewBoxHighlight(data));
  }

  onGamePreviewBoxHighlight({point}) {
    const [x, y] = point;

    const boardItem = this.findBoardItem(x, y);
    if (!boardItem)
      return;

    boardItem.highlight = true;
  }
}

BoardPreview.componentName = `${GameBoardBaseName}-preview`;
customElements.define(BoardPreview.componentName, BoardPreview);

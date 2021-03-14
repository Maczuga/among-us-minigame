import {Board} from "../Board";
import {GameBoardBaseName} from "../BoardUtils";
import {BoardItemPreview} from "../Item/BoardItemPreview";
import {EventManager, GAME_EVENT_BOX_FAIL, GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, GAME_EVENT_PREVIEW_START, GAME_EVENT_ROUND_END, GAME_EVENT_START} from "../../../lib";
import "./BoardPreview.scss";

export class BoardPreview extends Board {
  constructor() {
    super();
    this.tag = BoardItemPreview;

    EventManager.subscribe(GAME_EVENT_START, () => this.onGameStart());
    EventManager.subscribe(GAME_EVENT_PREVIEW_START, (data) => this.onPreviewStart(data));
    EventManager.subscribe(GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, (data) => this.onPreviewBoxHighlight(data));
    EventManager.subscribe(GAME_EVENT_BOX_FAIL, (data) => this.onBoxFail(data));
    EventManager.subscribe(GAME_EVENT_ROUND_END, (data) => this.onRoundEnd(data));
  }

  onGameStart() {
    const container = this.findDotContainer();
    if (!container)
      return;

    container.regenerateDots();
  }

  onPreviewStart({round}) {
    this.highlightDot(round);
  }

  onPreviewBoxHighlight({point}) {
    const [x, y] = point;

    const boardItem = this.findBoardItem(x, y);
    if (!boardItem)
      return;

    boardItem.highlight = true;
  }

  onRoundEnd({round, result}) {
    this.highlightDot(round, result);
  }

  onBoxFail({round, result}) {
    this.highlightDot(round, result);
  }
}

BoardPreview.componentName = `${GameBoardBaseName}-preview`;
customElements.define(BoardPreview.componentName, BoardPreview);

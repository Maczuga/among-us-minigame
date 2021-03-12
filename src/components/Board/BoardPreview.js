import {Board} from "./Board";
import {BoardItem} from "./BoardItem";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardPreview.scss";

export class BoardPreview extends Board {
  constructor() {
    super();
    this.tag = BoardItem.componentName;
  }
}

BoardPreview.componentName = `${GameBoardBaseName}-preview`;
customElements.define(BoardPreview.componentName, BoardPreview);

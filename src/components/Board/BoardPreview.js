import {Board} from "./Board";
import {GameBoardBaseName} from "./BoardUtils";
import {BoardItemPreview} from "./BoardItemPreview";
import "./BoardPreview.scss";

export class BoardPreview extends Board {
  constructor() {
    super();
    this.tag = BoardItemPreview;
  }
}

BoardPreview.componentName = `${GameBoardBaseName}-preview`;
customElements.define(BoardPreview.componentName, BoardPreview);

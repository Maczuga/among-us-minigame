import {Board} from "./Board";
import {BoardItem} from "./BoardItem";
import {GameBoardBaseName} from "./BoardUtils";

export class BoardPlayable extends Board {
  constructor() {
    super();
    this.tag = BoardItem.componentName;
  }

}

BoardPlayable.componentName = `${GameBoardBaseName}-playable`;
customElements.define(BoardPlayable.componentName, BoardPlayable);

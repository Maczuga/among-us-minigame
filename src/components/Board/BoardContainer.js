import {BaseElement} from "../BaseElement";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardContainer.scss";

export class BoardContainer extends BaseElement {
}

BoardContainer.componentName = `${GameBoardBaseName}-container`;
customElements.define(BoardContainer.componentName, BoardContainer);

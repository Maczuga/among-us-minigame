import {BaseElement} from "../BaseElement";
import {GameBoardBaseName} from "./BoardUtils";
import "./BoardStageDot.scss";

export const BoardStageDotStatus = {
  OK: "OK",
  FAIL: "FAIL"
};

export class BoardStageDot extends BaseElement {
  constructor(i) {
    super();
    this.index = i;
  }

  get index() {
    return Number(this.getAttribute("index"));
  }

  set index(value) {
    this.setAttribute("index", value);
  }

  get status() {
    return this.getAttribute("status");
  }

  set status(value) {
    this.setAttribute("status", value);
  }

  static get observedAttributes() { return ["status"]; }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "status":
        this.classList.remove(oldValue);
        if (newValue)
          this.classList.add(newValue);
        break;
    }
  }
}

BoardStageDot.componentName = `${GameBoardBaseName}-stage-dot`;
customElements.define(BoardStageDot.componentName, BoardStageDot);

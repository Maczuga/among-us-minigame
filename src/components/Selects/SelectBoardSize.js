import {settings} from "../../settings";
import {ApplicationState} from "../../lib";

export class SelectBoardSize extends HTMLSelectElement {
  constructor() {
    super();

    this.innerHTML = "";
    for (let i = settings.MIN_BOARD_SIZE; i <= settings.MAX_BOARD_SIZE; i++) {
      const opt = document.createElement("option");
      opt.innerText = opt.value = String(i);
      if (i === ApplicationState.boardSize)
        opt.selected = true;
      this.append(opt);
    }

    this.addEventListener("change", this.onChange);
  }

  onChange(e) {
    ApplicationState.boardSize = e.target.value;
  }
}

SelectBoardSize.componentName = "select-board-size";
customElements.define(SelectBoardSize.componentName, SelectBoardSize, {extends: "select"});

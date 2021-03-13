import {settings} from "../../settings";

export class State {
  constructor() {
    this._boardSize = localStorage.getItem("boardSize");
    this._rounds = localStorage.getItem("rounds");

    // Session only, no extra get/set is needed
    this.page = settings.DEFAULT_PAGE;
  }

  // region Board size
  get boardSize() {
    return Number(this._boardSize || settings.DEFAULT_BOARD_SIZE);
  }
  set boardSize(value) {
    this._boardSize = value;
    localStorage.setItem("boardSize", String(value));
  }
  // endregion

  // region Round count
  get rounds() {
    return Number(this._rounds || settings.DEFAULT_STEP);
  }
  set rounds(value) {
    this._rounds = value;
    localStorage.setItem("rounds", String(value));
  }
  // endregion
}

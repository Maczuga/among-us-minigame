import {settings} from "../../settings";

export class State {
  constructor() {
    this._boardSize = localStorage.getItem("boardSize");
    this._rounds = localStorage.getItem("rounds");
    this._stage = 1;
  }

  // region Board size
  get boardSize() {
    return Number(this._boardSize || settings.GAME_BOARD_SIZE);
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
    localStorage.setItem("rounds", String(value));
  }
  // endregion

  // region Game stage
  get stage() {
    return Number(this._stage);
  }

  set stage(value) {
    this._stage = value;
  }
  // endregion
}

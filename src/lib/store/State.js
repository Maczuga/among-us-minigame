import {settings} from "../../settings";

export class State {
  // region Board size
  /**
   * @return {number} value
   */
  get boardSize() {
    return Number(localStorage.getItem("boardSize")) || settings.GAME_BOARD_SIZE;
  }

  /**
   * @param {number} value
   */
  set boardSize(value) {
    localStorage.setItem("boardSize", String(value));
  }
  // endregion

  // region Round count
  /**
   * @return {number} value
   */
  get rounds() {
    return Number(localStorage.getItem("rounds")) || settings.DEFAULT_STEP;
  }

  /**
   * @param {number} value
   */
  set rounds(value) {
    localStorage.setItem("rounds", String(value));
  }
  // endregion

  // region Game stage - Session, resets after refresh
  /**
   * @return {number} value
   */
  get stage() {
    return Number(sessionStorage.getItem("stage")) || settings.DEFAULT_STEP;
  }

  /**
   * @param {number} value
   */
  set stage(value) {
    sessionStorage.setItem("stage", String(value));
  }
  // endregion
}

import {settings} from "../settings";
import {random} from "./utils";
import {EventManager} from "./EventManager";
import {GAME_EVENT_BOX_CLICK, GAME_EVENT_BOX_FAIL, GAME_EVENT_BOX_VALIDATED, GAME_EVENT_END, GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, GAME_EVENT_PREVIEW_END, GAME_EVENT_PREVIEW_START, GAME_EVENT_ROUND_END, GAME_EVENT_ROUND_START, GAME_EVENT_START} from "./constants";
import {ApplicationState} from "./store/Store";

class GameLogic {
  constructor() {
    this.reset();
  }

  reset() {
    this.clickCount = 0;
    this.round = 0;
    this.spots = [];

    document.documentElement.style.setProperty("--boardColumns", String(ApplicationState.boardSize));
  }

  startGame() {
    this.reset();
    this.publish(GAME_EVENT_START);

    this.nextRound();
  }

  nextRound() {
    if (this.isMaxGenerated()) {
      this.publish(GAME_EVENT_END);
      return;
    }

    this.startRound();
  }

  startRound() {
    this.publish(GAME_EVENT_ROUND_START);

    setTimeout(() => {
      this.generatePoint();
      this.playPreview();
    }, settings.HIGHLIGHT_DELAY_MS);
  }

  playPreview() {
    this.clickCount = 0;
    this.publish(GAME_EVENT_PREVIEW_START);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= this.spots.length) {
        clearInterval(interval);
        this.publish(GAME_EVENT_PREVIEW_END);
        return;
      }

      const point = this.spots[i];
      this.publish(GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, {point});
      i++;
    }, settings.HIGHLIGHT_DELAY_MS + 50);
  }

  clickGameItem(x, y) {
    this.publish(GAME_EVENT_BOX_CLICK, {point: [x, y]});
    const result = this.validateClick(x, y);

    this.clickCount++;

    if (!result) {
      this.publish(GAME_EVENT_BOX_FAIL, {result, point: [x, y]});
      return;
    }

    if (this.clickCount >= this.spots.length)
      this.endRound();
  }

  validateClick(x, y) {
    if (this.spots.length <= 0)
      return false;

    const [lastX, lastY] = this.spots[this.clickCount];
    const result = lastX === x && lastY === y;

    this.publish(GAME_EVENT_BOX_VALIDATED, {result, point: [x, y]});
    return result;
  }

  endRound() {
    this.publish(GAME_EVENT_ROUND_END, {result: true});
    this.round++;

    if (this.round >= ApplicationState.rounds) {
      this.endGame();
      return;
    }

    this.nextRound();
  }

  endGame() {
    this.publish(GAME_EVENT_END);
  }

  generatePoint() {
    const next = this.randomSpot();
    this.spots.push(next);
  }

  // region Utils (could be made static as well)
  publish(event, args = {}) {
    const {round, clickCount} = this;
    const data = Object.assign({round, clickCount}, args);

    EventManager.publish(event, data);
  }

  isMaxGenerated() {
    const max = ApplicationState.rounds;
    return this.spots.length >= max;
  }

  randomNumberInBoardRange() {
    return random(0, ApplicationState.boardSize - 1);
  }

  randomSpot() {
    const x = this.randomNumberInBoardRange();
    const y = this.randomNumberInBoardRange();

    return [x, y];
  }
  // endregion
}

export const GameController = new GameLogic();

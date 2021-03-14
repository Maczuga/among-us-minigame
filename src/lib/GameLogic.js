import {settings} from "../settings";
import {random} from "./utils";
import {EventManager} from "./EventManager";
import {GAME_EVENT_BOX_CLICK, GAME_EVENT_BOX_FAIL, GAME_EVENT_BOX_VALIDATED, GAME_EVENT_END, GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, GAME_EVENT_PREVIEW_END, GAME_EVENT_PREVIEW_START, GAME_EVENT_START} from "./constants";
import {ApplicationState} from "./store/Store";

class GameLogic {
  constructor() {
    this.reset();
  }

  reset() {
    this.clickCount = 0;
    this.round = 0;
    this.spots = [];
  }

  start() {
    this.reset();
    EventManager.publish(GAME_EVENT_START);

    this.nextRound();
  }

  gameState() {
    const {round, clickCount} = this;
    return {
      round, clickCount
    };
  }

  nextRound() {
    if (this.isMaxGenerated()) {
      EventManager.publish(GAME_EVENT_END);
      return;
    }

    this.round++;

    this.generatePoint();
    this.playPreview();
  }

  playPreview() {
    this.clickCount = 0;
    EventManager.publish(GAME_EVENT_PREVIEW_START);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= this.spots.length) {
        clearInterval(interval);
        EventManager.publish(GAME_EVENT_PREVIEW_END);
        return;
      }

      const point = this.spots[i];

      EventManager.publish(GAME_EVENT_PREVIEW_BOX_HIGHLIGHT, {point});
      i++;
    }, settings.HIGHLIGHT_DELAY_MS + 50);
  }

  onBoxClick(x, y) {
    EventManager.publish(GAME_EVENT_BOX_CLICK, {point: [x, y]});
    const result = this.validateClick(x, y);
    EventManager.publish(GAME_EVENT_BOX_VALIDATED, {result, clickCount: this.clickCount, point: [x, y]});

    if (result)
      this.clickCount++;
    else {
      EventManager.publish(GAME_EVENT_BOX_FAIL, {result, point: [x, y]});
      return;
    }

    if (this.clickCount >= this.spots.length) {
      this.nextRound();
    }
  }

  generatePoint() {
    if (this.isMaxGenerated())
      return;

    const next = this.randomSpot();
    this.spots.push(next);
    return next;
  }

  validateClick(x, y) {
    if (this.spots.length <= 0)
      return false;

    const [lastX, lastY] = this.spots[this.clickCount];
    return lastX === x && lastY === y;
  }

  // region Utils
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

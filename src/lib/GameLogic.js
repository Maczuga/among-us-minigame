import {settings} from "../settings";
import {ApplicationStore} from "./store/Store";
import {random} from "./utils";
import {EventManager} from "./EventManager";

class GameLogic {
  constructor() {
    this.reset();
  }

  reset() {
    this.clickCount = 0;
    this.spots = [];
  }

  start() {
    this.reset();
    EventManager.publish("onGameStart");

    this.nextRound();
  }

  nextRound() {
    if (this.isMaxGenerated()) {
      EventManager.publish("onGameFinish");
      return;
    }

    this.generatePoint();
    this.playPreview();
  }

  playPreview() {
    this.clickCount = 0;

    EventManager.publish("onGamePreviewStart");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= this.spots.length) {
        clearInterval(interval);
        EventManager.publish("onGamePreviewEnd");
        return;
      }

      const point = this.spots[i];

      EventManager.publish("onGameBoxHighlight", {point});
      i++;
    }, settings.HIGHLIGHT_DELAY_MS + 50);
  }

  onBoxClick(x, y) {
    EventManager.publish("onGameBoxClick", {point: [x, y]});
    const result = this.validateClick(x, y);
    EventManager.publish("onGameBoxValidated", {result, point: [x, y]});

    if (result)
      this.clickCount++;
    else {
      EventManager.publish("onGameBoxFail", {result, point: [x, y]});
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

    EventManager.publish("onGamePointGenerated", {point: next});

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
    const max = ApplicationStore.state.rounds;
    return this.spots.length >= max;
  }

  randomNumberInBoardRange() {
    return random(0, ApplicationStore.state.boardSize - 1);
  }

  randomSpot() {
    const x = this.randomNumberInBoardRange();
    const y = this.randomNumberInBoardRange();

    return [x, y];
  }
  // endregion
}

export const GameController = new GameLogic();

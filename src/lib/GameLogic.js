import {settings} from "../settings";
import {ApplicationStore, EventManager} from "./store";

class GameLogic {
  constructor() {
    this.reset();

    // This one cannot be reset on start, because will unsubscribe from box events.
    this.eventManager = new EventManager();
  }

  reset() {
    this.clickCount = 0;
    this.spots = [];
  }

  start() {
    this.reset();
    this.eventManager.publish("onGameStart");

    this.nextRound();
  }

  nextRound() {
    if (this.isMaxGenerated()) {
      this.eventManager.publish("onGameFinish");
      return;
    }

    this.generatePoint();

    this.playPreview();
  }

  playPreview() {
    this.clickCount = 0;

    this.eventManager.publish("onGamePreviewStart");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= this.spots.length) {
        clearInterval(interval);
        this.eventManager.publish("onGamePreviewEnd");
        return;
      }

      const point = this.spots[i];

      console.log(point);

      this.eventManager.publish("onGameBoxHighlight", {point});
      i++;
    }, settings.HIGHLIGHT_DELAY_MS + 50);
  }

  onBoxClick(x, y) {
    this.eventManager.publish("onGameBoxClick", {point: [x, y]});
    const result = this.validateClick(x, y);
    this.eventManager.publish("onGameBoxValidated", {result, point: [x, y]});

    console.log("Clicked: ", x, y);
    console.log("Click was: ", result ? "OK" : "BAD");

    if (result)
      this.clickCount++;
    else {
      this.eventManager.publish("onGameBoxFail", {result, point: [x, y]});
      return;
    }

    if (this.clickCount >= this.spots.length) {
      this.nextRound();
      return;
    }
  }

  generatePoint() {
    if (this.isMaxGenerated())
      return;

    const next = this.randomSpot();
    this.spots.push(next);

    this.eventManager.publish("onGamePointGenerated", {point: next});

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
    const max = ApplicationStore.state.boardSize;
    // from 0
    return Math.floor(Math.random() * (max));
  }

  randomSpot() {
    const x = this.randomNumberInBoardRange();
    const y = this.randomNumberInBoardRange();

    return [x, y];
  }
  // endregion
}

export const GameController = new GameLogic();

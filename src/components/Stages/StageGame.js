import {BaseElement} from "../BaseElement";
import "./StageGame.scss";
import {GameController} from "../../lib/GameLogic";

export class StageGame extends BaseElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.classList.add("shown");
    }, 100);

    setTimeout(() => {
      GameController.start();
    }, 500);
  }

  render() {
    return `
<div class="row">
  <game-board-container>
    <game-board-preview></game-board-preview>
  </game-board-container>
  <game-board-container>
    <game-board-playable></game-board-playable>
  </game-board-container>
</div>
<button is="reset-button"></button>`;
  }
}

StageGame.componentName = "stage-game";
customElements.define(StageGame.componentName, StageGame);

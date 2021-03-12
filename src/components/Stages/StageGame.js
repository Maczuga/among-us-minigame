import {BaseElement} from "../BaseElement";
import "./StageGame.scss";

export class StageGame extends BaseElement {
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

import {BaseElement} from "../BaseElement";
import "./StageGame.scss";

export class StageGame extends BaseElement {
  render() {
    return `<div class="row">
    <div class="col preview">
        <game-board-preview></game-board-preview>
    </div>
    <div class="col game-area">
        <game-board-playable></game-board-playable>
    </div>
</div>
<button is="reset-button"></button>`;
  }
}

StageGame.componentName = "stage-game";
customElements.define(StageGame.componentName, StageGame);

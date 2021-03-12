import {BaseElement} from "../BaseElement";
import "./StageGame.scss";
import {EventManager, GameController} from "../../lib";
import {TaskCompleted} from "../TaskCompleted";

export class StageGame extends BaseElement {
  constructor() {
    super();

    EventManager.subscribe("onGameFinish", () => this.onGameFinish());
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

  onGameFinish() {
    const taskCompleted = new TaskCompleted();
    this.appendChild(taskCompleted);
  }

  render() {
    return `
<div class="row boards">
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

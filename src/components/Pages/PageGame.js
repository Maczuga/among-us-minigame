import {EventManager, GAME_EVENT_END, GameController} from "../../lib";
import {BasePage, TaskCompleted} from "../index";
import "./PageGame.scss";

export class PageGame extends BasePage {
  constructor() {
    super();

    EventManager.subscribe(GAME_EVENT_END, () => this.onGameEnd());
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      GameController.start();
    }, 500);
  }

  onGameEnd() {
    const taskCompleted = new TaskCompleted();
    this.appendChild(taskCompleted);
  }

  render() {
    return `
<div class="row boards">
  <game-board-container>
    <game-board-stage-container></game-board-stage-container>
    <game-board-preview></game-board-preview>
  </game-board-container>
  <game-board-container>
    <game-board-stage-container></game-board-stage-container>
    <game-board-playable></game-board-playable>
  </game-board-container>
</div>
<div class="button-row">
    <button is="back-button"></button>
    <button is="reset-button"></button>
</div>`;
  }
}

PageGame.componentName = "page-game";
customElements.define(PageGame.componentName, PageGame);

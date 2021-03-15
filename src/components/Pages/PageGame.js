import {EventManager, GAME_EVENT_END, GameController} from "../../lib";
import {BasePage, BoardContainer, TaskCompleted} from "../index";
import "./PageGame.scss";

export class PageGame extends BasePage {
  constructor() {
    super();

    EventManager.subscribe(GAME_EVENT_END, () => this.onGameEnd());
  }

  connectedCallback() {
    super.connectedCallback();
    GameController.startGame();
  }

  onGameEnd() {
    const taskCompleted = new TaskCompleted();
    this.appendChild(taskCompleted);
  }

  update() {
    super.update();

    this.makeBoardSquare();
    setTimeout(() => {
      this.makeBoardSquare();
    }, 500);
    window.addEventListener("resize", () => this.makeBoardSquare());
  }

  makeBoardSquare() {
    if (!document.body.contains(this))
      return;

    const {clientHeight, clientWidth} = this.querySelector(".boards");

    // Divide width by 2, because there are 2 elements horizontally placed
    const min = Math.min(clientWidth / 2, clientHeight);

    const containers = this.querySelectorAll(BoardContainer.componentName);
    containers.forEach(container => {
      delete container.style.width;
      delete container.style.height;

      container.style.width = container.style.height = `${min}px`;
    });
  }

  render() {
    return `
<div class="boards">
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

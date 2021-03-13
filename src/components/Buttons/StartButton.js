import {ApplicationState, PAGE_GAME} from "../../lib";
import {BaseButton} from "./BaseButton";

export class StartButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Start";
    this.addEventListener("click", () => this.startGame());
  }

  startGame() {
    ApplicationState.page = PAGE_GAME;
  }
}

StartButton.componentName = "start-button";
customElements.define(StartButton.componentName, StartButton, {extends: "button"});

import {GameController} from "../../lib/GameLogic";
import {BaseButton} from "./BaseButton";

export class ResetButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Reset";
    this.addEventListener("click", () => this.resetGame());
  }

  resetGame() {
    GameController.reset();
    GameController.start();
  }
}

ResetButton.componentName = "reset-button";
customElements.define(ResetButton.componentName, ResetButton, {extends: "button"});

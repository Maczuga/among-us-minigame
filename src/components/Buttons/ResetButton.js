import {GameController} from "../../lib";
import {BaseButton} from "./BaseButton";

export class ResetButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Reset";
    this.addEventListener("click", () => this.resetGame());
  }

  resetGame() {
    GameController.startGame();
  }
}

ResetButton.componentName = "reset-button";
customElements.define(ResetButton.componentName, ResetButton, {extends: "button"});

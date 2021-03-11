import {StageContainer} from "../Stages/StageContainer";
import {BaseButton} from "./BaseButton";

export class ResetButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Reset";
    this.addEventListener("click", () => this.resetGame());
  }

  resetGame() {
    const stageContainer = StageContainer.me;
    if (!stageContainer)
      return;

    stageContainer.stage = 1;
  }
}

ResetButton.componentName = "reset-button";
customElements.define(ResetButton.componentName, ResetButton, {extends: "button"});

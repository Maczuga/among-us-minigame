import {StageContainer} from "../Stages/StageContainer";
import {BaseButton} from "./BaseButton";

export class StartButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Start";
    this.addEventListener("click", () => this.startGame());
  }

  startGame() {
    const stageContainer = StageContainer.me;
    if (!stageContainer)
      return;

    stageContainer.nextStage();
  }
}

StartButton.componentName = "start-button";
customElements.define(StartButton.componentName, StartButton, {extends: "button"});

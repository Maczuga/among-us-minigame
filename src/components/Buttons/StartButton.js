import {ApplicationStore} from "../../lib/store";
import {BaseButton} from "./BaseButton";

export class StartButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Start";
    this.addEventListener("click", () => this.startGame());
  }

  startGame() {
    ApplicationStore.state.stage = 2;
  }
}

StartButton.componentName = "start-button";
customElements.define(StartButton.componentName, StartButton, {extends: "button"});

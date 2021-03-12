import {ApplicationStore} from "../../lib/store";
import {BaseButton} from "./BaseButton";

export class ResetButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Reset";
    this.addEventListener("click", () => this.resetGame());
  }

  resetGame() {
    ApplicationStore.state.stage = 1;
  }
}

ResetButton.componentName = "reset-button";
customElements.define(ResetButton.componentName, ResetButton, {extends: "button"});

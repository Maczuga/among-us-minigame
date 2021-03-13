import {ApplicationStore, PAGE_OPTIONS} from "../../lib";
import {BaseButton} from "./BaseButton";

export class OptionsButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "Options";
    this.addEventListener("click", () => this.onClick());
  }

  onClick() {
    ApplicationStore.state.page = PAGE_OPTIONS;
  }
}

OptionsButton.componentName = "options-button";
customElements.define(OptionsButton.componentName, OptionsButton, {extends: "button"});

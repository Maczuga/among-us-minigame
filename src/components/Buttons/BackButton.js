import {ApplicationStore, PAGE_HOME} from "../../lib";
import {BaseButton} from "./BaseButton";

export class BackButton extends BaseButton {
  constructor() {
    super();

    this.innerText = "‹ Back";
    this.addEventListener("click", () => this.onClick());
  }

  onClick() {
    ApplicationStore.state.page = PAGE_HOME;
  }
}

BackButton.componentName = "back-button";
customElements.define(BackButton.componentName, BackButton, {extends: "button"});

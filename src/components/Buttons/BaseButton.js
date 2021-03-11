import "./BaseButton.scss";

export class BaseButton extends HTMLButtonElement {
  constructor() {
    super();

    this.classList.add("btn");
  }
}

BaseButton.componentName = "base-button";
customElements.define(BaseButton.componentName, BaseButton, {extends: "button"});

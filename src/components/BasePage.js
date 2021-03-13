import {BaseElement} from "./BaseElement";
import "./BasePage.scss";

export class BasePage extends BaseElement {
  constructor() {
    super();
    this.classList.add("page");
    this.classList.add("hidden");
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.classList.remove("hidden");
    }, 100);
  }
}

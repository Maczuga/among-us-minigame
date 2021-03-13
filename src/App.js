import {StageContainer, BaseElement, Notifications} from "./components";

import "./App.scss";

export class App extends BaseElement {
  constructor() {
    super();

    window.addEventListener("error", (event) => this.onError(event));
  }

  connectedCallback() {
    super.connectedCallback();
    this.appendChild(new StageContainer());
  }

  onError(event) {
    Notifications.Add({
      title: "Error!",
      message: event.message,
      type: "error",
    });
  }
}

App.componentName = "app-root";
customElements.define(App.componentName, App);

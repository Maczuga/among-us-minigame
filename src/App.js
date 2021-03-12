import {StageContainer, BaseElement} from "./components";

import "./App.scss";

export class App extends BaseElement {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.appendChild(new StageContainer());
  }
}

App.componentName = "app-root";
customElements.define(App.componentName, App);

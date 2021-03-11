// import styles from "./App.styles.scss";
import {StageContainer,BaseElement} from "./components";

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

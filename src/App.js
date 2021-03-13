import {BaseElement, Notifications, PageHome, PageGame, PageOptions} from "./components";

import "./App.scss";
import {ApplicationStore, PAGE_GAME, PAGE_HOME, PAGE_OPTIONS} from "./lib";

export class App extends BaseElement {
  constructor() {
    super();

    this.listenedStates = ["page"];
    ApplicationStore.state.page = PAGE_HOME;

    window.addEventListener("error", (event) => this.onError(event));
  }

  render() {
    if (ApplicationStore.state.page === PAGE_HOME)
      return new PageHome();

    if (ApplicationStore.state.page === PAGE_GAME)
      return new PageGame();

    if (ApplicationStore.state.page === PAGE_OPTIONS)
      return new PageOptions();

    return "";
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

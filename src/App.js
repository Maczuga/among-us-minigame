import {BaseElement, Notifications, PageHome, PageGame, PageOptions} from "./components";
import {ApplicationState, PAGE_GAME, PAGE_HOME, PAGE_OPTIONS} from "./lib";
import "./App.scss";

export class App extends BaseElement {
  constructor() {
    super();

    this.listenedStates = ["page"];
    window.addEventListener("error", (event) => this.onError(event));
  }

  render() {
    if (ApplicationState.page === PAGE_HOME)
      return new PageHome();

    if (ApplicationState.page === PAGE_GAME)
      return new PageGame();

    if (ApplicationState.page === PAGE_OPTIONS)
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

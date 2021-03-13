import {BaseElement} from "../BaseElement";
import {ApplicationStore, PAGE_GAME, PAGE_HOME} from "../../lib";
import {PageHome} from "./PageHome";
import {PageGame} from "./PageGame";
import "./PageContainer.scss";

export class PageContainer extends BaseElement {
  constructor() {
    super();

    this.listenedStates = ["page"];
    ApplicationStore.state.page = PAGE_HOME;
  }

  render() {
    if (ApplicationStore.state.page === PAGE_HOME)
      return new PageHome();

    if (ApplicationStore.state.page === PAGE_GAME)
      return new PageGame();
  }
}

PageContainer.componentName = "page-container";
customElements.define(PageContainer.componentName, PageContainer);

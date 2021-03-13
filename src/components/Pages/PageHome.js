import {BaseElement} from "../BaseElement";
import "./PageHome.scss";

export class PageHome extends BaseElement {
  render() {
    return `<div class="main-menu">
  <label>Steps to win</label>
  <select is="select-steps"></select>
  <button is="start-button"></button is="start-button">
</div>`;
  }
}

PageHome.componentName = "page-home";
customElements.define(PageHome.componentName, PageHome);

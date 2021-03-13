import {BasePage} from "../BasePage";
import "./PageHome.scss";

export class PageHome extends BasePage {
  render() {
    return `<div class="main-menu">
  <div class="form-group">
    <label>Steps to win</label>
    <select is="select-steps"></select>
  </div>
  <button is="start-button"></button>
</div>
<div class="bottom-row button-row">
  <button is="options-button"></button>
</div>`;
  }
}

PageHome.componentName = "page-home";
customElements.define(PageHome.componentName, PageHome);

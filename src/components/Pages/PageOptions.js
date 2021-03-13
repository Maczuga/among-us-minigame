import {BasePage} from "../BasePage";
import "./PageHome.scss";

export class PageOptions extends BasePage {
  render() {
    return `
<div class="form-group">
  <label>Board size</label>
  <select is="select-board-size"></select>
</div>
<div class="button-row">
  <button is="back-button"></button>
</div>`;
  }
}

PageOptions.componentName = "page-options";
customElements.define(PageOptions.componentName, PageOptions);

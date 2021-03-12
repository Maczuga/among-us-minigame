import {BaseElement} from "../BaseElement";
import "./StageSelectSteps.scss";

export class StageSelectSteps extends BaseElement {
  render() {
    return `<label>Steps to win</label>
<select is="select-steps"></select>
<button is="start-button"></button is="start-button">`;
  }
}

StageSelectSteps.componentName = "stage-select-steps";
customElements.define(StageSelectSteps.componentName, StageSelectSteps);

import {BaseElement} from "../BaseElement";
import "./StageSelectSteps.scss";

export class StageSelectSteps extends BaseElement {
  constructor() {
    super();
  }

  getTemplate() {
    return `<label>Steps to win</label>
<select-steps></select-steps>
<button is="start-button"></button>`;
  }
}

StageSelectSteps.componentName = "stage-select-steps";
customElements.define(StageSelectSteps.componentName, StageSelectSteps);

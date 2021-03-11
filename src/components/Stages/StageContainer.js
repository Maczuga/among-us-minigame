import {BaseElement} from "../BaseElement";
import {StageSelectSteps} from "./StageSelectSteps";
import {StageGame} from "./StageGame";
import "./StageContainer.scss";

const MIN_STAGE = 1;
const MAX_STAGE = 2;

export class StageContainer extends BaseElement {
  constructor() {
    super();
    this.stage = 1;
  }

  static get observedAttributes() {
    return ["stage"];
  }

  get stage() {
    return Number(this.getAttribute("stage"));
  }

  set stage(value) {
    this.setAttribute("stage", value);
    this.update();
  }

  prevStage() {
    this.stage = Math.max(MIN_STAGE, this.stage - 1);
  }

  nextStage() {
    this.stage = Math.min(MAX_STAGE, this.stage + 1);
  }

  update() {
    this.innerHTML = "";
    if (this.stage === 1) {
      this.appendChild(new StageSelectSteps());
      return;
    }

    if (this.stage === 2) {
      this.appendChild(new StageGame());
      return;
    }
  }
}

StageContainer.componentName = "stage-container";
customElements.define(StageContainer.componentName, StageContainer);

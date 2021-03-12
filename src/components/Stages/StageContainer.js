import {BaseElement} from "../BaseElement";
import {StageSelectSteps} from "./StageSelectSteps";
import {StageGame} from "./StageGame";
import "./StageContainer.scss";
import {ApplicationStore} from "../../lib";

export class StageContainer extends BaseElement {
  constructor() {
    super();

    this.listenedStates = ["stage"];
    ApplicationStore.state.stage = 1;
  }

  render() {
    if (ApplicationStore.state.stage === 1)
      return new StageSelectSteps();

    if (ApplicationStore.state.stage === 2)
      return new StageGame();
  }
}

StageContainer.componentName = "stage-container";
customElements.define(StageContainer.componentName, StageContainer);

import {BaseElement} from "../BaseElement";
import "./StageGame.scss";

export class StageGame extends BaseElement {
  constructor() {
    super(name);
  }

  getTemplate() {
    return `<div>
    TODO Stage Game
</div>`;
  }
}

StageGame.componentName = "stage-game";
customElements.define(StageGame.componentName, StageGame);

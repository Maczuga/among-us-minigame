import {settings} from "../../settings";
import {ApplicationState} from "../../lib";

export class SelectSteps extends HTMLSelectElement {
  constructor() {
    super();

    this.innerHTML = "";
    for (let i = 1; i <= settings.MAX_STEPS; i++) {
      const opt = document.createElement("option");
      opt.innerText = opt.value = String(i);
      if (i === ApplicationState.rounds)
        opt.selected = true;
      this.append(opt);
    }

    this.addEventListener("change", this.onChange);
  }

  onChange(e) {
    ApplicationState.rounds = e.target.value;
  }
}

SelectSteps.componentName = "select-steps";
customElements.define(SelectSteps.componentName, SelectSteps, {extends: "select"});

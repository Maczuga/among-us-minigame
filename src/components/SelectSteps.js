import {settings} from "../settings";
import {ApplicationStore} from "../lib/store";

export class SelectSteps extends HTMLSelectElement {
  constructor() {
    super();

    this.innerHTML = "";
    for (let i = 1; i <= settings.MAX_STEPS; i++) {
      const opt = document.createElement("option");
      opt.innerText = opt.value = String(i);
      if (i === ApplicationStore.state.rounds)
        opt.selected = true;
      this.appendChild(opt);
    }

    console.log(this);
    this.addEventListener("change", this.onChange);
  }

  onChange(e) {
    ApplicationStore.state.rounds = Number(e.target.value || settings.DEFAULT_STEP);
  }
}

SelectSteps.componentName = "select-steps";
customElements.define(SelectSteps.componentName, SelectSteps, {extends: "select"});

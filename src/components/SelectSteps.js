import {BaseElement} from "./BaseElement";

const DEFAULT_VALUE = 5;
const MAX_STEPS = 10;

export class SelectSteps extends BaseElement {
  constructor(steps = MAX_STEPS) {
    super();

    this.steps = steps;
  }

  getTemplate() {
    return `<select class="steps">
    <slot/>
</select>`;
  }

  update() {
    const select = this.querySelector("select");
    if (!select)
      return;

    if (select.children.length === this.steps)
      return;

    select.innerHTML = "";

    for (let i = 1; i <= this.steps; i++)
    {
      const opt = document.createElement("option");
      opt.innerText = opt.value = String(i);
      if (opt.value === String(DEFAULT_VALUE))
        opt.selected = true;

      select.appendChild(opt);
    }
  }
}

SelectSteps.componentName = "select-steps";
customElements.define(SelectSteps.componentName, SelectSteps);

import {ApplicationStore} from "../lib";

export class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.render = this.render || function () { };

    this.listenedStates = [];
    ApplicationStore.eventManager.subscribe("stateChange", (data) => this.onStateChange(data));
  }

  onStateChange(data) {
    const {property} = data;

    if (!this.listenedStates.includes(property))
      return;

    this.update();
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const renderHTML = this.render();

    if (renderHTML instanceof HTMLElement) {
      this.innerHTML = "";
      this.appendChild(renderHTML);
    } else if (renderHTML) {
      const template = document.createElement("template");
      template.innerHTML = renderHTML;
      this.appendChild(template.content.cloneNode(true));
    }
  }

  /**
   * @return {HTMLElement|string|null}
   */
  render() {
    return null;
  }
}

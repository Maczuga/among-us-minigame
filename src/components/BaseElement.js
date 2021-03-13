import {EventManager} from "../lib";

export class BaseElement extends HTMLElement {
  constructor() {
    super();

    this.render = this.render || function () {};

    this.listenedStates = [];
    EventManager.subscribe("stateChange", (data) => this.onStateChange(data));
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

  /**
   * Renders all HTML content. Place here all event handlers for rendered components.
   */
  update() {
    const renderHTML = this.render();

    if (renderHTML)
      this.innerHTML = "";

    if (renderHTML instanceof HTMLElement) {
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

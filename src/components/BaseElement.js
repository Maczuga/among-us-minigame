export class BaseElement extends HTMLElement {
  constructor() {
    super();
  }

  static get me() {
    const items = document.getElementsByTagName(this.componentName);
    if (!items || !items.length)
      throw new Error("Static property 'componentName' is not set!");

    return items[0];
  }

  connectedCallback() {
    if (this.getTemplate()) {
      const template = document.createElement("template");
      template.innerHTML = this.getTemplate();
      this.appendChild(template.content.cloneNode(true));
    }

    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  attachStyle(styles) {
    if (!styles)
      return;

    const style = document.createElement("style");
    style.textContent = styles;
    this.shadowRoot.appendChild(style);
  }

  // Placeholder, helps IDE (and me)
  getTemplate() {
    return null;
  }

  // Placeholder, helps IDE (and me)
  update() {
  }
}

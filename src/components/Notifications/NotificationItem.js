import {BaseElement} from "../BaseElement";
import "./NotificationItem.scss";

export class NotificationItem extends BaseElement {
  constructor({title, message, type, waitSecs}) {
    super();

    this.title = title;
    this.message = message;

    this.classList.add(type);

    if (waitSecs) {
      setTimeout(() => {
        this.close();
      }, waitSecs * 1000);
    }
  }

  close() {
    this.remove();

    // Animation, disabled
    // this.classList.add("hide");
    // setTimeout(() => {
    //   this.remove();
    // }, 500);
  }

  update() {
    super.update();
    const close = this.querySelector(".close");
    close.addEventListener("click", () => this.close());
  }

  render() {
    return `
<div class="top">
  <span class="title">${this.title}</span>
  <button class="close">×</button>
</div>
${this.message ? `<span class="message">${this.message}</span>` : ""}`;
  }
}

NotificationItem.componentName = "notification-item";
customElements.define(NotificationItem.componentName, NotificationItem);

import {BaseElement} from "../BaseElement";
import "./Notifications.scss";
import {EventManager} from "../../lib";
import {NotificationItem} from "./NotificationItem";

export class Notifications extends BaseElement {
  constructor() {
    super();

    EventManager.subscribe("notify", (e) => this.onNewNotification(e));
  }

  onNewNotification({title, message, type, waitSecs}) {
    const item = new NotificationItem({title, message, type, waitSecs});
    this.appendChild(item);
  }

  static Add({title, message, type = "info", waitSecs = 10}) {
    EventManager.publish("notify", {title, message, type, waitSecs});
  }
}

Notifications.componentName = "notification-container";
customElements.define(Notifications.componentName, Notifications);

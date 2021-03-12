import {BaseElement} from "./BaseElement";
import "./TaskCompleted.scss";

export class TaskCompleted extends BaseElement {
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.classList.add("shown"), 50);
    setTimeout(() => this.classList.remove("shown"), 3000);
    setTimeout(() => this.remove(), 4000);
  }

  render() {
    return "<h1>Task completed</h1>";
  }
}

TaskCompleted.componentName = "task-completed";
customElements.define(TaskCompleted.componentName, TaskCompleted);

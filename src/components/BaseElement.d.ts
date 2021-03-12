import {State} from "src/lib/store/State";

declare class BaseElement extends HTMLElement {
  constructor();
  onStateChange({property, oldValue, value}: {property: string, oldValue: unknown, value: unknown});
  connectedCallback();
  update();
  render(): HTMLElement | string | null;

  listenedStates: Array<keyof State>;
}

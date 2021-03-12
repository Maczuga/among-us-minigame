import {EventManager} from "../EventManager";
import {State} from "./State";

class Store {
  constructor() {
    this.state = new Proxy(new State(), {
      set(state, property, value) {
        const oldValue = state[property];

        // Nothing changes, don't trigger events
        if (oldValue === value)
          return true;

        state[property] = value;
        EventManager.publish("stateChange", {
          property,
          oldValue,
          value
        });

        return true;
      }
    });
  }
}

export const ApplicationStore = new Store();

import {EventManager} from "./EventManager";
import {State} from "./State";

class Store {
  constructor() {
    this.eventManager = new EventManager();

    const self = this;

    this.state = new Proxy(new State(), {
      set(state, property, value) {
        const oldValue = state[property];

        // Nothing changes, don't trigger events
        if (oldValue === value)
          return true;

        state[property] = value;
        self.eventManager.publish("stateChange", {
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

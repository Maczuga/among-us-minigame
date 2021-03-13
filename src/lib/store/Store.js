import {EventManager} from "../EventManager";
import {APP_EVENT_STATE_UPDATE} from "../constants";
import {State} from "./State";

export const ApplicationState = new Proxy(new State(), {
  set(state, property, value) {
    const oldValue = state[property];

    // Nothing changes, don't trigger events
    if (oldValue === value)
      return true;

    state[property] = value;
    EventManager.publish(APP_EVENT_STATE_UPDATE, {
      property,
      oldValue,
      value
    });

    return true;
  }
});

import {Store} from "./Store";
import {State} from "./State";

export * from "./EventManager";
export const ApplicationStore = new Store({
  state: State,
});

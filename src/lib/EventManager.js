class EventHandler {
  constructor() {
    this.events = {};
  }

  eventExists(event) {
    return Object.prototype.hasOwnProperty.call(this.events, event);
  }

  publish(event, data = {}) {
    if (!this.eventExists(event))
      return [];

    this.events[event].forEach(callback => callback(data));
  }

  subscribe(event, callback) {
    if (!this.eventExists(event))
      this.events[event] = [];

    this.events[event].push(callback);
  }
}

export const EventManager = new EventHandler();

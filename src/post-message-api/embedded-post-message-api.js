class EmbeddedPostMessageAPI {
  eventsMap = new Map();

  static emit(event, data) {
    const dataToSend = JSON.stringify({ event, data });

    window.top.postMessage(dataToSend, '*');
  }

  constructor() {
    window.addEventListener('message', this.handleMessageFromClient);

    return {
      on: this.on,
      emit: EmbeddedPostMessageAPI.emit,
      destroy: this.destroy,
    };
  }

  destroy = () => {
    window.removeEventListener('message', this.handleMessageFromClient);
  }

  handleMessageFromClient = async ({ data }) => {
    try {
      const { event, params } = JSON.parse(data);

      if (this.eventsMap.has(event)) {
        const answer = await this.trigger(event, params);

        EmbeddedPostMessageAPI.emit(event, answer);
      } else {
        console.error(`no callbacks registered for triggered event: ${event}`);
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  on = (event, callback) => {
    this.eventsMap.set(event, callback);
  }

  trigger = (event, data) => {
    const callback = this.eventsMap.get(event);

    return callback(data);
  }
}

export default EmbeddedPostMessageAPI;

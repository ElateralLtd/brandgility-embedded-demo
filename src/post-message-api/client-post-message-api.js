class ClientPostMessageAPI {
  eventCallbacks = new Map();

  iframeSelector = null;

  constructor(selector) {
    this.iframeSelector = selector;
    window.addEventListener('message', this.handleMessageFromFrame);

    return {
      on: this.on,
      save: this.emit('save'),
      destroy: this.destroy,
    };
  }

  getIframeWindow() {
    return document.querySelector(this.iframeSelector).contentWindow;
  }

  destroy() {
    window.removeEventListener('message', this.handleMessageFromFrame);
  }

  on = (event, callback) => {
    if (typeof callback === 'function') {
      const eventCallbacks = this.eventCallbacks.get(event) || [];

      this.eventCallbacks.set(event, [...eventCallbacks, callback]);
    }

    return this;
  };

  emit = (event) => (params) => {
    const data = JSON.stringify({ event, params });

    this.getIframeWindow().postMessage(data, '*');
  };

  handleMessageFromFrame = ({ data }) => {
    try {
      const { event, data: answer } = JSON.parse(data);

      if (this.eventCallbacks.has(event)) {
        this.eventCallbacks.get(event).forEach((callback) => callback(answer));
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}
  }
}

export default ClientPostMessageAPI;

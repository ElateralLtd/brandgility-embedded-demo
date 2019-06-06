import React, { PureComponent } from 'react';

import env from 'core/env';
import { ClientPostMessageAPI } from 'post-message-api';

import './component.css';

class App extends PureComponent {
  clientPostMessageAPI = new ClientPostMessageAPI('.brandgility-iframe');

  componentDidMount() {
    this.clientPostMessageAPI
      .on('load', (entity) => { this.setState(() => ({ loadedTemplateId: entity.id, entityType: entity.type })); })
      .on('save', (id) => console.info('saved item id', id));
  }

  componentWillUnmount() {
    this.clientPostMessageAPI.destroy();
  }

  state = {
    loadedTemplateId: '',
    entityType: '',
    templateId: '',
    savedItemId: '',
    iframeUrl: '',
  };

  handleSave = () => {
    this.clientPostMessageAPI.save();
  };

  handleChangeTemplateId = (event) => {
    const { value: templateId } = event.target;

    this.setState(() => ({ templateId }));
  };

  handleChangeSavedItemId = (event) => {
    const { value: savedItemId } = event.target;

    this.setState(() => ({ savedItemId }));
  };

  handleOpenTemplate = () => {
    const url = `${env.brandgilityUrl}/embedded-template-configure/new/${this.state.templateId}`;

    if (this.state.iframeUrl !== url) {
      this.setIframeUrl(url);
    }
  };

  handleOpenSavedItem = () => {
    const url = `${env.brandgilityUrl}/embedded-template-configure/edit/${this.state.savedItemId}`;

    if (this.state.iframeUrl !== url) {
      this.setIframeUrl(url);
    }
  };

  setIframeUrl(iframeUrl) {
    this.setState(() => ({
      loadedTemplateId: '',
      entityType: '',
      templateId: '',
      savedItemId: '',
      iframeUrl,
    }));
  }

  render() {
    return (
      <div className="root">
        <div className="controls">
          <input
            type="text"
            className="control"
            value={this.state.templateId}
            placeholder="template id"
            onChange={this.handleChangeTemplateId} />
          <button
            type="button"
            disabled={!this.state.templateId}
            className="control"
            onClick={this.handleOpenTemplate}>
            Open Template
          </button>
          <input
            type="text"
            className="control"
            value={this.state.savedItemId}
            placeholder="saved item id"
            onChange={this.handleChangeSavedItemId} />
          <button
            type="button"
            disabled={!this.state.savedItemId}
            className="control"
            onClick={this.handleOpenSavedItem}>
            Open Saved Item
          </button>
          <button
            type="button"
            className="control"
            disabled={!this.state.loadedTemplateId}
            onClick={this.handleSave}>
            Save
          </button>
          <div>
            <div>Current configuration id: <strong>{this.state.loadedTemplateId}</strong></div>
            <div>Entity Type: <strong>{this.state.entityType}</strong></div>
          </div>
        </div>
        {
          this.state.iframeUrl && (
            <iframe
              className="brandgility-iframe"
              src={this.state.iframeUrl}
              title="elateral-embedded-configure" />
          )
        }
      </div>
    );
  }
}

export default App;

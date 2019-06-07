import 'core/polyfill';
import env from 'core/env';

import ClientPostMessageAPI from './client-post-message-api';

const app = {
  init() {
    this.clientPostMessageAPI = new ClientPostMessageAPI('.brandgility-iframe');

    this.clientPostMessageAPI
      .on('load', this.handleLoad)
      .on('save', (id) => console.info('saved item id', id));

    this.attachListeners();
  },

  attachListeners() {
    document.querySelector('.controls__open-saved-item-button').addEventListener('click', this.handleOpenSavedItem.bind(this));
    document.querySelector('.controls__open-entity-button').addEventListener('click', this.handleOpenTemplate.bind(this));
    document.querySelector('.controls__save-button').addEventListener('click', this.handleSave.bind(this));
  },

  handleLoad({ id, type }) {
    document.querySelector('.entity-info__loaded-entity-id').textContent = id;
    document.querySelector('.entity-info__loaded-entity-type').textContent = type;

    document.querySelectorAll(`
      .controls__entity-id-input,
      .controls__open-entity-button,
      .controls__saved-item-id-input,
      .controls__open-saved-item-button,
      .controls__save-button
    `).forEach((control) => control.removeAttribute('disabled'));
  },

  handleSave() {
    this.clientPostMessageAPI.save();
  },

  handleOpenTemplate() {
    const templateId = document.querySelector('.controls__entity-id-input').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/new/${templateId}`;

    this.openIframe(url);
  },

  handleOpenSavedItem() {
    const savedItemId = document.querySelector('.controls__saved-item-id-input').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/edit/${savedItemId}`;

    this.openIframe(url);
  },

  openIframe(iframeUrl) {
    this.clearInfo();

    document.querySelector('.brandgility-iframe-wrapper').innerHTML=(`
      <iframe class="brandgility-iframe" title="elateral-embedded-configure" src="${iframeUrl}"></iframe>
    `);
  },

  clearInfo() {
    document.querySelector('.entity-info__loaded-entity-id').textContent = '';
    document.querySelector('.entity-info__loaded-entity-type').textContent = '';
    document.querySelector('.controls__saved-item-id-input').value = '';
    document.querySelector('.controls__entity-id-input').value = '';

    document.querySelectorAll(`
      .controls__entity-id-input,
      .controls__open-entity-button,
      .controls__saved-item-id-input,
      .controls__open-saved-item-button,
      .controls__save-button
    `).forEach((control) => control.setAttribute('disabled', 'disabled'));
  }
};

app.init();

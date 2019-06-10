import 'core/polyfill';
import env from 'core/env';

import BrandgilityEmbeddedApi from './brandgility-embedded-api';

const app = {
  init() {
    const targetWindow = document.querySelector('.brandgility-iframe').contentWindow;

    this.brandgilityEmbeddedApi = new BrandgilityEmbeddedApi(targetWindow);
    this.brandgilityEmbeddedApi.on('load', this.handleLoad);
    this.brandgilityEmbeddedApi.on('save', (entity) => console.info('saved item', entity));

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
    this.brandgilityEmbeddedApi.emit('save');
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
    const iframe = document.querySelector('.brandgility-iframe');

    this.clearInfo();

    iframe.src = iframeUrl;
    iframe.hidden = false;
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

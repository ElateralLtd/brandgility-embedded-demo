import BrandgilityEmbeddedApi from '@elateral/brandgility-embedded-api';

import 'core/polyfill';
import env from 'core/env';

const app = {
  init() {
    const targetWindow = document.querySelector('.brandgility-iframe').contentWindow;

    this.brandgilityEmbeddedApi = new BrandgilityEmbeddedApi(targetWindow);
    this.brandgilityEmbeddedApi.on('load', this.handleLoad);
    this.brandgilityEmbeddedApi.on('save', (entity) => console.info('saved item', entity));
    this.brandgilityEmbeddedApi.on('error', this.handleErrors);

    this.attachListeners();
  },

  handleErrors({ message }) {
    document.querySelector('.error').textContent = message;

    document.querySelector('.entity-info__loaded-entity-id').textContent = '';
    document.querySelector('.entity-info__loaded-entity-type').textContent = '';
    document.querySelector('.controls__entity-id-input').value = '';
    document.querySelector('.controls__saved-item-id-input').value = '';

    document.querySelectorAll('.controls__input, .controls__button').forEach((control) => control.removeAttribute('disabled'));
  },

  attachListeners() {
    document.querySelector('.controls__form__entity-id').addEventListener('submit', this.handleOpenTemplate.bind(this));
    document.querySelector('.controls__form__saved-item-id').addEventListener('submit', this.handleOpenSavedItem.bind(this));
    document.querySelector('.controls__save-button').addEventListener('click', this.handleSave.bind(this));
    document.querySelector('.controls__save-as-button').addEventListener('click', this.handleSaveAs.bind(this));
  },

  handleLoad({ id, type }) {
    document.querySelector('.controls__entity-id-input').value = '';
    document.querySelector('.controls__saved-item-id-input').value = '';
    document.querySelector('.entity-info__loaded-entity-id').textContent = id;
    document.querySelector('.entity-info__loaded-entity-type').textContent = type;

    document.querySelectorAll('.controls__input, .controls__button').forEach((control) => control.removeAttribute('disabled'));
  },

  handleSave() {
    this.brandgilityEmbeddedApi.emit('save');
  },

  handleSaveAs() {
    this.brandgilityEmbeddedApi.emit('saveAs', {
      name: 'new item',
      comments: 'comments here',
    });
  },

  handleOpenTemplate(event) {
    const templateId = document.querySelector('.controls__entity-id-input').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/new/${templateId}?action=DRAFT_TEMPLATE_CONFIGURATION_START&eid=${templateId}&embedded=true`;

    event.preventDefault();
    this.openIframe(url);
  },

  handleOpenSavedItem(event) {
    const savedItemId = document.querySelector('.controls__saved-item-id-input').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/edit/${savedItemId}?action=DRAFT_TEMPLATE_CONFIGURATION_EDIT&eid=${savedItemId}&embedded=true`;

    event.preventDefault();
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
    document.querySelector('.error').textContent = '';

    document.querySelectorAll('.controls__input, .controls__button').forEach((control) => control.setAttribute('disabled', 'disabled'));
  }
};

app.init();

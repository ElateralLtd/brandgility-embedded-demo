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
    document.querySelector('.open-saved-item-button').addEventListener('click', this.handleOpenSavedItem.bind(this));
    document.querySelector('.open-template-button').addEventListener('click', this.handleOpenTemplate.bind(this));
    document.querySelector('.save-button').addEventListener('click', this.handleSave.bind(this));
  },

  handleLoad({ id, type }) {
    document.querySelector('.loaded-template-id').textContent = id;
    document.querySelector('.loaded-entity-type').textContent = type;

    document.querySelectorAll('.control').forEach((control) => {
      control.removeAttribute('disabled');
    });
  },

  handleSave() {
    this.clientPostMessageAPI.save();
  },

  handleOpenTemplate() {
    const templateId = document.querySelector('.template-id').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/new/${templateId}`;

    this.openIframe(url);
  },

  handleOpenSavedItem() {
    const savedItemId = document.querySelector('.saved-item-id').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/edit/${savedItemId}`;

    this.openIframe(url);
  },

  openIframe(iframeUrl) {
    this.clearInfo();

    document.querySelector('.brandgility-iframe-wrapper').innerHTML=`
      <iframe class="brandgility-iframe" title="elateral-embedded-configure" src="${iframeUrl}"></iframe>
    `;
  },

  clearInfo() {
    document.querySelector('.loaded-template-id').textContent = '';
    document.querySelector('.loaded-entity-type').textContent = '';
    document.querySelector('.saved-item-id').value = '';
    document.querySelector('.template-id').value = '';

    document.querySelectorAll('.control').forEach((control) => {
      control.setAttribute('disabled', 'disabled');
    });
  }
};

app.init();

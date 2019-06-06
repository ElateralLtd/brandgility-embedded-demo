import 'core/polyfill';
import env from 'core/env';

import ClientPostMessageAPI from './client-post-message-api';

const app = {
  init() {
    this.clientPostMessageAPI = new ClientPostMessageAPI('.brandgility-iframe');

    this.clientPostMessageAPI
      .on('load', this.handleLoad)
      .on('save', (id) => console.info('saved item id', id));

    this.listenToClicks();
  },

  listenToClicks() {
    document.querySelector('.openSavedItem').addEventListener('click', this.handleOpenSavedItem.bind(this));
    document.querySelector('.openTemplate').addEventListener('click', this.handleOpenTemplate.bind(this));
    document.querySelector('.saveButton').addEventListener('click', this.handleSave.bind(this));
  },

  handleLoad({ id, type }) {
    document.querySelector('.loadedTemplateId').textContent = id;
    document.querySelector('.loadedEntityType').textContent = type;

    [...document.querySelectorAll('.control')].forEach((control) => {
      control.removeAttribute('disabled');
    });
  },

  handleSave() {
    this.clientPostMessageAPI.save();
  },

  handleOpenTemplate() {
    const templateId = document.querySelector('.templateId').value.trim();
    const url = `${env.brandgilityUrl}/embedded-template-configure/new/${templateId}`;

    this.openIframe(url);
  },

  handleOpenSavedItem() {
    const savedItemId = document.querySelector('.savedItemId').value.trim();
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
    document.querySelector('.loadedTemplateId').textContent = '';
    document.querySelector('.loadedEntityType').textContent = '';
    document.querySelector('.savedItemId').value = '';
    document.querySelector('.templateId').value = '';

    [...document.querySelectorAll('.control')].forEach((control) => {
      control.setAttribute('disabled', 'disabled');
    });
  }
};

app.init();

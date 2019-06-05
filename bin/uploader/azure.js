const azureStorage = require('azure-storage');
const path = require('path');
const Logger = require('./logger');

const log = new Logger('azure');
const azureAccount = process.env.AZURE_STORAGE_ACCOUNT;
const azureKey = process.env.AZURE_STORAGE_ACCESS_KEY;
const azureContainerPackages = process.env.AZURE_CONTAINER_PACKAGES;
const azureContainerEnvironments = process.env.AZURE_CONTAINER_ENVIRONMENTS;
const blobService = azureStorage.createBlobService(azureAccount, azureKey);

module.exports.upload = (fileName, moduleName, leaseId) => (
  new Promise((resolve, reject) => {
    const options = {};

    if (leaseId) {
      options.leaseId = leaseId;
    }
    const azureContainer = leaseId ? azureContainerEnvironments : azureContainerPackages;
    blobService.createBlockBlobFromLocalFile(azureContainer,
      `./${moduleName}/${path.basename(fileName)}`, `${fileName}`, options, (err) => {
        if (err) {
          log.error(err);
          reject(err);
        }
        resolve(fileName);
      });
  })
);

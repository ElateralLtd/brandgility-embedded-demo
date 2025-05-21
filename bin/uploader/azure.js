const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const path = require('path');
const Logger = require('./logger');

const log = new Logger('azure');
const azureAccount = process.env.AZURE_STORAGE_ACCOUNT;
const azureKey = process.env.AZURE_STORAGE_ACCESS_KEY;
const azureContainerPackages = process.env.AZURE_CONTAINER_PACKAGES;
const storageSharedKeyCredential = new StorageSharedKeyCredential(azureAccount, azureKey);
const storageBlobServiceUrl = `https://${azureAccount}.blob.core.windows.net`;
const blobServiceClient = new BlobServiceClient(storageBlobServiceUrl, storageSharedKeyCredential);
const containerClient = blobServiceClient.getContainerClient(azureContainerPackages);

module.exports.upload = async (filePath, moduleName, isTagged) => {
  const shouldManipulateTags = isTagged === 'true';

  try {
    const fileName = path.basename(filePath);
    const blockBlobClient = containerClient.getBlockBlobClient(`./${moduleName}/${fileName}`);

    if (shouldManipulateTags) {
      await removeLatestTag();
      await blockBlobClient.uploadFile(filePath, { tags: { latest: true } });
    } else {
      await blockBlobClient.uploadFile(filePath);
    }

    return filePath;
  } catch (error) {
    log.error(error);

    return Promise.reject(error);
  }
};

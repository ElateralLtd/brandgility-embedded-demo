const { argv } = require('yargs');

const Logger = require('./logger');
const azure = require('./azure');

const log = new Logger('azureStorage');

log.info(`Uploading ${argv.file}.`);

azure.upload(argv.file, argv.module)
  .then(() => log.info('Upload successful.'))
  .catch(log.error);

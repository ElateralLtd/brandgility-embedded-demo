const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const Logger = require('./logger');
const azure = require('./azure');

const log = new Logger('azureStorage');

log.info(`Uploading ${argv.file}.`);

azure.upload(argv.file, argv.module)
  .then(() => log.info('Upload successful.'))
  .catch(log.error);

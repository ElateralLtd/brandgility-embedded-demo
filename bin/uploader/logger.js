const log = require('npmlog');
const { argv } = require('yargs');

module.exports = class Logger {
  constructor(prefix = '') {
    this.prefix = prefix;

    if (argv.level) {
      log.level = argv.level;
    }
  }

  info(...args) {
    return log.info.apply(log, [this.prefix, ...args]);
  }

  warn(...args) {
    return log.warn.apply(log, [this.prefix, ...args]);
  }

  error(...args) {
    return log.error.apply(log, [this.prefix, ...args]);
  }

  http(...args) {
    return log.http.apply(log, [this.prefix, ...args]);
  }

  verbose(...args) {
    return log.verbose.apply(log, [this.prefix, ...args]);
  }

  silly(...args) {
    return log.silly.apply(log, [this.prefix, ...args]);
  }
};

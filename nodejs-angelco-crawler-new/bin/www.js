'use strict'
require('../extensions/array');
const step = require('../functions/step');
const interval = require('../functions/interval');
const fs = require('fs');
const Log = require('log');
const log = new Log('debug', fs.createWriteStream('log.log'));
process.setMaxListeners(0);

let loop = () => {
    step()
        .then(start)
        .catch(error => {
            log.error(error);
            start();
        });
};

let start = () => {
    let intervalMs = interval(45, 30);
    setTimeout(loop, intervalMs);
};
start();
'use strict'
const configuration = require('./modules/configuration');
const phantom = require('phantom');

module.exports = options => {
    if (!options) {
        throw new Error('Options is undefined');
    }

    if (!options.url && !options.html) {
        throw new Error('Option parameters html and url are undefined');
    }

    if (!options.crawlFunction) {
        throw new Error('Option parameter crawlFunction is undefined');
    }

    if (options.html) {
        var isHTML = true;
    }

    const log = console.log;
    let args = ['--load-images=yes'];
    let sitepage = null;
    let phantomInstance = null;


    if (options.proxy) {
        args.push(`--proxy=${options.proxy}`);
    }

    return phantom.create(args, {
            // phantomPath: configuration.phantomPath,
            logger: {
                warn: log,
                debug: log,
                error: log
            },
            logLevel: (process.env.NODE_ENV == 'debug') ? process.env.NODE_ENV : 'warn',
        })
        .then(instance => {
            phantomInstance = instance;
            return phantomInstance.createPage();
        })
        .then(page => {
            sitepage = page;
            sitepage.setting('userAgent', configuration.userAgent);
            if (isHTML) {
                sitepage.setContent(options.html, '');
                return sitepage.open('')
            } else {
                return sitepage.open(options.url);
            }
        })
        .then(status => {
            if (status == 'success' || isHTML) {
                return sitepage.evaluate(options.crawlFunction);
            } else {
                throw new Error('Page open with status: ' + status);
            }
        })
        .then(result => {
            phantomInstance.exit();
            return result;
        })
        .catch(error => {
            console.log('error');
            phantomInstance.exit();
            throw error;
        });
};
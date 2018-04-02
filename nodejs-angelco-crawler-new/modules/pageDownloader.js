'use strict'
const request = require('request-promise');
const proxyManager = require('./proxyManager');
const configuration = require('./configuration');

module.exports = (url, proxy) => {
    let proxyAddress = proxy ? proxy.startsWith('http') ? proxy : 'http://' + proxy : proxyManager();
    var options = {
        url: url,
        headers: configuration.headers.next(),
        proxy: proxyAddress,
        jar: true
    };
    return request(options);
};
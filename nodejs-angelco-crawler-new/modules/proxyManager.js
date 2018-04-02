'use strict'
const configuration = require('./configuration');

module.exports = () => { 
        let username = configuration.proxy.username;
        let password = configuration.proxy.password;
        let port = 22225;
        let session_id = (1000000 * Math.random()) | 0;
        let proxy = 'http://' + username + '-session-' + session_id + ':' + password + '@zproxy.luminati.io:' + port; 
        return proxy;
};
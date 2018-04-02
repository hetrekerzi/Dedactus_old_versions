'use strict'
require('../extensions/array');
const chai = require('chai');
const should = chai.should();
const crawl = require('../functions/crawl');
const index = require('../');
const pageDownloader = require('../modules/pageDownloader');

let func = function() {
    return document.getElementsByTagName('td')[1].innerHTML;
};
let options = {
    proxy: '23.22.72.17:80',
    url: 'http://tell-my-ip.com/',
    crawlFunction: func
};
let correcrResult = options.proxy.split(':')[0];

describe('Crawling test', () => {
    it('it should be equal to proxy', done => {
        index(options)
            .then((result) => {
                result.should.be.eql(correcrResult);
                done();
            });
    });

    it('it should be equal to proxy with pageDownloader', done => {
        pageDownloader(options.url, options.proxy)
            .then(result => {
                options.html = result;
                options.url = null;
                return index(options);
            })
            .then((result) => {
                result.should.be.eql(correcrResult);
                done();
            });
    });

    it('it should be return Facebook information', done => {
        pageDownloader('http://angel.co/facebook')
            .then(result => {
                options.html = result;
                options.url = null;
                options.crawlFunction = crawl;
                return index(options);
            })
            .then((result) => {
                result.name.should.be.eql('Facebook');
                result.founders[0].name.should.be.eql('Mark Zuckerberg');
                result.founders[0].bio.should.be.eql('Founder');
                done();
            });
    });
});
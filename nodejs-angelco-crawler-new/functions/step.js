'use strict'
const index = require('../');
const configuration = require('../modules/configuration');
const crawl = require('./crawl');
const model = require('nodejs-angelco-database');
const pageDownloader = require('../modules/pageDownloader');

module.exports = () => {
    let companyId = null;
    let isNeedToAddId = false;
    return model.taskCompany.Get()
        .then(result => {
            companyId = result.companyNumericId;
            return pageDownloader(configuration.targetUrl + result.companyNumericId);
        })
        .then(result => {
            let options = {
                html: result,
                crawlFunction: crawl
            }
            return index(options);
        })
        .then(result => {
            if (result.name && result.name != '') {
                result.id = companyId;
                return model.company.Save(result);
            } else { 
                throw new Error('Company is empty');
            }
        })
        .then(result => {
            isNeedToAddId = false;
            if (result != undefined) {
                var id = result._id;
                return model.taskCompany.AddCompanyId(companyId, id);
            } else {
                isNeedToAddId = true;
                return model.company.Get({
                    id: companyId
                });
            }
        })
        .then(result => {
            if (isNeedToAddId) {
                var company = result[0];
                var id = null;
                if (company) {
                    id = result[0]._id;
                }
                if (id) {
                    return model.taskCompany.AddCompanyId(companyId, id);
                } else {
                    return;
                }
            }
        });
};
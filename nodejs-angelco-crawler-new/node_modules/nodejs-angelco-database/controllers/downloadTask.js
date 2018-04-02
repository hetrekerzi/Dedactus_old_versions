module.exports = mongoose => {
    const downloadTaskSchema = require('../models/downloadTask')(mongoose);
    return {
        Save: model => {
            return new Promise((resolve, reject) => {
                var filters = model.filters;
                downloadTaskSchema.findOne({ filters: filters }, (error, document) => {
                    console.log(document);
                    if (error) {
                        reject(error);
                    }
                    if (document) {
                        resolve(document);
                    } else {
                        var downloadTask = downloadTaskSchema({
                            filters: model.filters
                        });
                        downloadTask.save((error, document) => {
                            if (error != undefined) {
                                if (error.code == 11000) {
                                    resolve();
                                } else {
                                    reject(error);
                                }
                            }
                            if (undefined != document) {
                                resolve(document);
                            } else {
                                resolve(true);
                            }
                        });
                    }
                });
            });
        },
        Get: () => {
            return new Promise((resolve, reject) => {
                var date = Date.now();
                downloadTaskSchema.findOneAndUpdate({}, {
                    $set: {
                        'dateModified': date
                    }
                }, {
                        upsert: false,
                        sort: {
                            'dateModified': 1
                        }
                    },
                    (error, document) => {
                        if (error != undefined) {
                            reject(error);
                        }
                        resolve(document);
                    });
            });
        }
    };
};

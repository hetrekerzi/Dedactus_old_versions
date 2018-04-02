module.exports = mongoose => {
    var taskCompanySchema = require('../models/taskCompany')(mongoose);
    return {
        Save: model => {
            return new Promise((resolve, reject) => {
                var taskCompany = taskCompanySchema({
                    companyId: model.companyId,
                    companyNumericId: model.companyNumericId,
                    taskId: model.taskId
                });
                taskCompany.save((error, document) => {
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
            });
        },
        Get: () => {
            return new Promise((resolve, reject) => {
                var date = Date.now();
                taskCompanySchema.findOneAndUpdate({
                    companyId: null
                }, {
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
        },
        AddCompanyId: (companyNumericId, companyId) => {
            return new Promise((resolve, reject) => {
                taskCompanySchema.update({
                    companyNumericId: companyNumericId
                }, {
                        companyId: companyId
                    }, {}, (error, document) => {
                        if (error != undefined) {
                            reject(error);
                        }
                        resolve(document);
                    });
            });
        },
        GetCountsById: taskId => {
            return new Promise((resolve, reject) => {
                var result = {};
                Promise.all([
                    new Promise((resolve, reject) => {
                        taskCompanySchema.count({
                            taskId: taskId
                        }, (error, count) => {
                            if (error != undefined) {
                                reject(error);
                            }
                            result.all = count;
                            resolve();
                        });
                    }),
                    new Promise((resolve, reject) => {
                        taskCompanySchema.count({
                            taskId: taskId,
                            companyId: {
                                $exists: true
                            }
                        },
                            (error, count) => {
                                if (error != undefined) {
                                    reject(error);
                                }
                                result.withCompanyId = count;
                                resolve();
                            });
                    })
                ])
                    .then(() => {
                        resolve(result);
                    });
            });
        },
        GetIds: taskId => {
            return new Promise((resolve, reject) => {
                taskCompanySchema.find({
                    taskId: taskId
                },
                    'companyNumericId -_id', function (error, documents) {
                        if (error != undefined) {
                            reject(error);
                        }
                        var result = [];
                        for (var i = 0; i < documents.length; i++) {
                            result.push(documents[i].companyNumericId);
                        }
                        resolve(result);
                    });
            });
        }
    };
};
const mongoose = require('mongoose');
const configurations = require('./configurations.js');
const company = require('./controllers/company.js')(mongoose);
const downloadTask = require('./controllers/downloadTask.js')(mongoose);
const taskCompany = require('./controllers/taskCompany.js')(mongoose);
mongoose.Promise = global.Promise;
mongoose.connect(`${configurations.connectionString}`, { server: { reconnectTries: Number.MAX_VALUE } });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Connection was created'));

module.exports.company = company;
module.exports.downloadTask = downloadTask;
module.exports.taskCompany = taskCompany;
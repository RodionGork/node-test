const mg = require('mongoose');

const secrets = require('./settings');

module.exports = function(callback) {
    mg.connect(secrets.mongo.url);
    var db = mg.connection;
    db.on('error', () => callback('DB connection error'));
    db.once('open', callback);
}


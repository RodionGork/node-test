const mg = require('mongoose');

module.exports = function(callback) {
    let secrets;
    try {
        secrets = require('./settings');
    } catch (e) {
        callback('Settings error: ' + e);
        return;
    }
    mg.connect(secrets.mongo.url);
    var db = mg.connection;
    db.on('error', () => callback('DB connection error'));
    db.once('open', callback);
}


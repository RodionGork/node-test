const mg = require('mongoose');

module.exports = function(callback) {
    let secrets;
    try {
        secrets = require('./settings');
    } catch (e) {
        callback('Settings error: ' + e);
        return;
    }
    mg.connect(secrets.mongo.url,
        { server: { socketOptions: { }}}
    );
    var db = mg.connection;
    db.on('error', (err) => callback('DB connection error: ' + err));
    db.once('open', callback);
};


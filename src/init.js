const mg = require('mongoose');

module.exports = function(callback) {
    mg.connect('mongodb://localhost/test');
    var db = mg.connection;
    db.on('error', () => callback('DB connection error'));
    db.once('open', callback);
}


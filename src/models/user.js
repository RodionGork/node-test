const mg = require('mongoose');

const userSchema = mg.Schema({
    _id: String,
    name: String,
    age: Number,
});

const user = mg.model('user', userSchema);

module.exports = user;


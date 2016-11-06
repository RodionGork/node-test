const fs = require('fs');

let file = null;

try {
    file = fs.readFileSync(__dirname + '/../secrets.json');
} catch (e) {
    file = fs.readFileSync(__dirname + '/../secrets-stub.json');
}

const json = JSON.parse(file);

module.exports = json[process.env.dev_type || 'dev'];


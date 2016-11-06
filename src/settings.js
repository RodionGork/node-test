const fs = require('fs');

let file = null;
const devType = process.env.dev_type || 'dev';

try {
    file = fs.readFileSync(__dirname + '/../settings.json');
} catch (e) {
    file = fs.readFileSync(__dirname + '/../settings-stub.json');
}

const json = JSON.parse(file);
const result = json[devType];
result.devType = devType;

module.exports = result;


const crypto = require('crypto');

const algo = 'aes-256-ctr';

const pwd = 'zlopotamp13bla';

module.exports = function(text, encode) {
    if (encode) {
        const prefix = Math.floor(Math.random() * 1e6) + '.';
        const cipher = crypto.createCipher(algo, pwd);
        let res = cipher.update(prefix + text, 'utf8', 'hex');
        return res + cipher.final('hex');
    } else {
        const cipher = crypto.createDecipher(algo, pwd);
        let res = cipher.update(text, 'hex', 'utf8');
        res += cipher.final('utf8');
        return res.replace(/^\d+\./, '');
    }
};


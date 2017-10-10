'use strict';
var crypto = require('crypto');

function tes(password, salt){
    const secret = salt;
    const hash = crypto.createHmac('sha256', secret)
                       .update(password)
                       .digest('hex');
    return hash;
};

module.exports = tes;

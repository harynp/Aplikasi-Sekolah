'use strict';
var crypto = require('crypto');

function salt(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

module.exports = salt;

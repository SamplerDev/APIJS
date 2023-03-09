"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWToken = void 0;
const jwt = require('jsonwebtoken');
const createJWToken = (user) => {
    //console.log(user)
    return jwt.sign({ user }, 'MELOHAARETZKEVODCHA', {
        expiresIn: '1h'
    });
};
exports.createJWToken = createJWToken;

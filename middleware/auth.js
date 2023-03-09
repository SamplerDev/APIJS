"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        const verified = jwt.verify(token, 'MELOHAARETZKEVODCHA');
        req.user = verified.user;
        //console.log(req.user)
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.authenticate = authenticate;

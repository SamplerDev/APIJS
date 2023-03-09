"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.decodedToken = void 0;
const graphql_shield_1 = require("graphql-shield");
const rules = __importStar(require("./rules"));
const jwt = require('jsonwebtoken');
//devuelve el token decodificado que viene del lado del
const decodedToken = (context) => {
    const authorization = context.authorization;
    const token = authorization.replace('Bearer ', '');
    const tokenverificado = jwt.verify(token, 'MELOHAARETZKEVODCHA');
    console.log(tokenverificado.user);
    return tokenverificado;
};
exports.decodedToken = decodedToken;
exports.permissions = (0, graphql_shield_1.shield)({
    RootQuery: {
        getViajeID: rules.isAdmin,
        getUserMail: rules.isAdmin,
        getAllUser: rules.isAdmin,
        getUserID: rules.isAdmin,
        getAllViajes: rules.isAdmin
    },
    Mutation: {
        createViaje: rules.isAdmin,
        deleteViaje: rules.isAdmin,
        updateViaje: rules.isAdmin,
        // createUser: rules.isAdmin,
        updateUser: rules.isAdmin,
        deleteUser: rules.isAdmin,
    }
});

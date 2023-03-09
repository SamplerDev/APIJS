"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const graphql_shield_1 = require("graphql-shield");
const shield_1 = require("./shield");
const user_1 = require("../Entities/user");
exports.isAdmin = (0, graphql_shield_1.rule)({ cache: 'contextual' })((parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const externalToken = yield (0, shield_1.decodedToken)(context);
    const user = yield user_1.User.findOne({ where: { id: externalToken.id } });
    // console.log(`esto es del debug user${user!.role} external token ${externalToken[1].role}`)
    return externalToken.user.role === (user === null || user === void 0 ? void 0 : user.role);
    /*const comprobacion1=  externalToken[1].role && user!.role == 'ADMIN';
    console.log(`esto es del debug user${user!.role} external token ${externalToken[1].role}`)
   /*const comprobacion2 = externalToken.userName == user[1].userName
   const comprobacion3 = externalToken.role == user[1].role*/
    /*return  true /*&& comprobacion2 == true && comprobacion3 == true*/
    //externalToken.user.name === user[1].name && externalToken.user.userName === user[1].userName && externalToken.user.role === user[1].role? true : false;
}));

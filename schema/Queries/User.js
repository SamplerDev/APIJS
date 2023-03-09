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
exports.GET_USER_MAIL = exports.GET_USER_ID = exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../../Entities/user");
const User_1 = require("../typeDefs/User");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_1.userType),
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.User.find();
            return result;
        });
    }
};
exports.GET_USER_ID = {
    type: new graphql_1.GraphQLList(User_1.userType),
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.find({ where: { id: args.id } });
            return user;
        });
    }
};
exports.GET_USER_MAIL = {
    type: new graphql_1.GraphQLList(User_1.userType),
    args: {
        mail: { type: graphql_1.GraphQLString }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.find({ where: { mail: args.mail } });
        });
    }
};

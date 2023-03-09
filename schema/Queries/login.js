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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../../Entities/user");
const auth_1 = require("../../util/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.LOGIN = {
    type: graphql_1.GraphQLString,
    args: {
        pass: { type: graphql_1.GraphQLString },
        mail: { type: graphql_1.GraphQLString }
    },
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const passOut = args.pass;
            const userFound = yield user_1.User.findOne({ where: { mail: args.mail } });
            const passIn = userFound.password;
            const compare = yield bcrypt_1.default.compare(passOut, passIn);
            if (!compare || !userFound) {
                throw new Error('invalid credentials');
            }
            else {
                const token = (0, auth_1.createJWToken)({ id: userFound.id, name: userFound.name, userName: userFound.userName,
                    role: userFound.role });
                //const authorization:string= context.authorization
                //console.log(authorization)       
                return token;
            }
        });
    }
};

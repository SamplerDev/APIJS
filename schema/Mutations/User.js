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
exports.DELETE_USER = exports.UPDATE_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../../Entities/user");
const User_1 = require("../typeDefs/User");
const messageType_1 = require("../typeDefs/messageType");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../../util/auth");
exports.CREATE_USER = {
    type: User_1.userType,
    args: {
        name: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        mail: { type: graphql_1.GraphQLString },
        role: { type: graphql_1.GraphQLString },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, userName, password, mail, role } = args;
            const encryptPassword = yield bcrypt_1.default.hash(password, 10);
            try {
                const result = yield user_1.User.insert({
                    name: name,
                    lastName: lastName,
                    userName: userName,
                    password: encryptPassword,
                    mail: mail,
                    role: role
                });
                const token = (0, auth_1.createJWToken)({ id: result.identifiers[0].id, name, lastName, userName, mail, role });
                console.log(result, token);
                return Object.assign(Object.assign({}, args), { id: result.identifiers[0].id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.UPDATE_USER = {
    type: messageType_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
        input: {
            type: new graphql_1.GraphQLInputObjectType({
                name: "UserInput",
                fields: () => ({
                    name: { type: graphql_1.GraphQLString },
                    lastName: { type: graphql_1.GraphQLString },
                    userName: { type: graphql_1.GraphQLString },
                    oldPassword: { type: graphql_1.GraphQLString },
                    newPassword: { type: graphql_1.GraphQLString },
                    mail: { type: graphql_1.GraphQLString },
                    role: { type: graphql_1.GraphQLString },
                }),
            }),
        },
    },
    resolve(_, { id, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield user_1.User.findOne({ where: { id: id } });
                if (!userFound)
                    throw new Error("User not found");
                // Compare old password with the new password
                const isMatch = yield bcrypt_1.default.compare(userFound === null || userFound === void 0 ? void 0 : userFound.password, input.oldPassword);
                if (!isMatch) {
                    throw new Error("Passwords does not match");
                }
                ;
            }
            catch (error) {
                console.log(error);
            }
            // Hasing the password and deleteting oldPassword and new Password
            const newPassword = yield bcrypt_1.default.hash(input.newPassword, 10);
            delete input.oldPassword;
            delete input.newPassword;
            // Adding passsword to the input for update
            input.password = newPassword;
            const response = yield user_1.User.update({ id }, input);
            if (response.affected === 0)
                return { message: "User not found" };
            return {
                success: true,
                message: "Update User successfully",
            };
        });
    },
};
exports.DELETE_USER = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.User.delete(id);
            if (result.affected === 1) {
                console.log(result);
                return true;
            }
            return false;
        });
    }
};

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
exports.GET_ALL_VIAJES_FECHA = exports.GET_ALL_VIAJES_DESTINO = exports.GET_VIAJE_ID = exports.GET_VIAJE = exports.GET_ALL_VIAJES = exports.GET_ALL_VIAJESDISP = void 0;
const graphql_1 = require("graphql");
const viajes_1 = require("../../Entities/viajes");
const Viaje_1 = require("../typeDefs/Viaje");
exports.GET_ALL_VIAJESDISP = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // const authorization = await decodedToken(context)
            const result = yield viajes_1.Viajes.find({ where: { deleted: false } });
            console.log(result);
            return result;
        });
    }
};
exports.GET_ALL_VIAJES = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // const authorization = await decodedToken(context)
            const result = yield viajes_1.Viajes.find();
            console.log(result);
            return result;
        });
    }
};
exports.GET_VIAJE = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    args: {
        destino: { type: graphql_1.GraphQLString }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield viajes_1.Viajes.find({ where: { destino: args.destino } });
        });
    }
};
exports.GET_VIAJE_ID = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    args: {
        id: { type: graphql_1.GraphQLString }
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield viajes_1.Viajes.find({ where: { idViajes: args.id } });
        });
    }
};
exports.GET_ALL_VIAJES_DESTINO = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    args: {
        destino: { type: graphql_1.GraphQLString }
    },
    resolve(_, { destino }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield viajes_1.Viajes.find({ where: { destino: destino } });
            console.log(result);
            return result;
        });
    }
};
exports.GET_ALL_VIAJES_FECHA = {
    type: new graphql_1.GraphQLList(Viaje_1.viajeType),
    args: {
        fechaSalida: { type: graphql_1.GraphQLString }
    },
    resolve(_, { fechaSalida }, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield viajes_1.Viajes.find({ where: { fechaSalida: fechaSalida } });
            console.log(result);
            return result;
        });
    }
};

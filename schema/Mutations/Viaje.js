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
exports.UPDATE_VIAJE = exports.DELETE_VIAJE = exports.CREATE_VIAJE = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const user_1 = require("../../Entities/user");
const viajes_1 = require("../../Entities/viajes");
const shield_1 = require("../../shield/shield");
const Viaje_1 = require("../typeDefs/Viaje");
exports.CREATE_VIAJE = {
    type: Viaje_1.viajeType,
    args: {
        destino: { type: graphql_1.GraphQLString },
        fechaSalida: { type: graphql_1.GraphQLString },
        cantidadDias: { type: graphql_1.GraphQLString },
        precio: { type: graphql_1.GraphQLString },
        hotel: { type: graphql_1.GraphQLString },
        bus: { type: graphql_1.GraphQLString },
        tipoComida: { type: graphql_1.GraphQLString },
        linkFoto: { type: graphql_1.GraphQLString },
        lugaresDisp: { type: graphql_scalars_1.GraphQLSafeInt },
        status: { type: graphql_1.GraphQLString }
    },
    resolve(_, args, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, destino, fechaSalida, cantidadDias, precio, hotel, bus, tipoComida, linkFoto, lugaresDisp, status } = args;
            try {
                let id = (0, shield_1.decodedToken)(context);
                let user = yield user_1.User.findOne({ where: { id: id.id } });
                const result = yield viajes_1.Viajes.insert({
                    destino: destino,
                    fechaSalida: fechaSalida,
                    cantidadDias: cantidadDias,
                    precio: precio,
                    hotel: hotel,
                    bus: bus,
                    tipoComida: tipoComida,
                    linkFoto: linkFoto,
                    lugaresDisp: lugaresDisp,
                    status: status,
                    creadoPor: user === null || user === void 0 ? void 0 : user.id
                });
                console.log(result);
                return { fechaSalida: result.generatedMaps[0].fechaSalida,
                    destino: result.generatedMaps[0].destino, };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.DELETE_VIAJE = {
    type: graphql_1.GraphQLBoolean,
    args: {
        id: { type: graphql_1.GraphQLID }
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield viajes_1.Viajes.delete(id);
            if (result.affected === 1) {
                return true;
            }
            return false;
        });
    }
};
exports.UPDATE_VIAJE = {
    type: graphql_1.GraphQLString,
    args: {
        idViajes: { type: graphql_1.GraphQLID },
        destino: { type: graphql_1.GraphQLString },
        fechaSalida: { type: graphql_1.GraphQLString },
        cantidadDias: { type: graphql_1.GraphQLString },
        precio: { type: graphql_1.GraphQLString },
        hotel: { type: graphql_1.GraphQLString },
        bus: { type: graphql_1.GraphQLString },
        tipoComida: { type: graphql_1.GraphQLString },
        linkFoto: { type: graphql_1.GraphQLString },
        deleted: { type: graphql_1.GraphQLBoolean },
        lugaresDisp: { type: graphql_scalars_1.GraphQLSafeInt },
        status: { type: graphql_1.GraphQLString }
    },
    resolve(_, { idViajes, destino, fechaSalida, cantidadDias, precio, hotel, bus, tipoComida, linkFoto, deleted, lugaresDisp, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            const viajeFound = yield viajes_1.Viajes.findOne({ where: { idViajes: idViajes } });
            if (viajeFound === null) {
                return 'El viaje que quiere modificar no existe';
            }
            else {
                const response = yield viajes_1.Viajes.update({ idViajes }, { destino,
                    fechaSalida,
                    cantidadDias,
                    precio,
                    hotel,
                    bus,
                    tipoComida,
                    linkFoto,
                    deleted,
                    lugaresDisp,
                    status });
                console.log(response);
                return `el viaje con el id:${idViajes} ha sido modificado exitosamente`;
            }
        });
    }
};

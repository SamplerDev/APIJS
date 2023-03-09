"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viajeType = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const type_1 = require("graphql/type");
var GraphQLDate = require('graphql-date');
exports.viajeType = new graphql_1.GraphQLObjectType({
    name: 'Viaje',
    fields: {
        idViajes: { type: graphql_1.GraphQLID },
        destino: { type: graphql_1.GraphQLString },
        fechaSalida: { type: GraphQLDate },
        cantidadDias: { type: graphql_1.GraphQLString },
        precio: { type: graphql_1.GraphQLString },
        hotel: { type: graphql_1.GraphQLString },
        lugaresDisp: { type: graphql_scalars_1.GraphQLSafeInt },
        bus: { type: graphql_1.GraphQLString },
        tipoComida: { type: graphql_1.GraphQLString },
        linkFoto: { type: graphql_1.GraphQLString },
        deleted: { type: type_1.GraphQLBoolean },
        creadoPor: { type: graphql_1.GraphQLString }
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const greetings_1 = require("./Queries/greetings");
const User_1 = require("./Mutations/User");
const Viaje_1 = require("./Mutations/Viaje");
const Viajes_1 = require("./Queries/Viajes");
const User_2 = require("./Queries/User");
const login_1 = require("./Queries/login");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        greeting: greetings_1.GREETING,
        getAllViajes: Viajes_1.GET_ALL_VIAJES,
        getViaje: Viajes_1.GET_VIAJE,
        getAllViajesDestino: Viajes_1.GET_ALL_VIAJES_DESTINO,
        getAllViajesFecha: Viajes_1.GET_ALL_VIAJES_FECHA,
        getViajeID: Viajes_1.GET_VIAJE_ID,
        getUserMail: User_2.GET_USER_MAIL,
        getAllUser: User_2.GET_ALL_USERS,
        getUserID: User_2.GET_USER_ID,
        getAllViajesDisp: Viajes_1.GET_ALL_VIAJESDISP
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createViaje: Viaje_1.CREATE_VIAJE,
        deleteViaje: Viaje_1.DELETE_VIAJE,
        updateViaje: Viaje_1.UPDATE_VIAJE,
        createUser: User_1.CREATE_USER,
        updateUser: User_1.UPDATE_USER,
        deleteUser: User_1.DELETE_USER,
        login: login_1.LOGIN,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

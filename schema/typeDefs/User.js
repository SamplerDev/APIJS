"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
exports.userType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        mail: { type: graphql_scalars_1.GraphQLEmailAddress },
        role: { type: graphql_1.GraphQLString },
        /* createdBy:{type :GraphQLString},
         createDate: {type: DateResolver},
         lastModifiedBy: {type:GraphQLString},
         lastModifiedDate:{type: DateResolver}*/
    }
});

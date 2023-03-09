"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const express_1 = __importDefault(require("express"));
const shield_1 = require("./shield/shield");
const graphql_middleware_1 = require("graphql-middleware");
const schemaWithPermissions = (0, graphql_middleware_1.applyMiddleware)(schema_1.schema, shield_1.permissions);
exports.app = (0, express_1.default)();
// app.use(authenticate)
exports.app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    const { authorization } = req.headers;
    console.log(authorization);
    return { graphiql: { headerEditorEnabled: true },
        schema: schemaWithPermissions,
        context: {
            authorization
        }
    };
}));
exports.default = exports.app;

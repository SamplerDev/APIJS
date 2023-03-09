"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectDB = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./Entities/user");
const viajes_1 = require("./Entities/viajes");
exports.conectDB = new typeorm_1.DataSource({
    type: 'mysql',
    username: 'root',
    password: 'root',
    port: 3306,
    host: 'localhost',
    database: 'viaje',
    entities: [viajes_1.Viajes, user_1.User],
    synchronize: true,
    ssl: false
});

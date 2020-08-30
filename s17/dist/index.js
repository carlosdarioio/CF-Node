"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//vas por el 219
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
//const mysql = new MySQL();
mysql_1.default.instance;
//escuchar puerto
server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});
//console.log('Codigo de typeScript ok');
/*
convertir este codigo en jsvascript
crera el conf tsconfig
poner en cmd:
tsc

en dist pondra en codigo en jsvascript en esa carpeta
*/
//ejecutar index: nodemon dist/index
//npm run html copiar html al dist

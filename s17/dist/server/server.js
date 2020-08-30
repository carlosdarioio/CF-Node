"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ocupaste express, instalando con npm install express --save
//y
//npm install @types/express --save-dev
const express = require("express");
const path = require("path");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(puerto) {
        return new Server(puerto);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public/');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder;
    }
}
exports.default = Server;

import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;
    //conexion
    cnn: mysql.Connection;
    conectado: boolean = false;


    constructor() {
        console.log('Clase inicializadaZ');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user2',
            password: '123456',
            database: 'node_db'
        });

        // this.cnn.connect();
        this.conectarDB();
    }

    //util para no abrir doversas conexiones abre solo si es de otro server
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {

            if (err) {
                console.log('Error en Query');
                console.log(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            } else { callback(null, results); }





        });
    }



    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online');
        })
    }

}



/*
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();*/
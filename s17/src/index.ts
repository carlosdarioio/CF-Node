
//vas por el 219
import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

//const mysql = new MySQL();
MySQL.instance;

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


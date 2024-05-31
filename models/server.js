
//Servidor de express
const express =  require('express');
const http =        require('http');
const socketio = require('socket.io');
const path =       require('path');
const sockets = require('./sockets');


class Server {

    constructor () {
        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        //Configuracion de sockets
        this.io = socketio( this.server );
    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname,'../public')));
    }

    configurarSockets() {
        new sockets(this.io);
    }

    
    execute() {
        // Inicializar Middlewares
        this.middlewares();

        // Configurar Sockets
        this.configurarSockets();

        // Inicializar el server
        this. server.listen(this.port, () => {
             console.log("server corriendo en el puerto 8080");
         });
     }
 

}

module.exports = Server;
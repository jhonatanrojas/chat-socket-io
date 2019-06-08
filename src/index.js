const express = require("express");
const app = express();

const socketio = require('socket.io');
const http = require('http');
const path = require('path');

//stactic files

const urlpach= path.join(__dirname,'public') 
const cpublic =express.static(urlpach);

app.use(cpublic)
const server =http.createServer(app);

//settigs
app.set('port',process.env.PORT || 3000);
// server socket
const io= socketio.listen(server);
    require('./sockets')(io);

 

//starting the server
server.listen(app.get('port'),()=>{

console.log("server port ",app.get('port'));


});
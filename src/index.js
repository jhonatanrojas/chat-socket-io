const express = require("express");
const app = express();

const socketio = require('socket.io');
const http = require('http');
const path = require('path');

//stactic files

const urlpach= path.join(__dirname,'public') 
const cpublic =express.static(urlpach);

const mongoose =  require('mongoose');
app.use(cpublic)
const server =http.createServer(app);

//settigs
app.set('port',process.env.PORT || 3000);

// connection to the server

const mongoURI = 'mongodb://localhost/chat';
mongoose.connect(mongoURI,{ useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

  //mongoose.connect('mongodb://localhost/auth');
// server socket
const io= socketio.listen(server);
    require('./sockets')(io);

 

//starting the server
server.listen(app.get('port'),()=>{

console.log("server port ",app.get('port'));


});
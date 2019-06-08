module.exports = function (io) {
    
    io.on('connection', socket=>{

        console.log("un nuevo usuario conectados")
    

        socket.on("sendMessage",(data)=>{

            console.log(data)

            io.sockets.emit('newMessage',data);
        })
    })
}
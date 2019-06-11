Chat =require('./models/Chat');

module.exports = function (io) {

    let usuarios={};
    
    io.on('connection',async socket=>{

      

        let messages = await Chat.find({}).limit(8).sort('-created');
       

 
        socket.on("newuser",(data,cb)=>{

            if(data in usuarios){
                cb(false)
            }else{
                cb(true)
                socket.newuser=data;
                usuarios[socket.newuser]= socket;
                updateUsuarios()

                
            }
        });
    
        //Envio de mensajes
        socket.on("sendMessage", async (data,cb)=>{

            var msj = data.trim();
     

            //comprobar si es directo
            let directo =msj.substr(0,3);
            if(directo=='/md'){
       

                msj = msj.substr(3);

                const index =msj.indexOf(' ');

                if(index !== -1){

                    var msg = msj.substr(index +1);
                  arrname=msg.split(' ');
                  var name ='';
                  if(arrname.indexOf(0))
                    var name = arrname[0];
          
                    // comprobar si el usuario existe
                    if(name in usuarios){

                        //enviar mensaje privado
                        usuarios[name].emit('whisper',{
                             
                            msg:msg,
                            nick:socket.newuser

                        });
                    
                        //si el usuario no esta conectado o no existo
                    }else{
                        
                        cb('Error ingrese un usuario valido')
                return;
                    }
                    //si no ingresa el mensaje
                }else{


                    cb('Error ingrese un Mensaje')
                    return;
                }


            //si no es un mgj directo
            }else{

                    //guardar en Mongo DB
                  var newMsg =new Chat({
                        msg:data,
                        nick:socket.newuser
                    });
                                  
                    await newMsg.save();

                io.sockets.emit('newMessage',{
                    msg:data,
                    nick:socket.newuser
                });
            }

            //esta es una prueba
            socket.emit('loadmsg', data);
        })


        socket.on("disconnect",(data)=>{
            if(!socket.newuser) return;

            delete usuarios[socket.newuser];
          //  usuarios.splice(usuarios.indexOf(socket.newuser),1);
            updateUsuarios()
        
        })

        function updateUsuarios(){
            io.sockets.emit('usernames',Object.keys(usuarios));
  
        }
    })
}
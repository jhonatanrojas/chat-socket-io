

$(function (){

    const socket =io();

    $( "#btn-chat" ).click(function() {
        send(socket)
        });
        
        $('#btn-input').keypress(function (e) {


            //socket.emit('escribiendo', chat);
            if (e.which == 13) {
              send(socket)
            }
          });

        //Recibir Mensaje
        socket.on('newMessage',(data)=>{
            mensaBody(data);
       
   
        });
      
      
        socket.on('whisper',(data)=>{
            mensaBody(data,true)
        });
        

        socket.on('usernames',(data)=>{ 
        let html = '';

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            
            html += '<p> ';
                    
            html +=element;
            html += '</p> ';
        }

        $("#usuarios").html(html);

        });
        
       var formuser= $("#formuser");
       formuser.submit(e =>{
        e.preventDefault();
        let user =$(".iduser").val()
        socket.emit('newuser', user,data=>{
        
            if(data){

                $( "#myModal" ).removeClass('active');
                $("#chat_window_1").removeClass('active')
            }else{
                alert('El usuario '
                +user+ ' ya esta registrado')
            } 



        });
        
       });
})

function mensaBody(data,directo=false){

    var textod  =" ";
    if(directo){
        textod="<b>*Mensaje directo*</b>"
    }
    var icon ="https://api.adorable.io/avatars/285/144106.png";
    let user =$(".iduser").val()
if(data.nick !=user )
    icon="https://api.adorable.io/avatars/285/323698.png";

    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    
let body= '   <div class="row msg_container base_receive">'+
' <div class="col-md-2 col-xs-2 avatar">'+
    '<img src="'+icon+'" class="chatimg img-responsive "> </div>'+
'<div class="col-md-10 col-xs-10">'+
    '<div class="messages msg_receive">'+
       ' <p>'+data.msg+'</p>'+
        '<time datetime="">'+textod+'<b>'+data.nick+'</b>• '+time+'</time>'+
   ' </div> </div></div>';


   $(body).appendTo("#messagebody");
}

function send(socket){
	var chat = $("#btn-input").val(); 
var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

if (chat =="") {
    alert('Enter Message');
} else
{
//ENVIAR MENSAJE AL SOCKET

socket.emit('sendMessage', chat, data =>{

    alert(data)

});



var body =                       '<div class="row msg_container base_receive">' +
						'<div class="col-md-10 col-xs-10 ">' +
                            '<div class="messages msg_sent">' +
                                '<p>'+ chat + '</p>'+
                               ' <time datetime="2009-11-13T20:00">Administrator • Today '+time+'</time>'+
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-2 col-xs-2 avatar">' +
                            '<img class="chatimg" src="https://api.adorable.io/avatars/285/323698.png" class=" img-responsive ">' +
                        '</div>' +
					'</div>';
}
//$(body).appendTo("#messagebody");
$('#btn-input').val('');
$("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight}, 'slow');
}
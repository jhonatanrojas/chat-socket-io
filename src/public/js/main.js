

$(function (){

    const socket =io();

    $( "#btn-chat" ).click(function() {
        send(socket)
        });
        
        $('#btn-input').keypress(function (e) {
          if (e.which == 13) {
            send(socket)
          }
        });


        //Recibir Mensaje
        socket.on('newMessage',(data)=>{
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            
        let body= '   <div class="row msg_container base_receive">'+
       ' <div class="col-md-2 col-xs-2 avatar">'+
            '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Rajesh_Gopinathan.jpg/220px-Rajesh_Gopinathan.jpg" class="chatimg img-responsive "> </div>'+
        '<div class="col-md-10 col-xs-10">'+
            '<div class="messages msg_receive">'+
               ' <p>'+data+'</p>'+
                '<time datetime="">Rajesh M • '+time+'</time>'+
           ' </div> </div></div>';


           $(body).appendTo("#messagebody");
   
        });
        
})

function send(socket){
	var chat = $("#btn-input").val(); 
var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

if (chat =="") {
    alert('Enter Message');
} else
{
//ENVIAR MENSAJE AL SOCKET

socket.emit('sendMessage', chat);



var body =                       '<div class="row msg_container base_receive">' +
						'<div class="col-md-10 col-xs-10 ">' +
                            '<div class="messages msg_sent">' +
                                '<p>'+ chat + '</p>'+
                               ' <time datetime="2009-11-13T20:00">Administrator • Today '+time+'</time>'+
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-2 col-xs-2 avatar">' +
                            '<img class="chatimg" src="https://cheme.mit.edu/wp-content/uploads/2017/01/stephanopoulosgeorge-431x400.jpg" class=" img-responsive ">' +
                        '</div>' +
					'</div>';
}
//$(body).appendTo("#messagebody");
$('#btn-input').val('');
$("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight}, 'slow');
}
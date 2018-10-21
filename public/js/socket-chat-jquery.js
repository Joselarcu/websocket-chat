

var params = new URLSearchParams(window.location.search);

//jquery references
var divUsers = $('#divUsuarios');
var sendForm = $('#formSend');
var textMessage = $('#textMessage');
var username = params.get('name');
var room = params.get('room');
var divChatbox = $('#divChatbox');

//Functions to render users
function renderUsers(users) {
    console.log(users);
    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '<a data-id="'+ users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+users[i].name +'<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html);

}

function rederMessages(message){
    var html = '';
    html +='<li class="animated fadeIn">';
        html +='<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html +='<div class="chat-content">';
        html +='    <h5>'+ message.name +'</h5>';
        html +='    <div class="box bg-light-info">'+message.message +'</div>';
        html +='</div>';
        html +='<div class="chat-time">10:56 am</div>';
   html +=' </li>';

    divChatbox.append(html);
}

//listeners
divUsers.on('click','a', function(){
    var id = $(this).data('id');
    if(id){
        console.log(id);
    }
});

sendForm.on('submit', function(event){
    event.preventDefault();
    if(textMessage.val().trim().length === 0){
        return
    }

    socket.emit('sendMessage', {
        user: username,
        message: textMessage.val()
    }, function (message) {
        console.log('respuesta server: ', message);
        textMessage.val('').focus();
        rederMessages(message);
    }); 
})

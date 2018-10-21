var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function () {
    console.log('Conectado al servidor');

    // escuchar
    socket.emit('enterChat', user, function (resp) {
        console.log('Users connected: ', resp);
        renderUsers(resp);
    });

});

socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');
});




// Enviar información
/* socket.emit('sendMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('sendMessage', function (message) {

    console.log('Servidor:', message);
    rederMessages(message);

});

//user changes, user leaves or connect to a chat
/* socket.on('userList', function (users) {
    console.log("weeeeeeeeeeeeeeeeeeee");
    console.log("users: ", users);
    renderUsers(users);
}); */

socket.on('userList', function (users) {
    renderUsers(users);
});

//private messages
socket.on('privateMessage', function (message) {
    console.log("private message: ", message);
});
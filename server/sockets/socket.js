const { io } = require('../server');

const { Users } = require('../classes/users');

const users = new Users();
const { createMessage } = require('../utils/utils');

io.on('connection', (client) => {

    client.on('enterChat',(data,callback) =>{
        console.log("enter chat");
        if(!data.name || !data.room){
            return callback({error: true, message: 'Name and room are required'});
        }

        client.join(data.room);

       let usrs =  users.addUser(client.id, data.name,data.room);
        client.broadcast.to(data.room).emit('userList',users.getUsersByRoom(data.room));

        callback(users.getUsersByRoom(data.room));

       console.log("User " + data.name +" connected");
   });

    client.on('sendMessage',(data,callback) => {
        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('sendMessage',message);

        callback(message);
    })

   client.on('disconnect',() => {
       
       let deletedUser = users.deleteUser(client.id);
       console.log("deletedUser", deletedUser);
       if(deletedUser){
           client.broadcast.to(deletedUser.room).emit('sendMessage',createMessage('Administrator', deletedUser.name + " left the chat"));
           client.broadcast.to(deletedUser.room).emit('userList', users.getUsersByRoom(deletedUser.room));
       }
   });

   //private  messages
   client.on('privateMessage',data =>{
       let user = users.getUser(client.id)
       client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name,data.message));
   });

});


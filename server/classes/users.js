class Users{

    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        let user = {id,name,room};

        this.users.push(user);

        return this.users;
    }

    getUser(id){
        console.log("id: ",id);
        console.log("users: ", this.users);
        let user = this.users.filter(usr => usr.id === id)[0];

        return user;
    }

    getUsers(){
        return this.users;
    }

    getUsersByRoom(room){
        let usersInRoom = this.users.filter(usr =>{return usr.room === room});
        return usersInRoom;
    }

    deleteUser(id){
        let deletedUser = this.getUser(id);
        this.users = this.users.filter( usr =>  usr.id != id);
        return deletedUser;
    }

}

module.exports= {Users}
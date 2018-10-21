const createMessage = (name,message) =>{
    return{
        name,message,
        data: new Date().getTime()
    }
}

module.exports = { createMessage }
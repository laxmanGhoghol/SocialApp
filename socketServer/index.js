//starting server on 8900 port 
const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []; //user array containing userid and socket id


// add user to users array
const addUser = (userId, socketId) => {
    !users.some(u => u.userId === userId) &&
        users.push({ userId, socketId });
}

//remove user from users array
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

//get user from users array
const getuser = (userId) => {
    return users.find((u) => u.userId === userId);
}
console.log("Socket Server Running at port: 8900")
io.on("connection", (socket) => {

    //on connection
    socket.on("addUser", (userId, token) => {
        addUser(userId, socket.id) //add user to users list
        io.emit("getUsers", users)
    })

    //send and receive messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        try {
            const user = getuser(receiverId);
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        } catch (err) {
            console.log(err)
        }
    })

    //on disconnected
    socket.on("disconnect", () => {
        removeUser(socket.id) // removing user form user array
        io.emit("getUsers", users)
    })

})
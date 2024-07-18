const express = require("express");
const app = express()
const PORT = 3000 || process.env.PORT
const cors = require('cors')
const { createServer } = require("http");
const { Server } = require("socket.io");
const authentication = require("./middlewares/authentication");
const UserController = require("./Controllers/UserController");
const ChatController = require("./Controllers/ChatController");
const errorHandler = require("./middlewares/errorHandler");
const formatMessage = require("./utils/messages");
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/user");

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://ran-chat-nine.vercel.app"
    }

});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/register', UserController.registerUser)
app.post('/login', UserController.loginUser)

app.use(authentication)

app.get('/', ChatController.viewHome)

const botName = "RAN Chat"

// Run when client connects
io.on('connection', (socket) => {
    console.log('New connection')

    // Set auth for socket
    socket.auth = socket.handshake.auth;

    // Join room
    socket.join(socket.auth.room);

    // Welcome current user
    socket.emit("welcome", `Hello Mr/Mrs ${socket.auth.username}`);

    // Broadcast when a user connects
    socket.broadcast.to(socket.auth.room).emit(
        "message",
        formatMessage(`${socket.auth.username} has joined the chat`)
    );

    // Send users and room info
    io.to(socket.auth.room).emit("roomUsers", {
        room: socket.auth.room,
        users: getRoomUsers(socket.auth.room),
    });

    // Listen for chatMessage
    socket.on("message:new", (message) => {
        io.to(socket.auth.room).emit("message:update", {
            from: socket.auth.username,
            message
        })
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        io.to(socket.auth.room).emit(
            "message",
            formatMessage(`${socket.auth.username} has left the chat`)
        );

        // Send users and room info
        io.to(socket.auth.room).emit("roomUsers", {
            room: socket.auth.room,
            users: getRoomUsers(socket.auth.room),
        });
    });
});

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
});
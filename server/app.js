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
        origin: "http://localhost:5173"
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

    console.log('a user connected', socket.id, "<<<< id");
    console.log('a user connected', socket.handshake.auth.username, "<<<< username");
    socket.emit("welcome", "Hello Mr/Mrs " + socket.id) // emit ke client yg lagi connect

    // Join room
    socket.on("joinRoom", ({ email, room }) => {
        const user = userJoin(socket.id, email, room);
        console.log(user);
        socket.join(user.room);
        // Welcome current user
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit(
            "message",
            formatMessage(botName, ` ${user.username} has joined the chat`)
        );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(`botName, ${user.name} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
});
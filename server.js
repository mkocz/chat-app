const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');
const messages = [];
const users = []

app.use(express.static(path.join(__dirname, '/client')));

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id)
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('user', (userName) => {
        console.log('Oh, I\'ve got something from ' + socket.id)
        users.push({ name: userName, id: socket.id });
        socket.broadcast.emit('userJoined', userName);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')
        const userIndex = users.findIndex((el) => el.id === socket.id)
        if (userIndex != -1) {
            socket.broadcast.emit('userLeft', users[userIndex].name);
            users.splice(userIndex, 1)
        }
    });
    console.log('I\'ve added a listener on message event \n');
})

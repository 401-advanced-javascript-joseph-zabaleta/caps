'use strict';

/** 3rd Party */
require('dotenv').config({path:'../../.env'});
const net = require('net');
const server = net.createServer();
const { v4: uuidv4 } = require('uuid');

/** Local */
const PORT = process.env.PORT || 3000;

const socketPool = {};

server.on('connection', (socket) => {
    const id = uuidv4();
    socketPool[id] = socket;

    console.log(`Connection Established on Socket[${id}]`);

    socket.on('error', (error) => console.error(error));
    socket.on('end', () => { delete socketPool[id]; });
    socket.on('data', pushMessage);


});


function pushMessage(buffer) {
    let message = JSON.parse(buffer.toString());

    if (message.event && message.payload) {
        for (let socket in socketPool) {
            socketPool[socket].write(JSON.stringify(message));
        };
    };
};

server.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});


'use strict';

require('dotenv').config({path:'../../.env'});
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
let caps = io.of('/caps');


caps.on('connection', (socket) => {
    console.log(`Connection Established on Socket[${socket.id}]`);

    socket.on('join', room => {
        socket.join(room);
    })

    socket.emit('confirmation', 'confirmation');

    socket.on('order-ready', (payload) => {
        logger(payload);
        caps.emit('order-ready', payload);
    });

    socket.on('in-transit', (payload) => {
        logger(payload);
        caps.to(process.env.storeName).emit('in-transit', payload);
    });

    socket.on('order-delivered', (payload) => {
        logger(payload);
        caps.to(process.env.storeName).emit('order-delivered', payload);
    });

});


function logger(body) {
    let event = body.event;
    let time = new Date();
    let payload = body.payload;

    console.log("EVENT", {event, time, payload});
};

console.log(`Server is running on PORT:${PORT}`);



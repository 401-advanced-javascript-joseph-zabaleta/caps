'use strict';

require('dotenv').config({path:'../../.env'});
const {v4: uuid } = require('uuid');
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
let caps = io.of('/caps');

let queue = {
    orderReady: {},
    inTransit: {},
    delivered: {},
};

io.on('connection', (socket) => {
    socket.on('error', (error) => console.error(error));
});


caps.on('connection', (socket) => {
    console.log(`Connection Established on Caps NameSpace from Socket[${socket.id}]`);
    socket.emit('start', 'start');

    socket.on('join', room => socket.join(room));

    socket.on('order-ready', handleReady);
    socket.on('in-transit', handlePickUp)
    socket.on('order-delivered', handleDelivered);
    socket.on('received', handleReceived);
    socket.on('getAllDelivered', handleGetAllDelivered);
    socket.on('getAllReady', handleGetAllReady);
})

function handleReady (message) {
    logger(message);

    let id = uuid();
    queue.orderReady[id] = message;
    caps.emit('order-ready', {id, body: message});

};


function handlePickUp (message) {
    logger(message.body)

    let current = queue.orderReady[message.id];
    queue.inTransit[message.id] = current;
    delete queue.orderReady[message.id];

    caps.to(process.env.storeName).emit('in-transit', message);

}


function handleDelivered (message) {
    logger(message.body);
    let current = queue.inTransit[message.id];
    queue.delivered[message.id] = current;
    delete queue.inTransit[message.id];

    caps.to(process.env.storeName).emit('order-delivered', message);

};


function handleReceived (message) {
    const {id, body} = message;
    delete queue.delivered[id];
};


function handleGetAllDelivered () {
    Object.keys(queue.delivered).forEach(id => {
        caps.emit('order-delivered', {id, body: queue.delivered[id]});
    });
};

function handleGetAllReady () {
    Object.keys(queue.orderReady).forEach(id => {
        caps.emit('order-ready', {id, body: queue.orderReady[id]});
    });
};

function logger(message) {
    let event = message.event;
    let time = new Date();
    let payload = message.payload;

    console.log("EVENT", {event, time, payload});
};

console.log(`Server is running on PORT:${PORT}`);

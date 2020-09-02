'use strict';

require('dotenv').config({path:'../../../.env'});
// const net = require('net');
// const Client = new net.Socket();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

socket.on('order-ready', deliverOrder)

// Client.connect(process.env.PORT, process.env.HOST, () => {
//     console.log(`Driver has connect to the Server on PORT:${process.env.PORT}`)
// });


// Client.on('data', (buffer) => {

//     let message = JSON.parse(buffer.toString());

//     if (message.event === 'order-ready') {
//         deliverOrder(message.payload);
//     };

// });



function deliverOrder(body) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${body.payload.orderId}]`);
        body.event = 'in-transit';
        socket.emit('in-transit', body);

    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered [${body.payload.orderId}]`);

        body.event = 'order-delivered';
        socket.emit('order-delivered', body);

    }, 3000);
};


function writeMessage(eventName, payload) {
    let message = {};

    message.event = eventName;
    message.payload = payload;

    Client.write(JSON.stringify(message));
};

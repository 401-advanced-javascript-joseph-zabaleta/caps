'use strict';

require('dotenv').config({path:'../../../.env'});
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

socket.on('order-ready', deliverOrder)


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

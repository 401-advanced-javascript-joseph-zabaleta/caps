'use strict';

require('dotenv').config({path:'../../../.env'});
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');


socket.emit('getAllReady');

socket.on('order-ready', deliverOrder);


function deliverOrder(message) {

    const {id, body} = message;


    setTimeout(() => {
        console.log(`DRIVER: picked up [${body.payload.orderId}]`);
        body.event = 'in-transit';
        socket.emit('in-transit', {id, body});

    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered [${body.payload.orderId}]`);

        body.event = 'order-delivered';
        socket.emit('order-delivered', {id, body});

    }, 3000);
};

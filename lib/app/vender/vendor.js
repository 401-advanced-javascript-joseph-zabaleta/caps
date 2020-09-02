'use strict';

require('dotenv').config({path:'../../../.env'});
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');


socket.emit('join', process.env.storeName);

socket.on('confirmation', start);
socket.on('order-delivered', thanks)



function thanks(body) {

    console.log(`VENDOR: Thank you for delivering [${body.payload.orderId}]`);
};


function generateOrder() {

    let payload = {};

    payload.orderId = faker.random.number();
    payload.storeName = process.env.storeName;
    payload.customerName = faker.name.findName();
    payload.address = faker.address.streetAddress();

    return payload;
};


function writeMessage() {

    let message = {};

    message.event = 'order-ready';
    message.payload = generateOrder();

    // Client.write(JSON.stringify(message));

    socket.emit('order-ready', message);
    // socket.emit('data', message);

};


function start() {
    setInterval(writeMessage, 5000);
};



// start();

module.exports = { start };

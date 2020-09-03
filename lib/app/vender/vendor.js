'use strict';

require('dotenv').config({path:'../../../.env'});
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

socket.emit('getAllDelivered');

socket.emit('join', process.env.storeName);

socket.on('start', start);
socket.on('order-delivered', (message) => {
    const {id , body} = message;

    console.log(`VENDOR: Thank you for delivering [${body.payload.orderId}]`);
    socket.emit('received', message);
})


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

    socket.emit('order-ready', message);
};


function start() {
    setInterval(writeMessage, 5000);
};


module.exports = { start };

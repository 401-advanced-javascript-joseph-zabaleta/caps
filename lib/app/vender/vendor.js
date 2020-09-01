'use strict';

/** 3rd Party */
require('dotenv').config({path:'../../../.env'});
const faker = require('faker');
const net = require('net');
const Client = new net.Socket();


Client.connect(process.env.PORT, process.env.HOST, () => {
    console.log(`Vendor has connect to the Server on PORT:${process.env.PORT}`);
});


Client.on('data', (buffer) => {

    let message = JSON.parse(buffer.toString());

    if (message.event === 'order-delivered') {
        orderDelivered(message.payload);
    };

});


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

    Client.write(JSON.stringify(message));
};


function orderDelivered(payload) {
    console.log(`VENDOR: Thank you for delivering [${payload.orderId}]`);
};


function start() {
    setInterval(writeMessage, 5000);
};



start();

module.exports = { start };

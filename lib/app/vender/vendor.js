'use strict';

/** 3rd Party */
require('dotenv').config();
const faker = require('faker');

/** Local */
const emitter = require('../../events.js');


emitter.on('order-delivered', (payload) => {
    console.log(`VENDOR: Thank you for delivering [${payload.orderId}]`);
});


function generateOrder() {

    let payload = {};

    payload.orderId = faker.random.number();
    payload.storeName = process.env.storeName;
    payload.customerName = faker.name.findName();
    payload.address = faker.address.streetAddress();

    return payload;
};


function start() {
setInterval(() => {
    emitter.emit('order-ready', generateOrder());
}, 5000);
};

start();

module.exports = { start };

'use strict';

/** 3rd Party */
require('dotenv').config();
const faker = require('faker');

/** Local */
const emitter = require('../events.js');


emitter.on('order-delivered', (payload) => {
    console.log(`VENDOR: Thank you for delivering [${payload.orderId}]`);
});


async function generateOrder() {

    let payload = {};

    payload.orderId = await faker.random.number();
    payload.storeName = process.env.storeName;
    payload.customerName = await faker.name.findName();
    payload.address = await faker.address.streetAddress();

    return payload;
};


function start() {
setInterval(async () => {
    emitter.emit('order-ready', await generateOrder());
}, 5000);
};

start();

module.exports = { start };

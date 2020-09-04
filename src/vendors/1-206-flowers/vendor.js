'use strict';

const Queue = require('./lib/queue.js');
const queue = new Queue('1-206-flowers');
const faker = require('faker');


queue.subscribe('delivered', handleDelivered);
queue.subscribe('in-transit', handleTransit);
queue.trigger('getall', 'delivered');

function handleDelivered (payload) {
    console.log('Flowers were delivered', payload.code);
};

function handleTransit (payload) {
    console.log('Flowers are in-transit', payload.code);
};

setInterval(() => {
    queue.trigger('pickup', {
        store: '1-206-flowers',
        code: faker.random.uuid(),
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
    });
}, 1000);

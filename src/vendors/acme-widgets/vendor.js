'use strict';

const Queue = require('./lib/queue.js');
const queue = new Queue('acme-widgets');
const faker = require('faker');


queue.subscribe('delivered', handleDelivered);
queue.subscribe('in-transit', handleTransit);
queue.trigger('getall', 'delivered');

function handleDelivered (payload) {
    console.log('Widgets were delivered', payload.code);
};

function handleTransit (payload) {
    console.log('Widgets are in-transit', payload.code);
};

setInterval(() => {
    queue.trigger('pickup', {
        store: 'acme-widgets',
        code: faker.random.uuid(),
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
    });
}, 1500);

'use strict';

const Queue = require('./lib/queue.js');
const queue = new Queue('driver');

queue.subscribe('pickup', handlePickup);
queue.trigger('getall', 'pickup');




function handlePickup (payload) {
    console.log('DRIVER: Picking Up', payload);

    setTimeout(() => {
        queue.trigger('in-transit', payload);
    }, 1000);

    setTimeout(() => {
        queue.trigger('delivered', payload);
    }, 1500);
};

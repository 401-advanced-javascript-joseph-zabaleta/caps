'use strict';

/** Local */
const emitter = require('../../events.js');

emitter.on('order-ready', handleOrder);
emitter.on('in-transit', finishOrder);


function handleOrder(payload) {
    setTimeout(() => {
        console.log(payload);
        console.log(`DRIVER: picked up [${payload.orderId}]`);
        emitter.emit('in-transit', payload);
    }, 1000);
};


function finishOrder(payload) {
    setTimeout(() => {
        console.log(`DRIVER: delivered [${payload.orderId}]`);
        emitter.emit('order-delivered', payload);
    }, 3000);
}

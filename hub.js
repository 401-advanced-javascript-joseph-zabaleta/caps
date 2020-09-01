'use strict';

/** Local */
const events = require('./lib/events.js');
require('./lib/app/driver.js');
require('./lib/app/vendor.js');

events.on('order-ready', payload => logger('order-ready', payload));
events.on('in-transit', payload => logger('in-transit', payload));
events.on('order-delivered', payload => logger('order-delivered', payload));


function logger(event, payload) {
    let time = new Date();
    console.log("EVENT", {event, time, payload});
};

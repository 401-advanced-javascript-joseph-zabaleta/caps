'use strict';

/** Local */
const events = require('./events.js');
require('../lib/app/driver/driver.js');
const vendor = require('../lib/app/vender/vendor.js');
vendor.start();

events.on('order-ready', payload => logger('order-ready', payload));
events.on('in-transit', payload => logger('in-transit', payload));
events.on('order-delivered', payload => logger('order-delivered', payload));


function logger(event, payload) {
    let time = new Date();
    console.log("EVENT", {event, time, payload});
};

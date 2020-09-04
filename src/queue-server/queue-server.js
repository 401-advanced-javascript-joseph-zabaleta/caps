'use strict';

require('dotenv').config({ path: '../../.env' });
const { v4: uuid } = require('uuid');
const { errorMonitor } = require('events');
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
let caps = io.of('/caps');

let queue = {};

caps.on('connection', (socket) => {
    console.log(`[${socket.id.substring(6, 11)}] has connected to the CAPS name space`);
    socket.on('error', (err) => console.error(err));

    socket.on('subscribe', handleSubscribe);
    socket.on('received', handleReceived);
    socket.on('getall', handleGetAll);
    socket.on('delivered', handleDelivered);
    socket.on('pickup', handlePickup);
    socket.on('in-transit', handleTransit);
});


function handleSubscribe(payload) {

    const { event, companyID } = payload;

    if (!queue[event]) {
        queue[event] = {};
    };

    if (!queue[event][companyID]) {
        queue[event][companyID] = {};
    };

    this.join(companyID);

};


function handleReceived(payload) {
    const { messageID, event, companyID } = payload;
    delete queue[event][companyID][messageID];
};

function handleGetAll(data) {

    try {
        const {event , companyID} = data;

        for (const messageID in queue[event][companyID]) {
            let payload = queue[event][companyID][messageID];

            io.in(companyID).emit(event, { messageID, payload });
        };

    } catch (err) {};

};

function handleDelivered(message) {
    let messageID  = uuid();

    queue['delivered'][message.payload.retailer][messageID] = message.payload;

    io.in(message.payload.retailer).emit('delivered', {messageID, payload: message.payload });
};


function handlePickup (message) {
    let messageID = uuid();

    queue['pickup']['driver'][messageID] = message.payload;

    io.in('driver').emit('pickup', { messageID, payload: message.payload });
};


function handleTransit (message) {
    let messageID = uuid();

    queue['in-transit'][message.payload.id][messageID] = message.payload;

    io.in(message.payload.retailer).emit('in-transit', { messageID, payload: message.payload });
};

'use strict';

require('dotenv').config({path:'../../../.env'});
const net = require('net');
const Client = new net.Socket();


Client.connect(process.env.PORT, process.env.HOST, () => {
    console.log(`Driver has connect to the Server on PORT:${process.env.PORT}`)
});


Client.on('data', (buffer) => {

    let message = JSON.parse(buffer.toString());

    if (message.event === 'order-ready') {
        deliverOrder(message.payload);
    };

});



function deliverOrder(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${payload.orderId}]`);
        writeMessage('in-transit', payload);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered [${payload.orderId}]`);
        writeMessage('order-delivered', payload);
    }, 3000);
};


function writeMessage(eventName, payload) {
    let message = {};

    message.event = eventName;
    message.payload = payload;

    Client.write(JSON.stringify(message));
};

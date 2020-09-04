'use strict';

// require('dotenv').config({path:'../../.env'});
const cors = require('cors');
const express = require('express');
const app = express();
const faker = require('faker');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const PORT = 3001;

// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3000/caps');

const Queue = require('./lib/queue.js');
const queue = new Queue('api');



app.get('/', (req, res) => {
    res.send('Working');
});


app.post('/delivery/:retailer/:code', (req, res) => {

    if (!(req.params.retailer && req.params.code)) { throw 'Invalid Delivery Params'};

    let message = {};
    message.retailer = req.params.retailer;
    message.code = req.params.code;

    queue.trigger('delivered', message);
    console.log('triggered', message);

    res.status(200).send(`${message.retailer} - ${message.code} Delivered ${new Date().toUTCString()}`);
    // socket.emit('order-delivered', message);
});

app.post('/pickup', (req, res) => {

    let delivery = req.body || {
        store: '1-206-flowers',
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
    };

    queue.trigger('pickup', delivery);
    res.status(200).send('Order Scheduled for PickUp');

});


app.listen(PORT, () => {
    console.log(`CAPS API Server running on PORT: ${PORT}`);
});

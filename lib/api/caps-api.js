'use strict';

const app = require('express')();
require('dotenv').config({path:'../../.env'});
const PORT = 3000;

const io = require('socket.io-client');
const socket = io.connect(process.env.nameSpace);


app.get('/', (req, res) => {
    res.send('Working');
});


app.post('/delivery/:retailer/:code', (req, res) => {
    let payload = {};
    payload.retailer = req.params.retailer;
    payload.code = req.params.code;

    res.status(200).send('Delivery in Progress...');
    socket.emit('order-delivered', payload);
});


app.listen(PORT, () => {
    console.log(`CAPS API Server running on PORT: ${PORT}`);
});

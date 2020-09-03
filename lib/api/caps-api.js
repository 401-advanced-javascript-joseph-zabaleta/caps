'use strict';

const app = require('express')();
require('dotenv').config({path:'../../.env'});
const PORT = process.env.PORT || 3000;

const io = require('socket.io-client');
// const socket = require(process.env.nameSpace);


app.get('/', (req, res) => {
    res.send('Working');
});


app.post('/delivery/:retailer/:code', (req, res) => {
    console.log(req);
    res.send('complete');
});











app.listen(PORT, () => {
    console.log(`CAPS API Server running on PORT: ${PORT}`);
});

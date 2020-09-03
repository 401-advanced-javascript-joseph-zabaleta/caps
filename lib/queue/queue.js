'use strict';


require('dotenv').config({path:'../../.env'});
const io = require('socket.io-client');
const socket = io.connect(process.env.nameSpace);


class Queue {
    constructor(companyID) {
        this.companyID = companyID,
        this.message = {}
    };


    subscribe(event, action) {
        socket.emit('subscribe', this);

        socket.on(event, (payload) => {
            socket.emit('received', payload);
            action(payload);
        });
    };


    trigger(event, payload) {
        socket.emit(event, payload);
    };

};


module.exports = Queue;

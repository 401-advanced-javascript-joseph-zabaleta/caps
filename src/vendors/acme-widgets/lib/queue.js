'use strict';

// require('dotenv').config({path:'../../.env'});
const io = require('socket.io-client');

class Queue {
    constructor(companyID) {
        this.companyID = companyID,
        this.socket = io.connect('http://localhost:3000/caps');
    };


    subscribe(event, action) {
        this.socket.emit('subscribe', {event, companyID: this.id});

        this.socket.on(event, (data) => {

            const {messageID, payload} = data;

            this.socket.emit('received', {messageID, event, companyID: this.id});
            action(payload);
        });
    };


    trigger(event, payload) {
        this.socket.emit(event, {companyID: this.companyID, payload});
    };

};


module.exports = Queue;

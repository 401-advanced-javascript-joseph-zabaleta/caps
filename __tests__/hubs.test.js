jest.useFakeTimers();
const emitter = require('../lib/events.js');

require('../hub.js');

const delivery = {
  store: '1-206-flowers',
  orderID: '1234',
  customer: 'tester testerooni',
  address: '123 Nowhere Lane',
};

describe('Testing the HUB: ', () => {

    it('Should correctly log a order-ready', () => {

      console.log = jest.fn();

      emitter.emit('order-ready', delivery);

      expect(console.log).toHaveBeenLastCalledWith("EVENT",
        expect.objectContaining({event:'order-ready'}));

    });


    it('Should correctly log an in-transit event', () => {

      console.log = jest.fn();

      emitter.emit('in-transit', delivery);

      expect(console.log).toHaveBeenLastCalledWith("EVENT", expect.objectContaining({event:'in-transit'}));

    });



    it('Should correctly log a delieverd event', () => {

      console.log = jest.fn();

      emitter.emit('order-delivered', delivery);

      expect(console.log).toHaveBeenLastCalledWith("EVENT", expect.objectContaining({event:'order-delivered'}));

    });


});




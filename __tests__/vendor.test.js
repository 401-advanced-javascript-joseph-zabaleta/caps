const vendor = require('../lib/app/vendor.js');
const emitter = require('../lib/events.js');

jest.useFakeTimers();


describe('Testing the Vendor: ', () => {


    it('Should receive delivery politely', () => {
      console.log = jest.fn();
      emitter.emit('order-delivered', { orderId : '1234' });
      expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering [1234]');
    });


    it('Should emit order', () => {

      const callback = jest.fn();

      emitter.on('order-ready', callback);

      expect(callback).not.toBeCalled();

      vendor.start();

      jest.runOnlyPendingTimers();

      expect(callback).toBeCalledWith(expect.objectContaining({storeName:'Joseph\'s Electronics'}));

      expect(callback).toHaveBeenCalledTimes(1);

    });


});



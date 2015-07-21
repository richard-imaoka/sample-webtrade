/**
 * Created by nishyu on 2015/07/13.
 */

var OrderDispatcher = require('./../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _orders = [];

var OrderStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _orders;
  },

  emitChange: function(){
    this.emit('updated');
  },

  addListener: function(callback){
    this.on('updated', callback);
  },

  dispatcherIndex: OrderDispatcher.register(function(payload){
    var actionType = payload.actionType;
    if(actionType === 'Order'){
      _orders.push(payload.order);
      OrderStore.emitChange();
      console.log('action = Order is handled');
    }
    else
      console.log('only action = Order is handled');
  })

});

module.exports = OrderStore;

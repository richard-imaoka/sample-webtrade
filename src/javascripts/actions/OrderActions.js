var OrderDispatcher = require('./../dispatchers/dispatcher');

module.exports = {
  send: function(order){

    var action = {
      actionType: 'Order',
      order:      order
    };

    OrderDispatcher.dispatch(action);
  }
};

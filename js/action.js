var OrderDispatcher = require('./dispatcher');

var OrderActions = {
  send: function(order){

    var action = {
      actionType: 'Order',
      order:      order
    };

    OrderDispatcher.dispatch(action);
  }
};

module.exports = OrderActions;
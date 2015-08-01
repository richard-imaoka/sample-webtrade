var React = require('react');
var OrderView = require('./components/OrderView');
var webAPI = require('./utils/websocket-api');

React.render( <OrderView></OrderView>, document.getElementById('container')  );

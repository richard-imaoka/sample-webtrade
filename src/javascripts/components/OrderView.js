/**
 * Created by nishyu on 2015/07/23.
 */

var React = require('react');
var OrderEntry = require('./OrderEntry');
var OrderTable = require('./OrderTable');
var OrderStore = require('../stores/OrderStore');
var OrderActions = require('../actions/OrderActions');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      tableData: OrderStore.getAll()
    };
  },

  componentDidMount: function(){
    OrderStore.addListener(this._onChange);
  },

  updateOrderEntry: function(order){
    this.setState({
      tableData: this.state.tableData
    });
  },

  addOrder: function(order){
    OrderActions.send(order);
  },

  _onChange: function(){
    this.setState({
      tableData: OrderStore.getAll()
    });
  },

  render: function(){
    return (
        <div>
          <OrderEntry addOrder={this.addOrder}></OrderEntry>
          <OrderTable data={this.state.tableData}></OrderTable>
        </div>
    );
  }
});
var React = require('react');
var Reactable = require('reactable');
var EventEmitter = require('events').EventEmitter;
var OrderActions = require('./js/action');
var OrderStore = require('./js/store');

var Table = Reactable.Table,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

var OrderEntry = React.createClass({

  getInitialState: function(){
    return {
      stock: 'Microsoft',
      price: 100,
      quantity: 1000
    };
  },

  handleUserInput: function(){
    this.props.addOrder(this.state);
  },

  handleChange: function(){
    this.setState({
        stock:    this.refs.stock.getDOMNode().value,
        price:    this.refs.price.getDOMNode().value,
        quantity: this.refs.quantity.getDOMNode().value
    });
  },

  render: function () {
    return (
        <form action="" method="POST">
          <select name="stock" size={2} ref="stock" value={this.state.stock} onChange={this.handleChange}>
            <option value="Google">Google</option>
            <option value="Microsoft" >Microsoft</option>
          </select>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" value={this.state.price} ref="price" onChange={this.handleChange}/>
          <label htmlFor="quantity" >Quantity</label>
          <input type="number" name="quantity" id="quantity" value={this.state.quantity} ref="quantity" onChange={this.handleChange} />
          <button type="button" onClick={this.handleUserInput}>Send Order</button>
        </form>
    );
  }
});

var OrderTable = React.createClass({
  render: function(){
    return (
        <Table className="table" id="table" sortable={true} columns={["stock", "price", "quantity"]} data={this.props.data}>
        </Table>
    );
  }
});

var App = React.createClass({

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

React.render( <App></App>, document.getElementById('container')  );

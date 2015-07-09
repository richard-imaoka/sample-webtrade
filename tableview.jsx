var React = require('react');
var Reactable = require('reactable');

var Table = Reactable.Table,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

var OrderEntry = React.createClass({

  handleUserInput: function(){
    this.props.addOrder(this.props.order);
  },

  handleChange: function(){
    this.props.updateOrderEntry({
        stock: this.refs.stock.getDOMNode().value,
        price:    this.refs.price.getDOMNode().value,
        quantity: this.refs.quantity.getDOMNode().value
    });
  },

  render: function () {
    return (
        <form action="" method="POST">
          <select name="stock" size={2} ref="stock" value={this.props.order.stock}>
            <option value="Google">Google</option>
            <option value="Microsoft" >Microsoft</option>
          </select>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" value={this.props.order.price} ref="price" onChange={this.handleChange}/>
          <label htmlFor="quantity" >Quantity</label>
          <input type="number" name="quantity" id="quantity" value={this.props.order.quantity} ref="quantity" onChange={this.handleChange} />
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
      orderEntry: {stock : "Google", price: 100, quantity: 1000},
      tableData: []
    };
  },

  updateOrderEntry: function(order){
    this.setState({
      orderEntry: order,
      tableData: this.state.tableData
    });
  },

  addOrder: function(order){
    this.state.tableData.push(order);
    this.setState({
      orderEntry: order,
      tableData: this.state.tableData
    });
  },

  render: function(){
    return (
        <div>
          <OrderEntry addOrder={this.addOrder} order={this.state.orderEntry} updateOrderEntry={this.updateOrderEntry}></OrderEntry>
          <OrderTable data={this.state.tableData}></OrderTable>
        </div>
    );
  }
});

React.render( <App></App>, document.getElementById('container')  );

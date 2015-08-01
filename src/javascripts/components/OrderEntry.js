/**
 * Created by nishyu on 2015/07/23.
 */

var React = require('react');

module.exports = React.createClass({

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
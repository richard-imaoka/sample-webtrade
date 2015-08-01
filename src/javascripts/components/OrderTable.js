/**
 * Created by nishyu on 2015/07/23.
 */

var React = require('react');
var Reactable = require('reactable');

var Table = Reactable.Table,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

module.exports = React.createClass({
  render: function(){
    return (
        <Table className="table" id="table" sortable={true} columns={["stock", "price", "quantity"]} data={this.props.data}>
        </Table>
    );
  }
});

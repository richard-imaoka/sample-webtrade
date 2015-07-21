/**
 * Created by nishyu on 2015/07/20.
 */

var io = require('socket.io-client')();

io.on('news', function(data){
  console.log('news arrived!!!');
  console.log(data);
});

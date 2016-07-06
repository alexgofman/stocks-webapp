var express = require("express");
var app = express();
var PORT = process.env.PORT || 3333;
var socket = require("socket.io");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

var SERVER = app.listen(PORT);
var io = socket();
io.attach(SERVER);

var api = require("./routes/api");

var connections = [];

io.sockets.on('connection', function(socket) {
  connections.push(socket.id);
  console.log('Currently ' + connections.length + ' connections');
  
  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket.id), 1);
    console.log('Currently ' + connections.length + ' connections');
  })
  
  // TODO: Display on client side
  // TODO: make svg responsive
  
  socket.on('action', function(action) {
    var stateArray = [];
    switch (action.type) {
      case 'server/get_stocks':
        return api.get(stateArray, function() {
          io.sockets.emit('action', {type: 'symbols', payload:stateArray});
        })
      case 'server/delete_stock':
        var payload = action.payload,
            id      = payload.id,
            index   = payload.index,
            stateArray = payload.data;
        
        return api.Delete(id, function() {
          stateArray.splice(index, 1);
          io.sockets.emit('action', {type:'deleteStock', payload: stateArray});
        })
      case 'server/add_stock':
        var payload     = action.payload,
            stateArray  = payload.data,
            symbol      = payload.symbol;
            
        return api.post(symbol, stateArray, function() {
          io.sockets.emit('action', {type:'addStock', payload: stateArray});
        })
        
    }
  })
  
})

console.log(`Now listening on port ${PORT}`);
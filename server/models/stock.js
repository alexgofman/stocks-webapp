var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  symbol: String
});

module.exports = mongoose.model('Stock', StockSchema);
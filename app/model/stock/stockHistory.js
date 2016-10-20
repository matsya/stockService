var mongoose = require('mongoose'); 
mongoose.Promise = require('bluebird');
var StockHistorySchema = new mongoose.Schema({
  //Stock Price
  symbol: String,
  volume: Number,
  open: Number,
  close: Number,
  date: Date,
  high: Number,
  low: Number,

  //Support & Resistance
  RS:{
    pivot:Number,
    R1:Number,
    R2:Number,
    R3:Number,
    S1:Number,
    S2:Number,
    S3:Number
  },
  reboundFactor:Number
});
module.exports = mongoose.model('StockHistory', StockHistorySchema);

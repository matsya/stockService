var mongoose = require('mongoose'); 
mongoose.Promise = require('bluebird');
var StockSchema = new mongoose.Schema({
  //Stock Price
  symbol: String,
  change: Number,
  price:Number,
  oldPrice:Number,
  volume: Number,
  averageDailyVolume: Number,
  //Change 
  open: Number,
  close:Number,
  previousClose: Number,
  changeInPercent: Number,
  lastTradeDate: Date,
  daysLow: Number,
  daysHigh: Number,

  //histrory
  oneYrTargetPrice: Number,
  dayMovingAverage_50: Number,
  dayMovingAverage_200: Number,
  daysRange: String,
  weekHigh_52: Number,
  weekLow_52: Number,
  changeFrom52WeekLow: Number,
  changeFrom52WeekHigh:Number,
  weekRange_52: String,

  //Stock Summary
  marketCapitalization: String,
  name:String,
  earningsPerShare: Number,
  peRatio: Number,

});
module.exports = mongoose.model('Stocks', StockSchema);
// module.exports = mongoose.model('Portfolio', portfolioSchema);
// module.exports.StockSchema = StockSchema; 
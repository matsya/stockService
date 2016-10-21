var mongoose = require('mongoose'); 
mongoose.Promise = require('bluebird');
var StockSummarySchema = new mongoose.Schema({
  //Stock FK
  stockId: String,
  symbol: String,
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
  //Sentiment
  sentiment:{
    messaage:String,
    bullish:String,
    bearish:String
  },
  //Zack Score
  zackScore: {
    rank:String,
    value:String,
    growth:String,
    momentum:String,
    vgm:String
  },
  reboundFactor:Number,
    //Purchase
  tradingMethod: String,
  quantity:Number,
  dateOfPurchase: Date,
  pricePerShare:Number,
  action:String,
  addedDateTime:Date,
  moifiedDateTime:Date,
  syncStatus:String

  });
module.exports = mongoose.model('StockSummary', StockSummarySchema);
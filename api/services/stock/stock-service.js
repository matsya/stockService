
var stockRepository = require('../../repositories/stock/stock-repository');
var ex = require('../../exceptions/duplicateException');
var utils = require('../../util/utils');
var stockHistoryRepository = require('../../repositories/stock/stockHistory-repository');
var stockSummaryRepository = require('../../repositories/stock/stockSummary-repository');
var Constants = require('../../util/StockFields');
var stockGrabber = require('../stockbot/stockgrabber');
var yahooFinance = require('yahoo-finance');
var googleFinance = require('google-finance');
var moment = require('moment');

function getEarnings() {
   return stockGrabber.getEarningsCalendar();
   
}
function getIPOStocks() {
   return stockGrabber.getIPOCalendar();
   
}

function getSentiment(symbol) {
   return stockGrabber.getSentiment(symbol);   
}

function getTopTrending(trend) {
   return stockGrabber.getTopTrending(trend);
   
}
function getRank(symbol) {
   return stockGrabber.getRank(symbol);
}

function getAllSymbols() {
	return stockRepository.fetchSymbols();
}

function removeStocks(id) {
  return stockRepository.removeStocks(id);
}

function getStockById(id) {
    return stockRepository.getStock(id);
}

// function createStockSummary(stock){
//   var stockSummary = {};
//   stockSummary.stockId =stock._id;
//   stockSummary.symbol =stock.symbol;
//   console.log('symmmary '+stock.symbol);
//   return stockGrabber.getSentimentForStock(stockSummary)
//             .then(stockGrabber.getRankForStock)
//             .then(getStockResitance)
//             .then(stockSummaryRepository.addStocks)
//             .then(getStockHistory);
// }

function saveStockSummary(stocks){
console.log('loading summries');
  return Promise.all(stocks.map(function(stock){
            var stockSummary = {};
                stockSummary.stockId =stock._id;
                stockSummary.symbol =stock.symbol;
                console.log('symmmary '+stock.symbol);
          return stockGrabber.getSentimentForStock(stockSummary)
                    .then(stockGrabber.getRankForStock)
                    .then(getStockResitance)
                    .then(stockSummaryRepository.addStocks)
                    .then(getStockHistory);
      }))
}

function addSymbols(symbols) {
    return validateSybmolExists(symbols)
      .then(getStockDetails)
      .then(stockRepository.addStocks)
      .then(function(stocks){
          saveStockSummary(stocks);
          return stocks;
      })
    .catch(function(err){
       console.log(err);
      return Promise.reject(new ex.DuplicateException(err.message));
      })
  }
//get Stock History (FROM,TO,stock & return Array(stock))
function getStockHistory(stock){
    console.log('stock history '+stock.symbol);
        var TO  = moment().format("YYYY-MM-DD");
        var FROM = moment().subtract(20, "days").format("YYYY-MM-DD");
            return googleFinance.historical({
                  symbol: stock.symbol,
                  from: FROM,
                  to: TO
                })
                .then(function(stockHistory){
                    var stockHistoryRS =[];      
                     for(var i=0; i<stockHistory.length; i++){
                        var stockRS = calculateResistance(stockHistory[i]);
                        stockHistoryRS.push(stockRS);
                     } 
                     console.log(JSON.stringify(stockHistoryRS));
                      return stockHistoryRepository.addStocks(stockHistoryRS);;
    })
}

function calculateResistance(stock){
  var stockRS = {};
  var hlc = {};
  hlc.H = stock.high;
  hlc.L = stock.low;
  hlc.C = stock.close;
  stock.RS =  utils.pivotPointCalucator(hlc);
  stockRS = stock;
 return stockRS;
}

function getStockDetails(symbols){
    return Promise.all(symbols.map(function(symbol){
      return yahooFinance.snapshot({
              fields: Constants.STOCK_FILEDS,
              symbol: symbol
            })
    }));
}


function getStockResitance(stock){
  var TO  = moment().format("YYYY-MM-DD");
  var FROM = moment().subtract(5, "days").format("YYYY-MM-DD");
      return googleFinance.historical({
            symbol: stock.symbol,
            from: FROM,
            to: TO
          })
          .then(function(stockHistory){
              stock.RS = calculateResistance(stockHistory[0]).RS;
              console.log('Full summary '+JSON.stringify(stock));
              return stock;
      })
}

function validateSybmolExists(symbols){
   return Promise.all(symbols.map(function(symbol){
          console.log("find symbol "+symbol);
          return stockRepository.findIfStockExists(symbol);
      }))
      .then(function(results){
        var uSymbols = utils.notIn(symbols,results);
         console.log("validation "+uSymbols);
         if(uSymbols.length>0)
            return uSymbols;
          else 
            throw new Error("The symbols already exists "+symbols);
      })
      .catch(function(err){
        return Promise.reject(err);
      })
 }
 
module.exports = {
  getAllSymbols   : getAllSymbols,
  addSymbols      : addSymbols,
  removeStocks    : removeStocks,
  getStockById    : getStockById,
  getEarnings     : getEarnings,
  getIPOStocks    : getIPOStocks,
  getSentiment    : getSentiment,
  getTopTrending  : getTopTrending
};


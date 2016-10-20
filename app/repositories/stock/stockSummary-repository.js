var StockSummary = require('../../model/stock/stockSummary');

function StockSummaryRepository() {
}


function getStockBySymbol(symbol) {
    return new Promise(function(resolve, reject) {
    StockSummary.find({"symbol":symbol}).exec(function (err,stock) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Get stock by symbol: ' + stock);
                resolve(stock);
              }     
        });
    });
}

function addStocks(stock) {
  console.log("ADDing stock to Summary "+stock.symbol);
  return new Promise(function(resolve, reject) {
    StockSummary.create(stock, function(err, stockSaved) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('created stock by symbol: ' + stockSaved);
                resolve(stockSaved);
              }     
        });
    });
}

function removeStock(id) {
  return new Promise(function(resolve, reject) {
    StockSummary.remove(id).exec(function (err,stock) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Deleted stock : ' + stock);
                resolve(stock);
              }     
        });
    });
}

StockSummaryRepository.prototype = {
  addStocks       : addStocks,
  removeStock    : removeStock,
  getStockBySymbol : getStockBySymbol
};
var stockSummaryRepository = new StockSummaryRepository();

module.exports = stockSummaryRepository;
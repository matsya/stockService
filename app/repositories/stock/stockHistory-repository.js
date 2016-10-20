var StockHistory = require('../../model/stock/stockHistory');

function StockHistoryRepository() {
}


function getStockBySymbol(symbol) {
    return new Promise(function(resolve, reject) {
    StockHistory.find({"symbol":symbol}).exec(function (err,stock) {
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

function addStocks(stocks) {
  return Promise.all(stocks.map(function(stock){
      return StockHistory.create(stock);
    }));
}

function removeStock(id) {
  return new Promise(function(resolve, reject) {
    StockHistory.remove(id).exec(function (err,stock) {
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

StockHistoryRepository.prototype = {
  addStocks       : addStocks,
  removeStock    : removeStock,
  getStockBySymbol : getStockBySymbol
};
var stockHistoryRepository = new StockHistoryRepository();

module.exports = stockHistoryRepository;
var IpoStock = require('../../model/stock/ipo');

function StockHistoryRepository() {
}


function getStockBySymbol(symbol) {
    return new Promise(function(resolve, reject) {
    IpoStock.find({"symbol":symbol}).exec(function (err,stock) {
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

function addStock(stocks) {
  console.log("is it working "+JSON.stringify(stocks));
  return Promise.all(stocks.map(function(stock){
      return IpoStock.create(stock);
    }));
}

function removeStock(id) {
  return new Promise(function(resolve, reject) {
    IpoStock.remove(id).exec(function (err,stock) {
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
  addStock       : addStock,
  removeStock    : removeStock,
  getStockByMonth : getStockByMonth,
  getStockByDateRange : getStockByDateRange,
};
var stockHistoryRepository = new StockHistoryRepository();

module.exports = stockHistoryRepository;
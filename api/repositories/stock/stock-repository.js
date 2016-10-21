var Stock = require('../../model/stock/stock');

module.exports = {
  fetchSymbols   	: fetchSymbols,
  addStocks       : addStocks,
  removeStocks    : removeStocks,
  getStock 			  : getStock,
  getStockBySymbol : getStockBySymbol,
  findIfStockExists :findIfStockExists
};

function fetchSymbols() {
	return new Promise(function(resolve, reject) {
    // custom query to find all stocks, return only symbols
    Stock.find().select("symbol")
        .exec()
        .then(function (symbols){
            console.log('Get all stock symbols: ' + symbols);
            resolve(symbols);
        })
        .catch(function(err){
          console.log(err);
          reject(err);
        })
  })
}

function getStock(id) {
  	return new Promise(function(resolve, reject) {
  	Stock.findById(id).exec(function (err,stock) {
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

function getStockBySymbol(symbol) {
    return new Promise(function(resolve, reject) {
    Stock.find({"symbol":symbol}).exec(function (err,stock) {
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

function findIfStockExists(symbol) {
    return new Promise(function(resolve, reject) {
    Stock.findOne({"symbol":symbol}).select("symbol").exec(function (err,stock) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Get stock by symbol: ' + stock);
                if (stock === undefined || stock === null) {
                    resolve(stock);
                } else {
                    resolve(stock.symbol);
                }
                
              }     
        });
    });
}

function addStocks(stocks) {
  //console.log("input "+JSON.stringify(stocks));
  return Promise.all(stocks.map(function(stock){
      return Stock.create(stock);
    }));
}

function removeStocks(id) {
  return new Promise(function(resolve, reject) {
    Stock.remove(id).exec(function (err,stock) {
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

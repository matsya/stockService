var stockService = require('../../../services/stock/stock-service');

function getAllSymbols(req, res, next) {
stockService.getAllSymbols()
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

function getEarningsCalendar(req, res, next) {
stockService.getEarnings()
        .then(function(responseData){
          var flattened = responseData.reduce(function(a, b) {
            return a.concat(b);
          });
          res.format({
              json: function(){
                res.status(200).json(flattened);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

function getTopTrending(req, res, next) {
  stockService.getTopTrending(req.params.trend)
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

function getSentiment(req, res, next) {
stockService.getSentiment(req.params.symbol)
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

function getIPOCalendar(req, res, next) {
stockService.getIPOStocks()
        .then(function(responseData){
        var flattened = responseData.reduce(function(a, b) {
            return a.concat(b);
          });
          res.format({
              json: function(){
                res.status(200).json(flattened);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}
function addSymbols(req, res, next) {
  stockService.addSymbols(req.body.symbols)
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error("Error is "+err);
            res.format({
              json: function(){
                res.status(500).json(err);
                }
            });
        });
}

function removeStocks(req, res, next) {
   stockService.removeStocks(req.params.Id)
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

function getStockById(req, res, next){
   stockService.getStockById(req.params.id)
        .then(function(responseData){
          res.format({
              json: function(){
                res.status(200).json(responseData);
                }
            });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).text(err);
        });
}

module.exports = {
  get               : getAllSymbols,
  post              : addSymbols,
  delete            : removeStocks,
  getStockById  : getStockById,
  showEarningsCalendar : getEarningsCalendar,
  showIPOCalendar : getIPOCalendar,
  getSentiment : getSentiment,
  showMarketTrend : getTopTrending

};

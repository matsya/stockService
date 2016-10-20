var portfolioService = require('../../../services/portfolio/portfolio-service');

function PortfolioController() {

}

//GET all 
function getAll(req, res, next) {
    portfolioService.getAll()
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

//GET portfolio by Id
function getPortfolioById(req, res, next) {
    portfolioService.getPortfolioById(req.params.id)
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

//POST Profolio
function createPortfolio(req, res, next) {
var portfolio = req.body;
    portfolioService.createPortfolio(portfolio)
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

//PUT update Portfolio
function updatePortfolio(req, res, next) {
var portfolio = req.body;
    portfolioService.updatePortfolio(portfolio)
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

//DELETE portfolio 
function deletePortfolio(req, res, next) {

    portfolioService.deletePortfolio(req.params.id)
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

function addStocks(req,res,next) {

}

function removeStocks(req,res,next) {
  
}

//Controller perform basic validation on the input data
PortfolioController.prototype = {
  get           : getAll,
  getById       : getPortfolioById,
  post          : createPortfolio,
  put           : updatePortfolio,
  delete        : deletePortfolio,
  addStocks     : addStocks,
  removeStocks  : removeStocks
};

var portfolioController = new PortfolioController();

module.exports = portfolioController;

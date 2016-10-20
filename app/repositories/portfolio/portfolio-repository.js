var Portfolio = require('../../model/portfolio/portfolio');
function PortfolioRepository() {
}

function readPortfolioData() {
	return new Promise(function(resolve, reject) {
  	Portfolio.find({}, function (err, portfolios) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Get all portfolios: ' + portfolios);
               	resolve(portfolios);
              }     
        });
  	});
}

function readPortfolioDataById(id) {
  	return new Promise(function(resolve, reject) {
  	Portfolio.findById(id, function (err, portfolio) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Get portfolio by Id: ' + portfolio);
               	resolve(portfolio);
              }     
        });
  	});
}
function createPortfolio(portfolioData) {

return new Promise(function(resolve, reject) {
  	Portfolio.create(portfolioData, function (err, portfolio) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Created portfolio: ' + portfolio);
               	resolve(portfolio);
              }     
        });
  	});
}

function updatePortfolio(oldPortfolio,newPortfolio) {
  return new Promise(function(resolve, reject) {
  	console.log("portfolio to update "+newPortfolio);
  	oldPortfolio.update(newPortfolio, function (err, portfolio) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Updated portfolio : ' + portfolio);
               	resolve(newPortfolio);
              }     
        });
  	});
}
function deletePortfolio(portfolio) {
    return new Promise(function(resolve, reject) {
  	portfolio.remove(function (err, portfolios) {
              if (err) {
                  console.error(err);
                  reject(error);
              } else {
                console.log('Deleted portfolio: ' + portfolios);
               	resolve(portfolios);
              }     
        });
  	});
}

PortfolioRepository.prototype = {
   	getPortfolioData: readPortfolioData,
  	getPortfolioDataById: readPortfolioDataById,
  	createPortfolio: createPortfolio,
  	editPortfolio: updatePortfolio,
  	deletePortfolio: deletePortfolio
};

var portfolioRepository = new PortfolioRepository();

module.exports = portfolioRepository;

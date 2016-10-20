var portfolioRepository = require('../../repositories/portfolio/portfolio-repository');

function PortfolioService() {
}

// fetch all portfolios
function fetchAll() {
	return portfolioRepository.getPortfolioData();
}
// fetch profolio by ID 
function fetchPortfolioById(id) {
  	return portfolioRepository.getPortfolioDataById(id);
}

// create profolio 
function createPortfolio(portfolio) {
  	return portfolioRepository.createPortfolio(portfolio);
}

// update profolio 
function editPortfolio(newPortfolio) {
  	//return portfolioRepository.editPorfolio(portfolio.id);
  	console.log("Portfolio to edit "+newPortfolio.id);
  	return new Promise(function(resolve, reject) { 
		portfolioRepository.getPortfolioDataById(newPortfolio.id)
			//.then(portfolioRepository.editPortfolio(newPortfolio))
			.then(function(oldPortfolio){
				resolve(portfolioRepository.editPortfolio(oldPortfolio,newPortfolio));
			})
			.catch(function(err){
				reject(err);
			});
  	})
}

// delete profolio 
function removePortfolio(id) {
  	return new Promise(function(resolve, reject) { 
		portfolioRepository.getPortfolioDataById(id)
			.then(portfolioRepository.deletePortfolio)
			.then(function(portfolio){
				resolve(portfolio)
			})
			.catch(function(err){
				reject(err);
			});
  	})
}

// Call different service eg: notification
// analytics service or Event Souceing
PortfolioService.prototype = {
	getAll: fetchAll,
  	getPortfolioById: fetchPortfolioById,
  	createPortfolio: createPortfolio,
  	updatePortfolio: editPortfolio,
  	deletePortfolio: removePortfolio
};

var portfolioService = new PortfolioService();

module.exports = portfolioService;

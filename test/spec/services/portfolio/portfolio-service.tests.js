
describe('PortfolioService Tests', function() {

  var portfolioService;

  beforeEach(function() {
    portfolioService = require('../../../../app/services/portfolio/portfolio-service');
  });

  describe('lookupPortfolio', function() {

    it('should be a function', function(done) {
      expect(portfolioService.lookupPortfolio).to.be.a('function');
      done();
    });

  });
});

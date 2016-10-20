
describe('PortfolioRepository Tests', function() {

  var portfolioRepository;

  beforeEach(function() {
    portfolioRepository = require('../../../../app/repositories/portfolio/portfolio-repository');
  });

  describe('getPortfolioData()', function() {

    it('should be a function', function(done) {
      expect(portfolioRepository.getPortfolioData).to.be.a('function');
      done();
    });

  });
});

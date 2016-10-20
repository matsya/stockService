
describe('StockRepository Tests', function() {

  var stockRepository;

  beforeEach(function() {
    stockRepository = require('../../../../app/repositories/stock/stock-repository');
  });

  describe('getStockData()', function() {

    it('should be a function', function(done) {
      expect(stockRepository.getStockData).to.be.a('function');
      done();
    });

  });
});

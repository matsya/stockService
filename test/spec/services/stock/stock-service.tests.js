
describe('StockService Tests', function() {

  var stockService;

  beforeEach(function() {
    stockService = require('../../../../app/services/stock/stock-service');
  });

  describe('lookupStock', function() {

    it('should be a function', function(done) {
      expect(stockService.lookupStock).to.be.a('function');
      done();
    });

  });
});

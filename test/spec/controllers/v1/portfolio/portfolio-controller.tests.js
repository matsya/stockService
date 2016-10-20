
describe('PortfolioController Tests', function() {

  var portfolioController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    portfolioController = require('../../../../../app/controllers/v1/portfolio/portfolio-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(portfolioController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      portfolioController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        portfolioController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});

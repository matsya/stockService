var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var portfolio = new Schema({
	portfolioName : String,
	description : String,
	symbols : Array
});

module.exports = mongoose.model('Portfolio', portfolio);
//module.exports.portfolioSchema = portfolioSchema; //Export bugSchema so that models.js can access it
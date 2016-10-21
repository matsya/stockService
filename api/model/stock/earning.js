var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var earningsSchema = new Schema({
	symbol : String,
	earningsDate: Date,
	currentESP : Number,
	previousESP : Number,
	noOfEstimate : Number,
	met :String

});

module.exports = mongoose.model('Earnings', earningsSchema);
//module.exports.portfolioSchema = portfolioSchema; //Export bugSchema so that models.js can access it
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var IPOSchema = new Schema({
	symbol : String,
	market: String,
	price : Number,
	amount : Number,
	IPODate : Date
});

module.exports = mongoose.model('IPOStocks', IPOSchema);
//module.exports.portfolioSchema = portfolioSchema; //Export bugSchema so that models.js can access it
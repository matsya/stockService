var moment = require('moment');
var request = require('request');
const URL_EARNINGS = 'http://www.nasdaq.com/earnings/earnings-calendar.aspx?date=';
const URL_IPO ='http://www.nasdaq.com/markets/ipos/activity.aspx?tab=upcoming&month=';
const URL_STOCKTWITS = 'http://stocktwits.com/symbol/';
const URL_YAHOO_FINANCE = 'http://finance.yahoo.com/';
const URL_ZACKS = 'https://www.zacks.com/stock/quote/'
var cheerio = require('cheerio');
var cheerioTableparser = require('cheerio-tableparser');
var pivot = require("array-pivot")

var MAX_DAYS = 5;
var MAX_MONTHS = 2;

getWorkingDateRange = function(category,MAX){
        var startDate = moment(new Date());
        startDate.subtract(1,category);
        var noOfDays = 1;
        var dateRange = [];
        var d = new Date();
        for (var i = 0; i <MAX; i++) {
                startDate.add(1,category);
                if(startDate.isoWeekday() >=1 && startDate.isoWeekday()<=5) {
                    if(category.toString() == 'days') {
                    dateRange.push(startDate.format('YYYY-MMM-DD'));
                    } else if(category.toString() == 'months') {
                     dateRange.push(startDate.format('YYYY-MM'));   
                    }
                }
        }   
        return dateRange;
};

parseIPO = function(html) {
            var $ = cheerio.load(html);
            cheerioTableparser($);
            var listOfStock = [];
            var tableRow = $('.genTable').find('table').parsetable(false, false, true);
            var pivotData = pivot(tableRow);
            for (var i=1; i<Object.keys(pivotData).length; i++){
                var stock = {};
                stock.symbol = pivotData[""+i][1].trim();
                stock.Market =pivotData[""+i][2].trim();
                stock.Price =pivotData[""+i][3].trim();
                stock.Amount =pivotData[""+i][4].trim();
                stock.IpoDate =pivotData[""+i][6].trim();
               // console.log(stock);
                listOfStock.push(JSON.parse(JSON.stringify(stock)));
            }
           //// console.log("No of stocks "+listOfStock.length);
            return listOfStock;
};

parseEarnings = function(html) {
            var $ = cheerio.load(html);
            cheerioTableparser($);
            var listOfStock = [];
            var listOfSymbols = [];
            var tableRow = $('#ECCompaniesTable').parsetable(false, false, true);
            var pivotData = pivot(tableRow);
            for (var i=1; i<Object.keys(pivotData).length; i++){
                var regExp = /\(([^)]+)\)/;
                var stock = {};
                stock.symbol = regExp.exec(pivotData[""+i][1])[1];
                listOfSymbols.push(regExp.exec(pivotData[""+i][1])[1]);
                stock.earningsDate =pivotData[""+i][2].trim();
                stock.currentESP =pivotData[""+i][4].trim();
                stock.previousESP =pivotData[""+i][7].trim();
                stock.noOfEstimate =pivotData[""+i][5].trim();
                stock.met =pivotData[""+i][8].trim();
                listOfStock.push(JSON.parse(JSON.stringify(stock)));
            }
            return listOfStock;
};

nasdaqEarningsCalPromise = function (URL) {
  console.log("ULR "+URL);
	  return new Promise(function(resolve, reject) {
	     request(URL, function(error, response, html){
	    // some code that fills in err if there is an error
	    if (error) {
	      reject(error);
	    } else {
	      resolve(html);
	    }
     });
  });
};

function getEarningsCalendar() {
   	var listOfDays = getWorkingDateRange('days',MAX_DAYS);
   	console.log(listOfDays);
   		return Promise.all(listOfDays.map(function(day){
			return nasdaqEarningsCalPromise(URL_EARNINGS+day)
			        .then(function(html){
			         var validStockList = parseEarnings(html);
			          console.log(" Earnings "+JSON.stringify(validStockList));
			          return validStockList;
			        })
       				.catch(function(err) {
			                 console.error(err);
			                 Promise.reject(err);
			        });
   }))
}

function getIPOCalendar() {
	var startDate = moment(new Date());
   	var listOfMonths = [];
   	listOfMonths.push(startDate.format('YYYY-MM'));
   	startDate.add(1,'months');
   	listOfMonths.push(startDate.format('YYYY-MM'));
   	console.log(listOfMonths);
   		return Promise.all(listOfMonths.map(function(month){
			return nasdaqEarningsCalPromise(URL_IPO+month)
			        .then(function(html){
			         var validStockList = parseIPO(html);
			          console.log(" IPO "+JSON.stringify(validStockList));
			          return validStockList;
			        })
       				.catch(function(err) {
			                 console.error(err);
			                 Promise.reject(err);
			});
     }))
}

function findTextAndReturnRemainder(target, variable){
		    var chopFront = target.substring(target.search(variable)+variable.length,target.length);
		    var result = chopFront.substring(1,chopFront.search("}}")-1);
		    return result;
        }

function getTopTrending(trend) {
	var url = URL_YAHOO_FINANCE +trend;
	return new Promise(function(resolve, reject) {
    	request(url, function(error, response, html){
	        if(!error){
	            var $ = cheerio.load(html);
	            var json = {};
	            var dataBlog = $('script').text();
	            var findAndClean = findTextAndReturnRemainder(dataBlog,'"symbols":');
	            var listOfSymbols = findAndClean.split(",");
	            json.symbols =listOfSymbols;
	            console.log('message '+ findAndClean);
	            resolve(json);
	        }
	        else {
	        	console.log("Request errored out "+error);
	        	reject(error);
	        }
    })
})
}

function getSentiment(symbol) {
	var url = URL_STOCKTWITS+symbol;
	return new Promise(function(resolve, reject) {
    	request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = { message : "", bullish : "", bearish : ""};
            json.message =  $('.message-count').text().trim();
            json.bullish =$('.bullish').text().trim();
            json.bearish = $('.bearish').text().trim();
            resolve(json);
        }else {
	        	console.log("Request errored out "+error);
	        	reject(error);
	   }
    })
})
}


function getSentimentForStock(stock) {
	var url = URL_STOCKTWITS+stock.symbol;
	console.log('sentiment '+url);
	return new Promise(function(resolve, reject) {
    	request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = {};
            json.message =  $('.message-count').text().trim();
            json.bullish =$('.bullish').text().trim();
            json.bearish = $('.bearish').text().trim();
            stock.sentiment = json;
            console.log('sentiment' +JSON.stringify(stock));
            resolve(stock);
        }else {
	        	console.log("Request errored out "+error);
	        	reject(error);
	   }
    })
})
}
function getRank(symbol) { //premium_research
	var url = URL_ZACKS+symbol;
	console.log('zack '+url);
	return new Promise(function(resolve, reject) {
    	request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var zackRank = {};
             $('section.pad0').each(function(i, element){
             	//console.log($(this).text());
             	zackRank.rank = $(this).find('td span.rank_chip').first().text();
             	zackRank.value = $(this).find('th p span').eq(0).text();
             	zackRank.growth = $(this).find('th p span').eq(1).text();
             	zackRank.momentum = $(this).find('th p span').eq(2).text();
             	zackRank.vgm = $(this).find('th p span').eq(3).text();

             });
            //cheerioTableparser($);
            // var section = $('section').attr('id', 'premium_research').html();
            
            // zackRank.rank = section.children('.rank_chip').text();
            // zackRank.momentum = section.children('p').text();
            //var tableRow = $('.callout_box3').find('table').parsetable(false, false, true);
            console.log('rank '+JSON.stringify(stock));
            resolve(zackRank);
        }else {
	        	console.log("Request errored out "+error);
	        	reject(error);
	   }
    })
})
}

function getRankForStock(stock) { //premium_research
	var url = URL_ZACKS+stock.symbol;
	return new Promise(function(resolve, reject) {
    	request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var zackRank = {};
             $('section.pad0').each(function(i, element){
             	//console.log($(this).text());
             	zackRank.rank = $(this).find('td span.rank_chip').first().text();
             	zackRank.value = $(this).find('th p span').eq(0).text();
             	zackRank.growth = $(this).find('th p span').eq(1).text();
             	zackRank.momentum = $(this).find('th p span').eq(2).text();
             	zackRank.vgm = $(this).find('th p span').eq(3).text();

             });
            //cheerioTableparser($);
            // var section = $('section').attr('id', 'premium_research').html();
            
            // zackRank.rank = section.children('.rank_chip').text();
            // zackRank.momentum = section.children('p').text();
            //var tableRow = $('.callout_box3').find('table').parsetable(false, false, true);
            stock.zackScore =zackRank;
            console.log('rank '+JSON.stringify(stock));
            resolve(stock);
        }else {
	        	console.log("Request errored out "+error);
	        	reject(error);
	   }
    })
})
}
module.exports = {
	getEarningsCalendar,
	getIPOCalendar,
	getTopTrending,
	getSentiment,
	getSentimentForStock,
	getRank,
	getRankForStock}
//module.exports.getIPOCalendar = getIPOCalendar;
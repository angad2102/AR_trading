var request = require('request');
var teamID = "szCchRWg28C4c6NOK9H6SA";
var stockid = ["0005", "0386", "0388", "3988", "0001"];

function buy_limit(exchangeID,stockNo,quantity,price){
	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"buy","qty":quantity,"order_type":'limit',"price":price};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
    	console.log(body);
        if (!error && response.statusCode == 200) {
        	//
        }
    }
);
}

function sell_limit(exchangeID,stockNo,quantity,price){
	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'limit',"price":price};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
    	console.log(body);
        if (!error && response.statusCode == 200) {
        	//
        }
    }    
);
}

function limit_loop(){
for (var j in stockid){
	request.get('http://cis2016-exchange1.herokuapp.com/api/market_data/'+stockid[j], function(data,err,body){
	    var market_data = JSON.parse(body);
	    //console.log(market_data);
	    var maxarr = [];
	    var minarr = [];
	    var buy_sum = 0;
	    var sell_sum = 0;
	    for (var i in market_data.buy) {
	    	//console.log(i + " : " +market_data.buy[i]);
	    	maxarr.push(Number(i));
		}
		//console.log(maxarr);
	    //console.log(Math.max.apply(null, maxarr));
	    var dev =  Math.max.apply(null, maxarr)* 0.98;
	    console.log("DEV = "+dev);
	    for (var i in market_data.buy) {
	    	if ( Number(i)> dev)
	    		buy_sum += Number(market_data.buy[i]);
		}
	    console.log("buy_sum : "+buy_sum);
	    for (var i in market_data.sell) {
	    	minarr.push(Number(i));
		}
		console.log("MIN: "+Math.min.apply(null, minarr));
		var dev_min = Math.min.apply(null, minarr);
		for (var i in market_data.sell) {
	    	if ( Number(i)< dev_min* 1.01)
	    		sell_sum += Number(market_data.sell[i]);
		}
		console.log("sell_sum : "+sell_sum);

	//////compare and place limit
		if (sell_sum > buy_sum && dev_min > dev){
			var amount = sell_sum - buy_sum;
			buy_limit(1, market_data.symbol, amount, dev);
			while (amount > 0){
				sell_limit(1, market_data.symbol, amount, dev_min);
				amount = amount/2 -1;
			}
		}
	});

	request.get('http://cis2016-exchange2.herokuapp.com/api/market_data/'+stockid[j], function(data,err,body){
	    var market_data = JSON.parse(body);
	    //console.log(market_data);
	    var maxarr = [];
	    var minarr = [];
	    var buy_sum = 0;
	    var sell_sum = 0;
	    for (var i in market_data.buy) {
	    	//console.log(i + " : " +market_data.buy[i]);
	    	maxarr.push(Number(i));
		}
		//console.log(maxarr);
	    //console.log(Math.max.apply(null, maxarr));
	    var dev =  Math.max.apply(null, maxarr)* 0.98;
	    console.log("DEV = "+dev);
	    for (var i in market_data.buy) {
	    	if ( Number(i)> dev)
	    		buy_sum += Number(market_data.buy[i]);
		}
	    console.log("buy_sum : "+buy_sum);
	    for (var i in market_data.sell) {
	    	minarr.push(Number(i));
		}
		console.log("MIN: "+Math.min.apply(null, minarr));
		var dev_min = Math.min.apply(null, minarr);
		for (var i in market_data.sell) {
	    	if ( Number(i)< dev_min* 1.01)
	    		sell_sum += Number(market_data.sell[i]);
		}
		console.log("sell_sum : "+sell_sum);

	//////compare and place limit
		if (sell_sum > buy_sum && dev_min > dev){
			var amount = sell_sum - buy_sum;
			buy_limit(2, market_data.symbol, amount, dev);
			while (amount > 0){
				sell_limit(2, market_data.symbol, amount, dev_min);
				amount = amount/2 -1;
			}
		}
	});
	request.get('http://cis2016-exchange3.herokuapp.com/api/market_data/'+stockid[j], function(data,err,body){
	    var market_data = JSON.parse(body);
	    //console.log(market_data);
	    var maxarr = [];
	    var minarr = [];
	    var buy_sum = 0;
	    var sell_sum = 0;
	    for (var i in market_data.buy) {
	    	//console.log(i + " : " +market_data.buy[i]);
	    	maxarr.push(Number(i));
		}
		//console.log(maxarr);
	    //console.log(Math.max.apply(null, maxarr));
	    var dev =  Math.max.apply(null, maxarr)* 0.98;
	    console.log("DEV = "+dev);
	    for (var i in market_data.buy) {
	    	if ( Number(i)> dev)
	    		buy_sum += Number(market_data.buy[i]);
		}
	    console.log("buy_sum : "+buy_sum);
	    for (var i in market_data.sell) {
	    	minarr.push(Number(i));
		}
		console.log("MIN: "+Math.min.apply(null, minarr));
		var dev_min = Math.min.apply(null, minarr);
		for (var i in market_data.sell) {
	    	if ( Number(i)< dev_min* 1.01)
	    		sell_sum += Number(market_data.sell[i]);
		}
		console.log("sell_sum : "+sell_sum);

	//////compare and place limit
		if (sell_sum > buy_sum && dev_min > dev){
			var amount = sell_sum - buy_sum;
			buy_limit(3, market_data.symbol, amount, dev);
			while (amount > 0){
				sell_limit(3, market_data.symbol, amount, dev_min);
				amount = amount/2 -1;
			}
		}
	});

}
    setTimeout(limit_loop,1000);
}
limit_loop();
// setImmediate(limit_loop);
// }

// limit_loop();
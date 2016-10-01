var request = require('request');
var async = require('async');


function get_market_data(market){
	request.get('http://cis2016-exchange'+market+'.herokuapp.com/api/market_data', function(data,err,body){
		// console.log(data,body);
		var market_data = JSON.parse(body);
		console.log(market_data[0].bid+'/'+market_data[0].ask+'  '+market_data[1].bid+'/'+market_data[1].ask+'  '+market_data[2].bid+'/'+market_data[2].ask+'  '+market_data[3].bid+'/'+market_data[3].ask+'  '+market_data[4].bid+'/'+market_data[4].ask);
		
	});
}

var teamID = "BWmeenFE6h2XMKUEaHBpDw";

function buy(exchangeID,stockNo,quantity){


	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"buy","qty":quantity,"order_type":'market'};
	console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            if(body.status=="FILLED"){
            	// var ret = {
            	// 	success: true,
            	// 	prics: body.fills[0].price,
            	// 	qty: body.fills[0].qty
            	// }
            	// //console.log(body.fills[0]);
            	// console.log(ret);
            	// return ret;

            	//Any database calls we would like to make
            }
        }
    }
);
	
}

function sell(exchangeID,stockNo,quantity){


	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'market'};
	console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            if(body.status=="FILLED"){
            	// var ret = {
            	// 	success: true,
            	// 	prics: body.fills[0].price,
            	// 	qty: body.fills[0].qty
            	// }
            	// //console.log(body.fills[0]);
            	// console.log(ret);
            	// return ret;

            	//Any database calls we would like to make
            }
        }
    }
);
	
}

function buy_limit(exchangeID,stockNo,quantity,price){


	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"buy","qty":quantity,"order_type":'limit',"price":price};
	console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);

            // if(body.status=="FILLED"){
            // 	var ret = {
            // 		success: true,
            // 		prics: body.fills[0].price,
            // 		qty: body.fills[0].qty
            // 	}
            // 	//console.log(body.fills[0]);
            // 	console.log(ret);
            // 	return ret;

            // 	//Any database calls we would like to make
            //}
        }
    }
);
	
}

function sell_limit(exchangeID,stockNo,quantity,price){


	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'limit',"price":price};
	console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);

            if(body.status=="FILLED"){
            	var ret = {
            		success: true,
            		prics: body.fills[0].price,
            		qty: body.fills[0].qty
            	}
            	//console.log(body.fills[0]);
            	console.log(ret);
            	return ret;

            	//Any database calls we would like to make
            }
        }
    }
);
	
}
//get_market_data(1);


function delete_limit(exchangeID,id){


	//var delete_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'limit',"price":price};
	//console.log(post_data);
	request.delete(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders/'+id,
    function (error, response, body) {
    	//console.log(body);
        if (!error && response.statusCode == 200) {
        	// console.log(body);
         //    console.log(body);

         //    if(body.status=="FILLED"){
         //    	var ret = {
         //    		success: true,
         //    		prics: body.fills[0].price,
         //    		qty: body.fills[0].qty
         //    	}
         //    	//console.log(body.fills[0]);
         //    	console.log(ret);
         //    	return ret;

         //    	//Any database calls we would like to make
         //    }
        }
    }
);
	
}
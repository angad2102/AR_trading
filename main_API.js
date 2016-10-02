var request = require('request');
var async = require('async');
var teamID = "R1HJn23qQ6dCNeYxuVfL5Q";
var differences_bid = [];
var differences_ask = [];

differences_bid[1] = new Array();
differences_bid[2] = new Array();
differences_bid[3] = new Array();
differences_ask[1] = new Array();
differences_ask[2] = new Array();
differences_ask[3] = new Array();

function buy(exchangeID,stockNo,quantity){
	console.log("buy");

	//stockNo = Number(stockNo);

	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"buy","qty":quantity,"order_type":'market'};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
    	console.log(body);
        if (!error && response.statusCode == 200) {
            //console.log(body);

            if(body.status=="FILLED"){
            	var ret = {
            		success: true,
            		prics: body.fills[0].price,
            		qty: body.fills[0].qty
            	}
            	//console.log(body.fills[0]);
            	console.log(ret);

            	//Any database calls we would like to make
            }

            
        }

    }
);
	
}

function sell(exchangeID,stockNo,quantity){
	console.log("sell");
//	stockNo = Number(stockNo);

	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'market'};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);

            if(body.status=="FILLED"){
            	var ret = {
            		success: true,
            		prics: body.fills[0].price,
            		qty: body.fills[0].qty
            	}
            	//console.log(body.fills[0]);
            	console.log(ret);

            //	Any database calls we would like to make
            }
        }

    }
);
	
}

function buy_limit(exchangeID,stockNo,quantity,price){
	console.log("buy");

	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"buy","qty":quantity,"order_type":'limit',"price":price};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
    	        	console.log(body);

        if (!error && response.statusCode == 200) {
        	order_id.push({exchangeid:exchangeID,id:body.id});

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

	console.log("sell");
	var post_data = {"team_uid":teamID,"symbol":stockNo,"side":"sell","qty":quantity,"order_type":'limit',"price":price};
	//console.log(post_data);
	request.post(
    'http://cis2016-exchange'+exchangeID+'.herokuapp.com/api/orders',
    { json: post_data },
    function (error, response, body) {
    	            console.log(body);

        if (!error && response.statusCode == 200) {

        	order_id.push({exchangeid:exchangeID,id:body.id});

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

var mdata = [
			[{dummy:"dummy"}],
			[{dummy:"dummy"},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0}],
			[{dummy:"dummy"},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0}],
			[{dummy:"dummy"},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0},{bid:0.0,ask:0.0}],	
]
var last_bid = [];
last_bid[3] = [];
last_bid[1] = [];
last_bid[2] = [];
var last_ask = [];
last_ask[3] = [];
last_ask[1] = [];
last_ask[2] = [];
function get_market_data(market){

	request.get('http://cis2016-exchange'+market+'.herokuapp.com/api/market_data', function(data,err,body){


		// if(err){
		// 	//console.log(err);
		// 	get_market_data(market);
		// 	return;
		// }
		// console.log(body);
		// if(body=null||body==undefined){
		// 	//	console.log(body);
		// 		get_market_data(market);
		// 		return;
		// }
		//console.log(err);
		var market_data;
		try{
		    market_data = JSON.parse(body);
		}catch (err){
			get_market_data(market);
			return;
		}
		
		//market_data = body;
		// if(last_bid[market].length==0)
		// {	differences_bid[market] = [];
		// 	differences_ask[market] = [];
		// 	}
		// console.log(market_data[0].time);
		// console.log(market_data[0].time+': '+market_data[0].bid+'/'+market_data[0].ask+'  '+market_data[1].bid+'/'+market_data[1].ask+'  '+market_data[2].bid+'/'+market_data[2].ask+'  '+market_data[3].bid+'/'+market_data[3].ask+'  '+market_data[4].bid+'/'+market_data[4].ask);
		for(i=1;i<=5;i++){
			mdata[market][i]["bid"] = market_data[i-1].bid;
			mdata[market][i]["ask"] = market_data[i-1].ask;
			 
		 if(differences_bid[market][i]!=null){
		 	//console.log(differences_bid[market][i]);
		 //	differences_bid[market][i][0] = "12";
		 //	differences_ask[market][i][0] = "123";	
		 	//	console.log(mdata[market][i]["bid"] - last_bid[market][i]);

		 		differences_bid[market][i].push(mdata[market][i]["bid"] - last_bid[market][i]);
			 	differences_ask[market][i].push(mdata[market][i]["ask"] - last_ask[market][i]);
		 	
			}else {
				differences_bid[market][i] = new Array();
				differences_ask[market][i] = new Array();
				last_bid[market] = [];
				last_ask[market] = [];

			}
			last_bid[market][i] = mdata[market][i]["bid"];
			last_ask[market][i] = mdata[market][i]["ask"];
			if(differences_bid[market][i].length>3){
		 		differences_bid[market][i].splice(0,1);
		 		differences_ask[market][i].splice(0,1);
		 	}
		}
		
	//	 console.log(mdata);
		
		
		
		get_market_data(market);
		
	});
}

last=0;

get_market_data(1);
get_market_data(2);
get_market_data(3);



var stock_reference = [];
stock_reference[1] = "0005";
stock_reference[2] = "0386";
stock_reference[3] = "0388";
stock_reference[4] = "3988";
stock_reference[5] = "0001";

var stock_reference_opp = {
	"0005" : "1",
    "0386" : "2",
	"0388" : "3",
	"3988" : "4",
	"0001" : "5"
};

qty = [];
qty[1] = 200;
qty[2] = 200;
qty[3] = 200;
qty[4] = 200;
qty[5] = 200;
var order_id =[];
//Objects with exchangeid and orderid

//loop it over 10 seconds ? 

//asynnchronise the three processes
function buy_sell_automated(i){


	
	for(j=0;j<order_id.length;j++){
		delete_limit(order_id.exchangeID,order_id.id);
	}
	order_id = [];
		for(var j=1;j<=5;j++){
			var value =prediction_bid(i,j);
			if (value==0){
				continue;
			}
			
			stockNo = stock_reference[j];
			console.log(stockNo);
			sell_limit(i,stockNo,350,mdata[i][j]["bid"]+2*prediction_bid(i,j));
			if(value>0.1){
				//buy_limit(i,stockNo ,20,mdata[i][j]["ask"]+(prediction_bid(i,j)));
				sell_limit(i,stockNo,40,mdata[i][j]["bid"]+2*prediction_bid(i,j));
				//sell(i,stockNo,1000,mdata[i][j]["bid"]);
				//buy(i,stockNo ,1000);
			}else if(value>0){
				//buy_limit(i,stockNo ,20,mdata[i][j]["ask"]);
				sell_limit(i,stockNo,40,mdata[i][j]["bid"]+2*prediction_bid(i,j));
				//sell_limit(i,stockNo,1000,mdata[i][j]["bid"]);
				//Check upar se 
				//buy(i,stockNo,1000);

			}else if(value<0.1){
				//sell_limit(qty[j],stockNo,1000,mdata[i][j]["bid"]-(prediction_bid(i,j)/2));
				sell_limit(i,stockNo,200,mdata[i][j]["bid"]-(prediction_bid(i,j)/2));
				//sell(i,stockNo,1000);

			}else if(value<0){
				sell_limit(i,stockNo,200,mdata[i][j]["bid"]);
				//sell(i,stockNo,1000);
			}
		}
 	setTimeout(function(){ buy_sell_automated(i); }, 10000);
}
 	

//Code the first function 

function first_function(){
	while(mdata[1][1]==0){
		//Do nothing
	}
	//Calculate lowest prices 
	//all five
buy_sell_automated(1);
buy_sell_automated(2);
buy_sell_automated(3);



}

//send buy for positive and send sell for negative
function prediction_bid(market,stocknnum){

	var sum_bid =0; 
	var sum_act = 0;
	if(differences_bid!=null){
		if(differences_bid[market]!=null){
			if(differences_bid[market][stocknnum]!=null)
				{for (x=0;x<differences_bid[market][stocknnum].length;x++){
					sum_bid+=differences_bid[market][stocknnum][x];
					sum_act += differences_ask[market][stocknnum][x];
					}
					return ((sum_bid/(differences_bid[market][stocknnum].length))>(sum_act/(differences_ask[market][stocknnum].length)) && (sum_bid/(differences_bid[market][stocknnum].length))>0) ? (sum_bid/(differences_bid[market][stocknnum].length)) : (sum_act/(differences_ask[market][stocknnum].length));
				}
			
		}
	}
	return 0;
	//setTimeout(function(){ prediction(1,1); }, 5000);

}

first_function();

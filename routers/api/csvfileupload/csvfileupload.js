var express = require("express");
var nodemailer = require('nodemailer');
var fs = require("fs"); 
var router = express.Router();
var Cryptr = require('cryptr'),  
cryptr = new Cryptr('myTotalySecretKey');
var asyncLoop = require('node-async-loop');
var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var dateTime = require('node-datetime');
var CsvDb = require('csv-db');

module.exports = router;
var bodyParser = require("body-parser");
 router.use(bodyParser.json({limit: '500mb'}));

router.get('/tapan1',function(req,res,next){
	var csvDb = new CsvDb('Sygicdata.csv');
req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
			

	csvDb.get().then((data) => {
	  console.log(data.length);
	   /* console.log(data);
	  return;
	   */
	  var string = '';
	  
	  
	 var i=0;
	  asyncLoop(data, function (item, next)
		{
			 var array = data[i]['id,name,country_id'].split(",");
			 console.log(array);
			var dt = dateTime.create();
			var otp = Math.floor(Math.random()*900000) + 100000;
			var formatted = dt.format('YmdHMSl');
			var ida = formatted+otp;
			
			var cityId = array[0];
			var cityname = array[1];
			var country_id = array[2];
			
			
			var query = conn.query("select * from tbl_city_list where cityId = ?",[cityId], function(err, result) {
						if (!!err) {
							console.error('SQL error: ', err);
							return next(err);
						}
						else{
							if(result.length > 0){
								
							}else{
								console.log(cityId);
								var query = conn.query("insert into tbl_city_list (id, cityId, cityName, countyId, timestamp)values(?, ?, ?, ?, now())",[ida,cityId,cityname,country_id], function(err, result) {
											if (!!err) {
												console.error('SQL error: ', err);
												return next(err);
											}
											else{
												
												i++;
												next();
											}
								});
							}
							i++;
							next();
		
	
						
					}
			});
		}, function (err)
		{
			if (err)
			{
				console.error('Error: ' + err.message);
				return;
			}
		 
			console.log('Finished!');
		});

	  
	  
	 /*  for(var i=0; i< data.length; i++){
		 
			var dt = dateTime.create();
			var otp = Math.floor(Math.random()*900000) + 100000;
			var formatted = dt.format('YmdHMSl');
			var id = formatted+otp;
			  var array = data[i]['id,name,country_id'].split(",");
			  if(typeof array[0] == 'undefined' || array[0] == undefined || array[0] == ''){
				  var foursquareCategory = '';
			  }else{
				  var foursquareCategory = array[0];
			  }
			  
			  if(typeof array[1] == 'undefined' || array[1] == undefined || array[1] == ''){
				  var Category = '';
			  }else{
				  var Category = array[1];
			  }
			  
			  if(typeof array[2] == 'undefined' || array[2] == undefined || array[2] == ''){
				  var subCategory = '';
			  }else{
				  var subCategory = array[2];
			  }

			   console.log(foursquareCategory);
			   
	  } */
								
		console.log(string);
	}, (err) => {
	  console.log(err);
	});
	
	}
});
});


router.get('/csvFileupload',function(req,res,next){
	
	var csvDb = new CsvDb('imput.csv');
	csvDb.get().then((data) => {
	  console.log(data.length);
	  console.log(data);
	  
	  
	 
	  var string = '';
	  for(var i=0; i< data.length; i++){
		 
			var dt = dateTime.create();
			var otp = Math.floor(Math.random()*900000) + 100000;
			var formatted = dt.format('YmdHMSl');
			var id = formatted+otp;
			  var array = data[i]['id','name'].split(",");
			  if(typeof array[0] == 'undefined' || array[0] == undefined || array[0] == ''){
				  var foursquareCategory = '';
			  }else{
				  var foursquareCategory = array[0];
			  }
			  
			  if(typeof array[1] == 'undefined' || array[1] == undefined || array[1] == ''){
				  var Category = '';
			  }else{
				  var Category = array[1];
			  }
			  
			 
			   
			  if(string == ''){
				  string = "('"+id+"','"+foursquareCategory+"','"+Category+"',now())";
			  }else{
				  string += ",('"+id+"','"+foursquareCategory+"','"+Category+"',now())";
			  }
		}
		console.log(string);
	}, (err) => {
	  console.log(err);
	});
});
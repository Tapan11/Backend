var express=require("express");
var request = require("request");
var asyncLoop = require('node-async-loop');
var router = express.Router();
module.exports = router;

router.get('/scrapping1', function(req, res, next) {
	try {
		
		tbsecretSygicdatalist0002.removedata(function(err, result) {
			if (err) throw err;
			res.json({"status": "success","message":"Password set successfully"});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});				





router.post('/countryList', function(req, res, next) {
	try {
		countryList001.addcountry(req.body,function(err, result) {
			if (err) throw err;
			res.json({"status": "success","message":"Password set successfully"});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});	


router.post('/cityList', function(req, res, next) {
	try {
		tbsecretcitylistlist0001.addcity(req.body,function(err, result) {
			if (err) throw err;
			res.json({"status": "success","message":"Password set successfully"});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});	










router.get('/scrapping', function(req, res, next) {
	var array = ["https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00901.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00902.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00903.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00904.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00905.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00906.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00907.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00908.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00909.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00910.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00911.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00912.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00913.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00914.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00915.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00916.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00917.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00918.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00919.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00920.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00921.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00922.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00923.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00924.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00925.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00926.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00927.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00928.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00929.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00930.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00931.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00932.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00933.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00934.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00935.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00936.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00937.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00938.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00939.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00940.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00941.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00942.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00943.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00944.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00945.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00946.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00947.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00948.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00949.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00950.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00951.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00952.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00953.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00954.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00955.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00956.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00957.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00958.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00959.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00960.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00961.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00962.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00963.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00964.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00965.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00966.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00967.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00968.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00969.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00970.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00971.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00972.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00973.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00974.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00975.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00976.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00977.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00978.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00979.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00980.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00981.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00982.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00983.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00984.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00985.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00986.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00987.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00988.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00989.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00990.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00991.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00992.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00993.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00994.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00995.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00996.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00997.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00998.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-00999.json","https://s3-eu-west-1.amazonaws.com/sygic-travel-place-exports/production/travialist/2018-03-21-en-003b4887ed6544cd943e3f8e171281d5/places-01000.json"];
	
		var i=101;
		asyncLoop(array, function (arraylist, next)
		{
			
			request({
					url: arraylist,
					json: true
				}, function (error, response, body) {
					
				if (!error && response.statusCode === 200) {
					console.log(arraylist);
					var json = JSON.stringify(response.body);
					var obj = JSON.parse(json);
					try {
						console.log(i);
						tbsecretSygicdatalist0002.addSygicdata(obj, function(err, result) {
							/* if (err) throw err; */
							console.log(err);
							i++;
							console.log(i);
							next();
							
							/* res.json({"status": "success","message":"Password set successfully"}); */
						});
					} catch (ex) {
						console.error("Internal error:");
						return next(ex);
					}
					
				}else{
					next();
					console.log(error);
				}
			});
		},function(err){
			res.json({"status": "success","message":"Password set successfully"});
		});
	/* } */
});






		
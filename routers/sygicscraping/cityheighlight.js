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







router.post('/cityHome', function(req, res, next) {
	try {
		
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			} else {
				conn.query("select a.iso from tbl_ArrivalguidesPoi as a,tbl_arrivalguides as b where b.CountryCode=a.iso and a.iso in(select iso from tbl_ArrivalguidesPoi)",function(err,result){
					console.log(err);
					res.json({"status": "error","message":result});
					return;
					var array = result;
					console.log(array);
					asyncLoop(array, function (item, next)
						{
						console.log(item.iso); 
						var query = conn.query("call STR_CityHome('','','"+item.iso+"','"+item.name+"','')", function(err, result) {
						if (!!err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length>0){
								tblcityshortdescription001.addCityShortDescription(result[0],function(err, result1) {
									if (err) throw err;
									
									tblcityfulldescription001.addCityfullDescription(result[1],function(err, result) {
									if (err) throw err;
									next();
								});
								});
								
								}else{ 
									res.json({"status": "error","message":"The city data not found"});
								}
							}
							});
						}, function (err)
						{
							res.json({"status": "success","message":"The city data not found"});
						});
					});
					
			}
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});	




















router.post('/cityHeighlite', function(req, res, next) {
	try {
		
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			} else {
				conn.query("select iso from tbl_ArrivalguidesPoi",function(err,result){
					var array = result;
					console.log(array);
					asyncLoop(array, function (item, next)
						{
						console.log(item.iso)
						var query = conn.query("call STR_CityHighlights('','','"+item.iso+"','','')", function(err, result) {
						if (!!err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length>0){
								cityHeighliteList001.addCityHighlights(result[0],function(err, result) {
									if (err) throw err;
									next();
								});
								
								}else{ 
									res.json({"status": "error","message":"The city data not found"});
								}
							}
							});
						}, function (err)
						{
							res.json({"status": "success","message":"The city data not found"});
						});
					});
					
			}
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







		
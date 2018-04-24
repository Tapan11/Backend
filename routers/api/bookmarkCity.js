var express = require("express");
var nodemailer = require('nodemailer');
var asyncLoop = require('node-async-loop');
var fs = require("fs"); 
var router = express.Router();
/* GET home page. */
var multer  = require('multer');
var upload = multer({ dest: 'images/' })

var bodyParser = require("body-parser");

 
router.use(bodyParser.json({limit: '500mb'}));
router.use(bodyParser.urlencoded({ extended: true }));

var dateTime = require('node-datetime');

var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');
 
 var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var cityImages ='https://travialist.com/ImagesCity/';

 module.exports = router;
 
 
 /* -------------------------------- Book mark city on city home page start -------------------- */
 router.post('/bookmarkCity',function(req,res,next){
	if(req.body.bookmarkCity == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.bookmarkCity;
		
		if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.bookmark == undefined || reqObj.bookmark == '' && reqObj.bookmark != false){
			var ex = "Internal error:Object bookmark is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						
						var query = conn.query("select * from tbl_BookmarkCity where userID ='"+reqObj.userID+"' and arrivalID = '"+reqObj.cityID+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									if(reqObj.bookmark == true){
										var bookmarkCity = 1;
									}else{
										var bookmarkCity = 0;
									}
										conn.query("update tbl_BookmarkCity set bookmark = '"+bookmarkCity+"', lastUpdate = now() where userID ='"+reqObj.userID+"' and arrivalID = '"+reqObj.cityID+"'", function(err, result) {
											if (!!err) {
												console.error('SQL error: ', err);
												return next(err);
											}else{
												res.json({"status": "success","data":bookmarkCity,"message":"Book mark updated"});
											}
										});
								}else{
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var id = formatted+otp;
									conn.query("insert into tbl_BookmarkCity (id, userID, arrivalID, bookmark, timestamp,lastUpdate)values('"+id+"', '"+reqObj.userID+"', '"+reqObj.cityID+"', 1, now(),now())", function(err, result) {
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","data":1,"message":"Book mark added"});
										}
									});
								}
							}
						});
					}
				});
			}catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
});

/* -------------------------------- Book mark city on city home page End -------------------- */
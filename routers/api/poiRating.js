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

/* ------------------------------------------ POI rating Api start ---------------------------------- */

router.post('/poiRating',function(req,res,next){
	
	if(req.body.poiRating == undefined){
		var ex = "Internal error:Object is poiRating not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.poiRating;
		if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object cityID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poiID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.rating == undefined || reqObj.rating == ''){
			var ex = "Internal error:Object rating is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.description == undefined || reqObj.description == ''){
			var ex = "Internal error: Object description is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error: Object platform is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}
		else{
			
			var userID = reqObj.userID;	
			var arrivalID = reqObj.arrivalID;
			var poiID = reqObj.poiID;
			var rating = reqObj.rating;
			var description = cryptr.encrypt(reqObj.description);
			var platform = reqObj.platform;
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						
						var query = conn.query("", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								res.json({"status": "success","message":"Rating added successfuly"});
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

/* ------------------------------------------ POI rating Api end ---------------------------------- */


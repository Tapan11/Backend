var express = require("express");
var nodemailer = require('nodemailer');
var router = express.Router();
/* GET home page. */
var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

router.get('/', function(req, res, next) {
	res.sendFile(__dirname + "/webcode/map.html");
});

var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';

var adminname = 'superadmin';
var adminpassword = '12345678';

module.exports = router;

/* Admin login Api for web start*/

router.post('/authUser', function(req, res, next) {
	
	if(req.body.authUser == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.authUser;
		console.log(reqObj);
		if(reqObj.username == undefined || reqObj.username == ''){
			var ex = "Internal error:Object username is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.password == undefined || reqObj.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						if(reqObj.username == adminname){
							if(reqObj.password == adminpassword){
								res.json({"status": "success","message":"Admin Login successfully"});
							}else{
								res.json({"status": "error","message":"Password is worng"});
							}
						}else{
							res.json({"status": "error","message":"Username is worng"});
						}
						
					}
				});
			} catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
});

/* Admin login Api for web End*/
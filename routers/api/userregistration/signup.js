/* express = require("express");
nodemailer = require('nodemailer');
fs = require("fs"); 


Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

 bodyParser = require("body-parser");
 */
 /* GET home page. */
 
/* router.use(bodyParser.json({limit: '500mb'}));
router.use(bodyParser.urlencoded({ extended: true }));
 */
router = express.Router();
module.exports = router;

/* -------------------------------------------------- Manual signup email check start ---------------------------------------------------- */
router.post('/emailVerify',function(req,res,next){
	if(req.body.emailVerify == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.emailVerify;
		if(typeof reqObj.email == 'undefined' || reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.platform == 'undefined' || reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try {
				var email = cryptLib.encrypt(reqObj.email, key, iv);
				var data = {email:email,logintype:'M'};
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					if(result.length>0){
						res.json({"status":"error", "message":"Email id already exists."});
					}else{
						var fullname = '';
						var otp = Math.floor(Math.random()*900000) + 100000;
						var userid= '';
						var status = mailfile.sendmail(fullname,otp,reqObj.email,userid,function(err, result){
							if(result == 1){
								res.json({"status": "success","otp":otp, "message":"Code send successfully"});
							}else{
								res.json({"status":"error", "message":"Code is not send successfully."});
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
/* -------------------------------------------------- Manual signup email check end  ----------------------------------------------------- */
 
 
 
 
/* ---------------------------------------------------------- Manual signup end -------------------------------------------------------- */


 router.post('/signup',function(req,res,next){
	if(req.body.signup == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.signup;
		if(typeof reqObj.email == 'undefined' || reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(typeof reqObj.password == 'undefined' || reqObj.password == undefined || reqObj.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.first_name == 'undefined' || reqObj.first_name == undefined || reqObj.first_name == ''){
			var ex = "Internal error:Object first_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.last_name == 'undefined' || reqObj.last_name == undefined || reqObj.last_name == ''){
			var ex = "Internal error:Object last_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.mobile_number == 'undefined' || reqObj.mobile_number == undefined || reqObj.mobile_number == ''){
			var ex = "Internal error:Object mobile_number is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.country_code == 'undefined' || reqObj.country_code == undefined || reqObj.country_code == ''){
			var ex = "Internal error:Object country_code is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.platform == 'undefined' || reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try {
				var email = cryptLib.encrypt(reqObj.email, key, iv);
				var mobile_number = cryptLib.encrypt(reqObj.mobile_number, key, iv);
				
				var data = {
					mobile_number:mobile_number
				}
				
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					if(result.length>0){
						
						res.json({"status":"error", "message":"This mobile number is already associated with other Travialist account. Please go back and try different mobile number.."});
					}else{
						var data = {
							email:email,
							logintype : 'M'
						}
						
						tbsecret0001Two.find(data, function(err, result) {
							if (err) throw err;
							if(result.length>0){
								res.json({"status":"error", "message":"Email id already exists."});
							}else{
								
								var status = uniquecode.uniqueSystme(function(err, resultUsercode){
									if (err!='success') {
										console.error('SQL Connection error: ', err);
										return next(err);
									} else{
										if(resultUsercode != ''){
											var password = cryptLib.encrypt(reqObj.password, key, iv);
											var first_name = cryptLib.encrypt(reqObj.first_name, key, iv);
											var last_name = cryptLib.encrypt(reqObj.last_name, key, iv);
											var mobile_number = cryptLib.encrypt(reqObj.mobile_number, key, iv);
											var country_code = cryptLib.encrypt(reqObj.country_code, key, iv);
											var platform = cryptLib.encrypt(reqObj.platform, key, iv);
											var city = '';
											var gender = '';
											var countryName = '';
					
											var data1 = {
												"first_name":first_name,
												"last_name":last_name,
												"email":email,
												"city":city,
												"password":password,
												"isverified":0,
												"platform":platform,
												"question_one":'',
												"answer_one":'',
												"question_two":'',
												"answer_two":'',
												"otp":'',
												"dob":'1991-01-01',
												"gender":gender,
												"countryName":countryName,
												"mobile_number":mobile_number,
												"country_code_mob":country_code,
												"user_unique_key":resultUsercode,
												"logintype":'M',
												"fb_id":'',
												"profilepic":'',
												"ptype": '',
												"psetpassword":''
											}
											
											tbsecret0001Two.create(data1 ,function(err,result){
												if (err) throw err;
												var userid = result._id;
												var first_name = cryptLib.decrypt(result.first_name, key, iv);
												var last_name = cryptLib.decrypt(result.last_name, key, iv);
												var email = cryptLib.decrypt(result.email, key, iv);
												if(result.city == ''){
													var city = '';
												}else{
													var city = cryptLib.decrypt(result.city, key, iv);
												}
												if(result.mobile_number == ''){
													var mobile_number = '';
												}else{
													var mobile_number = cryptLib.decrypt(result.mobile_number, key, iv);
												}
												if(result.country_code_mob == ''){
													var country_code_mob = '';
												}else{
													var country_code_mob = cryptLib.decrypt(result.country_code_mob, key, iv);
												}
												
												var user_unique_key = result.user_unique_key;
												var arr1 = new Array();
												var obj1={};
												obj1.userid=userid;
												obj1.first_name=first_name;
												obj1.last_name=last_name;
												obj1.email=email;
												obj1.city=city;
												obj1.mobile_number=country_code_mob+'-' + mobile_number;
												obj1.user_unique_key=user_unique_key;
												arr1.push(obj1);
												res.json({"status":"success", "data":arr1,"message":"Login successfully"});
											});
										}
									}
								});
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

 /* ---------------------------------------------------------- Manual signup end -------------------------------------------------------- */
 
 /* ---------------------------------------------------------- FB login start ----------------------------------------------------------- */
 router.post('/fbLogin',function(req,res,next){
	if(req.body.fbLogin == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.fbLogin;
		if(typeof reqObj.email == 'undefined' || reqObj.email == undefined){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.first_name == 'undefined' || reqObj.first_name == undefined || reqObj.first_name == ''){
			var ex = "Internal error:Object first_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.last_name == 'undefined' || reqObj.last_name == undefined || reqObj.last_name == ''){
			var ex = "Internal error:Object last_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.fb_id == 'undefined' || reqObj.fb_id == undefined || reqObj.fb_id == ''){
			var ex = "Internal error:Object fb_id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.profile_pic == 'undefined' || reqObj.profile_pic == undefined){
			var ex = "Internal error:Object profile_pic is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.dob == 'undefined' || reqObj.dob == undefined){
			var ex = "Internal error:Object dob is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.gender == 'undefined' || reqObj.gender == undefined){
			var ex = "Internal error:Object gender is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.platform == 'undefined' || reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object gender is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try {
				
				
				if(typeof reqObj.email == 'null' || reqObj.email == null || reqObj.email == ''){
					var email = '';
				}else{
					var email = cryptLib.encrypt(reqObj.email, key, iv);
				}
							
							
				var data = {fb_id:reqObj.fb_id,logintype:'F'};
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					
					if(result.length>0){
						var userid = result[0]['_id'];
						var first_name = cryptLib.decrypt(result[0]['first_name'], key, iv);
						var last_name = cryptLib.decrypt(result[0]['last_name'], key, iv);
						if(typeof result[0]['email'] =='null' || result[0]['email']== null || result[0]['email'] == ''){
							var email ='';
						}else{
							var email = cryptLib.decrypt(result[0]['email'], key, iv);
						}
						var city = cryptLib.decrypt(result[0]['city'], key, iv);
						var platform = cryptLib.decrypt(result[0]['platform'], key, iv);
						var user_unique_key = result[0]['user_unique_key'];
						var mobile_number = cryptLib.decrypt(result[0]['mobile_number'], key, iv);
						var country_code_mob = cryptLib.decrypt(result[0]['country_code_mob'], key, iv);
						var gender = result[0]['gender'];
						var passwordtype = result[0]['ptype'];
						var passwordset = result[0]['psetpassword'];
						var arr1 = new Array();
						var obj1={};
						obj1.userid=userid;
						obj1.first_name=first_name;
						obj1.last_name=last_name;
						obj1.email=email;
						obj1.city=city;
						obj1.mobile_number=country_code_mob+'-' + mobile_number;
						obj1.gender=gender;
						obj1.passwordtype=passwordtype;
						obj1.passwordset=passwordset;
						obj1.user_unique_key=user_unique_key;
						obj1.platform=platform;
						arr1.push(obj1);
						res.json({"status":"success", "data":arr1,"message":"Login successfully"});
					}else{
						var status = uniquecode.uniqueSystme(function(err, resultUsercode){
							if (err!='success') {
								console.error('SQL Connection error: ', err);
								return next(err);
							} else{
								
								if(typeof reqObj.email == 'null' || reqObj.email == null || reqObj.email == ''){
									var email = '';
								}else{
									var email = cryptLib.encrypt(reqObj.email, key, iv);
								}
								
								if(resultUsercode != ''){
									if(typeof reqObj.first_name == 'null' || reqObj.first_name == null || reqObj.first_name == ''){
										var first_name = '';
									}else{
										var first_name = cryptLib.encrypt(reqObj.first_name, key, iv);
									}
									if(typeof reqObj.last_name == 'null' || reqObj.last_name == null || reqObj.last_name == ''){
										var last_name = '';
									}else{
										var last_name = cryptLib.encrypt(reqObj.last_name, key, iv);
									}
									var mobile_number = '';
									var country_code = '';
									var gender = reqObj.gender;
									var profilepic =reqObj.profile_pic;
									var platform = cryptLib.encrypt(result[0]['platform'], key, iv);
									var fb_id = reqObj.fb_id;
									var password = '';
									var city = '';
									var countryName = '';
									var data = {
										first_name:first_name,
										last_name:last_name,
										email:email,
										city:city,
										password:password,
										platform:platform,
										gender:gender,
										countryName:countryName,
										mobile_number:mobile_number,
										country_code_mob:country_code,
										user_unique_key:resultUsercode,
										logintype:'F',
										cdate:Date(),
										fb_id:fb_id,
										profilepic:profilepic
									}
											
									
									tbsecret0001Two.create(data ,function(err,result){
										if (err) throw err;
											var userid = result._id;
											var first_name = cryptLib.decrypt(result.first_name, key, iv);
											var last_name = cryptLib.decrypt(result.last_name, key, iv);
											var email = cryptLib.decrypt(result.email, key, iv);
											if(result.city == ''){
												var city = '';
											}else{
												var city = cryptLib.decrypt(result.city, key, iv);
											}
											if(result.mobile_number == ''){
												var mobile_number = '';
											}else{
												var mobile_number = cryptLib.decrypt(result.mobile_number, key, iv);
											}
											if(result.country_code_mob == ''){
												var country_code_mob = '';
											}else{
												var country_code_mob = cryptLib.decrypt(result.country_code_mob, key, iv);
											}
											
											var user_unique_key = result.user_unique_key;
											var arr1 = new Array();
											var obj1={};
											obj1.userid=userid;
											obj1.first_name=first_name;
											obj1.last_name=last_name;
											obj1.email=email;
											obj1.city=city;
											obj1.mobile_number=country_code_mob+'-' + mobile_number;
											obj1.user_unique_key=user_unique_key;
											arr1.push(obj1);
											res.json({"status":"success", "data":arr1,"message":"Login successfully"});
											
										
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
 
 
 /* ---------------------------------------------------------- FB login end ------------------------------------------------------------- */
 
 
 /* ----------------------------------------------------------------Login start ---------------------------------------------------------- */
 
 router.post('/login', function(req, res, next) {
	if(req.body.login == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.login;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.password == undefined || reqObj.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			var email = cryptLib.encrypt(reqObj.email, key, iv);
			var password = cryptLib.encrypt(reqObj.password, key, iv);
			var platform = cryptLib.encrypt(reqObj.platform, key, iv);
		
			try {

				var data = {email:email,logintype:'M'};
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					
					if(result.length>0){
						var data = {email:email,password:password,logintype:'M'};
						tbsecret0001Two.find(data, function(err, result) {
							if (err) throw err;
							
							if(result.length>0){
								var userid = result[0]['_id'];
								var first_name = cryptLib.decrypt(result[0]['first_name'], key, iv);
								var last_name = cryptLib.decrypt(result[0]['last_name'], key, iv);
								var email = cryptLib.decrypt(result[0]['email'], key, iv);
								var city = cryptLib.decrypt(result[0]['city'], key, iv);
								var mobile_number = cryptLib.decrypt(result[0]['mobile_number'], key, iv);
								var country_code_mob = cryptLib.decrypt(result[0]['country_code_mob'], key, iv);
								var country_code_mob = cryptLib.decrypt(result[0]['country_code_mob'], key, iv);
								var user_unique_key = result[0]['user_unique_key'];
								var gender = result[0]['gender'];
								var passwordtype = result[0]['ptype'];
								var passwordset = result[0]['psetpassword'];
								var arr1 = new Array();
								var obj1={};
								obj1.userid=userid;
								obj1.first_name=first_name;
								obj1.last_name=last_name;
								obj1.email=email;
								obj1.city=city;
								obj1.mobile_number=country_code_mob+'-' + mobile_number;
								obj1.user_unique_key=user_unique_key;
								obj1.gender=gender;
								obj1.passwordtype=passwordtype;
								obj1.passwordset=passwordset;
								arr1.push(obj1);
								res.json({"status": "success","data":arr1,"message":"Login successfully"});
												
							}else{
								res.json({"status": "error","error_type":"email","message":"Email id not exists."});
							}
						});
					}else{
						res.json({"status": "error","error_type":"email","message":"Email id not exists."});
					}
				});
			} catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
	
		}
		
	}
	
});

/* -----------------------------------------------------------------Login end ------------------------------------------------------------ */

/* --------------------------------------------------------------Pin set start ----------------------------------------------------------- */
router.post('/setSecurity', function(req, res, next) {
	if(typeof req.body.setSecurity == 'undefined' || req.body.setSecurity ==undefined){
		 console.error("Internal error:Object is not ddd defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.setSecurity;
		if(typeof reqObj.userid == 'undefined' || reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(typeof reqObj.passwordset == 'undefined' || reqObj.passwordset == undefined){
			var ex = "Internal error:Object passwordset is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.type == 'undefined' || reqObj.type == undefined){
			var ex = "Internal error:Object type is not asdfasdf defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var userid = reqObj.userid;
			var passwordset = reqObj.passwordset;
			try {
				if(reqObj.type == 'pin'){
					var ptype = reqObj.type;
				}else if(reqObj.type == 'pattern'){
					var ptype = reqObj.type;
				}else{
					var ptype = reqObj.type;
				}
				var query = {_id:userid}
				var data = {ptype:ptype,psetpassword:passwordset};
				tbsecret0001Two.update(query,data, function(err, result) {
					if (err) throw err;
					
					res.json({"status": "success","message":"Password set successfully"});
				});
			} catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
	
});
/* --------------------------------------------------------------Pin set end ------------------------------------------------------------- */
 
 
/* --------------------------------------------------------------Pin set start ---------------------------------------------------------- */
router.post('/restPinPattern', function(req, res, next) {
	if(req.body.restPinPattern == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.restPinPattern;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			var userid = reqObj.userid;
			try {
				var ptype = '';
				var passwordset = '';
				var query = {_id:userid}
				var data = {ptype:ptype,psetpassword:passwordset};
				tbsecret0001Two.update(query,data, function(err, result) {
					if (err) throw err;
					
					res.json({"status": "success","message":"Pin and pattern set reset"});
				});
			} catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
});
/* --------------------------------------------------------------Pin set end ------------------------------------------------------------- */
 
 
 
 /* ------------------------------------------------------ Passowrd reset start ----------------------------------------------------------- */
router.post('/resetPassword', function(req, res, next) {
	if(req.body.resetPassword == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.resetPassword;
		if(typeof reqObj.userid == 'undefined' || reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(typeof reqObj.password == 'undefined' || reqObj.password == undefined || reqObj.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try {
				var userid = reqObj.userid;
				var password = cryptLib.encrypt(reqObj.password, key, iv);
				var query = {logintype:'M',_id:userid};
				var data = {password:password};
				tbsecret0001Two.update(query,data, function(err, result) {
					if (err) throw err;
					
						if(result.affectedRows >0){
							res.json({"status": "success","message":"Password reset successfully"});
						}else{
							res.json({"status": "error","message":"Something went wrong!"});
						}
					});
				} catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
	
		}
		
	}
	
});
/* --------------------------------------------------------------Pin set end ------------------------------------------------------------- */
 
 
 

/* ---------------------------------------------------------------- Checkmail start ------------------------------------------------------ */

router.post('/checkmail',function(req,res,next){
	
	if(req.body.checkmail == undefined){
		console.error("Internal error:Object is not defiend");
		var ex = "Internal error:Object is not defiend";
		res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.checkmail;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var email = cryptLib.encrypt(reqObj.email, key, iv);
			var platform = cryptLib.encrypt(reqObj.platform, key, iv);
			
			try{
				var data = {email:email,logintype:'M'};
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					
					if(result.length>0){
						var first_name = cryptLib.decrypt(result[0]['first_name'], key, iv);
						var last_name = cryptLib.decrypt(result[0]['last_name'], key, iv);
						var email = cryptLib.decrypt(result[0]['email'], key, iv);
						var fullname = first_name + ' ' +last_name;
						var otp = Math.floor(Math.random()*900000) + 100000;
						var userid= result[0]['_id'];;
						var status = mailfile.sendmail(fullname,otp,email,userid,function(err, result){
							if(result == 1){
								res.json({"status": "success","otp":otp, "message":"Code send successfully"});
							}else{
								res.json({"status":"error", "message":"Code is not send successfully."});
							} 
						});
					}else{
						res.json({"status":"error", "message":"Email id not exists."});
						
					}
				});
			}catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
});

/* ------------------------------------ Checkmail end ------------------------------------------ */



/* ----------------------------------------- Forgot password start ----------------------------------- */

router.post('/forgotPassword',function(req,res,next){
	if(req.body.forgotPassword == undefined){
		console.error("Internal error:Object is not defiend");
		var ex = "Internal error:Object is not defiend";
		res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.forgotPassword;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.password == undefined || reqObj.password == ''){
			return next(ex);
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}
		/* else if(reqObj.otp == undefined || reqObj.otp == ''){
			return next(ex);
			var ex = "Internal error:Object otp is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		} */
		else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var password = cryptLib.encrypt(reqObj.password, key, iv);
			var platform = cryptLib.encrypt(reqObj.platform, key, iv);
			var userid = reqObj.userid;
			
			try{
				var query = {_id:userid,logintype:'M'};
				tbsecret0001Two.find(data, function(err, result) {
					if (err) throw err;
					
					if(result.length>0){
						var data = {password:password};
						tbsecret0001Two.update(query,data, function(err, result) {
							if (err) throw err;
							
							if(result.affectedRows >0){
								res.json({"status": "success","message":"Password reset successfully"});
							}else{
								res.json({"status": "error","message":"Something went wrong!"});
							}
						});
					}else{
						res.json({"status":"error", "message":"Email id not exists."});
					}
				}); 
			}catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
		}
	}
});

/* ------------------------------------ Forgot password end ------------------------------------------ */


 
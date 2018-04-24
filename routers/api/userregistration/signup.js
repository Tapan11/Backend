var express = require("express");
var nodemailer = require('nodemailer');
var fs = require("fs"); 
var router = express.Router();
/* GET home page. */
var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

var bodyParser = require("body-parser");
 

 
 router.use(bodyParser.json({limit: '500mb'}));
 router.use(bodyParser.urlencoded({ extended: true }));

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
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var email = cryptr.encrypt(reqObj.email);
						conn.query("select * from tbl_login where email ='"+email+"' and logintype = 'M'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									res.json({"status":"error", "message":"Email id already exists."});
								}else{
									var fullname = '';
								
									var otp = Math.floor(Math.random()*900000) + 100000;
									var userid= '';
									var status = mailfile.sendmail(conn,fullname,otp,reqObj.email,userid,function(err, result){
										if(result == 1){
											res.json({"status": "success","otp":otp, "message":"Code send successfully"});
										}else{
											res.json({"status":"error", "message":"Code is not send successfully."});
										} 
									});
								}
							}
						})
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
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var email = cryptr.encrypt(reqObj.email);
						var mobile_number = cryptr.encrypt(reqObj.mobile_number);
						conn.query("select * from tbl_login where mobile_number ='"+mobile_number+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									res.json({"status":"error", "message":"This mobile number is already associated with other Travialist account. Please go back and try different mobile number.."});
								}else{
									conn.query("select * from tbl_login where email ='"+email+"' and logintype = 'M'", function(err, result) {
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(result.length > 0){
												res.json({"status":"error", "message":"Email id already exists."});
											}else{
												
												var status = uniquecode.uniqueSystme(conn,function(err, resultUsercode){
													
												
													if (err!='success') {
														console.error('SQL Connection error: ', err);
														return next(err);
													} else{
														
														if(resultUsercode != ''){
															var password = cryptr.encrypt(reqObj.password);
															var first_name = cryptr.encrypt(reqObj.first_name);
															var last_name = cryptr.encrypt(reqObj.last_name);
															var mobile_number = cryptr.encrypt(reqObj.mobile_number);
															var country_code = cryptr.encrypt(reqObj.country_code);
															var platform = reqObj.platform;
															var city = '';
															var gender = '';
															var countryName = '';
															
															conn.query("insert into tbl_login(first_name, last_name, email, city, password, 	 platform, gender,countryName,mobile_number,country_code_mob,user_unique_key,logintype,cdate)values(?, ?, ?,?,?,?,?,?,?,?,?,'M',now())",[first_name,last_name,email,city,password,platform,gender,countryName,mobile_number,country_code,resultUsercode],function(err,result){
																if (!!err) {
																	console.error('SQL Connection error: ', err);
																	return next(err);
																} else{
																	conn.query("select id as userid, first_name, last_name, email, city,platform,gender,dob, countryName, mobile_number, country_code_mob,user_unique_key,logintype, fb_id from tbl_login where email = ? and id = ?",[email,result.insertId],function(err,result){
																		if(!!err) {
																			console.error('SQL Connection error: ', err);
																			return next(err);
																		}else{
																			if(result.length > 0){
																				
																				var userid = result[0]['userid'];
																				var first_name = cryptr.decrypt(result[0]['first_name']);
																				var last_name = cryptr.decrypt(result[0]['last_name']);
																				var email = cryptr.decrypt(result[0]['email']);
																				var city = cryptr.decrypt(result[0]['city']);
																				var mobile_number = cryptr.decrypt(result[0]['mobile_number']);
																				var country_code_mob = cryptr.decrypt(result[0]['country_code_mob']);
																				/* var platform = result[0]['platform']; */
																				var user_unique_key = result[0]['user_unique_key'];
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
																			}else{
																				res.json({"status":"error", "message":"Something went wrong!!"});
																			}
																		}
																	});
																}
															});
														}
													}
												});
											}
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
		}else{
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						if(typeof reqObj.email == 'null' || reqObj.email == null || reqObj.email == ''){
								var email = '';
							}else{
								var email = cryptr.encrypt(reqObj.email);
							}
						
						conn.query("select * from tbl_login where fb_id = '"+reqObj.fb_id+"' and logintype = 'F'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									var userid = result[0]['id'];
									var first_name = cryptr.decrypt(result[0]['first_name']);
									var last_name = cryptr.decrypt(result[0]['last_name']);
									if(typeof result[0]['email'] =='null' || result[0]['email']== null || result[0]['email'] == ''){
										var email ='';
									}else{
										var email = cryptr.decrypt(result[0]['email']);
									}
									var city = cryptr.decrypt(result[0]['city']);
									/* var platform = result[0]['platform']; */
									var user_unique_key = result[0]['user_unique_key'];
									
									
									var mobile_number = cryptr.decrypt(result[0]['mobile_number']);
									var country_code_mob = cryptr.decrypt(result[0]['country_code_mob']);
									
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
									arr1.push(obj1);
									
									res.json({"status":"success", "data":arr1,"message":"Login successfully"});
								}else{
									var status = uniquecode.uniqueSystme(conn,function(err, resultUsercode){
										
										if (err!='success') {
											console.error('SQL Connection error: ', err);
											return next(err);
										} else{
											
											if(typeof reqObj.email == 'null' || reqObj.email == null || reqObj.email == ''){
												var email = '';
											}else{
												var email = cryptr.encrypt(reqObj.email);
											}
											
											
											if(resultUsercode != ''){
												if(typeof reqObj.first_name == 'null' || reqObj.first_name == null || reqObj.first_name == ''){
													var first_name = '';
												}else{
													var first_name = cryptr.encrypt(reqObj.first_name);
												}
												if(typeof reqObj.last_name == 'null' || reqObj.last_name == null || reqObj.last_name == ''){
													var last_name = '';
												}else{
													var last_name = cryptr.encrypt(reqObj.last_name);
												}
												
												
												
												var mobile_number = '';
												var country_code = '';
												var gender = reqObj.gender;
												var profilepic =reqObj.profile_pic;
												var platform = reqObj.platform;
												var fb_id = reqObj.fb_id;
												var password = '';
												var city = '';
												
												var countryName = '';
												conn.query("insert into tbl_login(first_name, last_name, email, city, password,platform, gender,countryName,mobile_number,country_code_mob,user_unique_key,fb_id,profilepic,logintype)values(?, ?, ?,?,?,?,?,?,?,?,?,?,?,'F')",[first_name,last_name,email,city,password,platform,gender,countryName,mobile_number,country_code,resultUsercode,fb_id,profilepic],function(err,result){
													if (!!err) {
														console.error('SQL Connection error: ', err);
														return next(err);
													} else{
														conn.query("select id as userID, first_name, last_name, email, city,platform, gender,dob, countryName, mobile_number, country_code_mob,user_unique_key,logintype, fb_id,ptype,psetpassword from tbl_login where fb_id = ? and id = ?",[fb_id,result.insertId],function(err,result){
															if(!!err) {
																console.error('SQL Connection error: ', err);
																return next(err);
															}else{
																if(result.length > 0){
																	
																	var userid = result[0]['userID'];
																	var first_name = cryptr.decrypt(result[0]['first_name']);
																	var last_name = cryptr.decrypt(result[0]['last_name']);
																	var email = cryptr.decrypt(result[0]['email']);
																	var city = cryptr.decrypt(result[0]['city']);
																	/* var platform = result[0]['platform']; */
																	var user_unique_key = result[0]['user_unique_key'];
																	var mobile_number = cryptr.decrypt(result[0]['mobile_number']);
																	var country_code_mob = cryptr.decrypt(result[0]['country_code_mob']);
																	
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
																	arr1.push(obj1);
																	
																	res.json({"status":"success", "data":arr1,"message":"Login successfully"});
																}else{
																	res.json({"status":"error", "message":"Something went wrong!!"});
																}
															}
														});
													}
												});
											}
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
			var reqObj=req.body.login;	
			var email = cryptr.encrypt(reqObj.email);
			var password = cryptr.encrypt(reqObj.password);
			var platform = reqObj.platform;
		
			try {

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						
						var query = conn.query("SELECT * from tbl_login where email='"+email+"' and logintype = 'M'", function(err, result) {
							
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length >0){
									var query = conn.query("SELECT * from tbl_login where email='"+email+"' and password='"+password+"' and logintype = 'M'", function(err, result) {
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(result.length >0){
												var userid = result[0]['id'];
												var first_name = cryptr.decrypt(result[0]['first_name']);
												var last_name = cryptr.decrypt(result[0]['last_name']);
												var email = cryptr.decrypt(result[0]['email']);
												var city = cryptr.decrypt(result[0]['city']);
												var mobile_number = cryptr.decrypt(result[0]['mobile_number']);
												var country_code_mob = cryptr.decrypt(result[0]['country_code_mob']);
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
													res.json({"status": "error","error_type":"Email and password does not match!","message":"Email and password does not match!."});
												}
											}
										});
								}else{
								   res.json({"status": "error","error_type":"email","message":"Email id not exists."});
								}
							}
						});
						
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

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						if(reqObj.type == 'pin'){
							var ptype = reqObj.type;
						}else if(reqObj.type == 'pattern'){
							var ptype = reqObj.type;
						}else{
							var ptype = reqObj.type;
						}
						/* console.log("update tbl_login set ptype= '"+ptype+"' ,psetpassword = '"+passwordset+"'  where id='"+userid+"'"); */
						var query = conn.query("update tbl_login set ptype= ?,psetpassword = ?  where id=?",[ptype,passwordset,userid], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								res.json({"status": "success","message":"Password set successfully"});
							}
						});
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
 
 
 /* --------------------------------------------------------------Pin set start ----------------------------------------------------------- */
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

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var ptype = '';
						var passwordset = '';
						var query = conn.query("update tbl_login set ptype= ?,psetpassword = ?  where id=?",[ptype,passwordset,userid], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								res.json({"status": "success","message":"Pin and pattern set reset"});
							}
						});
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
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var userid = reqObj.userid;
						var password = cryptr.encrypt(reqObj.password);
						var query = conn.query("update tbl_login set password = ?  where id=? and logintype='M'",[password,userid], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(!!err){
									console.error('SQL Connection error: ', err);
									return next(err);
								}else{
									console.log(result.affectedRows);
									if(result.affectedRows >0){
										res.json({"status": "success","message":"Password reset successfully"});
									}else{
										res.json({"status": "error","message":"Something went wrong!"});
									}
									
								}
								
							}
						});
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
 
 
 

/* ----------------------------------------- Checkmail start ----------------------------------- */

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
			
			var email = cryptr.encrypt(reqObj.email);
			var platform = reqObj.platform;
			
			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var query = conn.query("select * from tbl_login where email = '"+email+"' and logintype = 'M'", function(err, result) {
							if(result.length > 0){
								var userid = result[0]['id'];
								var email = result[0]['email'];
								decryptedString = cryptr.decrypt(email);
								var first_name = result[0]['first_name'];
								first_name = cryptr.decrypt(first_name);
								var last_name = result[0]['last_name'];
								last_name = cryptr.decrypt(last_name);
								var fullname = first_name + ' ' +last_name;
								var otp = Math.floor(Math.random()*900000) + 100000;
								// res.json({"status": "success","userid":userid, "message":"Code send successfully"});
								
								var status = mailfile.sendmail(conn,fullname,otp,decryptedString,userid,function(err, result){
									if(result == 1){
										res.json({"status": "success","userid":userid,"otp":otp, "message":"Code send successfully"});
									}else{
										res.json({"status":"error", "message":"Code is not send successfully."});
									} 
								});
							}else{
								res.json({"status":"error", "message":"Email id not exists."});
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
			
			var password = cryptr.encrypt(reqObj.password);
			var platform = cryptr.encrypt(reqObj.platform);
			var userid = reqObj.userid;
			
			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var query = conn.query("select * from tbl_login where id='"+userid+"' and logintype = 'M'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									/* "update tbl_login set password = ? where otp = '"+reqObj.otp+"' and id='"+userid+"' and logintype = 'M'",[password] */
								var query = conn.query("update tbl_login set password = ? where  id='"+userid+"' and logintype = 'M'",[password], function(err, result) {
									if (!!err) {
										console.error('SQL error: ', err);
										return next(err);
									}else{
										if(result.affectedRows >0){
											res.json({"status": "success","message":"Password update successfully"});
										}else{
											res.json({"status": "error","message":"Something went wrong!"});
										}
									}
								});
								
								}else{
									res.json({"status":"error", "message":"user does not exists."});
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

/* ------------------------------------ Forgot password end ------------------------------------------ */


 
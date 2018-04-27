/* var express = require("express");
var nodemailer = require('nodemailer');
var fs = require("fs"); 
var router = express.Router();

var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

var bodyParser = require("body-parser");
 
 router.use(bodyParser.json({limit: '500mb'}));
 router.use(bodyParser.urlencoded({ extended: true })); */
 

/* var mailfile = require('./api/mail.js');

var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/'; */

module.exports = router;

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
				
				 var query = conn.query("SELECT * from tbl_login where email='"+email+"'", function(err, result) {
					
					
                    if (!!err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }

                   if(result.length >0){
				
				
					var query = conn.query("SELECT * from tbl_login where email='"+email+"' and password='"+password+"'", function(err, result) {
					
					
                    if (!!err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }

                   if(result.length >0){
				
				
            	
					var query = conn.query("SELECT * from tbl_login where email='"+email+"' and password='"+password+"' and isverified = 'true'", function(err, result) {
					
					
                    if (!!err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }

                   if(result.length >0){
						
	
	
						var id = result[0]['id'];
						var first_name = cryptr.decrypt(result[0]['first_name']);
						var last_name = cryptr.decrypt(result[0]['last_name']);
						var email = cryptr.decrypt(result[0]['email']);
						var city = cryptr.decrypt(result[0]['city']);
						var isverified = new Boolean(result[0]['isverified']);
						var question_one = cryptr.decrypt(result[0]['question_one']);
						var answer_one = cryptr.decrypt(result[0]['answer_one']);
						var question_two = cryptr.decrypt(result[0]['question_two']);
						var answer_two = cryptr.decrypt(result[0]['answer_two']);
						var platform = result[0]['platform'];
						var arr1 = new Array();
						var obj1={};
						obj1.userid=id;
						obj1.first_name=first_name;
						obj1.last_name=last_name;
						obj1.email=email;
						obj1.city=city;
						obj1.isverified=isverified;
						obj1.question_one=question_one;
						obj1.answer_one=answer_one;
						obj1.question_two=question_two;
						obj1.answer_two=answer_two;
						
						arr1.push(obj1);
					   
							res.json({"status": "success","data":arr1,"message":"Login successfully"});
						}else{
							res.json({"status": "error","error_type":"email not verified","message":"Email id is not verified."});
						}
						
						
						
                });
				
				   }else{
					   res.json({"status": "error","error_type":"password","message":"Email id and password not matched."});
				   }
					});
				
				
				   }else{
					   res.json({"status": "error","error_type":"email","message":"Email id not exists."});
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


router.post('/registration',function(req,res,next){
	
	if(req.body.registration == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.registration;
		if(reqObj.first_name == undefined || reqObj.first_name == ''){
			var ex = "Internal error:Object first_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.last_name == undefined || reqObj.last_name == ''){
			var ex = "Internal error:Object last_name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.city == undefined || reqObj.city == ''){
			var ex = "Internal error:Object city is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.password == undefined || reqObj.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.dob == undefined || reqObj.dob == ''){
			var ex = "Internal error:Object dob is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.gender == undefined || reqObj.gender == ''){
			var ex = "Internal error:Object gender is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.countryName == undefined){
			var ex = "Internal error:Object country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			
			
		
	
	
	
			// var reqObj=req.body.registration;
			var first_name = cryptr.encrypt(reqObj.first_name);
			var last_name = cryptr.encrypt(reqObj.last_name);
			var email = cryptr.encrypt(reqObj.email);
			var city = cryptr.encrypt(reqObj.city);
			var password = cryptr.encrypt(reqObj.password);
			var countryName = reqObj.countryName;
			if(countryName == ''){
				var countryName = '';
			}else{
				var countryArray = countryName.split(",");
				var len = (countryArray.length)-1;
				var countryName = cryptr.encrypt(countryArray[len]);
			}
			
			var dob = reqObj.dob;
			var gender = reqObj.gender;
	
	 
    // decryptedString = cryptr.decrypt(encryptedString);
 

	try{
		 req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				conn.query("delete from tbl_login where email ='"+email+"' and isverified='false'");
				conn.query("select * from tbl_login where email='"+email+"'",function(err,result){
					if (!!err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }else{
						if(result.length >0){
							res.json({"status": "error","message":"User already exists."});
						}else{
							var query = conn.query("insert into tbl_login(first_name, last_name, email, city, password,	isverified, platform,gender,dob,countryName)values('"+first_name +"', '"+last_name+"', '"+email+"', '"+city+"', '"+password+"','"+reqObj.isverified+"', '"+reqObj.platform+"','"+reqObj.gender+"','"+reqObj.dob+"','"+countryName+"')", function(err, result) {
								if (!!err) {
									console.error('SQL error: ', err);
									return next(err);
								}

								res.json({"status": "success","userid":result.insertId,"message":"Registration successfully"});
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



/*question add start*/


router.post('/regsecurityquestions',function(req,res,next){
	
	if(req.body.regsecurityquestions == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.regsecurityquestions;
		if(reqObj.question_one == undefined || reqObj.question_one == ''){
			var ex = "Internal error:Object question_one is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.answer_one == undefined || reqObj.answer_one == ''){
			return next(ex);
			var ex = "Internal error:Object answer_one is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.question_two == undefined || reqObj.question_two == ''){
			return next(ex);
			var ex = "Internal error:Object question_two is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.answer_two == undefined || reqObj.answer_two == ''){
			return next(ex);
			var ex = "Internal error:Object answer_two is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.userid == undefined || reqObj.userid == ''){
			return next(ex);
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			
			
		
	
	
	
	
	var question_one = cryptr.encrypt(reqObj.question_one);
	var answer_one = cryptr.encrypt(reqObj.answer_one);
	var question_two = cryptr.encrypt(reqObj.question_two);
	var answer_two = cryptr.encrypt(reqObj.answer_two);
	var userid = reqObj.userid;
	var platform = reqObj.platform;
	
	 
    // decryptedString = cryptr.decrypt(encryptedString);
 

	try{
		 req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
					
					var query = conn.query("update tbl_login set question_one ='"+question_one+"' , answer_one='"+answer_one+"', question_two='"+question_two+"',answer_two='"+answer_two+"' where id = "+userid+"", function(err, result) {
								if (!!err) {
									console.error('SQL error: ', err);
									return next(err);
								}
								
								var otp = Math.floor(Math.random()*900000) + 100000;
								var transporter = nodemailer.createTransport({
									host: 'smtp.office365.com',
									port: '587',
									auth: {
										user: mailemail,
										pass: mailpass
									}
								});



							 var query = conn.query("select * from tbl_login where id = "+userid+"", function(err, result) {
										if(result.length > 0){
											var email = result[0]['email'];
											decryptedString = cryptr.decrypt(email);
											var first_name = result[0]['first_name'];
											first_name = cryptr.decrypt(first_name);
											var last_name = result[0]['last_name'];
											last_name = cryptr.decrypt(last_name);
											var fullname = first_name + ' ' +last_name;
											/* console.log(mailfile.sendmail(conn,fullname,otp,decryptedString,userid));
											return; */
											var status = mailfile.sendmail(conn,fullname,otp,decryptedString,userid,mailemail,mailpass,function(err, result){
													
												if(result == 1){
													res.json({"status":"success", "message":"Code send successfully."});
												}else{
													res.json({"status":"error", "message":"Code is not send successfully."});
												} 
											});
											
											
											
										}
								 });
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

/*question add end*/









/* Otp start */
router.post('/regotp',function(req,res,next){
	if(req.body.regotp == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.regotp;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.otp == undefined || reqObj.otp == ''){
			return next(ex);
			var ex = "Internal error:Object otp is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
	
			var userid =reqObj.userid;
			var otp = reqObj.otp;
			var platform = reqObj.platform;
	 
    // decryptedString = cryptr.decrypt(encryptedString);
 

			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						conn.query("select * from tbl_login where id='"+userid+"' and otp='"+otp+"'",function(err,result){
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length >0){
									conn.query("update tbl_login set isverified = 'true', otp ='' where id = '"+userid+"' and otp='"+otp+"'");
									res.json({"status": "success","message":"User verify scuccessfuly."});
								}else{
									res.json({"status": "error","message":"OTP is incorrect. Please try again!"});
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


/* Otp end */






/* ------------------------------ Question add start --------------------------------- */


router.post('/regsecurityquestions',function(req,res,next){
	
	if(req.body.regsecurityquestions == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.regsecurityquestions;
		if(reqObj.question_one == undefined || reqObj.question_one == ''){
			var ex = "Internal error:Object question_one is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.answer_one == undefined || reqObj.answer_one == ''){
			return next(ex);
			var ex = "Internal error:Object answer_one is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}
		else if(reqObj.question_two == undefined || reqObj.question_two == ''){
			return next(ex);
			var ex = "Internal error:Object question_two is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}
		else if(reqObj.answer_two == undefined || reqObj.answer_two == ''){
			return next(ex);
			var ex = "Internal error:Object answer_two is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}
		else if(reqObj.userid == undefined || reqObj.userid == ''){
			return next(ex);
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var reqObj=req.body.regsecurityquestions;
			var question_one = cryptr.encrypt(reqObj.question_one);
			var answer_one = cryptr.encrypt(reqObj.answer_one);
			var question_two = cryptr.encrypt(reqObj.question_two);
			var answer_two = cryptr.encrypt(reqObj.answer_two);
			var userid = reqObj.userid;
			var platform = reqObj.platform;
	
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var query = conn.query("update tbl_login set question_one ='"+question_one+"' , answer_one='"+answer_one+"', question_two='"+question_two+"',answer_two='"+answer_two+"' where id = "+userid+"", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
									
								var otp = Math.floor(Math.random()*900000) + 100000;
								var query = conn.query("select * from tbl_login where id = "+userid+"", function(err, result) {
									if(result.length > 0){
										var email = result[0]['email'];
										decryptedString = cryptr.decrypt(email);
										var first_name = result[0]['first_name'];
										first_name = cryptr.decrypt(first_name);
										var last_name = result[0]['last_name'];
										last_name = cryptr.decrypt(last_name);
										var fullname = first_name + ' ' +last_name;
										var status = mailfile.sendmail(conn,fullname,otp,decryptedString,userid,mailemail,mailpass,function(err, result){
											if(result == 1){
												res.json({"status":"success", "message":"Code send successfully."});
											}else{
												res.json({"status":"error", "message":"Code is not send successfully."});
											} 
										});

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

/* ----------------------------------------- question add end --------------------------------- */


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
			var reqObj=req.body.checkmail;
			var email = cryptr.encrypt(reqObj.email);
			var platform = reqObj.platform;
			
			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
							var query = conn.query("select * from tbl_login where email = '"+email+"' and isverified='true'", function(err, result) {
								if(result.length > 0){
									var question_one = cryptr.decrypt(result[0]['question_one']);
									var answer_one = cryptr.decrypt(result[0]['answer_one']);
									var question_two = cryptr.decrypt(result[0]['question_two']);
									var answer_two = cryptr.decrypt(result[0]['answer_two']);
									var platform = result[0]['platform'];
									var arr1 = new Array();
									var obj1={};
									obj1.question_one=question_one;
									obj1.answer_one=answer_one;
									obj1.question_two=question_two;
									obj1.answer_two=answer_two;
									arr1.push(obj1);
									res.json({"status": "success","data":arr1, "message":"successfully"});
								
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








/*Password genrate OTP start*/


router.post('/passwordgenerateotp',function(req,res,next){
	if(req.body.passwordgenerateotp == undefined){
		console.error("Internal error:Object is not defiend");
		var ex = "Internal error:Object is not defiend";
		res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.passwordgenerateotp;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
	
			// var reqObj=req.body.confirmpasswordotp;
			var email = cryptr.encrypt(reqObj.email);
			var platform = reqObj.platform;
			
			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var otp = Math.floor(Math.random()*900000) + 100000;
						var query = conn.query("select * from tbl_login where email = '"+email+"' and isverified = 'true'", function(err, result) {
							if(result.length > 0){
								var email = result[0]['email'];
								decryptedString = cryptr.decrypt(email);
								var first_name = result[0]['first_name'];
								first_name = cryptr.decrypt(first_name);
								var last_name = result[0]['last_name'];
								last_name = cryptr.decrypt(last_name);
								var fullname = first_name + ' ' +last_name;		
								var userid = result[0]['id'];
        
								var status = mailfile.sendmail(conn,fullname,otp,decryptedString,userid,mailemail,mailpass,function(err, result){
									if(result == 1){
										res.json({"status":"success", "message":"Code send successfully."});
									}else{
										res.json({"status":"error", "message":"Code is not send successfully."});
									} 
								});
   
							}else{
								res.json({"status":"error", "message":"Email id not exists.!"}); 
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

/* ----------------------- Password genrate OTP end ----------------------------- */


/* ----------------------- Confirm password otp check start --------------------- */


router.post('/confirmpasswordotp',function(req,res,next){
	
	if(req.body.confirmpasswordotp == undefined){
		console.error("Internal error:Object is not defiend");
		var ex = "Internal error:Object is not defiend";
		res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.confirmpasswordotp;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.otp == undefined || reqObj.otp == ''){
			return next(ex);
			var ex = "Internal error:Object otp is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			
			var email = cryptr.encrypt(reqObj.email);
			var otp = reqObj.otp;
			var platform = reqObj.platform;
			
			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
							var query = conn.query("select * from tbl_login where email = '"+email+"' and otp='"+otp+"' and isverified='true'", function(err, result) {
								if(result.length > 0){
									
									res.json({"status": "success", "message":"successfully"});
								
								}else{
									res.json({"status":"error", "message":"Email id and otp not matched."});
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

/* -------------------------------- Confirm password otp check end ---------------------------- */


/* -------------------------------- Change password start ------------------------------------- */

router.post('/changepassword',function(req,res,next){
	if(req.body.changepassword == undefined){
		console.error("Internal error:Object is not defiend");
		var ex = "Internal error:Object is not defiend";
		res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.changepassword;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
		}else if(reqObj.password == undefined || reqObj.password == ''){
			return next(ex);
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			return next(ex);
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
	
			
			var email = cryptr.encrypt(reqObj.email);
			var password = cryptr.encrypt(reqObj.password);
			var platform = reqObj.platform;
			

			try{
				 req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
							var query = conn.query("select * from tbl_login where email = '"+email+"' and isverified='true'", function(err, result) {
								if(result.length > 0){
									conn.query("update tbl_login set password = '"+password+"' where email = '"+email+"' and isverified='true'");
									res.json({"status": "success", "message":"successfully"});
								
								}else{
									res.json({"status":"error", "message":"Email id and otp not matched."});
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

/* --------------------------------- Change password end -------------------------------------*/



/* --------------------------------- Send confirmation again add start ---------------------- */


router.post('/sendconfirmationagain',function(req,res,next){
	if(req.body.sendconfirmationagain == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.sendconfirmationagain;
		if(reqObj.email == undefined || reqObj.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
		}
		else if(reqObj.platform == undefined || reqObj.platform == ''){
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
					} else {
						var otp = Math.floor(Math.random()*900000) + 100000;
						

						var query = conn.query("select * from tbl_login where email = '"+email+"'", function(err, result) {
							if(result.length > 0){
								var userid = result[0]['id'];
								var email = result[0]['email'];
								decryptedString = cryptr.decrypt(email);
								var first_name = result[0]['first_name'];
								first_name = cryptr.decrypt(first_name);
								var last_name = result[0]['last_name'];
								last_name = cryptr.decrypt(last_name);
								var fullname = first_name + ' ' +last_name;
								var status = mailfile.sendmail(conn,fullname,otp,decryptedString,userid,mailemail,mailpass,function(err, result){
									if(result == 1){
										res.json({"status":"success", "message":"Code send successfully."});
									}else{
										res.json({"status":"error", "message":"Code is not send successfully."});
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

/* --------------------------------- Sendconfirmationagain add end ---------------------------------------- */



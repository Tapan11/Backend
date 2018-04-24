var express = require("express");
var nodemailer = require('nodemailer');
var asyncLoop = require('node-async-loop');
var fs = require("fs"); 
var router = express.Router();
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
	var imgurl = 'https://my-nodejs-app.scapp.io/ImagesFiles/';
	var cityImages ='https://my-nodejs-app.scapp.io/ImagesCity/';

	module.exports = router;
	
	
	
	
	
	
	
	
	router.post('/subscibe',function(req,res,next){
		if(req.body.name == undefined || req.body.name == ''){
			var ex = "Internal error:Object name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.email == undefined || req.body.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var reqObj=req.body;
			
			var name = reqObj.name;
			var email = reqObj.email;
			try{

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query('select * from tbl_subscribe where email= "'+email+'"', function(err, result) {
							if(!!err){
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length >0){
									res.json({"status": "error","message":"Email already exists."});
								}else{
									conn.query('insert into tbl_subscribe (FullName, email, timestamp)values("'+name+'", "'+email+'", now())', function(err, result) {
										if(!!err){
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","message":"Email id register successfully."});
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
	});
	
	
	router.post('/contactUS',function(req,res,next){
		if(req.body.name == undefined || req.body.name == ''){
			var ex = "Internal error:Object name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.email == undefined || req.body.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.mobile == undefined || req.body.mobile == ''){
			var ex = "Internal error:Object mobile is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.msg == undefined || req.body.msg == ''){
			var ex = "Internal error:Object msg is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var reqObj=req.body;
			var fullname = reqObj.name;
			var email = reqObj.email;
			var mobile = reqObj.mobile;
			var msg = reqObj.msg;
			var name = cryptr.encrypt(reqObj.name);
			var email1 = cryptr.encrypt(reqObj.email);
			var msg1 = cryptr.encrypt(reqObj.msg);
			
			
			try{

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query('insert into tbl_contactus(fullName, email, mobile,msg,timestamp)values("'+name+'", "'+email1+'","'+mobile+'","'+msg1+'", now())', function(err, result) {
							if(!!err){
								console.error('SQL error: ', err);
								return next(err);
							}else{
								
								var transporter = nodemailer.createTransport({
									host: 'smtp.office365.com',
									port: '587',
									auth: {
										user: mailemail,
										pass: mailpass
									}
								});
								var  decryptedString ='info@travialist.com'; // 'tapan.rawal@mindcrewtech.com'; //
								
								var template = '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>  <title></title><meta http-equiv="X-UA-Compatible" content="IE=edge">  <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">  #outlook a { padding: 0; }  .ReadMsgBody { width: 100%; }  .ExternalClass { width: 100%; }  .ExternalClass * { line-height:100%; }  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }  table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }  p { display: block; margin: 13px 0; }</style><!--[if !mso]><!--><style type="text/css">  @media only screen and (max-width:480px) {    @-ms-viewport { width:320px; }    @viewport { width:320px; }  }</style><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">    <style type="text/css">        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);    </style><style type="text/css">  @media only screen and (min-width:480px) {    .mj-column-per-100 { width:100%!important; }  }</style></head><body style="background: #F5F5F5;">    <div class="mj-container" style="background-color:#F5F5F5;"><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:174px;"><img alt="" title="" height="auto" src="https://topolio.s3-eu-west-1.amazonaws.com/uploads/5a152f46e4bf0/1511340960.jpg" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="174"></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:center;"><p><a href="http://travialist.com" target="_blank" style="color: #3A3A3B;">PAGE</a>&#xA0; &#xA0; &#xA0;&#xA0;<a href="http://{CUSTOMPROFILE}" target="_blank" style="color: #3A3A3B;">YOUR ACCOUNT</a>&#xA0; &#xA0; &#xA0;<a href="https://support.travialist.com" target="_blank" style="color: #3A3A3B;">SUPPORT</a></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:600px;"><img alt="" title="" height="auto" src="https://topolio.s3-eu-west-1.amazonaws.com/uploads/5a152f46e4bf0/1511346528.jpg" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="600"></td></tr></tbody></table></td></tr></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#0080BC;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#0080BC;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:7px 0px 7px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;"><h1 style="font-family: &apos;Open Sans&apos;, sans-serif; line-height: 100%;">Travialist: Contact Us message address. </h1></div></td></tr></tbody></table></div></td></tr></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;"><p>Full Name : '+fullname+'</p><p></p><p>Email address : '+email+' <br><br>Comment : '+msg+'</p><p></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#3A3A3B;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#3A3A3B;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:#FFFFFF;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:left;"><p>Travialist GmbH<br>obere Sonnenbergstrasse 1<br>5707 Seengen<br>Switzerland</p></div></td></tr></tbody></table></div></td></tr></tbody></table></div><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:center;"><p>Follow us on</p><p><a href="https://www.linkedin.com/company/travialist" target="_blank" style="color: #3A3A3B;">LinkedIn</a>&#xA0; &#xA0;<a href="https://www.facebook.com/travialist/" target="_blank" style="color: #3A3A3B;">Facebook</a>&#xA0; &#xA0;<a href="https://www.instagram.com/travialist" target="_blank" style="color: #3A3A3B;">Instagram</a>&#xA0; &#xA0;<a href="https://twitter.com/travialist" target="_blank" style="color: #3A3A3B;">Twitter</a></p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table><div style="margin:0px auto;max-width:600px;background:#F5F5F5;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#F5F5F5;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:22px;text-align:center;"><p>This E-Mail was sent to '+decryptedString+'</p><p>You received this message because of your registration at travialist.com</p><p>&#xA9; 2017 Travialist</p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></div></body></html>';
								
								
								
								var mailOptions = {
														  from: mailemail,
														  to: decryptedString,
														  subject: 'Travialist Contact Us message',
														  text: '',
														  html:template
														};
										
										transporter.sendMail(mailOptions, function(error, info){
											  if (error) {
												
												res.json({"status":"error", "message":"Something, went wrong. Please try again!"}); 
											  } else {
													res.json({"status":"success", "message":""});
												}
											});
								
							//	res.json({"status": "success","message":"Email id register successfully."});
								
								
								
								
								
								
							}
						});
					}
				});
			}catch (ex) {
				console.error("Internal error:" + ex);
				return next(ex);
			}
			
		}
		
	});
	
	router.post('/registration',function(req,res,next){
		if(req.body.fname == undefined || req.body.fname == ''){
			var ex = "Internal error:Object fname is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.lname == undefined || req.body.lname == ''){
			var ex = "Internal error:Object lname is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.email == undefined || req.body.email == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.password == undefined || req.body.password == ''){
			var ex = "Internal error:Object password is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.dprSecurityQuestionFirst == undefined || req.body.dprSecurityQuestionFirst == ''){
			var ex = "Internal error:Object dprSecurityQuestionFirst is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.dprSecurityAnsFirst == undefined || req.body.dprSecurityAnsFirst == ''){
			var ex = "Internal error:Object dprSecurityAnsFirst is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.dprSecurityQuestionSecond == undefined || req.body.dprSecurityQuestionSecond == ''){
			var ex = "Internal error:Object dprSecurityQuestionSecond is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.dprSecurityAnsSecond == undefined || req.body.dprSecurityAnsSecond == ''){
			var ex = "Internal error:Object dprSecurityAnsSecond is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(req.body.city == undefined || req.body.city == ''){
			var ex = "Internal error:Object city is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var reqObj=req.body;
			var fullname = reqObj.fname + ' '+reqObj.lname;
			var decryptedString = reqObj.email;
			var fname = cryptr.encrypt(reqObj.fname);
			var lname = cryptr.encrypt(reqObj.lname);
			var email = cryptr.encrypt(reqObj.email);
			var password = cryptr.encrypt(reqObj.password);
			var dprSecurityQuestionFirst = cryptr.encrypt(reqObj.dprSecurityQuestionFirst);
			var dprSecurityAnsFirst = cryptr.encrypt(reqObj.dprSecurityAnsFirst);
			var dprSecurityQuestionSecond = cryptr.encrypt(reqObj.dprSecurityQuestionSecond);
			var dprSecurityAnsSecond = cryptr.encrypt(reqObj.dprSecurityAnsSecond);
			var city = cryptr.encrypt(reqObj.city);
			
			try{

				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query('select * from tbl_login where email= "'+email+'"', function(err, result) {
							if(!!err){
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length >0){
									res.json({"status": "error","message":"Email already exists."});
								}else{
									conn.query('insert into tbl_login(first_name, last_name, email, city, password, isverified,platform, question_one,answer_one, question_two,answer_two, otp	)values("'+fname+'", "'+lname+'", "'+email+'", "'+city+'", "'+password+'", "false", "web","'+dprSecurityQuestionFirst+'", "'+dprSecurityAnsFirst+'","'+dprSecurityQuestionSecond+'", "'+dprSecurityAnsSecond+'","")', function(err, result) {
										if(!!err){
											console.error('SQL error: ', err);
											return next(err);
										}else{
											
											var otp = Math.floor(Math.random()*900000) + 100000;
											var transporter = nodemailer.createTransport({
												host: 'smtp.office365.com',
												port: '587',
												auth: {
													user: mailemail,
													pass: mailpass
												}
											});
											
											/* Mail content */
											var style ='<style>body { padding: 0; margin: 0;\n\
												  }\n\
												  html { -webkit-text-size-adjust:none; -ms-text-size-adjust: none;}\n\
												  @media only screen and (max-device-width: 680px), only screen and (max-width: 680px) {\n\
												   *[class="table_width_100"] {\n\
													width: 96% !important;\n\
												   }\n\
												   *[class="border-right_mob"] {\n\
													border-right: 1px solid #dddddd;\n\
												   }\n\
												   *[class="mob_100"] {\n\
													width: 100% !important;\n\
												   }\n\
												   *[class="mob_center"] {\n\
													text-align: center !important;\n\
												   }\n\
												   *[class="mob_center_bl"] {\n\
													float: none !important;\n\
													display: block !important;\n\
													margin: 0px auto;\n\
												   } \n\
												   .iage_footer a {\n\
													text-decoration: none;\n\
													color: #929ca8;\n\
												   }\n\
												   img.mob_display_none {\n\
													width: 0px !important;\n\
													height: 0px !important;\n\
													display: none !important;\n\
												   }\n\
												   img.mob_width_50 {\n\
													width: 40% !important;\n\
													height: auto !important;\n\
												   }\n\
												  }\n\
												  .table_width_100 {\n\
												   width: 680px;\n\
												  }\n\
												  .btn{    background: #ec5368;\n\
												   padding: 14px 130px;\n\
												   width: 31%;\n\
												   border-radius: 12px;}\n\
												  </style>';
													
   
   
									   var template = style+'<div id="mailsub" class="notification" align="center">\n\
									<table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;"><tr><td align="center" bgcolor="#eff3f8">\n\
									<table border="0" cellspacing="0" cellpadding="0" class="table_width_100" width="100%" style="max-width: 680px; min-width: 300px;">\n\
										<tr><td>\n\
									 </td></tr>\n\
									 <tr><td align="center" bgcolor="#ffffff">\n\
									  <table width="90%" border="0" cellspacing="0" cellpadding="0"><div style="height: 30px; line-height: 30px; font-size: 10px;"></div>\n\
									   <tr><td align="center" style="float:left">\n\
											 <a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; float:left; width:100%; padding:20px;text-align:center; font-size: 13px;">\n\
											 <font face="Arial, Helvetica, sans-seri; font-size: 13px;" size="3" color="#596167">\n\
											 <img src='+imgurl+'logo.png" width="120" alt="Travialist" border="0"  /></font></a>\n\
										 </td>\n\
										 <td align="right">\n\
									   </td>\n\
									   </tr>\n\
									  </table>\n\
									   </td></tr>\n\
									 <tr><td align="center" bgcolor="#fbfcfd">\n\
									  <table width="90%" border="0" cellspacing="0" cellpadding="0">\n\
									   <tr><td align="center">\n\
										<div style="line-height: 44px;">\n\
										 <font face="Arial, Helvetica, sans-serif" size="5" color="#57697e" style="font-size: 34px;">\n\
										 <span style="font-family: Arial, Helvetica, sans-serif; font-size: 28px; color: #57697e;">\n\
										  Hi '+fullname+'\n\
										 </span></font>\n\
										</div>\n\
									   </td></tr>\n\
									   <tr><td align="center">\n\
										<div style="line-height: 24px;">\n\
										 <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 15px;">\n\
										 <span style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #57697e;">\n\
									Thank you for joining Travialsit- the trusted, fastest and secured platform for requesting, giving and saving reference. Please click the link below to verify your account.\n\
										 </span></font>\n\
										</div>\n\
									   <div style="height: 40px; line-height: 40px; font-size: 10px;"></div>\n\
									   </td></tr>\n\
									   <tr><td align="center">\n\
										<div style="height: 16px; line-height: 60px; font-size: 10px;"></div>\n\
									   </td></tr>\n\
									   <tr><td align="center">\n\
										<div style="line-height: 19px;width: 54%;">\n\
										 <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 11px;">\n\
										 <span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #57697e;">\n\
										  verification code: '+otp+'<br />\n\
										</span></font>\n\
										</div>\n\
										</td></tr>\n\
									  </table>\n\
									 </td></tr>\n\
									  <tr><td class="iage_footer" align="center" bgcolor="#ffffff">\n\
									 <table width="100%" border="0" cellspacing="0" cellpadding="0">\n\
									   <tr><td align="center" style="padding:20px;flaot:left;width:50%; text-align:center;">\n\
										</td>\n\
									   <td align="center" style="padding:20px;flaot:left;width:50%; text-align:center;">\n\
										<font face="Arial, Helvetica, sans-serif" size="3" color="#96a5b5" style="font-size: 13px;">\n\
										<span> ©2017 Travialist<span><br/>\n\
										<span style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: blue;">\n\
										 Terms & privacy/my-nodejs-app.scapp.io\n\
										</span></span></span></font>\n\
									   </td>\n\
									   </tr>\n\
									  </table>\n\
									 </td></tr>\n\
									 <tr><td>\n\
									</td></tr>\n\
									</table>\n\
									</td></tr>\n\
									</table>\n\
									</td></tr></table></div>';
											/*Mail content end*/
											var mailOptions = {
														  from: mailemail,
														  to: decryptedString,
														  subject: 'Sending Email from Travialist',
														  text: 'Travialist verification code : ' +otp,
														  html:template
														};
														
											transporter.sendMail(mailOptions, function(error, info){
												if (error) {
													res.json({"status":"error", "message":"Something, went wrong. Please try again!"}); 
												}else {
													conn.query("update tbl_login set otp='"+otp+"' where email = '"+email+"'");
													res.json({"status":"success", "message":"OTP send on your register email address successfully."});
												}
											});
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
	});
	
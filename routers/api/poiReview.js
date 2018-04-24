var express = require("express");
var nodemailer = require('nodemailer');
var asyncLoop = require('node-async-loop');
var fs = require("fs"); 
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'images/' });
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
var PdfCity ='https://travialist.com/PdfCity/';

module.exports = router;


/* ------------------------------------------- POI Rating API start -------------------------------------- */

router.post('/poiInsightsReviewComment',function(req,res,next){
	if(req.body.poiInsightsReviewComment == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsReviewComment;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object Country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var tableName = 'tbl_trippoidetails'+reqObj.countryName.toLowerCase();
						
						conn.query('call STR_POIInsightsReviewComment("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									var finalArray = [];
									var arr = [];
									var arr1 = [];
									
									var arrayResult = result[0];
									var array = result[1];
									
									asyncLoop(arrayResult, function (item, next)
										{
											
											
											var obj1 = {};
									obj1.commentID = item.commentID;
									obj1.poiID = item.poiID;
									obj1.arrivalID = item.arrivalID;
									obj1.userID = item.userID;
									obj1.gender = item.gender;
									obj1.photo = item.photo;		
									obj1.fullphoto = item.fullphoto;		
									obj1.firstName = cryptr.decrypt(item.firstName);
									obj1.lastName = cryptr.decrypt(item.lastName);
									arr1.push(obj1);
											next();
										}, function (err)
										{
											if (err)
											{
												console.error('Error: ' + err.message);
												return;
											}
											
											
											
										});	
									asyncLoop(array, function (item, next)
										{
											
											
											var obj1 = {};
											
											obj1.commentID = item.commentID;
											obj1.poiID = item.poiID;
											obj1.arrivalID = item.arrivalID;
											if(reqObj.userid == item.userID){
												obj1.isMine = true;
											}else{
												obj1.isMine = false;
											}
											if(item.flag == 1){
												obj1.isflag = true;
											}else{
												obj1.isflag = false;
											}
											
											if(item.reviewlike == 1){
												obj1.isLike = true;
											}else{
												obj1.isLike = false;
											}
											
											obj1.poiImage = ""; //item.poiImage;
											obj1.userID = item.userID;
											obj1.gender = item.gender;
											obj1.photo = item.photo;
											obj1.userLike = item.userLike;
											obj1.follow = item.follow;
											obj1.rating = item.rating;
											obj1.viewCount = item.viewCount;
											obj1.checkin = item.checkin;
											obj1.recommend = item.recommend;
											obj1.myviewcount = item.myviewcount;
											obj1.mylikecount = item.mylikecount;
											obj1.timestamp = item.timestamp;
											obj1.reviewChatCount = item.reviewChatCount;
											obj1.firstName = cryptr.decrypt(item.firstName);
											obj1.lastName = cryptr.decrypt(item.lastName);
											obj1.comments = cryptr.decrypt(item.comments);
											arr.push(obj1);
											next();
										}, function (err)
										{
											if (err)
											{
												console.error('Error: ' + err.message);
												return;
											}
											
											var objef = {};
											objef.visitors = arr1;
											objef.reviewData = arr;
											finalArray.push(objef);
											res.json({"status": "success","data":finalArray, "message": "Insights details"});
											
										});
									
								}else{
									res.json({"status": "error", "message": "None comment"});
								}
							}
						});
					}
				});
			}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
		}
		
	}
});

/* ---------------------------------- POI Rating API end  --------------------------------------------- */




/* ------------------------------------------- Comment like API start -------------------------------------- */

router.post('/poiInsightsReviewCommentLike',function(req,res,next){
	if(req.body.poiInsightsReviewCommentLike == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsReviewCommentLike;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.arrivalID == undefined || reqObj.arrivalID == ''){
			var ex = "Internal error:Object arrival ID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.commentID == undefined || reqObj.commentID == ''){
			var ex = "Internal error:Object comment ID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object Country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object Country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type != 'like' && reqObj.type != 'unlike'){
			var ex = "Internal error:Object type error";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var tableName = 'tbl_reviewuserlikeflag'+reqObj.countryName.toLowerCase();
						
						if(reqObj.type == 'like'){
							var like =1;
							
						}else if(reqObj.type == 'unlike'){
							var like =0;
						}else{
							res.json({"status": "error", "message": "Someting went wrong like and unlike please check it should be like or unlike"});
						}
						
						conn.query('select * from tbl_reviewUserLikeFlag where userID = "'+reqObj.userid+'" and poiID ="'+reqObj.poiID+'" and commentID="'+reqObj.commentID+'"', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									conn.query('update tbl_reviewUserLikeFlag set mylike ="'+like+'" where userID = "'+reqObj.userid+'" and poiID ="'+reqObj.poiID+'" and commentID="'+reqObj.commentID+'"',function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(like == 1){
												conn.query('update tbl_trippoidetails set mylikecount = (mylikecount+1) where poiID="'+reqObj.poiID+'"  and id ="'+reqObj.commentID+'"',function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														res.json({"status": "success", "message": "Your like update successfully"});
													}
												});
											}else{
												conn.query('update tbl_trippoidetails set mylikecount = (mylikecount-1) where poiID="'+reqObj.poiID+'" and id ="'+reqObj.commentID+'"',function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														res.json({"status": "success", "message": "Your like update successfully"});
													}
												});
											}
											
										}
									});
									
								}else{
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var id = formatted+otp;
									
									conn.query('insert into tbl_reviewUserLikeFlag 	(id, userid, poiID, arrivalID, commentID, mylike, flag, timestamp)values("'+id+'", "'+reqObj.userid+'", "'+reqObj.poiID+'", "'+reqObj.arrivalID+'" , "'+reqObj.commentID+'", "'+like+'", 0, now())', function(err, result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											conn.query('update tbl_trippoidetails set mylikecount = (mylikecount+1) where poiID="'+reqObj.poiID+'"  and id ="'+reqObj.commentID+'"',function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														res.json({"status": "success", "message": "Your like successfully"});
													}
												});
											// res.json({"status": "success", "message": "You like successfully"});
										}
									});
								}
								
								//
							}
						});
					}
				});
			}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
		}
		
	}
});

/* ---------------------------------- Comment like API end  --------------------------------------------- */




/* ------------------------------------------- Comment flag API start -------------------------------------- */

router.post('/poiInsightsReviewCommentFlag',function(req,res,next){
	if(req.body.poiInsightsReviewCommentFlag == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsReviewCommentFlag;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.arrivalID == undefined || reqObj.arrivalID == ''){
			var ex = "Internal error:Object arrival ID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.commentID == undefined || reqObj.commentID == ''){
			var ex = "Internal error:Object comment ID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object Country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object Country Name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type != 'true' && reqObj.type != true && reqObj.type != 'false' && reqObj.type != false){
			var ex = "Internal error:Object type error";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var tableName = 'tbl_reviewuserlikeflag'+reqObj.countryName.toLowerCase();
						
						if(reqObj.type == 'true' || reqObj.type == true){
							var flag =1;
						}else if(reqObj.type== 'false' || reqObj.type == false){
							var flag =0;
						}else{
							res.json({"status": "error", "message": "Something went wrong with type please check again"});
						}
						
						conn.query('select * from tbl_reviewUserLikeFlag where userID = "'+reqObj.userid+'" and poiID ="'+reqObj.poiID+'" and commentID="'+reqObj.commentID+'"', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									
									conn.query('update tbl_reviewUserLikeFlag set flag ="'+flag+'" where userID = "'+reqObj.userid+'" and poiID ="'+reqObj.poiID+'" and commentID="'+reqObj.commentID+'"',function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success", "message": "Your flag update successfully"});
										}
									});
									
								}else{
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var id = formatted+otp;
									
									conn.query('insert into tbl_reviewUserLikeFlag 	(id, userid, poiID, arrivalID, commentID, mylike, flag, timestamp)values("'+id+'", "'+reqObj.userid+'", "'+reqObj.poiID+'", "'+reqObj.arrivalID+'" , "'+reqObj.commentID+'", 0, "'+flag+'", now())', function(err, result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success", "message": "Your flag successfully"});
										}
									});
								}
							}
						});
					}
				});
			}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
		}
		
	}
});

/* ---------------------------------- Comment flag API end  --------------------------------------------- */



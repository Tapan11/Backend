var express = require("express");
var nodemailer = require('nodemailer');
var asyncLoop = require('node-async-loop');
var fs = require("fs"); 
var router = express.Router();
/* GET home page. */
var multer  = require('multer');
var upload = multer({ dest: 'images/' });

var bodyParser = require("body-parser");

 
router.use(bodyParser.json({limit: '500mb'}));
router.use(bodyParser.urlencoded({ extended: true }));

var dateTime = require('node-datetime');

var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

router.get('/', function(req, res, next) {
	res.sendFile(__dirname + "/webcode/map.html");
});

var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var cityImages ='https://travialist.com/ImagesCity/';
var PdfCity ='https://travialist.com/PdfCity/';

module.exports = router;

router.post('/imgupload',function(req,res,next){
	console.log(req.body);
});



/* router.get('/tapan',function(req,res,next){
	console.log('rawal');
	res.json({"status": "success","data":'as'});
}); */
router.post('/poiFoursquare', function(req ,res, next) {
	try {

        req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				var query = conn.query("SELECT * from tbl_foursquare  order by id desc limit 50", function(err, result) {
					if (!!err) {
						console.error('SQL error: ', err);
						return next(err);
					}

                   if(result.length >0){
					   res.json({"status": "success","data":result,"message":"POI"});
						}else{
							res.json({"status": "error","error_type":"POI","message":"POI not available."});
						}
				   });
			}
        });
	}catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
    }

});




/* Web User country List*/


/*Add City */
router.post('/cityPointImage', function(req ,res, next) {
	
	try {
		req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				
				var reqObj=req.body;
				
				
				var array = reqObj.imgs;
				
					asyncLoop(array, function (item, next){
						/* console.log(item.base64); */
						var dt = dateTime.create();
						var formatted = dt.format('YmdHMS');
						var image = item.base64;
						var imgname =  formatted+".jpg";
						var bitmap = new Buffer(image, 'base64');
						
						fs.writeFileSync(imgurl1+imgname, bitmap, function(err) {
						  if (err) {
							 console.log(12345);
							}else {
								console.log(next);
							}
						  next();
						});
					}, function (err)
					{
						console.log('Finished!');
					});
				
				
				
			/*	for (var i= 0; i < reqObj.imgs.length; i++){
					
					var dt = dateTime.create();
					var formatted = dt.format('YmdHMS');
					var image = reqObj.imgs[i].base64;
					var imgname =  formatted+".jpg";
					var bitmap = new Buffer(image, 'base64');
					if(bitmap != ''){
						fs.writeFileSync(imgurl1+imgname, bitmap);
						console.log(123344455666);
						bitmap = '';
					}else{
						console.log(123344);
					}
					
				}*/
				return false;
				
				
			}
        });
	}catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
    }

});

/* country list */
router.post('/countryList', function(req ,res, next) {
	try {
		req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				console.log(1);
				var query = conn.query("select * from tbl_countrycode", function(err, result) {
					if (!!err) {
						console.error('SQL error: ', err);
						return next(err);
					}

                   if(result.length >0){
					   res.json({"status": "success","data":result,"message":"Country list"});
						}else{
							res.json({"status": "error","error_type":"POI","message":"POI not available."});
						}
				   });
			}
        });
	}catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
    }

});

/* End country list*/


router.post('/countrydata', function(req ,res, next) {
	
	
	try {

        req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				
				var query = conn.query("select * from (select a.id,a.name as cityName,a.CName as countyName,b.Name as categoryName,concat('"+cityImages+"',c.image) as image,c.description from tbl_arrivalguides as a,tbl_arrivalguidescategory as b,tbl_arrivalguidesimages as c where a.name <> '' and a.id = b.arrivalID and c.arrivalId = a.id order by rand() ) as t group by t.id", function(err, result) {
					if (!!err) {
						console.error('SQL error: ', err);
						return next(err);
					}

                   if(result.length >0){
					   res.json({"status": "success","data":result,"message":"city data"});
						}else{
							res.json({"status": "error","error_type":"Country","message":"Country data not available."});
						}
				   });
			}
        });
	}catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
    }

});






router.post('/cityPoiSearchCategories',function(req,res,next){
	if(req.body.cityPoiSearchCategories == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.cityPoiSearchCategories;
		if(reqObj.categorie == undefined || reqObj.categorie == ''){
			var ex = "Internal error:Object categorie is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityname == undefined || reqObj.cityname == ''){
			var ex = "Internal error:Object city name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query("select id,fid,name,phone,address,crossStreet,lat,lng,city,state,country,categoriesName,categoriesPluralName,categoriesShortName,categoriesIcon from tbl_foursquare where city = '"+reqObj.cityname+"' and categoriesPluralName like '%"+reqObj.categorie+"%'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var arr1 = [];
								var obj1={};
								if(result.length > 0){
									obj1.city = reqObj.cityname;
									obj1.categorie = result;
									arr1.push(obj1);
									res.json({"status": "success","data":arr1,"message":"City poi data"});
								}else{
									var arraycity= [];
									obj1.city = reqObj.cityname;
									obj1.poidata = arraycity;
									arr1.push(obj1);
									res.json({"status": "error","data":arr1,"message":"City POI not found"});
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

router.post('/cityHighlights',function(req,res,next){
	if(req.body.cityHighlights == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.cityHighlights;
		if(reqObj.cityname == undefined || reqObj.cityname == ''){
			var ex = "Internal error:Object city name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query("select * from (select * from (select a.id,a.fid,a.name,a.lat,a.lng,a.categoriesName,ifnull(a.description,'') as description,a.city,round(a.rating/2,2) as rating ,ifnull(b.poiImage,'') as image from tbl_foursquare as a left join tbl_usertrippoidetails as b on (a.fid = b.fid) where a.city='"+reqObj.cityname+"' order by rating desc) as t where t.categoriesName <> '' order by t.rating desc ) as vv group by vv.categoriesName, vv.fid,vv.name", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var arr1 = [];
								var obj1={};
								if(result.length > 0){
									obj1.city = reqObj.cityname;
									obj1.poidata = result;
									arr1.push(obj1);
									res.json({"status": "success","data":arr1,"message":"City poi data"});
								}else{
									var arraycity= [];
									obj1.city = reqObj.cityname;
									obj1.poidata = arraycity;
									arr1.push(obj1);
									res.json({"status": "error","data":arr1,"message":"City POI not found"});
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





/* Poi over view*/


router.post('/poiOverview',function(req,res,next){
	if(req.body.poiOverview == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiOverview;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object country Name is not defiend";
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
						conn.query('call STR_POIOverview("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result[1].length > 0){
									var img = result[1];
								}else{
									var img = [];
								}
								
								
								var arr1 = [];
								var obj1={};
								if(result.length > 0){
									obj1.poiID = result[0][0].poiID;
									obj1.arrivalID = result[0][0].arrivalID;
									obj1.poiName = result[0][0].poiName;
									obj1.poiDescription = result[0][0].poiDescription;
									obj1.poiComment = result[0][0].poiComment;
									obj1.viewCount = result[0][0].viewCount;
									obj1.tipCount = result[0][0].tipCount;
									obj1.usersCount = result[0][0].usersCount;
									obj1.checkinsCount = result[0][0].checkinsCount;
									obj1.likecount = result[0][0].likesCount;
									obj1.rating = result[0][0].rating;
									obj1.poiCategories = result[0][0].poiCategories;
									obj1.mylike = result[0][0].mylike;
									obj1.myview = result[0][0].myview;
									obj1.mybookmark = result[0][0].mybookmark;
									obj1.image = img;
									arr1.push(obj1);
									res.json({"status": "success","data":arr1,"message":"Overview POI"});
								}else{
									res.json({"status": "error","data":arr1,"message":"Poi data not found"});
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
			

/* over view end */


/* Poi Like*/

router.post('/poiLike',function(req,res,next){
	if(req.body.poiLike == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiLike;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.arrivalID == undefined || reqObj.arrivalID == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type != 'like' && reqObj.type != 'unlike'){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						if(reqObj.type == 'like'){
							var likeval = 1;
						}else{
							var likeval = 0;
						}
						conn.query("select * from tbl_POI_userInformation where poiID =? and userID =? and mylike = ?",[reqObj.poiID,reqObj.userid,likeval], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								
								if(result.length>0){
									conn.query("select likesCount as likeCount from tbl_ArrivalguidesPoiIDetails where id =?",[reqObj.poiID],function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","count":result[0].likeCount , "message":"Total like count!"});
										}
									});
								}else{
									
									
																
									conn.query("update tbl_POI_userInformation set mylike = ?, modefiytimestamp = now() where poiID =? and userID =?",[likeval,reqObj.poiID,reqObj.userid],function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(likeval == 1){
												likeval = 1;
											}else{
												likeval = '(-1)';
											}
											
											conn.query("update tbl_ArrivalguidesPoiIDetails set likesCount = (likesCount+"+likeval+") where id = ?",[reqObj.poiID],function(err,result){
												if (!!err) {
													console.error('SQL error: ', err);
													return next(err);
												}else{
													conn.query("select likesCount as likeCount from tbl_ArrivalguidesPoiIDetails where id =?",[reqObj.poiID],function(err,result){
														if (!!err) {
															console.error('SQL error: ', err);
															return next(err);
														}else{
															res.json({"status": "success","count":result[0].likeCount , "message":"Total like count!"});
														}
													});
												}
											});
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

/* Poi Like end */










/* Poi book mark*/

router.post('/poiBookmark',function(req,res,next){
	if(req.body.poiBookmark == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiBookmark;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.arrivalID == undefined || reqObj.arrivalID == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object platform is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type != 'mark' && reqObj.type != 'unmark'){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						if(reqObj.type == 'mark'){
							var mybookmarkval = 1;
						}else if(reqObj.type == 'unmark'){
							var mybookmarkval = 0;
						}
						
						conn.query("select * from tbl_POI_userInformation where poiID =? and userID =? and mybookmark = ?",[reqObj.poiID,reqObj.userid,mybookmarkval], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								
								if(result.length>0){
									res.json({"status": "success","message":"Already exists!"});
								}else{
									conn.query("update tbl_POI_userInformation set mybookmark = ?, modefiytimestamp = now() where poiID =? and userID =?",[mybookmarkval,reqObj.poiID,reqObj.userid],function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","message":"Marked successfully!"});
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

/* Poi book mark end */



/* ------------------------------------------------ Poi Like by AGe Start  -------------------------------------- */

router.post('/poiLikebyAge',function(req,res,next){
	if(req.body.poiLikebyAge == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiLikebyAge;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
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
						
						conn.query('call STR_POIInsightsLikeBYAGE("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								res.json({"status": "success","data":result[0], "message": "POI Like by age"});
								
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



/*--------------------------------------------------- End like by age ---------------------------------------*/



















/* Poi view*/

router.post('/poiView',function(req,res,next){
	/* console.log(req.body.poiView);
	return; */
	if(req.body.poiView == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiView;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.arrivalID == undefined || reqObj.arrivalID == ''){
			var ex = "Internal error:Object arrivalID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.myview == undefined || reqObj.myview == ''){
			var ex = "Internal error:Object myview is not defiend";
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
						
						conn.query("select * from tbl_POI_userInformation where poiID =? and userID =?",[reqObj.poiID,reqObj.userid,], function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								
								if(result.length>0){
									conn.query("select visitsCount as viewCount from tbl_ArrivalguidesPoiIDetails where id =?",[reqObj.poiID],function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","count":result[0].viewCount , "message":"Total view count!"});
										}
									});
								}else{
									
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var id = formatted+otp;
									
									conn.query("select countryName from tbl_login where id =?",[reqObj.userid],function(err,result){
											if (!!err) {
												console.error('SQL error: ', err);
												return next(err);
											}else{
												if(result[0].countryName == ''){
													var countryNameset = '';
												}else{
													var countryNameset = cryptr.decrypt(result[0].countryName);
												}
												
												conn.query("insert into tbl_POI_userInformation (id, userID, poiID, arrivalID,  myview,countryName,timestamp)values(?, ?, ?, ?,  ?, ?,now())",[id,reqObj.userid,reqObj.poiID,reqObj.arrivalID,1,countryNameset],function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														conn.query("update tbl_ArrivalguidesPoiIDetails set visitsCount = (visitsCount+1) where id = ?",[reqObj.poiID],function(err,result){
															if (!!err) {
																console.error('SQL error: ', err);
																return next(err);
															}else{
																conn.query("select visitsCount as viewCount from tbl_ArrivalguidesPoiIDetails where id =?",[reqObj.poiID],function(err,result){
																	if (!!err) {
																		console.error('SQL error: ', err);
																		return next(err);
																	}else{
																		res.json({"status": "success","count":result[0].viewCount , "message":"Total view count!"});
																	}
																});
															}
														});
													}
												});
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
							
		
		

/* Poi view end */




/* Poi count*/

router.post('/poiCount',function(req,res,next){
	if(req.body.poiCount == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiCount;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						conn.query("select city,categoriesName,userLike,following,usersCount,checkinsCount,tipCount,visitsCount, ROUND((rating/2),2) as rating,rank, recoomended,shareCount,(select count(userID) from tbl_reviewdescription where fid ='"+reqObj.poifid+"') as reviewcount from tbl_foursquare where fid ='"+reqObj.poifid+"' and id ='"+reqObj.poiid+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									
									
										conn.query("select userLike,follow,checkin,recommend,(select count(id) from tbl_usertrippoidetails where fid='"+reqObj.poifid+"') as rankfrom,(select count(rating) from tbl_usertrippoidetails where fid='"+reqObj.poifid+"' and rating <> 0) as ratingCount from tbl_usertrippoidetails where fid='"+reqObj.poifid+"' and userID = '"+reqObj.userid+"'", function(err, resultLike) {
											if (!!err) {
												console.error('SQL error: ', err);
												return next(err);
											}else{
												
												if(resultLike.length >0){
													if(resultLike[0].userLike==0){
														var mylike = false;
													}else{
														var mylike = true;
													}
													if(resultLike[0].follow==0){
														var myfollow = false;
													}else{
														var myfollow = true;
													}
													if(resultLike[0].checkin==0){
														var mycheckin = false;
													}else{
														var mycheckin = true;
													}if(resultLike[0].recommend==0){
														var myrecommend = false;
													}else{
														var myrecommend = true;
													}
													var ratingCount = resultLike[0].ratingCount;
													var rankfrom = resultLike[0].rankfrom;
													
												}else{
													var mylike = false;
													var myfollow = false;
													var mycheckin = false;
													var myrecommend = false;
													var ratingCount = 0;
													var rankfrom = 0;
												}
												
												var arr1 = [];
												var obj1={};
												if(result.length > 0){
													obj1.city = result[0].city;
													obj1.categoriesName = result[0].categoriesName;
													obj1.userLike = result[0].userLike;
													obj1.following = result[0].following;
													obj1.usersCount = result[0].usersCount;
													obj1.checkinsCount = result[0].checkinsCount;
													obj1.tipCount = result[0].tipCount;
													obj1.visitsCount = result[0].visitsCount;
													obj1.rating = result[0].rating;
													obj1.ratingCount = ratingCount;
													obj1.reviewcount = result[0].reviewcount;
													obj1.rank = result[0].rank;
													obj1.rankfrom = rankfrom;
													obj1.recoomended = result[0].recoomended;
													obj1.shareCount = result[0].shareCount;
													obj1.mylike = mylike;
													obj1.myfollow = myfollow;
													obj1.mycheckin = mycheckin;
													obj1.myrecommend = myrecommend;
													arr1.push(obj1);
													res.json({"status": "success","data":arr1,"message":"POI count"});
												}else{
													res.json({"status": "error","data":arr1,"message":"Poi data not found"});
												}
											}
										});
									
									
									
								}else{
									res.json({"status": "error","message":"POI count does not exist"});
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

/* Poi count*/







/* Poi address*/

router.post('/poiAddress',function(req,res,next){
	if(req.body.poiAddress == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error" ,"message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiAddress;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query("select a.name as poiName,a.address,a.phone,a.websiteUrl from tbl_foursquare as a  where  fid ='"+reqObj.poifid+"' and id ='"+reqObj.poiid+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									conn.query("select b.poiDay,b.OpenCloseTime from tbl_foursquare as a , tbl_poitime as b where a.fid = b.fid and  a.id = '"+reqObj.poiid+"' and a.fid = '"+reqObj.poifid+"'", function(err, resultOpen) {
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											var dayarray = [{id:0, day:"Mon"},{id:1, day:"Tue"},{id:2, day:"Wed"},{id:3, day:"Thu"},{id:4, day:"Fri"},{id:5, day:"Sat"},{id:6, day:"Sun"}];

											

											
											
											
											var dayshowopen = [];
											var dayshow = {};
											
											if(resultOpen.length > 0){
												var l = 0;
												for(var i =0; i < resultOpen.length; i++){
													var resa = resultOpen[i].poiDay;
													var OpenCloseTime = resultOpen[i].OpenCloseTime;
													//console.log(OpenCloseTime);
													var arry = resa.split(",");
													
													for(var j= 0; j < arry.length; j++){
														var daysp = String(arry[j]);
														if(daysp.indexOf("–") >0){
															var days = daysp.split("–");
															
																var index = dayarray.findIndex(x => x.day==days[0].trim());
																var indexlast = dayarray.findIndex(x => x.day==days[1].trim());
																for(var kk = 0; kk <= 6; kk++){
																	var dayshow = {};
																	if(kk>=index && kk<=indexlast){
																	var dayweek = dayarray[kk].day;
																	dayshow.id = dayarray.findIndex(x => x.day==dayweek.trim());
																	dayshow.day = dayweek.trim();
																	dayshow.time = OpenCloseTime;	
																		dayshowopen.push(dayshow);
																	}
																}
															}else{
															var dayshow = {};
																dayshow.id = dayarray.findIndex(x => x.day==arry[j].trim());
																dayshow.day = arry[j].trim();
																dayshow.time = OpenCloseTime;
																dayshowopen.push(dayshow);
															}
													}
												}
												
												for(var check = 0; check <= 6; check++){
													var dayarrayid = dayarray.findIndex(x => x.id==check);
													if(dayshowopen[check]==undefined){
														var dayshow = {};
														dayshow.id = check;
														dayshow.day = dayarray[check]['day'].trim();
														dayshow.time = "Closed";
														dayshowopen.push(dayshow);
													}
												}
												
												var sorted = dayshowopen.sort(function (a, b) {
													return a.id - b.id || a.date.split('-').reverse().join('') - b.date.split('-').reverse().join('');
												});
												var FinalSortedDays = [];
												sorted.forEach(function (element) {
													FinalSortedDays.push(element);
												});
														
												var arr1 = [];
												var obj1={};
												if(result.length > 0){
													obj1.poiName = result[0].poiName;
													obj1.address = result[0].address;
													obj1.phone = result[0].phone;
													obj1.contact_email = '';
													obj1.website = result[0].websiteUrl;
													obj1.Daysarray = FinalSortedDays;
													
													arr1.push(obj1);
												}
												res.json({"status": "success","data":arr1,"message":"POI count"});
											}else{
												var arr1 = [];
												var obj1={};
												if(result.length > 0){
													obj1.poiName = result[0].poiName;
													obj1.address = result[0].address;
													obj1.phone = result[0].phone;
													obj1.contact_email = '';
													obj1.website = result[0].websiteUrl;
													obj1.Daysarray = [];
													arr1.push(obj1);
												}
												res.json({"status": "success","data":arr1,"message":"POI count"});
											}
										}
									});
								}else{
									res.json({"status": "error","message":"POI does not exist"});
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

/* Poi address*/






/* Poi rating*/

router.post('/poiRating',function(req,res,next){
	if(req.body.poiRating == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiRating;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						
						
						conn.query("select (select count(categoriesName) as rankfrom from tbl_foursquare where  categoriesName =(select categoriesName from tbl_foursquare where fid ='"+reqObj.poifid+"')) as rankfrom,b.categoriesName,b.city,round(a.rating/2,1) as rating,b.rank,b.recoomended,shareCount,(select count(userID) from tbl_reviewdescription where fid = '"+reqObj.poifid+"') as reviewcount,ifnull((select e.description from tbl_reviewdescription as e, tbl_usertrippoidetails as d where d.userID = e.userID and d.fid = e.fid and d.fid='"+reqObj.poifid+"'  order by d.rating desc limit 1),'') as review,ifnull((select concat(d.firstName) from tbl_reviewdescription as e, tbl_usertrippoidetails as d where d.userID = e.userID and d.fid = e.fid and d.fid='"+reqObj.poifid+"'  order by d.rating desc limit 1),'') as firstName,ifnull((select concat(d.lastName) from tbl_reviewdescription as e, tbl_usertrippoidetails as d where d.userID = e.userID and d.fid = e.fid and d.fid='"+reqObj.poifid+"'  order by d.rating desc limit 1),'') as lastName from tbl_usertrippoidetails as a,tbl_foursquare as b where a.fid = b.fid and  a.fid ='"+reqObj.poifid+"' order by a.rating desc limit 1", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var arr1 = [];
								var obj1={};
								if(result.length > 0){
									conn.query("select ifnull((select count(rating) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating >8),0) as fivestar,ifnull((select count(rating) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating >6 and rating <= 8 ),0) as fourstar,ifnull((select count(rating) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating >4 and rating <= 6),0) as threestar,ifnull((select count(rating) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating >2  and rating <= 4),0) as twostar,ifnull((select count(rating) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating >0 and rating <=2),0) as onestar,(select count(id) from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and rating != 0) as ratingCount from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' limit 1", function(err, resultOpen) {
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											var timeopen = [];
											var dayshow = {};
											var timeshow = {};
											if(resultOpen.length > 0){
												var fivestar= resultOpen[0].fivestar;
												var fourstar= resultOpen[0].fourstar;
												var threestar= resultOpen[0].threestar;
												var twostar= resultOpen[0].twostar;
												var onestar= resultOpen[0].onestar;
												var ratingCount= resultOpen[0].ratingCount;
												//res.json({"status": "success","data":arr1,"message":"POI count"});
											}else{
												var fivestar= 0;
												var fourstar= 0;
												var threestar= 0;
												var twostar= 0;
												var onestar= 0;
												var ratingCount= 0;
											}
											if(result[0].review == undefined || result[0].review == ''){
												var review ='';
											}else{
												var review =cryptr.decrypt(result[0].review);
											}
											if(result[0].firstName == undefined || result[0].firstName== ''){
												var firstName ='';
											}else{
												var firstName = cryptr.decrypt(result[0].firstName);// cryptr.decrypt(result[0].fullname);
											}if(result[0].lastName == undefined || result[0].lastName== ''){
												var lastName ='';
											}else{
												var lastName = ' '+cryptr.decrypt(result[0].lastName); // result[0].fullname
											}
												obj1.toprating = result[0].rating;
												obj1.rank = result[0].rank;
												obj1.recoomended = result[0].recoomended;
												obj1.shareCount = result[0].shareCount;
												obj1.reviewcount = result[0].reviewcount;
												obj1.review = review;
												obj1.rankfrom = result[0].rankfrom;
												obj1.categoriesName = result[0].categoriesName;
												obj1.fullname = firstName +lastName;
												obj1.city = result[0].city;
												obj1.fivestar =fivestar;
												obj1.fourstar =fourstar;
												obj1.threestar =threestar;
												obj1.twostar =twostar;
												obj1.onestar =onestar;
												obj1.ratingCount =ratingCount;
												
												arr1.push(obj1);
											res.json({"status": "success","data":arr1,"message":"rating review"});
										}
									});
								}else{
									res.json({"status": "error","message":"POI does not exist"});
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

/* Poi rating end*/




/* Poi rating*/

router.post('/poiReviews',function(req,res,next){
	if(req.body.poiReviews == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiReviews;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						conn.query("call STR_ReviewShow('"+reqObj.userid+"','"+reqObj.poifid+"')",function(err,result){
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length > 0){
									var arr = [];
									for(var i =0; i < result[0].length; i++){
										var obj1 = {};
										
										if(result[0][i].firstName == undefined || result[0][i].firstName == ''){
														var firstName = '';
													}else{
														var firstName = cryptr.decrypt(result[0][i].firstName);
													}
													
													if(result[0][i].lastName == undefined || result[0][i].lastName == ''){
														var lastName = '';
													}else{
														var lastName = cryptr.decrypt(result[0][i].lastName);
													}
													if(result[0][i].titleName == undefined || result[0][i].titleName == ''){
														var titleName = '';
													}else{
														var titleName = cryptr.decrypt(result[0][i].titleName);
													}if(result[0][i].userLike == undefined || result[0][i].userLike == 0){
														var userLike = false;
													}else{
														var userLike = true;
													}
													
													
													
													if(result[0][i].viewStatus == undefined || result[0][i].viewStatus == 0){
																		var viewStatus = false;
																		
																	}else{
																		var viewStatus = true;
																	}
													if(result[0][i].description == ''){
														var description = '';
													}else{
														var description = cryptr.decrypt(result[0][i].description);
													}
										obj1.id = result[0][i].id;
										obj1.fid = result[0][i].fid;
										obj1.userPOIID = result[0][i].userPOIID;
										obj1.firstName = firstName;
										obj1.lastName = lastName;
										obj1.titleName = titleName;
										obj1.gender = result[0][i].gender;
										obj1.poiImage = result[0][i].poiImage;
										obj1.userPic = result[0][i].userPic;
										obj1.myviewcount = result[0][i].myviewcount;
										obj1.mylikecount = result[0][i].mylikecount;
										obj1.timestamp = result[0][i].timestamp;
										obj1.userLike = userLike;
										obj1.viewStatus = viewStatus;
										obj1.description = description;
										arr.push(obj1);
										
									}
									res.json({"status": "success","data":arr,"message":"rating review"});
									
									
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

/* Poi rating end*/









/* Poi review */

router.post('/poiReviewCount',function(req,res,next){
	if(req.body.poiReviewCount == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiReviewCount;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query("select * from tbl_userReviewCount where fid ='"+reqObj.poifid+"' and userId ='"+reqObj.userid+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								
								if(result.length>0){
									if(result[0].myviewcount == 0){
										var viewCount = 1;
										
									}else{
										var viewCount = 0;
									}
									
									conn.query("update tbl_usertrippoidetails set myviewcount = (myviewcount+"+viewCount+") where fid ='"+reqObj.poifid+"'");
									conn.query("update tbl_userReviewCount set viewCount = 1 where fid ='"+reqObj.poifid+"' and userID ='"+reqObj.userid+"'");
									
									conn.query("select myviewcount from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and id= "+reqObj.poiid+"",function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","count": result, "message":"View count update successfully"});
										}
									});
									
								}else{
									conn.query("select * from tbl_login where id = "+reqObj.userid+"",function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(result.length >0){
												conn.query("update tbl_usertrippoidetails set myviewcount = (myviewcount+1) where fid ='"+reqObj.poifid+"'");
												
												conn.query("insert into tbl_userReviewCount (fid, userId, firstName, lastName, viewCount)values('"+reqObj.poifid+"','"+reqObj.userid+"','"+result[0].first_name+"','"+result[0].last_name+"',1)",function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														
														conn.query("select myviewcount from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"'",function(err,result){
															if (!!err) {
																console.error('SQL error: ', err);
																return next(err);
															}else{
																res.json({"status": "success","count": result, "message":"View inserted successfully"});
															}
														});
														
														
													}
												});
											}else{
												res.json({"status": "error","message":"Unable to insert view"});
											}
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

/* Poi Review  end */








/* Poi Like*/

router.post('/poiLikeUserCount',function(req,res,next){
	if(req.body.poiLikeUserCount == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiLikeUserCount;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiid == undefined || reqObj.poiid == ''){
			var ex = "Internal error:Object poi id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poifid == undefined || reqObj.poifid == ''){
			var ex = "Internal error:Object poi fid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userPOIID == undefined || reqObj.userPOIID == ''){
			var ex = "Internal error:Object user POI ID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else{
			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						conn.query("select * from tbl_userReviewCount where fid ='"+reqObj.poifid+"' and userIDlike = '"+reqObj.userPOIID+"' and userId ='"+reqObj.userid+"'", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(reqObj.type == 'like'){
									var likecount= 1;	
									var userLikecount = '(mylikecount+1)';
								}else{
									var likecount = 0;
									var userLikecount = '(mylikecount-1)';
								}
								if(result.length > 0){
									conn.query("update tbl_usertrippoidetails set mylikecount = "+userLikecount+" where fid ='"+reqObj.poifid+"' and userID= '"+reqObj.userPOIID+"'");
									
									conn.query("update tbl_userReviewCount set userLike = "+likecount+" , userIDlike = '"+reqObj.userPOIID+"' where fid ='"+reqObj.poifid+"' and userIDlike ='"+reqObj.userPOIID+"' and userId ='"+reqObj.userid+"'");
									
									conn.query("select mylikecount from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and userID= "+reqObj.userPOIID+"",function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											res.json({"status": "success","likeCount":result[0].mylikecount,"message":"Like count update successfully"});
										}
									});
									
									
								}else{
									conn.query("select * from tbl_login where id = "+reqObj.userid+"",function(err,result){
										if (!!err) {
											console.error('SQL error: ', err);
											return next(err);
										}else{
											if(result.length >0){
												conn.query("update tbl_usertrippoidetails set mylikecount = "+userLikecount+" where fid ='"+reqObj.poifid+"' and userID= '"+reqObj.userPOIID+"'");
												conn.query("insert into tbl_userReviewCount(fid, userId, firstName, lastName, userLike,userIDlike,timestamp)values('"+reqObj.poifid+"','"+reqObj.userid+"','"+result[0].first_name+"','"+result[0].last_name+"',"+likecount+",'"+reqObj.userPOIID+"',now())",function(err,result){
													if (!!err) {
														console.error('SQL error: ', err);
														return next(err);
													}else{
														
														conn.query("select mylikecount from tbl_usertrippoidetails where fid ='"+reqObj.poifid+"' and userID= '"+reqObj.userPOIID+"'",function(err,result){
															if (!!err) {
																console.error('SQL error: ', err);
																return next(err);
															}else{
																if(result.length > 0){
																res.json({"status": "success","likeCount":result[0].mylikecount,"message":"Like inserted successfully"});
																}else{
																	res.json({"status": "success","likeCount":0,"message":"Like count"});
																}
															}
														});
														
													}
												});
											}else{
												res.json({"status": "error","message":"Unable to insert like"});
											}
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

/* Poi Like end */


/* Insights API start */

router.post('/poiInsights',function(req,res,next){
	if(req.body.poiInsights == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsights;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						// console.log('call STR_POIInsights("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")');
						conn.query('call STR_POIInsights("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									if(result[0][0].rating > 8){
										obj.poiImpact = 'Excellent';
									}else if(result[0][0].rating > 6){
										obj.poiImpact = 'Good';
									}else if(result[0][0].rating > 4){
										obj.poiImpact = 'Average';
									}else if(result[0][0].rating > 2){
										obj.poiImpact = 'Poor';
									}else{
										obj.poiImpact = 'Very Poor';
									}
									
									obj.rating = result[0][0].rating;
									obj.checkinsCount = result[0][0].checkinsCount;
									obj.recommendation = result[0][0].recommendation;
									obj.category = result[0][0].category;
									obj.lifestyle = result[0][0].lifestyle;
									obj.city = result[0][0].city;
									obj.reviewcount = result[0][0].reviewcount;
									obj.categories = result[0][0].categories;
									insightsArray.push(obj);
									res.json({"status": "success","data":insightsArray, "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights is not blank"});
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

/* Insights API end */





/* POI view by gender API start */

router.post('/poiInsightsView',function(req,res,next){
	if(req.body.poiInsightsView == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsView;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						
						conn.query('call STR_POIInsightsView("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									
									res.json({"status": "success","data":result[0], "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights view is blank"});
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

/* POI view by gender API end */






/* ---------------------------------- Api for poi life style start ------------------------------------------------*/
router.post('/poiLifeStyle',function(req,res,next){
	if(req.body.poiLifeStyle == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiLifeStyle;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
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
						
						conn.query('call STR_POIInsightsLifeStyle("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								res.json({"status": "success","data":result[0], "message": "POI Like by Life styel"});
								
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
/* ---------------------------------- Api for poi life style end ------------------------------------------------*/


















/* ------------------------------------------- POI Directions API start -------------------------------------- */

router.post('/poiInsightsDirections',function(req,res,next){
	if(req.body.poiInsightsDirections == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsDirections;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						console.log('call STR_POIInsightsDirections("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")');
						conn.query('call STR_POIInsightsDirections("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									
									res.json({"status": "success","data":result[0], "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights direction is blank"});
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

/* ---------------------------------- POI Directions API end  --------------------------------------------- */













/* ------------------------------------------- POI Directions API start -------------------------------------- */

router.post('/poiInsightsRatingByGender',function(req,res,next){
	if(req.body.poiInsightsRatingByGender == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsRatingByGender;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						console.log('call STR_POIInsightsRatingByGender("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")');
						conn.query('call STR_POIInsightsRatingByGender("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									
									res.json({"status": "success","data":result[0], "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights direction is blank"});
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

/* ---------------------------------- POI Directions API end  --------------------------------------------- */






/* ------------------------------------------- POI Rating API start -------------------------------------- */

router.post('/poiInsightsRatingByAge',function(req,res,next){
	if(req.body.poiInsightsRatingByAge == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsRatingByAge;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						
						conn.query('call STR_POIInsightsRatingBYAGE("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									
									res.json({"status": "success","data":result[0], "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights direction is blank"});
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





/* ------------------------------------------- POI Rating lisf style API start -------------------------------------- */

router.post('/poiInsightsRatingLifeStyle',function(req,res,next){
	if(req.body.poiInsightsRatingLifeStyle == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiInsightsRatingLifeStyle;
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
						var tableName = 'tbl_arrivalguidespoiidetails'+reqObj.countryName.toLowerCase();
						
						conn.query('call STR_POIInsightsRatingLifeStyle("'+reqObj.userid+'","'+reqObj.poiID+'","'+tableName+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								var insightsArray = [];
								var obj = {};
								
								if(result[0].length >0){
									
									
									res.json({"status": "success","data":result[0], "message": "Insights details"});
								}else{
									res.json({"status": "error","data":insightsArray, "message": "Insights direction is blank"});
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









/* ------------------------------------------------ Poi Checking in by location Start  -------------------------------------- */

router.post('/poiCheckInByLocation',function(req,res,next){
	if(req.body.poiCheckInByLocation == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiCheckInByLocation;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
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
						
						conn.query('call STR_POIInsightsCheckINByLocation("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result[0].length>0){
									res.json({"status": "success","data":result[0], "message": "POI check in by location blank!"});
								}else{
									res.json({"status": "error","message": "POI check in by location blank!"});
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

/* ------------------------------------------------ Poi Check in by location End  -------------------------------------- */




/* ------------------------------------------------ Poi Check in by location Start  -------------------------------------- */

router.post('/poiRatingByLocation',function(req,res,next){
	if(req.body.poiRatingByLocation == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.poiRatingByLocation;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object user id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poi id is not defiend";
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
						
						conn.query('call STR_POIInsightsRatingByLocation("'+reqObj.userid+'","'+reqObj.poiID+'","'+reqObj.platform+'")', function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result[0].length>0){
									res.json({"status": "success","data":result[0], "message": "POI check in by location blank!"});
								}else{
									var arr = [];
									res.json({"status": "success","data":arr,"message": "POI check in by location blank!"});
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

/* ------------------------------------------------ Poi Rating by location End  -------------------------------------- */
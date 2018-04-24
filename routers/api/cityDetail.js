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

router.get('/', function(req, res, next) {
	res.sendFile(__dirname + "/webcode/map.html");
});

var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var cityImages ='https://travialist.com/ImagesCity/';
var PdfCity ='https://travialist.com/PdfCity/';

module.exports = router;


router.post('/listCity',function(req,res,next){
	
	if(req.body.listCity == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.listCity;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.countryID == undefined || reqObj.countryID == ''){
			var ex = "Internal error:Object country id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object Country name is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}
		else{

			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var arr1 = [];
						var obj1={};
						
						var query = conn.query("select t.*,tt.EmergencyNumbers,ifnull(bookmark.bookmark,0) as citybookmark from (select a.id,a.name as countryName,a.CountryCode as CityName1,a.location,replace(c.image,'width=200&height=300','width=350&height=500')  as image,c.description,c.fullimage,c.headerimage,concat('"+PdfCity+"',a.pdf) as pdf from tbl_arrivalguides as a,tbl_arrivalguidesimages as c where a.name <> '' and c.arrivalId = a.id and  a.name ='"+reqObj.countryName+"' order by rand()) as t left join tbl_BookmarkCity as bookmark on(t.id=bookmark.arrivalID and bookmark.userID = '"+reqObj.userid+"') , tbl_ArrivalguidesPoi as tt where t.CityName1 = tt.iso group by t.id order by CityName1", function(err, result) {
							if (!!err) {
													console.error('SQL error: ', err);
													return next(err);
												}else{
													if(result.length > 0){
														
														obj1.country = reqObj.countryName;
														obj1.city = result;
														arr1.push(obj1);
														res.json({"status": "success","data":arr1,"message":"city data"});
													}else{
														var arraycity= [];
														obj1.country = reqObj.countryName;
														obj1.city = arraycity;
														arr1.push(obj1);
														res.json({"status": "error","data":arr1,"message":"city data not found"});
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




/*City List start */





router.post('/cityPoi',function(req,res,next){
	if(req.body.cityPoi == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.cityPoi;
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
						conn.query("select id,fid,name,phone,address,crossStreet,lat,lng,city,state,country,categoriesName,categoriesPluralName,categoriesShortName,categoriesIcon from tbl_foursquare where city = '"+reqObj.cityname+"'", function(err, result) {
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







router.post('/listcountry',function(req,res,next){
	var arr1 = [];
	
	try {
		req.getConnection(function(err, conn) {
            if (!!err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
				var query = conn.query("select region from tbl_continentcountry where region <> 'null' group by region", function(err, result) {
					if (!!err) {
						console.error('SQL error: ', err);
						return next(err);
					}else{
						
							if(result.length >0){
								var array1 = result;
								var count1 = 0;
								asyncLoop(array1, function (itemdata, next){
									var array = [];
									var obj1={};
									array.push(itemdata.region);
									if(array.length > 0){
										asyncLoop(array, function (item, next){
											var item = item;
											var query = conn.query("select * from (select a.id,a.name as countyName,(select EmergencyNumbers from tbl_ArrivalguidesPoi where iso=a.CountryCode) as EmergencyNumbers,a.location,replace(c.image,'width=200&height=300','width=350&height=500') as image ,c.fullimage,c.headerimage,'"+item+"' as region from tbl_arrivalguides as a,tbl_arrivalguidesimages as c where a.name <> ''  and c.arrivalId = a.id and CName in (select region from tbl_continentcountry where region ='"+item+"')) as t group by t.countyName order by countyName", function(err, result) {
												if (!!err) {
													console.error('SQL error: ', err);
													return next(err);
												}else{
													if(result.length > 0){
														obj1.region = item;
														obj1.country = result;
														arr1.push(obj1);
														next();
													}else{
														var arraycity= [];
														obj1.region = item;
														obj1.country = arraycity;
														arr1.push(obj1);
														next();
													}
												}
											});
											 
										}, function (err)
										{
											next();
										});
									}
								}, function (err)
										{
											res.json({"status": "success","data":arr1,"message":"All Country List"});
										});
							}else{
								res.json({"status": "error","error_type":"Country List","message":"Country List not available."});
							}
						}
				   });
			}
        });
	}catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
    }

});





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




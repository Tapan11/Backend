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

/* ------------------------------------------ City home Api start ---------------------------------- */

router.post('/cityHome',function(req,res,next){
	
	if(req.body.cityHome == undefined){
		var ex = "Internal error:Object is cityHome not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.cityHome;
		if(reqObj.cityName == undefined || reqObj.cityName == ''){
			var ex = "Internal error:Object cityName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object countryName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object cityID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error: Object platform is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}
		else{
			var arr1 = [];
			var obj = {};
			var reqObj = req.body.cityHome;	
			var userID = reqObj.userID;
			var cityID = reqObj.cityID;
			var cityName = reqObj.cityName;
			var countryName = reqObj.countryName;
			var platform = reqObj.platform;
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var query = conn.query("call STR_CityHome('"+userID+"','"+cityID+"','"+cityName+"','"+countryName+"','"+platform+"')", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length>0){
									obj.cityMain = result[0];
									obj.theCity = result[1];
									arr1.push(obj);
									res.json({"status": "success","data" :arr1,"message":"The city data found"});
								}else{ 
									res.json({"status": "error","message":"The city data not found"});
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

/* ------------------------------------------ City home Api end ---------------------------------- */


/* ------------------------------------------City Highlights Api start ---------------------------------- */

router.post('/cityHighlights',function(req,res,next){
	
	if(req.body.cityHighlights == undefined){
		var ex = "Internal error:Object is cityHighlights not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.cityHighlights;
		if(reqObj.cityName == undefined || reqObj.cityName == ''){
			var ex = "Internal error:Object cityName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object countryName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object cityID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error: Object platform is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}
		else{
			var arr1 = [];
			var obj = {};
			var reqObj = req.body.cityHighlights;	
			var userID = reqObj.userID;
			var cityID = reqObj.cityID;
			var cityName = reqObj.cityName;
			var countryName = reqObj.countryName;
			var platform = reqObj.platform;
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						var query = conn.query("call STR_CityHighlights('"+userID+"','"+cityID+"','"+cityName+"','"+countryName+"','"+platform+"')", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length>0){
									/* obj.CityHighlights = result[0];
									arr1.push(obj) */;
									res.json({"status": "success","data" :result[0],"message":"The city data found"});
								}else{ 
									res.json({"status": "error","message":"The city data not found"});
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

/* ------------------------------------------ City highlights Api end ---------------------------------- */

/* ------------------------------------------ City POI filter with categories Api start ---------------------------------- */

router.post('/cityPoiCategories',function(req,res,next){
	
	if(req.body.cityPoiCategories == undefined){
		var ex = "Internal error:Object is cityPoiCategories not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.cityPoiCategories;
		if(reqObj.cityName == undefined || reqObj.cityName == ''){
			var ex = "Internal error:Object cityName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object cityID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.type == undefined || reqObj.type == ''){
			var ex = "Internal error:Object type is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.countryName == undefined || reqObj.countryName == ''){
			var ex = "Internal error:Object countryName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error: Object platform is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}else if(reqObj.sortType == undefined || reqObj.sortType == ''){
			var ex = "Internal error: Object sortType is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}else if(reqObj.sortTypeValue == undefined || reqObj.sortTypeValue == ''){
			var ex = "Internal error: Object sortTypeValue is not defiend";
			res.json({"status":"error","message":ex});
			return next(ex);
		}
		else{
			var arr1 = [];
			var obj = {};
			
			var userID = reqObj.userID;
			var cityID = reqObj.cityID;
			var cityName = reqObj.cityName;
			var type = reqObj.type;
			var platform = reqObj.platform;
			var sortTypeValue = reqObj.sortTypeValue;
			var sortType = reqObj.sortType;
			
			/* if(sortType == 'Hotel'){
				if(reqObj.filterPrice == undefined || reqObj.filterPrice == ''){
					var ex = "Internal error: Object filterPrice is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterOfficialRating == undefined || reqObj.filterOfficialRating == ''){
					var ex = "Internal error: Object filterOfficialRating is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterRating == undefined || reqObj.filterRating == ''){
					var ex = "Internal error: Object filterRating is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterAmenities == undefined || reqObj.filterAmenities == ''){
					var ex = "Internal error: Object filterAmenities is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterLifestyle == undefined || reqObj.filterLifestyle == ''){
					var ex = "Internal error: Object filterLifestyle is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterAccomodation == undefined || reqObj.filterAccomodation == ''){
					var ex = "Internal error: Object filterAccomodation is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else{
					var filterPrice = reqObj.filterPrice;
					var filterOfficialRating = reqObj.filterOfficialRating;
					var filterRating = reqObj.filterRating;
					var filterAmenities = reqObj.filterAmenities;
					var filterLifestyle = reqObj.filterLifestyle;
					var filterAccomodation = reqObj.filterAccomodation;
				}
			
			}else if(sortType == 'Dining'){
				if(reqObj.filterTypeFood == undefined || reqObj.filterTypeFood == ''){
					var ex = "Internal error: Object filterTypeFood is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}
				else if(reqObj.filterPriceLevel == undefined || reqObj.filterPriceLevel == ''){
					var ex = "Internal error: Object filterPriceLevel is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterAmenities == undefined || reqObj.filterAmenities == ''){
					var ex = "Internal error: Object filterAmenities is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else if(reqObj.filterLifestyle == undefined || reqObj.filterLifestyle == ''){
					var ex = "Internal error: Object filterLifestyle is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else{
					var filterTypeFood = reqObj.filterTypeFood;
					var filterPriceLevel = reqObj.filterPriceLevel;
					var filterAmenities = reqObj.filterAmenities;
					var filterLifestyle = reqObj.filterLifestyle;
				}
				
			}else if(sortType != 'Rating' && sortType != 'Ranking' && sortType != 'Price'){
				
				if(reqObj.filterLifestyle == undefined || reqObj.filterLifestyle == ''){
					var ex = "Internal error: Object filterLifestyle is not defiend";
					res.json({"status":"error","message":ex});
					return next(ex);
				}else{
					var filterLifestyle = reqObj.filterLifestyle;
				}
			}else{
				
			} */
			
			
			
			try {
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						console.log("call STR_CityPOICatories('"+userID+"','"+cityID+"','"+cityName+"','"+type+"','"+reqObj.countryName+"','"+platform+"','"+sortType+"','"+sortTypeValue+"')");
						var query = conn.query("call STR_CityPOICatories('"+userID+"','"+cityID+"','"+cityName+"','"+type+"','"+reqObj.countryName+"','"+platform+"','"+sortType+"','"+sortTypeValue+"')", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length>0){
									obj.CategoriesMain = result[0];
									obj.Categoriesdetails = result[1];
									arr1.push(obj);
									res.json({"status": "success","data" :arr1,"message":"The city POI data found"});
								}else{ 
									res.json({"status": "error","message":"The city POI data not found"});
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

/* ------------------------------------------ City POI filter with categories Api end ---------------------------------- */

/* ------------------------------------------ County all POI showing start ------------------------------------ */
router.post('/CountyPoiAll',function(req,res,next){
	
	if(req.body.CountyPoiAll == undefined){
		var ex = "Internal error:Object is CountyPoiAll not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.CountyPoiAll;
		if(reqObj.countyName == undefined || reqObj.countyName == ''){
			var ex = "Internal error:Object countyName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
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
						
						var userID = reqObj.userID;	
						var cityID = reqObj.cityID;
						var cityName = reqObj.cityName;
						var countyName = reqObj.countyName;
						var platform = reqObj.platform;
						
						var query = conn.query("call STR_CountryPOIAll('"+userID+"','"+cityID+"','"+cityName+"','"+countyName+"','"+platform+"')", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length>0){
									res.json({"status": "success","data" :result[0],"message":"The city POI data found"});
								}else{ 
									res.json({"status": "error","message":"The city POI data not found"});
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

/* ------------------------------------------ County all POI showing Api end ---------------------------------- */








/* ------------------------------------------ cityPoiAll all POI showing start ------------------------------------ */
router.post('/cityPoiAll',function(req,res,next){
	
	if(req.body.cityPoiAll == undefined){
		var ex = "Internal error:Object is cityPoiAll not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj = req.body.cityPoiAll;
		if(reqObj.countyName == undefined || reqObj.countyName == ''){
			var ex = "Internal error:Object countyName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.userID == undefined || reqObj.userID == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityID == undefined || reqObj.cityID == ''){
			var ex = "Internal error:Object cityID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.cityName == undefined || reqObj.cityName == ''){
			var ex = "Internal error:Object cityName is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
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
						
						var userID = reqObj.userID;	
						var cityID = reqObj.cityID;
						var cityName = reqObj.cityName;
						var countyName = reqObj.countyName;
						var platform = reqObj.platform;
						
						var query = conn.query("call STR_CityPOIAll('"+userID+"','"+cityID+"','"+cityName+"','"+countyName+"','"+platform+"')", function(err, result) {
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
							}else{
								if(result.length>0){
									res.json({"status": "success","data" :result[0],"message":"The city POI data found"});
								}else{ 
									res.json({"status": "error","message":"The city POI data not found"});
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

/* ------------------------------------------ cityPoiAll all POI showing Api end ---------------------------------- */




/* ------------------------------------------------- City Book Mark API Start -------------------------------------------*/

router.post('/listCityBookMark',function(req,res,next){
	
	if(req.body.listCityBookMark == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.listCityBookMark;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object country id is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{

			try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					} else {
						
						var query = conn.query("select a.id,a.name as countryName,a.CountryCode as CityName,a.location,replace(c.image,'width=200&height=300','width=350&height=500')  as image,c.description,c.fullimage,c.headerimage from tbl_arrivalguides as a,tbl_arrivalguidesimages as c where a.name <> '' and c.arrivalId = a.id and a.id in(select arrivalID from tbl_BookmarkCity where userID = '"+reqObj.userid+"' and bookmark = 1) group by a.id", function(err, result) {
							if (!!err) {
									console.error('SQL error: ', err);
									return next(err);
								}else{
									if(result.length > 0){
										res.json({"status": "success","data":result,"message":"city data"});
									}else{
										
										res.json({"status": "error","message":"City Bookmark blank"});
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

/* ------------------------------------------------- City Book Mark API End ---------------------------------------------*/







/* ------------------------------------------------- POI Book Mark API Start -------------------------------------------*/

router.post('/listPOIBookMark',function(req,res,next){
	
	if(req.body.listPOIBookMark == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.listPOIBookMark;
		if(reqObj.userid == undefined || reqObj.userid == ''){
			var ex = "Internal error:Object userID is not defiend";
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
					} else {
						
						var query = conn.query("select  e.name as countryName,d.iso,a.id as poiID,a.arrivalID,a.poiTitle as poiName,a.poiDescription,a.poiMoreinfo as poiComment,a.visitsCount as viewCount,a.tipCount,a.usersCount,a.checkinsCount	,a.likesCount,a.rating,ifnull(b.categories,'Other') as poiCategories,concat(c.image,'?width=250&height=350&mode=crop') as images,a.poiLat,a.poiLong from tbl_ArrivalguidesPoiIDetails as a left join tbl_categories as b on a.id = b.poiID left join tbl_ArrivalguidesPoiImage as c on a.id = c.poiID, tbl_ArrivalguidesPoi as d,tbl_arrivalguides as e where e.CountryCode= d.iso and d.id = a.arrivalID and a.id in (select poiID from tbl_POI_userInformation where mybookmark = 1 and userID='"+reqObj.userid+"') group by a.id", function(err, result) {
							if (!!err) {
									console.error('SQL error: ', err);
									return next(err);
								}else{
									if(result.length > 0){
										res.json({"status": "success","data":result,"message":"Poi bookmark"});
									}else{
										
										res.json({"status": "error","message":"Poi bookmark blank"});
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

/* ------------------------------------------------- POI Book Mark API End ---------------------------------------------*/
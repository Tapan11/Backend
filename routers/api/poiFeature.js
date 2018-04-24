var express = require("express");
var nodemailer = require('nodemailer');
var dateTime = require('node-datetime');

var fs = require("fs"); 
var router = express.Router();
var Cryptr = require('cryptr'),  
cryptr = new Cryptr('myTotalySecretKey');
var asyncLoop = require('node-async-loop');
var mailemail = 'tapan.rawal@travialist.com';


var imgurl = 'https://travialist.com/ImagesFiles/';

module.exports = router;


 /* router.use(function (req, res, next) {
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
    next();
}); */


router.post('/showContinents',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				conn.query("select * from tbl_continentcountry order by region",function(err, result){
					if (err) {
						console.error('SQL error: ', err);
						return next(err);
					}else{
						if(result.length > 0){
							res.json({"status": "success","data" :result,"message":"All continents"});				
						}else{
						}
					}										
				})
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});

/*---------------------------------------- Show country list start ----------------------------------------------*/
router.post('/showContinentsCountry',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.region== undefined || req.body.authUser.region == ''){
					
				}else{
					conn.query("select id,name from tbl_arrivalguides where cname = '"+req.body.authUser.region+"' group by name order by name",function(err, result){
						if (err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length > 0){
								res.json({"status": "success","data" :result,"message":"All continents"});				
							}else{
							}
						}										
					});
				}
				
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Show country list end ----------------------------------------------*/



/*---------------------------------------- Show city list start ----------------------------------------------*/
router.post('/showCountryCity',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.countyname== undefined || req.body.authUser.countyname == ''){
					var err = 'Object countyname is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else{
					conn.query("select id,CountryCode from tbl_arrivalguides where name = '"+req.body.authUser.countyname+"' order by CountryCode",function(err, result){
						if (err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length > 0){
								res.json({"status": "success","data" :result,"message":"All continents"});				
							}else{
							}
						}										
					});
				}
				
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Show city list end ----------------------------------------------*/






/*---------------------------------------- Show Category list start ----------------------------------------------*/
router.post('/showAllCategory',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
					conn.query("select id,Category from tbl_CategoriesTravialist where Category <> '' and Category <> '-' group by Category order by Category",function(err, result){
						if (err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length > 0){
								res.json({"status": "success","data" :result,"message":"All continents"});				
							}else{
							}
						}										
					});
				
		}
	});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Show Category list end ----------------------------------------------*/





/*---------------------------------------- Show Category list start ----------------------------------------------*/
router.post('/showCategorySub',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.Category== undefined || req.body.authUser.Category == ''){
					var err = 'Object countyname is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else{
					conn.query("select id,subCategory from tbl_CategoriesTravialist where Category <> '' and Category <> '-' and Category ='"+req.body.authUser.Category+"'",function(err, result){
						if (err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length > 0){
								res.json({"status": "success","data" :result,"message":"All continents"});				
							}else{
							}
						}	
					});
				}
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Show Category list end ----------------------------------------------*/




/*---------------------------------------- Show Category list start ----------------------------------------------*/
router.post('/showCategorySubSub',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.subCategory== undefined || req.body.authUser.subCategory == ''){
					var err = 'Object countyname is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else{
					conn.query("select id,subSubCategory from tbl_CategoriesTravialist where subCategory='"+req.body.authUser.subCategory+"'",function(err, result){
						if (err) {
							console.error('SQL error: ', err);
							return next(err);
						}else{
							if(result.length > 0){
								res.json({"status": "success","data" :result,"message":"All continents"});				
							}else{
							}
						}	
					});
				}
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Show Category list end ----------------------------------------------*/



/*---------------------------------------- Add POI start ----------------------------------------------*/
router.post('/uploadImg',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.region== undefined || req.body.authUser.region == ''){
					var err = 'Object region is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.countryName== undefined || req.body.authUser.countryName == ''){
					var err = 'Object countryName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.CityName== undefined || req.body.authUser.CityName == ''){
					var err = 'Object CityName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.CategoryID== undefined || req.body.authUser.CategoryID == ''){
					var err = 'Object CategoryID is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.CategoryName== undefined || req.body.authUser.CategoryName == ''){
					var err = 'Object CategoryName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.subCategoryID== undefined || req.body.authUser.subCategoryID == ''){
					var err = 'Object CategoryName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.subCategoryName== undefined || req.body.authUser.subCategoryName == ''){
					var err = 'Object subCategoryName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.subSubCategoryID== undefined){
					var err = 'Object subSubCategoryID is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.subSubCategoryName== undefined){
					var err = 'Object subSubCategoryName is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiTitle== undefined || req.body.authUser.poiTitle== ''){
					var err = 'Object poiTitle is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiDescription== undefined || req.body.authUser.poiDescription== ''){
					var err = 'Object poiDescription is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiLat== undefined || req.body.authUser.poiLat== ''){
					var err = 'Object poiLat is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiLong== undefined || req.body.authUser.poiLong== ''){
					var err = 'Object poiLong is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiAddress== undefined || req.body.authUser.poiAddress== ''){
					var err = 'Object poiAddress is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.phone== undefined || req.body.authUser.phone== ''){
					var err = 'Object phone is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.Website== undefined || req.body.authUser.Website== ''){
					var err = 'Object Website is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.otime== undefined || req.body.authUser.otime== ''){
					var err = 'Object otime is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.MoreInfo== undefined || req.body.authUser.MoreInfo== ''){
					var err = 'Object MoreInfo is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.Subway== undefined || req.body.authUser.Subway== ''){
					var err = 'Object Subway is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.tickets== undefined || req.body.authUser.tickets== ''){
					var err = 'Object tickets is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.rating== undefined || req.body.authUser.rating== ''){
					var err = 'Object rating is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.file== undefined || req.body.authUser.file== ''){
					var err = 'Object rating is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else{
					var dt = dateTime.create();
					var otp = Math.floor(Math.random()*900000) + 100000;
					var formatted = dt.format('YmdHMSl');
					var POiID = formatted+otp;
					
					var  ImageArray = req.body.authUser.file.split(',');
					
					var Imgsting = '';
					asyncLoop(ImageArray, function (ImageArraydata, next){
						var dt = dateTime.create();
						var otp = Math.floor(Math.random()*900000) + 100000;
						var formatted = dt.format('YmdHMSl');
						var imagename = formatted+otp+".png";
						var imageUrlpoi = imgurl+formatted+otp+".png";
						var imgID = formatted+otp;
					
						require("fs").writeFile("routers/images/"+imagename, ImageArraydata, 'base64', function(err,results) {
							if(err){
								console.error('Problem while uploading Image: ', err);
								return next(err);
							}else{
								if(Imgsting == ''){
									Imgsting = "('"+imgID+"',(select id from tbl_ArrivalguidesPoi where iso= '"+req.body.authUser.CityName+"'),'"+POiID+"','','','','"+imageUrlpoi+"',now())";
								}else{
									Imgsting += ",('"+imgID+"',(select id from tbl_ArrivalguidesPoi where iso= '"+req.body.authUser.CityName+"'),'"+POiID+"','','','','"+imageUrlpoi+"',now())";
								}
								next();
							}
						});
					}, function (err)
					{
						var imageQuery = "insert into tbl_ArrivalguidesPoiImage (id, arrivalID, poiID, Description, Copyright, CopyrightLink, image, timestamp)values"+Imgsting;
						
						var poiQuery = "insert into tbl_ArrivalguidesPoiIDetails (id, arrivalID, name, iso, mainDescription, poiTitle, poiDescription, poiLat, poiLong, poiAddress, phone,poiWebsite,poiOpeninghours, poiMoreinfo, poiSubway, poiTickets,timestamp, status, visitsCount,tipCount, usersCount, checkinsCount, likesCount, fid, rating,IsFeatured)values('"+POiID+"', (select id from tbl_ArrivalguidesPoi where iso= '"+req.body.authUser.CityName+"'), '', '', '', '"+req.body.authUser.poiTitle+"', '"+req.body.authUser.poiDescription+"','"+req.body.authUser.poiLat+"', '"+req.body.authUser.poiLong+"', '"+req.body.authUser.poiAddress+"', '"+req.body.authUser.phone+"','"+req.body.authUser.Website+"','"+req.body.authUser.otime+"', '"+req.body.authUser.MoreInfo+"', '"+req.body.authUser.Subway+"', '"+req.body.authUser.tickets+"',now(), 1, 0,0, 0, 0, 0, '', "+req.body.authUser.rating+",'F')";
						
						conn.query('call STR_SAVE_ARRIVALGUIDE_DATA("'+imageQuery+'","'+poiQuery+'","","",@a,@b)',function(err,result){
							if(err){
								res.json({"status": "error","data":"Data not saved"});
							}else{
								res.json({"status": "success","data":"POI add successfully"});
							}
						});
						
					});
					
					
				}
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Add POI end ----------------------------------------------*/


/*---------------------------------------- Search POI start ----------------------------------------------*/
router.post('/POISearch',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiName== undefined || req.body.authUser.poiName == ''){
					var err = 'Object poiName is not defiend';
					console.error(err);
					return next(err);
				}else{
					var poiName = req.body.authUser.poiName;
					conn.query('select * from tbl_ArrivalguidesPoiIDetails where poiTitle like ? ',[poiName],function(err,result){
						if(err){
							res.json({"status": "error","data":"Data not saved"});
						}else{
							res.json({"status": "success","data":result});
						}
					});
				}
					
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- Search POI end ----------------------------------------------*/



/*---------------------------------------- POI Image show start ----------------------------------------------*/
router.post('/poiImageEdit',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiID== undefined || req.body.authUser.poiID == ''){
					var err = 'Object poiID is not defiend';
					console.error(err);
					return next(err);
				}else if(req.body.authUser.arrivalID== undefined || req.body.authUser.arrivalID == ''){
					var err = 'Object arrivalID is not defiend';
					console.error(err);
					return next(err);
				}else{
					/* var poiID = req.body.authUser.poiID;
					var imgStatus = 0; 
					'select * from tbl_ArrivalguidesPoiImage where poiID = ? and isImgActivate = ? ',[poiID,imgStatus]
					*/
					conn.query('call STR_ContinentsCountryCity("'+req.body.authUser.poiID+'","'+req.body.authUser.arrivalID+'")',function(err,result){
						if(err){
							res.json({"status": "error","data":"Image not exists."});
						}else{
							res.json({"status": "success","data":result[0], "CountryList":result[1],"cityList":result[2], "Olddetail":result[3]});
						}
					});
				}
					
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- POI Image show end ----------------------------------------------*/




/*---------------------------------------- POI Image Delete start ----------------------------------------------*/
router.post('/deleteImgPOI',function(req, res, next) {
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				
				if(req.body.authUser== undefined || req.body.authUser == ''){
					var err = 'Object is not defiend';
					console.error('SQL error: ', err);
					return next(err);
				}else if(req.body.authUser.poiImgID== undefined || req.body.authUser.poiImgID == ''){
					var err = 'Object poiImgID is not defiend';
					console.error(err);
					return next(err);
				}else{
					var poiImgID = req.body.authUser.poiImgID;
					conn.query('update tbl_ArrivalguidesPoiImage set isImgActivate = 1 where id = ? ',[poiImgID],function(err,result){
						if(err){
							res.json({"status": "error","data":"Image not exists."});
						}else{
							res.json({"status": "success","data":"Image Delete successfully!"});
						}
					});
				}
					
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
/*---------------------------------------- POI Image show end ----------------------------------------------*/
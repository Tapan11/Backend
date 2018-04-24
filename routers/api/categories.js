var express = require("express");
var nodemailer = require('nodemailer');
var fs = require("fs"); 
var router = express.Router();
var Cryptr = require('cryptr'),  
cryptr = new Cryptr('myTotalySecretKey');
var asyncLoop = require('node-async-loop');
var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var dateTime = require('node-datetime');
var CsvDb = require('csv-db');

module.exports = router;

router.post('/poiCategories',function(req, res, next) {
	
	var response = req.body.response.categories;
	
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				var array = response;
				var mainCatquery = '';
				var subCatquery = '';
				var subSubSubCatquery = '';
				var subSubCatquery = '';
				var mainCatString = '';
				var subCatString = '';
				var subSubCatString = '';
				var subSubSubCatString = '';
				
					asyncLoop(array, function (item, next){
						/* console.log(item.base64); */
						/* console.log(item); */
						
						var dt = dateTime.create();
						var otp = Math.floor(Math.random()*900000) + 100000;
						var formatted = dt.format('YmdHMSl');
						var mainCatID = formatted+otp;
						var categoriesFid = item.id;
						var categoriesName = item.name;
						var categoriesPluralName = item.pluralName;
						var categoriesShortName = item.shortName;
						
						if(mainCatString == ''){
							mainCatString = "('"+mainCatID+"','"+categoriesFid+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesShortName+"',now())";
						}else{
							mainCatString += ",('"+mainCatID+"','"+categoriesFid+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesShortName+"',now())";
						}
						
						
						var categoriesSub = item.categories;
						
						
						/* console.log(categoriesSub.length); */
						var categoriesSub = categoriesSub;
				
					asyncLoop(categoriesSub, function (categoriesSubItme, next){
						var dt = dateTime.create();
						var otp = Math.floor(Math.random()*900000) + 100000;
						var formatted = dt.format('YmdHMSl');
						var subCatID = formatted+otp;
						var categoriesSubFid = categoriesSubItme.id;
						var categoriesSubName = categoriesSubItme.name;
						var categoriesSubPluralName = categoriesSubItme.pluralName;
						var categoriesSubShortName = categoriesSubItme.shortName;
						
						if(subCatString == ''){
							subCatString = "('"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubName+"','"+categoriesSubPluralName+"','"+categoriesSubShortName+"',now())";
						}else{
							subCatString += ",('"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubName+"','"+categoriesSubPluralName+"','"+categoriesSubShortName+"',now())";
						}
						var subSubCategories = categoriesSubItme.categories;
						
						
						if(subSubCategories.length > 0){
							asyncLoop(subSubCategories, function (subSubCategoriesItem, next){
							var dt = dateTime.create();
							var otp = Math.floor(Math.random()*900000) + 100000;
							var formatted = dt.format('YmdHMSl');
							var subSubCatID = formatted+otp;
							
							var categoriesSubSubFid = subSubCategoriesItem.id;
							var categoriesSubSubName = subSubCategoriesItem.name;
							var categoriesSubSubPluralName = subSubCategoriesItem.pluralName;
							var categoriesSubSubShortName = subSubCategoriesItem.shortName;
							
							categoriesSubSubName = categoriesSubSubName.replace(/'|_/g,'`');
							categoriesSubSubName = categoriesSubSubName.replace(/"|_/g,'`');
							
							categoriesSubSubPluralName = categoriesSubSubPluralName.replace(/'|_/g,'`');
							categoriesSubSubPluralName = categoriesSubSubPluralName.replace(/"|_/g,'`');
							
							categoriesSubSubShortName = categoriesSubSubShortName.replace(/'|_/g,'`');
							categoriesSubSubShortName = categoriesSubSubShortName.replace(/"|_/g,'`');
							
							if(subSubCatString == ''){
								subSubCatString = "('"+subSubCatID+"','"+categoriesSubSubFid+"','"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubName+"','"+categoriesSubPluralName+"','"+categoriesSubShortName+"',now())";
							}else{
								subSubCatString += ",('"+subSubCatID+"','"+categoriesSubSubFid+"','"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubSubName+"','"+categoriesSubSubPluralName+"','"+categoriesSubSubShortName+"',now())";
							}
							
							var subsubsubCategories = subSubCategoriesItem.categories;
							console.log(subsubsubCategories);
							if(typeof subsubsubCategories =='undefined' || subsubsubCategories == '' || subsubsubCategories == undefined){
								next();
							}else{
							if(subsubsubCategories.length > 0){
								asyncLoop(subsubsubCategories, function (subsubsubCategoriesItem, next){
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var subSubSubCatID = formatted+otp;
									
									
									
									var categoriesSubSubSubFid = subsubsubCategoriesItem.id;
									var categoriesSubSubSubName = subsubsubCategoriesItem.name;
									var categoriesSubSubSubPluralName = subsubsubCategoriesItem.pluralName;
									var categoriesSubSubSubShortName = subsubsubCategoriesItem.shortName;
									
									categoriesSubSubSubName = categoriesSubSubSubName.replace(/'|_/g,'`');
									categoriesSubSubSubName = categoriesSubSubSubName.replace(/"|_/g,'`');
									
									categoriesSubSubSubPluralName = categoriesSubSubSubPluralName.replace(/'|_/g,'`');
									categoriesSubSubSubPluralName = categoriesSubSubSubPluralName.replace(/"|_/g,'`');
									
									categoriesSubSubSubShortName = categoriesSubSubSubShortName.replace(/'|_/g,'`');
									categoriesSubSubSubShortName = categoriesSubSubSubShortName.replace(/"|_/g,'`');
									
									if(subSubSubCatString == ''){
										subSubSubCatString = "('"+subSubSubCatID+"','"+subSubCatID+"','"+categoriesSubSubSubFid+"','"+categoriesSubSubFid+"','"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubSubSubName+"','"+categoriesSubSubSubPluralName+"','"+categoriesSubSubSubShortName+"',now())";
									}else{
										subSubSubCatString += ",('"+subSubSubCatID+"','"+subSubCatID+"','"+categoriesSubSubSubFid+"','"+categoriesSubSubFid+"','"+subCatID+"','"+mainCatID+"','"+categoriesSubFid+"','"+categoriesFid+"','"+categoriesSubSubSubName+"','"+categoriesSubSubSubPluralName+"','"+categoriesSubSubSubShortName+"',now())";
									}
									
									
									next();
								}, function (err){
									console.log('Finished!');
								});
							}else{
								next();
							}
							}
							
							
							

								}, function (err)
								{
									/* console.log('Finished!'); */
								});
						}
							
						  next();
						
					}, function (err)
					{
						/* console.log('Finished!'); */
					});
					
					next();
						
					}, function (err)
					{
						/* console.log(321);
						console.log(mainCatString);
						console.log(123);
						console.log(subCatString);
						console.log(123);
						console.log(subSubCatString);
						console.log(123); */
						/* console.log('Finished!'); */
						
						if(mainCatString == ''){
							mainCatquery = '';
						}else{
							mainCatquery = "insert into tbl_CategoriesMainFoursquare (id, categoriesFid, categoriesName, categoriesPluralName, categoriesShortName, timestamp)values"+mainCatString;
						}
						
						if(subCatString == ''){
							subCatquery = '';
						}else{
							subCatquery = "insert into tbl_CategoriesSubFoursquare (id, mainCatID, categoriesSubFid, categoriesFid, categoriesSubName, categoriesSubPluralName, categoriesSubShortName, timestamp)values"+subCatString;
						}
						
						if(subSubCatString == ''){
							subSubCatquery = '';
						}else{
							subSubCatquery = "insert into tbl_CategoriesSubSubFoursquare(id, categoriesSubSubFid, subCatID, mainCatID, categoriesSubFid, categoriesFid, categoriesSubSubName, categoriesSubSubPluralName, categoriesSubSubShortName, timestamp)values"+subSubCatString;
						}
						
						if(subSubSubCatString == ''){
							subSubSubCatquery = '';
						}else{
							subSubSubCatquery = "insert into tbl_CategoriesSubSubSubFoursquare (id, subSubCatID, categoriesSubSubSubFid, categoriesSubSubFid,subCatID, mainCatID, categoriesSubFid, categoriesFid, categoriesSubSubSubName, categoriesSubSubSubPluralName, categoriesSubSubSubShortName, timestamp)values"+subSubSubCatString;
						}
						
						var alldata = 'call STR_SAVE_ARRIVALGUIDE_DATA("'+mainCatquery+'","'+subCatquery+'","'+subSubCatquery+'","'+subSubSubCatquery+'",@a,@b)'; 
						console.log(alldata);
						conn.query('call STR_SAVE_ARRIVALGUIDE_DATA("'+mainCatquery+'","'+subCatquery+'","'+subSubCatquery+'","'+subSubSubCatquery+'",@a,@b)',function(err,result){
							console.log(err);
							console.log(result);
						});
						
					});
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});






















router.get('/CategoriesAll',function(req, res, next) {
	 var csvDb = new CsvDb('imput.csv');
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				var string = '';
				csvDb.get().then((data) => {
				console.log(data.length);
			  
			  
				
				
				var array = data;
				asyncLoop(array, function (item, next){
					
					var dt = dateTime.create();
					var otp = Math.floor(Math.random()*900000) + 100000;
					var formatted = dt.format('YmdHMSl');
					var id = formatted+otp;
					
					var array = item['Foursquare,Category,Sub Category,SubSubCatagory'].split(",");
					
					if(typeof array[0] == 'undefined' || array[0] == undefined || array[0] == ''){
						  var foursquareCategory = '';
					  }else{
						  var foursquareCategory = array[0];
						  foursquareCategory = foursquareCategory.replace(/'|_/g,'`');
							  foursquareCategory = foursquareCategory.replace(/"|_/g,'`');
					  }
					  if(typeof array[1] == 'undefined' || array[1] == undefined || array[1] == ''){
							  var Category = '';
						  }else{
							  var Category = array[1];
							  Category = Category.replace(/'|_/g,'`');
							  Category = Category.replace(/"|_/g,'`');
						  }
						  
						  if(typeof array[2] == 'undefined' || array[2] == undefined || array[2] == ''){
							  var subCategory = '';
						  }else{
							  var subCategory = array[2];
							  subCategory = subCategory.replace(/'|_/g,'`');
							  subCategory = subCategory.replace(/"|_/g,'`');
						  }
						  
						  if(typeof array[3] == 'undefined' || array[3] == undefined || array[3] == ''){
							  var subSubCategory = '';
						  }else{
							  var subSubCategory = array[3];
							  subSubCategory = subSubCategory.replace(/'|_/g,'`');
							  subSubCategory = subSubCategory.replace(/"|_/g,'`');
						  }
						   
						  if(string == ''){
							  string = "('"+id+"','"+foursquareCategory+"','"+Category+"','"+subCategory+"','"+subSubCategory+"',now())";
						  }else{
							  string += ",('"+id+"','"+foursquareCategory+"','"+Category+"','"+subCategory+"','"+subSubCategory+"',now())";
						  }
						  
						  next();

					}, function (err)
					{

						conn.query("insert into tbl_CategoriesTravialist (id, foursquareCategory, Category, subCategory,subSubCategory, timestamp)values"+string,function(err,result){
							console.log(err);
							console.log(result);
						});
						console.log('Finished!');
					});
				
				
				
			}, (err) => {
			  console.log(err);
			});
		}

	});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
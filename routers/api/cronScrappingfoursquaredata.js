var express = require("express");
var nodemailer = require('nodemailer');
var dateTime = require('node-datetime');
var fs = require("fs"); 
var router = express.Router();
var request = require("request")
var http = require('http');

var Cryptr = require('cryptr'),  
cryptr = new Cryptr('myTotalySecretKey');
var asyncLoop = require('node-async-loop');
var schedule = require('node-schedule');

module.exports = router;

/* var j = schedule.scheduleJob('0 0 * * *', function(){
	http.get({
	  hostname: 'localhost',
	  port: 1337,
	  path: '/cronScrappingfoursquaredata/cronJobfoursquare',
	  agent: false  // create a new agent just for this one request
	}, (res) => {
	  console.log(1);
	});
}); */

router.get('/cronJobfoursquare',function(req, res, next) {
	
	/* var dt = dateTime.create();
	var otp = Math.floor(Math.random()*900000) + 100000;
	var formatted = dt.format('YmdHMSl');
	var POiID = formatted+otp; */

	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				 //arrivalID='20180105154136l229779' and  status =0 limit 3
				conn.query("select id as poiID,arrivalID,poiTitle,concat(poiLat,',',poiLong) as latlong,poiAddress  from tbl_ArrivalguidesPoiIDetails where   status =0 limit 5",function(err,result){
					if (!!err) {
						console.error('SQL error: ', err);
						return next(err);
					}else{
						console.log(result);
						if(result.length > 0){
							var poiData = result;
							asyncLoop(poiData, function (poiDataarray, next)
							{
								console.log(poiDataarray.poiID);
								var userTripQuery = '';
								var userstring = '';
								var categoriesstringInsrt = '';
								/* console.log(); */
								/* console.log(); arrivalID ,poiID*/
								var poiID = poiDataarray.poiID;
								var arrivalID = poiDataarray.arrivalID;
								var title = poiDataarray.poiTitle.trim();
								var latlong = poiDataarray.latlong.trim();
								var poiAddress = poiDataarray.poiAddress.trim();
								console.log(poiAddress);
								// 0AXEBTA4BGUPC0LQBHTESNBAMGG0FCT25HPM1U450YD3SQ5Y
								// NCEEZBSFBUTVRRTDRQIY44XY0KOOLIXK20G1YREU5CJA1PVR
								//NMND01IXGWNX5CJQSJHIW21KBE5E0RD24HA04ZHDA5NKUVL4
								var url = "https://api.foursquare.com/v2/venues/search?ll="+latlong+"&oauth_token=NCEEZBSFBUTVRRTDRQIY44XY0KOOLIXK20G1YREU5CJA1PVR&q="+title+"&v=20180106";
								/* var url = "https://api.foursquare.com/v2/venues/search?ll=19.077370358739,72.851434999505&oauth_token=NCEEZBSFBUTVRRTDRQIY44XY0KOOLIXK20G1YREU5CJA1PVR&q="+title+"&v=20180106"; */
								console.log(url);
								console.log(12313);
								request({
									url: url,
									json: true
								}, function (error, response, body) {
									var id ='';
									
									if (!error && response.statusCode === 200) {
										 /* console.log(body); */ // Print the json response
										/* console.log(body.response.venues); // Print the json response
										console.log(body.response.venues.length); */
										if(body.response == undefined || body.response == ''){
											res.json({"status": "error","message":"Data does not exists."});
										}else{
											if(body.response.venues == undefined || body.response.venues == ''){
												res.json({"status": "error","message":"Data does not exists."});
											}else{
												if(body.response.venues.length < 0){
													res.json({"status": "error","message":"Data does not exists."});
												}else{
													
													for(var i = 0; i < body.response.venues.length; i++){
														if(body.response.venues[i].name == undefined || body.response.venues[i].name == ''){
															
														}else{
															var bodyparTitle = body.response.venues[i].name.trim();
															var address = body.response.venues[i].location.address;
															/* console.log(address);
															return; */
															/* console.log(123123123);
															console.log(title); */
															/* console.log(title); */
															 var title1 = '/'+ title+'/'+'g';
															/* console.log(title); */
															/* console.log(bodyparTitle); */
															/* var strsearch = bodyparTitle.search(title); */
															/* var strsearch = bodyparTitle.indexOf(title); */
															
															/* var strsearch = bodyparTitle.match(title1); */
															var strsearch = bodyparTitle.search(title);
															if(strsearch == -1){
																var strsearch = title.search(bodyparTitle);
															}
															if(strsearch == -1){
																console.log(poiAddress);
																console.log(address);
																if(address == undefined || address == ''){
																	
																}else{
																	if(poiAddress == undefined || poiAddress == ''){
																		
																	}else{
																		strsearch = address.search(poiAddress);
																	}
																	
																}
																
															}
															if(strsearch == -1){
																if(address == undefined || address == ''){
																	
																}else{
																	if(poiAddress == undefined || poiAddress == ''){
																		
																	}else{
																		strsearch = poiAddress.search(address);
																	}
																}
																
															}
															
															
															
															
															/* console.log(3211211);
															console.log(bodyparTitle);
															console.log(3211211);
															console.log(title);
															console.log(123123123123123123);
															/* var strsearch = bodyparTitle.indexOf(title); */
															/* console.log(title);
															console.log(321);
															
															console.log(321); */ 
															/* console.log(321);
															console.log(strsearch);
															console.log(321); */
															if(strsearch == null){
																var strsearch = bodyparTitle.search(title);
																
															}else if(strsearch > -1){
																console.log(321);
																id = body.response.venues[i].id;
																break;
															}
														}
													}
													if(id != ''){
														/* var urlscapping = "https://api.foursquare.com/v2/venues/518760b8498ecde2b0302244?&oauth_token=NCEEZBSFBUTVRRTDRQIY44XY0KOOLIXK20G1YREU5CJA1PVR&v=20171212";*/
														var urlscapping = "https://api.foursquare.com/v2/venues/"+id+"?&oauth_token=NCEEZBSFBUTVRRTDRQIY44XY0KOOLIXK20G1YREU5CJA1PVR&v=20180101"; 
														console.log(urlscapping); 
														
														request({
															url: urlscapping,
															json: true
														}, function (error, response, body) {
															if (!error && response.statusCode === 200) {
																/* console.log(body); //  */
																if(body.response.venue.id == undefined || body.response.venue.id ==''){
																	var fid = '';
																}else{
																	var fid = body.response.venue.id;
																}
																if(body.response.venue.name == undefined || body.response.venue.name ==''){
																	var fname = '';
																}else{
																	var fname = body.response.venue.name;
																}
																if(body.response.venue.rating == undefined || body.response.venue.rating == '' || body.response.venue.rating == 0){
																	var rating = 0;
																}else{
																	var rating = body.response.venue.rating;
																}
																
																if(body.response.venue.categories == undefined || body.response.venue.categories ==''){
																	var categories = '';
																}else{
																	var categories = body.response.venue.categories;
																	if(categories.length > 0){
																		var categoriesstring = '';
																		for(var i = 0; i < categories.length; i++){
																			if(categories[i].name == undefined || categories[i].name ==''){
																				var cname = '';
																			}else{
																				var cname = categories[i].name;
																				cname = cname.replace(/'|_/g,'`');
																				cname = cname.replace(/"|_/g,'`');
																			}
																			if(categories[i].pluralName == undefined || categories[i].pluralName == ''){
																				var pluralName = '';
																			}else{
																				var pluralName = categories[i].pluralName;
																				pluralName = pluralName.replace(/'|_/g,'`');
																				pluralName = pluralName.replace(/"|_/g,'`');
																			}
																			if(categories[i].shortName == undefined || categories[i].shortName == ''){
																				var shortName = '';
																			}else{
																				var shortName = categories[i].shortName;
																				shortName = shortName.replace(/'|_/g,'`');
																				shortName = shortName.replace(/"|_/g,'`');
																			}
																			
																			if(categories[i].id == undefined || categories[i].id == ''){
																				var categoriesIDde = '';
																			}else{
																				var categoriesIDde = categories[i].id;
																				
																			}
																			
																			var dt = dateTime.create();
																			var otp = Math.floor(Math.random()*900000) + 100000;
																			var formatted = dt.format('YmdHMSl');
																			var categoriesIDauto = formatted+otp;
																			
																			if(categoriesstring == ''){
																				categoriesstring = "('"+categoriesIDauto+"','"+poiID+"', '"+arrivalID +"','"+cname+"','"+pluralName+"','"+shortName+"',now(),'"+categoriesIDde+"')";
																			}else{
																				categoriesstring += ",('"+categoriesIDauto+"','"+poiID+"', '"+arrivalID +"','"+cname+"','"+pluralName+"','"+shortName+"',now(),'"+categoriesIDde+"')";
																			}
																			
																		} // for loop closed
																		
																		
																	
																			
																			
																			if(typeof categoriesstring != undefined || typeof categoriesstring != ''){
																				categoriesstringInsrt = "insert into tbl_categories (id, poiID, arrivalID, cname, pluralName, shortName,timestramp,categoriesID)values"+categoriesstring;
																			}
																		
																		// -------------------------------------------- -------------------
																		
																	}
																	
																	if(body.response.venue.likes == undefined || body.response.venue.likes == ''){
																			var like = 0;
																		}else{
																			if(body.response.venue.likes.count == undefined || body.response.venue.likes.count == ''){
																				var like = 0;
																			}else{
																				var like = body.response.venue.likes.count;
																			}
																			
																		}
																		
																		if(body.response.venue.stats == undefined || body.response.venue.stats == ''){
																			var checkinsCount = 0;
																			var usersCount = 0;
																			var tipCount = 0;
																			var visitsCount = 0;
																		}else{
																			if(body.response.venue.stats.checkinsCount == undefined || body.response.venue.stats.checkinsCount == ''){
																				var checkinsCount = 0;
																			}else{
																				var checkinsCount = body.response.venue.stats.checkinsCount;
																			}
																			if(body.response.venue.stats.usersCount == undefined || body.response.venue.stats.usersCount == ''){
																				var usersCount = 0;
																			}else{
																				var usersCount = body.response.venue.stats.usersCount;
																			}
																			
																			if(body.response.venue.stats.tipCount == undefined || body.response.venue.stats.tipCount == ''){
																				var tipCount = 0;
																			}else{
																				var tipCount = body.response.venue.stats.tipCount;
																			}
																			if(body.response.venue.stats.visitsCount == undefined || body.response.venue.stats.visitsCount == ''){
																				var visitsCount = 0;
																			}else{
																				var visitsCount = body.response.venue.stats.visitsCount;
																			}
																		}
																		
																		if(body.response.venue.tips == undefined || body.response.venue.tips.tips == ''){
																			res.json({"status": "error","message":"tips not defined"});
																		}else{
																			if(body.response.venue.tips.groups == undefined || body.response.venue.tips.groups == ''){
																				res.json({"status": "error","message":"groups not defined"});
																			}else{
																				if(body.response.venue.tips.groups.length < 0){
																					res.json({"status": "error","message":"groups not defined"});
																				}else{
																					
																					for(var j = 0; j < body.response.venue.tips.groups.length; j++ ){
																						
																						if(body.response.venue.tips.groups[j].items.length>0){
																							var userstring = '';
																							for(var i = 0; i < body.response.venue.tips.groups[j].items.length; i++){
																								
																								
																								
																								/* console.log(321); */
																								
																								if(body.response.venue.tips.groups[j].items[i].user['id'] == undefined || body.response.venue.tips.groups[j].items[i].user['id'] == ''){
																									var userID = '';
																								}else{
																									var userID = body.response.venue.tips.groups[j].items[i].user['id'];
																								}
																								
																								if(body.response.venue.tips.groups[j].items[i].user['firstName'] == undefined || body.response.venue.tips.groups[j].items[i].user['firstName'] == ''){
																									var firstName = '';
																								}else{
																									var firstName = cryptr.encrypt(body.response.venue.tips.groups[j].items[i].user['firstName']);
																								}
																								
																								if(body.response.venue.tips.groups[j].items[i].user['lastName'] == undefined || body.response.venue.tips.groups[j].items[i].user['lastName'] == ''){
																									var lastName = '';
																								}else{
																									var lastName =cryptr.encrypt(body.response.venue.tips.groups[j].items[i].user['lastName']);
																								}
																								
																								if(body.response.venue.tips.groups[j].items[i].user['gender'] == undefined || body.response.venue.tips.groups[j].items[i].user['gender'] == ''){
																									var gender ='';
																								}else{
																									var gender = body.response.venue.tips.groups[j].items[i].user['gender'];
																								}
																								
																								if(body.response.venue.tips.groups[j].items[i].user['photo'] == undefined || body.response.venue.tips.groups[j].items[i].user['photo'] == ''){
																									var photo ='';
																								}else{
																									if(body.response.venue.tips.groups[j].items[i].user['photo'].prefix == undefined || body.response.venue.tips.groups[j].items[i].user['photo'].prefix == ''){
																									var photo ='';
																									}else{
																										var photo = body.response.venue.tips.groups[j].items[i].user['photo'].prefix+'256x256'+body.response.venue.tips.groups[j].items[i].user['photo'].suffix;
																									}
																								}
																								
																								
																								if(body.response.venue.tips.groups[j].items[i].text == undefined || body.response.venue.tips.groups[j].items[i].text == ''){
																									var descriptionTrip ='';
																								}else{
																									var descriptionTrip = body.response.venue.tips.groups[j].items[i].text;
																									descriptionTrip = cryptr.encrypt(descriptionTrip);
																								}
																								
																								var dt = dateTime.create();
																								var otp = Math.floor(Math.random()*900000) + 100000;
																								var formatted = dt.format('YmdHMSl');
																								var tripID = formatted+otp;
																								
																								if(userstring == ''){
																									/* console.log(body.response.venue.tips.groups[j].items[i].text); */
																									
																									userstring ="('"+tripID+"','"+poiID+"','"+arrivalID+"','"+userID+"','"+firstName+"','"+lastName+"','"+gender+"','"+photo+"','"+descriptionTrip+"',now())";
																								}else{
																									userstring +=",('"+tripID+"','"+poiID+"','"+arrivalID+"','"+userID+"','"+firstName+"','"+lastName+"','"+gender+"','"+photo+"','"+descriptionTrip+"',now())";
																								}
																								
																							}
																							
																						}else{
																							var userstring = '';
																						}
																					}
																					
																					if(userstring == undefined || typeof userstring == 'undefined' || userstring == ''){
																						userTripQuery = '';
																					}else{
																						
																						userTripQuery = "insert into tbl_trippoidetails(id,poiID,arrivalID,userID,firstName,lastName,gender,photo,comments,timestamp)values"+userstring;
																						
																					}
																				}
																			}
																		}
																		
																		
																}
																
															/* console.log(userTripQuery); */
																if(userTripQuery== undefined || typeof userTripQuery== 'undefined' || userTripQuery == ''){
																	
																}else{
																	
																	conn.query(userTripQuery,function(err,result){
																		console.log(err);
																		console.log(result);
																	});
																}
																if(categoriesstringInsrt == undefined || typeof categoriesstringInsrt == 'undefined' || categoriesstringInsrt == ''){
																	
																}else{
																	console.log(categoriesstringInsrt);
																	console.log(123123);
																	conn.query(categoriesstringInsrt,function(err,result){
																		console.log(123);
																		console.log(1234414242);
																		console.log(err);
																		console.log(result);
																		console.log(123);
																	});
																}
																
																if(visitsCount == undefined){
																	visitsCount = 0;
																}
																if(tipCount == undefined){
																	tipCount = 0;
																}
																if(usersCount == undefined){
																	usersCount = 0;
																}
																if(checkinsCount == undefined){
																	checkinsCount = 0;
																}
																if(like == undefined){
																	like = 0;
																}
																
																
																conn.query("update tbl_ArrivalguidesPoiIDetails set status = 1,visitsCount="+visitsCount+", tipCount="+tipCount+",usersCount="+usersCount+", checkinsCount="+checkinsCount+", likesCount="+like+",fid='"+fid+"',rating="+rating+" where id = '"+poiDataarray.poiID+"'");
																
																conn.query("select id,categoriesID from  tbl_categories where poiID ='"+poiDataarray.poiID+"'",function(err,result){
																	if (!!err) {
																			console.error('SQL error: ', err);
																			return next(err);
																		}else{
																			
																			if(result.length > 0){
																			
																				
																					
																					var id = result[0].id;
																					var categoriesID = result[0].categoriesID;
																					console.log(categoriesID);
																					
																					conn.query("select subSubCatID,subCatID,mainCatID,categoriesSubSubSubName,categoriesSubSubSubPluralName,categoriesSubSubSubShortName from tbl_CategoriesSubSubSubFoursquare where categoriesSubSubSubFid ='"+categoriesID+"'",function(err,result){
																						if (!!err) {
																							console.error('SQL error: ', err);
																							return next(err);
																						}else{
																							var subSubCatID = '';
																							var subCatID='';
																							var CatID='';
																							var mainCatIDSet='';
																							console.log(result.length);
																							
																							if(result.length > 0){
																								var mainCatID = result[0]['mainCatID'];
																								var subSubCatID = result[0]['subSubCatID'];
																								var categoriesName = result[0]['categoriesSubSubSubName'];
																								var categoriesPluralName = result[0]['categoriesSubSubSubPluralName'];
																								var categoriesShortName = result[0]['categoriesSubSubSubShortName'];
																								
																								conn.query("update tbl_categories set mainSubSubSubCategoriesName='"+categoriesName+"', mainSubSubSubCategoriespluralName='"+categoriesPluralName+"',mainSubSubSubCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'");
																							}
																							if(subSubCatID==''){
																								subSubCatID = " categoriesSubSubFid='"+categoriesID+"'";
																							}else{
																								subSubCatID = " id='"+subSubCatID+"'";
																							}
																							
																							console.log(123123123);
																							console.log("select mainCatID,subCatID,categoriesSubSubName,categoriesSubSubPluralName,categoriesSubSubShortName from tbl_CategoriesSubSubFoursquare where "+subSubCatID);
																							conn.query("select mainCatID,subCatID,categoriesSubSubName,categoriesSubSubPluralName,categoriesSubSubShortName from tbl_CategoriesSubSubFoursquare where "+subSubCatID,function(err,result){
																						if (!!err) {
																							console.error('SQL error: ', err);
																							return next(err);
																						}else{
																							
																							
																							
																							if(result.length > 0){
																								var mainCatID = result[0]['mainCatID'];
																								var categoriesName = result[0]['categoriesSubSubName'];
																								var categoriesPluralName = result[0]['categoriesSubSubPluralName'];
																								var categoriesShortName = result[0]['categoriesSubSubShortName'];
																								var subCatID = result[0]['subCatID'];
																								
																								conn.query("update tbl_categories set mainSubSubCategoriesName='"+categoriesName+"', mainSubSubCategoriespluralName='"+categoriesPluralName+"',mainSubSubCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'");
																							}
																							
																							if(subCatID==''){
																								subCatID = " categoriesSubFid='"+categoriesID+"'";
																								}else{
																									subCatID = " id='"+subCatID+"'";
																								}
																						}
																						
																						console.log(09876543);
																						console.log("select mainCatID,categoriesSubName,categoriesSubPluralName,categoriesSubShortName from tbl_CategoriesSubFoursquare where "+subCatID);
																						console.log(09876543);
																						conn.query("select mainCatID,categoriesSubName,categoriesSubPluralName,categoriesSubShortName from tbl_CategoriesSubFoursquare where "+subCatID,function(err,result){
																						if (!!err) {
																							console.error('SQL error: ', err);
																							return next(err);
																						}else{
																							if(result.length > 0){
																								var mainCatID = result[0]['mainCatID'];
																								var categoriesName = result[0]['categoriesSubName'];
																								var categoriesPluralName = result[0]['categoriesSubPluralName'];
																								var categoriesShortName = result[0]['categoriesSubShortName'];
																								console.log("update tbl_categories set mainSubCategoriesName='"+categoriesName+"', mainSubCategoriespluralName='"+categoriesPluralName+"',mainSubCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'");
																								
																								conn.query("update tbl_categories set mainSubCategoriesName='"+categoriesName+"', mainSubCategoriespluralName='"+categoriesPluralName+"',mainSubCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'",function(err,result){
																								    console.log(err);	
																								    console.log(result);	
																								});
																							}
																							
																							
																							console.log(mainCatID);
																							console.log(454545454);
																							
																							
																							
																							
																							if(typeof mainCatID == 'undefined' || mainCatID == undefined || mainCatID == ''){
																								
																							}else{
																								
																							
																							
																							conn.query("select 	categoriesName, categoriesPluralName, categoriesShortName from tbl_CategoriesMainFoursquare where id='"+mainCatID+"'",function(err,result){
																								if (!!err) {
																									console.error('SQL error: ', err);
																									return next(err);
																								}else{
																									if(result.length > 0){
																										var categoriesName = result[0]['categoriesName'];
																										var categoriesPluralName = result[0]['categoriesPluralName'];
																										var categoriesShortName = result[0]['categoriesShortName'];
																										
																										console.log("update tbl_categories set mainCategoriesName='"+categoriesName+"', mainCategoriespluralName='"+categoriesPluralName+"',mainCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'");
																										conn.query("update tbl_categories set mainCategoriesName='"+categoriesName+"', mainCategoriespluralName='"+categoriesPluralName+"',mainCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'",function(err,result){
																											console.log(err);
																											console.log(result);
																										});
																									}
																								}
																							});
																							
																							
																							}
																							
																							
																							
																							
																							
																							
																							
																							
																							
																							
																						}
																					});
																					
																					
																						
																					});
																							
																							
																						
																						
																								
																							
																							
																							
																							
																						// yaha code kar na hai	
																						}
																					});
																					
																					
																					
																					
																					/* Ye code remove kar na hai */
																					
																					conn.query("select categoriesName,categoriesPluralName,categoriesShortName from tbl_CategoriesMainFoursquare where id=(select mainCatID from tbl_CategoriesSubSubFoursquare where categoriesSubSubFid='"+categoriesID+"')",function(err,result){
																						if (!!err) {
																							console.error('SQL error: ', err);
																							return next(err);
																						}else{
																							if(result.length > 0){
																								var categoriesName = result[0]['categoriesName'];
																								var categoriesPluralName = result[0]['categoriesPluralName'];
																								var categoriesShortName = result[0]['categoriesShortName'];
																								
																								conn.query("update tbl_categories set mainCategoriesName='"+categoriesName+"', mainCategoriespluralName='"+categoriesPluralName+"',mainCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'",function(err,result){
																												if(!err){
																													next();
																												}else{
																													next();
																												}
																											});
																								
																							}else{
																								conn.query("select categoriesName,categoriesPluralName,categoriesShortName from tbl_CategoriesMainFoursquare where id=(select mainCatID from tbl_CategoriesSubFoursquare where categoriesSubFid='"+categoriesID+"')",function(err,result){
																									if (!!err) {
																										console.error('SQL error: ', err);
																										return next(err);
																									}else{
																										if(result.length > 0){
																											var categoriesName = result[0]['categoriesName'];
																											var categoriesPluralName = result[0]['categoriesPluralName'];
																											var categoriesShortName = result[0]['categoriesShortName'];
																											
																											console.log("update tbl_categories set mainCategoriesName='"+categoriesName+"', mainCategoriespluralName='"+categoriesPluralName+"',mainCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'");
																											conn.query("update tbl_categories set mainCategoriesName='"+categoriesName+"', mainCategoriespluralName='"+categoriesPluralName+"',mainCategoriesshortName='"+categoriesShortName+"' where poiID='"+poiDataarray.poiID+"'",function(err,result){
																												if(!err){
																													next();
																												}else{
																													next();
																												}
																											});
																											
																										}else{
																											next();
																										}
																									}
																								});
																								
																							}
																						}
																						
																					});
																					/* Ye code remove kar na hai */
																					
																					
																					
																					
																			}
																			
																		}
																
																});
																
																
																
																// return;
																
															}else{
																
																
																conn.query("update tbl_ArrivalguidesPoiIDetails set status = 1 where id = '"+poiDataarray.poiID+"'");
																next();
															}
														});
														
													}else{
														conn.query("update tbl_ArrivalguidesPoiIDetails set status = 1 where id = '"+poiDataarray.poiID+"'");
														next();
													}
												}
											}
										}
									}else{
										console.log(123123123876);
										conn.query("update tbl_ArrivalguidesPoiIDetails set status = 1 where id = '"+poiDataarray.poiID+"'");
										next();
									}
								});
								
							
							},function(err){
								
								
								conn.query("update tbl_categories as a,tbl_CategoriesTravialist as b set a.categories= b.Category where a.mainCategoriesName=b.foursquareCategory and a.categories =''");
								conn.query("update tbl_categories as a,tbl_CategoriesTravialist as b set a.categories= b.Category where a.mainSubCategoriesName=b.foursquareCategory and a.categories =''");
								conn.query("update tbl_categories as a,tbl_CategoriesTravialist as b set a.categories= b.Category where a.mainSubSubCategoriesName=b.foursquareCategory  and a.categories =''");

								
								res.json({"status": "success","message":"Book mark added"});
							});
						
						
							return;
							
							
							
							for(var i=0; i< result.length; i++){
								console.log(result[i].poiTitle);
								var title = result[i].poiTitle.trim();
								
							}
							
							
							
							
							
							
							
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
		
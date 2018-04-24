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

module.exports = router;




router.post('/poiGetDetailsUrl',function(req, res, next) {
	
	var response = req.body.response.venue;
		/* console.log(response.photos.groups[0].items[0].prefix);
		return; */
		try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						if(response.url == undefined || response.url == ''){
							var url = '';
						}else{
							var url = response.url
						}if(response.description == undefined || response.description == ''){
							var descriptionset = '';
						}else{
							var descriptionset = response.description
						}
						/* console.log("update tbl_foursquare set description = '"+descriptionset+"', websiteUrl = '"+url+"' where fid = '"+response.id+"'"); */
						
						
						conn.query("update tbl_foursquare set description = '"+descriptionset+"', websiteUrl = '"+url+"' where fid = '"+response.id+"'");
						res.json({"status": "success","message":"Update success"});
					}
				});
		}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
	
	
});
	



router.post('/poiGetDetails',function(req, res, next) {
	var response = req.body.response.venue;
	
	try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						
						var response = req.body.response.venue;
						var checkinsCount = response.stats.checkinsCount;
						var usersCount = response.stats.usersCount;
						var visitsCount = response.stats.visitsCount;
						var tipCount = response.stats.tipCount;
						var userLike = response.likes.count;
						
						if(response.rating == undefined || response.rating == ''){
							var rating = 0;
						}else{
							var rating = response.rating;
						}
						
						
						
						if(response.hours == undefined || response.hours == ''){
							var timea ='';
						}else{
						var timea = response.hours;
						var timestring = '';
							for(var i=0; i < timea.timeframes.length; i++){
								
								for(var j=0; j < timea.timeframes[i].open.length; j++){
									var time = timea.timeframes[i].open[j].renderedTime;
									var days = timea.timeframes[i].days;
									if(timestring == ''){
										timestring ="('"+response.id+"','"+days+"','"+time+"',now())";
									}else{
										timestring +=",('"+response.id+"','"+days+"','"+time+"',now())";
									}
									
								}
							}
						}
						
						conn.query("select * from tbl_poitime where fid = '"+ response.id +"'",function(err, result){
							if (!!err) {
										console.error('SQL error: ', err);
										return next(err);
									}else{
										if(result.length > 0){
											
										}else{
											if(timestring == undefined || timestring == ''){
												
											}else{
												conn.query("insert into tbl_poitime(fid, poiDay, OpenCloseTime, timestamp)values"+timestring+"");
											}
										}
									}
							
						});
						/* console.log(timestring);
						console.log(timea.status);
						console.log(timea.timeframes[0].days);
						console.log(timea.timeframes[0].open[0].renderedTime);
						console.log(timea.timeframes[1].days);
						return; */

						var groups = response.photos.groups.length;
						
						var following =0;
						var comments = '';
						var description = '';
						
						
						conn.query("select * from tbl_usertrippoidetails where fid ='"+response.id+"'",function(err, result){
							if(result.length > 0){
								res.json({"status": "error","message":"Poi detalis exists."});
							}else{
	
	
	
	
	if(groups > 0){
		if(response.photos.groups[0] == undefined || response.photos.groups[0] == ''){
			res.json({"status": "error","message":"Object is not defined qwd."});
		}else{
		if(response.photos.groups[0].items == undefined || response.photos.groups[0].items == ''){
			res.json({"status": "error","message":"Object is not defined."});
		}else{
		if(response.photos.groups[0].items.length>0 ){
			var Category = response.photos.groups[0].items;
			var string = '';
				
				/* console.log(Category);
				return; */
				
				asyncLoop(Category, function (Categorydata, next)
					{
						var userID = Categorydata.user.id;
						var imgPOIset = Categorydata.prefix+'1280x720'+Categorydata.suffix;
						/* console.log(imgPOIset);
						return; */
						/* var firstName = Categorydata.user.firstName; */
						if(Categorydata.user.firstName == undefined || Categorydata.user.firstName == ''){
							var firstName = '';
						}else{
							var firstName = cryptr.encrypt(Categorydata.user.firstName);
						}
				
				
						if(Categorydata.user.lastName == undefined || Categorydata.user.lastName == ''){
							var lastName = '';
						}else{
							var lastName = cryptr.encrypt(Categorydata.user.lastName);
						}
				
				/* var lastName = cryptr.encrypt(Categorydata.user.lastName); */
				
						if(Categorydata.user.gender == undefined || Categorydata.user.gender == ''){
							var gender = '';
						}else{
							var gender = Categorydata.user.gender;
						}
				
				
				
						if(Categorydata.user.photo.prefix == undefined || Categorydata.user.photo.prefix == ''){
							var photoset = '';
						}else{
							if(Categorydata.user.photo.suffix == undefined || Categorydata.user.photo.suffix == ''){
								var photoset = '';
							}else{
								var photoset = Categorydata.user.photo.prefix+'256x256'+ Categorydata.user.photo.suffix;
							}
						}
								var photo = photoset;
								var comments = '';
								var description = '';
								if(string == ''){
									
								
								string += "('"+response.id+"', '"+userID+"', '"+firstName+"', '"+lastName+"', '"+gender+"', '"+photo+"','"+comments+"','"+description+"','"+userLike+"','"+following+"','"+imgPOIset+"')";
								}else{
									string += ",('"+response.id+"', '"+userID+"', '"+firstName+"', '"+lastName+"', '"+gender+"', '"+photo+"','"+comments+"','"+description+"','"+userLike+"','"+following+"','"+imgPOIset+"')";
								}
								
								next();
							
							},function(err){
														next();
														
							var querya = "insert into tbl_usertrippoidetails(fid, userID, firstName, lastName, gender, photo,comments, description,userLike, follow,poiImage)values"+string;
							conn.query(querya);
								conn.query("update tbl_foursquare set rating = "+rating+", userLike = '"+userLike+"', following='"+following+"',usersCount='"+usersCount+"',checkinsCount='"+checkinsCount+"',tipCount='"+tipCount+"',visitsCount='"+visitsCount+"' where fid ='"+response.id+"'",function(err,result){
										
										/* console.log("update tbl_usertrippoidetails set poiImage = replace(poiImage,'general//','general/1280x720/'), photo =replace(photo,'user//','user/200x300/') where fid = '"+response.id+"'"); */
									
								});
							});
							/* conn.query("update tbl_usertrippoidetails set poiImage = replace(poiImage,'general//','general/1280x720/'), photo =replace(photo,'user//','user/200x300/') where fid = '"+response.id+"'"); */
							res.json({"status": "success","message":"foursquaer poi details"});
						}else{
							var userID = '';
							var firstName = '';
							var lastName = '';
							var gender = '';
							var photo = '';
							var comments = '';
							var description = '';
							
							
							conn.query("insert into tbl_usertrippoidetails(fid, userID, firstName, lastName, gender, photo,comments, description,userLike, follow)values('"+response.id+"', '"+userID+"', '"+firstName+"', '"+lastName+"', '"+gender+"', '"+photo+"','"+comments+"','"+description+"','"+userLike+"','"+following+"')", function(err, result) {
								if (!!err) {
									console.error('SQL error: ', err);
									return next(err);
								}else{
									conn.query("update tbl_foursquare set rating = "+rating+", userLike = '"+userLike+"', following='"+following+"',usersCount='"+usersCount+"',checkinsCount='"+checkinsCount+"',tipCount='"+tipCount+"',visitsCount='"+visitsCount+"' where fid ='"+response.id+"'");
									
									/* conn.query("update tbl_usertrippoidetails set poiImage = replace(poiImage,'general//','general/1280x720/'), photo =replace(photo,'user//','user/200x300/') where fid = '"+response.id+"'"); */
									
									res.json({"status": "success","message":"foursquaer poi details"});
								}
							});
														
							/* console.log(Categorydata.Id);
							console.log(Categorydata.Name);
							return; */
							
						}
		}
	}
					}else{
						res.json({"status": "error","message":"No data found"});
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







router.post('/poiGetDescription',function(req, res, next) {
	var response = req.body.response.venue;
	
	var userID = '';
	try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						
						var response = req.body.response.venue;
						var venuid = response.id;
						var nameTitle = cryptr.encrypt(response.name);
						conn.query("update tbl_usertrippoidetails set titleName ='"+nameTitle+"' where fid ='"+venuid+"'");
						
						if(response.tips == undefined || response.tips == ''){
							res.json({"status": "error","message":"tips not defined"});
						}else{
							if(response.tips.groups == undefined || response.tips.groups == ''){
								res.json({"status": "error","message":"groups not defined"});
							}else{
								if(response.tips.groups.length < 0){
									res.json({"status": "error","message":"groups not defined"});
								}else{
									/* if(response.tips.groups[1].items == undefined || response.tips.groups[1].items == ''){
										res.json({"status": "error","message":"items not defined"});
									}else{ */
										/* console.log(response.tips.groups[1].items.length);
										return; */
										for(var j = 0; j < response.tips.groups.length; j++ ){
										if(response.tips.groups[j].items.length>0){
											/* console.log(123); */
											var timestring = '';
											var userstring = '';
											for(var i = 0; i < response.tips.groups[j].items.length; i++){
												
												/* console.log(321); */
												
												if(response.tips.groups[j].items[i].user['id'] == undefined || response.tips.groups[j].items[i].user['id'] == ''){
													userID = '';
												}else{
													userID = response.tips.groups[j].items[i].user['id'];
												}
												
												if(response.tips.groups[j].items[i].user['firstName'] == undefined || response.tips.groups[j].items[i].user['firstName'] == ''){
													var firstName = '';
												}else{
													var firstName = cryptr.encrypt(response.tips.groups[j].items[i].user['firstName']);
												}
												
												if(response.tips.groups[j].items[i].user['lastName'] == undefined || response.tips.groups[j].items[i].user['lastName'] == ''){
													var lastName = '';
												}else{
													var lastName =cryptr.encrypt(response.tips.groups[j].items[i].user['lastName']);
												}
												
												if(response.tips.groups[j].items[i].user['gender'] == undefined || response.tips.groups[j].items[i].user['gender'] == ''){
													var gender ='';
												}else{
													var gender = response.tips.groups[j].items[i].user['gender'];
												}
												
												if(response.tips.groups[j].items[i].user['photo'] == undefined || response.tips.groups[j].items[i].user['photo'] == ''){
													var photo ='';
												}else{
													if(response.tips.groups[j].items[i].user['photo'].prefix == undefined || response.tips.groups[j].items[i].user['photo'].prefix == ''){
													var photo ='';
													}else{
														var photo = response.tips.groups[j].items[i].user['photo'].prefix+'256x256'+response.tips.groups[j].items[i].user['photo'].suffix;
													}
												}
	
												if(userstring == ''){
													/* console.log(response.tips.groups[j].items[i].text); */
													
													userstring ="('"+response.id+"','"+userID+"','"+firstName+"','"+lastName+"','"+gender+"','"+photo+"','"+nameTitle+"',now())";
												}else{
													userstring +=",('"+response.id+"','"+userID+"','"+firstName+"','"+lastName+"','"+gender+"','"+photo+"','"+nameTitle+"',now())";
												}
												
												if(timestring == ''){
													/* console.log(response.tips.groups[j].items[i].text); */
													var textdesc = cryptr.encrypt(response.tips.groups[j].items[i].text);
													timestring ="('"+response.id+"','"+userID+"','"+textdesc+"',now())";
												}else{
													var textdesc = cryptr.encrypt(response.tips.groups[j].items[i].text);
													timestring +=",('"+response.id+"','"+userID+"','"+textdesc+"',now())";
												}
											}
											if(timestring != undefined ||timestring != ''){
												conn.query("insert into tbl_reviewdescription(fid,userID,description, timestamp)values"+timestring+"");
											}if(userstring != undefined ||userstring != ''){
												conn.query("insert into tbl_usertrippoidetails(fid,userID,firstName,lastName,gender,photo,titleName,timestamp)values"+userstring+"");
											}
											
										}else{
											// res.json({"status": "error","message":"no data found"});
										}
									}
									/* } */
								}
							}
						}
						
						
						if(response.listed == undefined || response.listed ==''){
							res.json({"status": "error","message":"No data found"});
						}else{
							if(response.listed.groups == undefined || response.listed.groups =='' || response.listed.groups < 0){
								if(response.description == undefined){
									res.json({"status": "error","message":"Group not defined"});
								}else{
									
									conn.query("update tbl_foursquare set description ='"+response.description+"' where fid ='"+venuid+"'");
											/* console.log(response.description); */
											res.json({"status": "success","message":"success"});
								}
								
							}else{
								if(response.listed.groups[0].items == undefined || response.listed.groups[0].items == ''){
									res.json({"status": "error","message":"No data found"});
								}else{
									if(response.listed.groups[0].items.length > 0){
										if(response.listed.groups[0].items[0].description == undefined){
											res.json({"status": "error","message":"Group not defined"});
										}else{
											conn.query("update tbl_foursquare set description ='"+response.listed.groups[0].items[0].description+"' where fid ='"+venuid+"'");
											
											res.json({"status": "success","message":"success"});
										}
										
										
									}else{
										res.json({"status": "error","message":"Group not defined"});
									}
									
								}
								
							}
						
						}
					}
				});
	}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
});





















router.post('/poiGetDescriptionListed',function(req, res, next) {
	var response = req.body.response.venue;
	/* console.log(response.listed.groups[0].items[0].photo);
	console.log(response.listed.groups[0].items[0].photo.prefix+'1280x720'+response.listed.groups[0].items[0].photo.suffix);
	console.log(response.listed.groups[0].items[0].photo.user);
	console.log(response.listed.groups[0].items[0].photo.user.firstName);
	console.log(response.listed.groups[0].items[0].photo.user.photo.prefix+'256x256'+response.listed.groups[0].items[0].photo.user.photo.suffix);
	
	return; */
	
	
	try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						
						
						/* var response = req.body.response.venue; */
						var venuid = response.id;
						
						conn.query("select * from tbl_usertrippoidetails where fid ='"+venuid+"'", function(err,result){
							if (!!err) {
								console.error('SQL error: ', err);
								return next(err);
								}else{
									if(result.length > 0){
										res.json({"status": "success","message":"data already exists"});
									}else{
										if(response.listed == undefined || response.listed == ''){
							res.json({"status": "error","message":"tips not defined"});
						}else{
							if(response.listed.groups == undefined || response.listed.groups == ''){
								res.json({"status": "error","message":"groups not defined"});
							}else{
								if(response.listed.groups.length < 0){
									res.json({"status": "error","message":"groups not defined"});
								}else{
									
										for(var j = 0; j < response.listed.groups.length; j++ ){
										if(response.listed.groups[j].items.length>0){
											/* console.log(123); */
											var timestring = '';
											for(var i = 0; i < response.listed.groups[j].items.length; i++){
												var title = cryptr.encrypt(response.listed.groups[j].items[i].name);
												var description = cryptr.encrypt(response.listed.groups[j].items[i].description);
												
												if(response.listed.groups[j].items[i].photo == undefined || response.listed.groups[j].items[i].photo == ''){
													
												}else{
													if(response.listed.groups[j].items[i].photo.prefix == undefined || response.listed.groups[j].items[i].photo.prefix == ''){
													
													}else{
														var poiImage = response.listed.groups[j].items[i].photo.prefix+'1280x720'+response.listed.groups[j].items[i].photo.suffix;
														if(response.listed.groups[j].items[i].photo.user == undefined || response.listed.groups[j].items[i].photo.user== ''){
															
														}else{
															if(response.listed.groups[j].items[i].photo.user.firstName == undefined || response.listed.groups[j].items[i].photo.user.firstName == ''){
																
															}else{
																var userid = response.listed.groups[j].items[i].photo.user.id;
																var fname = cryptr.encrypt(response.listed.groups[j].items[i].photo.user.firstName);
																if(response.listed.groups[j].items[i].photo.user.lastName== undefined || response.listed.groups[j].items[i].photo.user.lastName == ''){
																	var lname = '';
																}else{
																	var lname = cryptr.encrypt(response.listed.groups[j].items[i].photo.user.lastName);
																}
																
																var gender = response.listed.groups[j].items[i].photo.user.gender;
																var userImg = response.listed.groups[j].items[i].photo.user.photo.prefix+'256x256'+response.listed.groups[j].items[i].photo.user.photo.suffix;
																
																
																if(timestring == ''){
																	timestring ="('"+response.id+"','"+userid+"','"+fname+"','"+lname+"','"+title+"','"+gender+"','"+poiImage+"','"+userImg+"','"+description+"',now())";
																}else{
																	timestring +=",('"+response.id+"','"+userid+"','"+fname+"','"+lname+"','"+title+"','"+gender+"','"+poiImage+"','"+userImg+"','"+description+"',now())";
																}
															}
														}
													}
												}
											}
											if(timestring != undefined ||timestring != ''){
												/* console.log("insert into tbl_usertrippoidetails(fid, userID, firstName, lastName, titleName, gender, poiImage,photo, description,timestamp)values"+timestring);
												return; */
												conn.query("insert into tbl_usertrippoidetails(fid, userID, firstName, lastName, titleName, gender, poiImage,photo, description,timestamp)values"+timestring, function(err,result){
													res.json({"status": "success","message":"data inserted success"});
												});
											}else{
												res.json({"status": "error","message":"no data found"});
											}

											
										}else{
											res.json({"status": "error","message":"no data found"});
										}
									}
									/* } */
								}
							}
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



router.post('/foursquare',function(req,res,next){
	var response = req.body.response;
	/* console.log(response.venues); */
	console.log(response.venue['categories'].length);
	return;
	try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var string = '';
						for(var i =0; i< response.venues.length; i++){
							var id = response.venues[i]['id'];
							var name = response.venues[i]['name'];
							var address = response.venues[i]['location']['address'] + ' '+ response.venues[i]['location']['postalCode'];
							var lat = response.venues[i]['location']['lat'];
							var lng = response.venues[i]['location']['lng'];
							var cc = response.venues[i]['location']['cc'];
							var city = response.venues[i]['location']['city'];
							var state = response.venues[i]['location']['state'];
							var country = response.venues[i]['location']['country'];
							if(response.venues[i]['contact']['phone'] != undefined){
								var phone = response.venues[i]['contact']['phone'];
							}else{
								var phone = '';
							}
							if(response.venues[i]['categories'].length >0){
								var categoriesId = response.venues[i]['categories'][0]['id'];
								var categoriesName = response.venues[i]['categories'][0]['name'];
								var categoriesPluralName = response.venues[i]['categories'][0]['pluralName'];
								var categoriesPluralShortName = response.venues[i]['categories'][0]['shortName'];
								
								var categoriesPluralShortPrefix = response.venues[i]['categories'][0]['icon']['prefix'] + '32'+ response.venues[i]['categories'][0]['icon']['suffix'];
							}else{
								var categoriesId = '';
								var categoriesName = '';
								var categoriesPluralName = '';
								var categoriesPluralShortName = '';
								var categoriesPluralShortPrefix = '';
							}
							
							if(string ==''){
							string = "('"+id+"', '"+name+"', '"+phone+"', '"+address+"', '', '"+lat+"', '"+lng+"', '"+city+"','"+cc+"','"+state+"','"+country+"','"+categoriesId+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesPluralShortName+"','"+categoriesPluralShortPrefix+"',now())";
							}else{
								string += ",('"+id+"', '"+name+"', '"+phone+"', '"+address+"', '', '"+lat+"', '"+lng+"', '"+city+"','"+cc+"','"+state+"','"+country+"','"+categoriesId+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesPluralShortName+"','"+categoriesPluralShortPrefix+"',now())";
							}
												
						}
						if(string == '' || string == undefined){
							res.json({"status":"error", "message":"Code send successfully."});
						}else{
							
							conn.query("insert into tbl_foursquare (fid, name, phone, address, crossStreet, lat, lng,city,cc, state, country, categoriesId, categoriesName,categoriesPluralName,categoriesShortName, categoriesIcon,timestamp)values"+string);
								
							res.json({"status":"success", "message":"Code send successfully."});
							}
						}
	

				});
	}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
router.post('/foursquareMenuvenu',function(req,res,next){
	var response = req.body.response;
	/* console.log(response.venues); */
	/* console.log(response.venue['categories'].length);
	return; */
	try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var string = '';
						// for(var i =0; i< response.venue; i++){
							var id = response.venue['id'];
							var name = response.venue['name'];
							var address = response.venue['location']['address'] + ' '+ response.venue['location']['postalCode'];
							var lat = response.venue['location']['lat'];
							var lng = response.venue['location']['lng'];
							var cc = response.venue['location']['cc'];
							var city = response.venue['location']['city'];
							var state = response.venue['location']['state'];
							var country = response.venue['location']['country'];
							if(response.venue['contact']['phone'] != undefined){
								var phone = response.venue['contact']['phone'];
							}else{
								var phone = '';
							}
							if(response.venue['categories'].length >0){
								var categoriesId = response.venue['categories'][0]['id'];
								var categoriesName = response.venue['categories'][0]['name'];
								var categoriesPluralName = response.venue['categories'][0]['pluralName'];
								var categoriesPluralShortName = response.venue['categories'][0]['shortName'];
								
								var categoriesPluralShortPrefix = response.venue['categories'][0]['icon']['prefix'] + '32'+ response.venue['categories'][0]['icon']['suffix'];
							}else{
								var categoriesId = '';
								var categoriesName = '';
								var categoriesPluralName = '';
								var categoriesPluralShortName = '';
								var categoriesPluralShortPrefix = '';
							}
							
							if(string ==''){
							string = "('"+id+"', '"+name+"', '"+phone+"', '"+address+"', '', '"+lat+"', '"+lng+"', '"+city+"','"+cc+"','"+state+"','"+country+"','"+categoriesId+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesPluralShortName+"','"+categoriesPluralShortPrefix+"',now())";
							}else{
								string += ",('"+id+"', '"+name+"', '"+phone+"', '"+address+"', '', '"+lat+"', '"+lng+"', '"+city+"','"+cc+"','"+state+"','"+country+"','"+categoriesId+"','"+categoriesName+"','"+categoriesPluralName+"','"+categoriesPluralShortName+"','"+categoriesPluralShortPrefix+"',now())";
							}
												
						}
						if(string == '' || string == undefined){
							res.json({"status":"error", "message":"Code send successfully."});
						}else{
							
							conn.query("insert into tbl_foursquare (fid, name, phone, address, crossStreet, lat, lng,city,cc, state, country, categoriesId, categoriesName,categoriesPluralName,categoriesShortName, categoriesIcon,timestamp)values"+string);
								
							res.json({"status":"success", "message":"Code send successfully."});
							}
						// }
	

				});
	}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
	});
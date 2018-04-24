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
// var CronJob = require('cron').CronJob;
module.exports = router;

var sygictextfile ='https://travialist.com/sygictext';

/* var obj = JSON.parse(fs.readFileSync('file', 'utf8')); */

/* var j = schedule.scheduleJob('* * * * * *', function(){
	return 1;
	https.get({
	  hostname: 'localhost',
	  path: '/sygic/cronJobSygic',
	  agent: false  // create a new agent just for this one request
	}, (res) => {
	  console.log(1);
	});
 }); */
 
 
 
/* new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles'); */

router.get('/cronJobSygic',function(req, res, next) {
	/* var dt = dateTime.create();
	var otp = Math.floor(Math.random()*900000) + 100000;
	var formatted = dt.format('YmdHMSl');
	var POiID = formatted+otp; */
//  status =0 limit 5
	try{
		req.getConnection(function(err, conn) {
			if (!!err) {
				console.error('SQL Connection error: ', err);
				return next(err);
			}else{
				/* var fs = require('fs'); */
				var obj;
				/* var reqObj=req.body; */
				/* console.log(reqObj);
				return; */
				console.log(1);
				 fs.readFile('./routers/api/Data4.txt', 'utf8', function (err, data) {
				  if (err) throw err;
				  obj = JSON.parse(data);
					asyncLoop(obj, function (item, next)
						{
							/* console.log(item.description);
							return; */
							var dt = dateTime.create();
							var otp = Math.floor(Math.random()*900000) + 100000;
							var formatted = dt.format('YmdHMSl');
							var systemPOIID = formatted+otp;
							
							if(typeof item.id == 'undefined' || item.id == undefined){
								
							}else{
								
								
								console.log("select * from tbl_sygicpoi_data where poiID='"+item.id+"'");
								conn.query("select * from tbl_sygicpoi_data where poiID=?",[item.id],function(err,result){
									if(err){
										console.error('SQL error: ', err);
										return next(err);
									}else{
										if(result.length > 0){
											console.log(item.id);
											next();
										}else{
											
										
								
								console.log(1);
								console.log(item.id);
								
								
											/*------------------------------ Reference data start -----------------------------*/
								if(typeof item.references == 'undefined' || item.references == undefined || typeof item.references == 'null' || item.references == null || item.references.length < 0){
										var referenceListID = '';
										var referenceListtitle = '';
										var referenceListtype = '';
										var referenceListlanguage_id = '';
										var referenceListurl = '';
										var referenceListsupplier = '';
										var referenceListpriority = '';
										var referenceListcurrency = '';
										var referenceListprice = '';
								}else{
									var arrayReference = item.references;
									
									asyncLoop(arrayReference, function (arrayReferencelist, next)
									{
										var dt = dateTime.create();
										var otp = Math.floor(Math.random()*900000) + 100000;
										var formatted = dt.format('YmdHMSl');
										var ReferencesystemPOIID = formatted+otp;
										
										if(typeof arrayReferencelist == 'undefined' || arrayReferencelist == undefined || typeof arrayReferencelist == 'null' || arrayReferencelist== null || arrayReference.length < 0){
											next();
										}else{
											
										
											if(typeof arrayReferencelist.id == 'undefined' || arrayReferencelist.id == undefined || typeof arrayReferencelist.id == 'null' || arrayReferencelist.id == null){
												var referenceListID = '';
											}else{
												var referenceListID = arrayReferencelist.id;
											}
											if(typeof arrayReferencelist.title == 'undefined' || arrayReferencelist.title == undefined || typeof arrayReferencelist.title == 'null' || arrayReferencelist.title == null){
												var referenceListtitle = '';
											}else{
												var referenceListtitle = arrayReferencelist.title;
											}
											if(typeof arrayReferencelist.type == 'undefined' || arrayReferencelist.type == undefined || typeof arrayReferencelist.type == 'null' || arrayReferencelist.type == null){
												var referenceListtype = '';
											}else{
												var referenceListtype = arrayReferencelist.type;
											}
											if(typeof arrayReferencelist.language_id == 'undefined' || arrayReferencelist.language_id == undefined || typeof arrayReferencelist.language_id == 'null' || arrayReferencelist.language_id == null){
												var referenceListlanguage_id = '';
											}else{
												var referenceListlanguage_id = arrayReferencelist.language_id;
											}
											if(typeof arrayReferencelist.url == 'undefined' || arrayReferencelist.url == undefined || typeof arrayReferencelist.url == 'null' || arrayReferencelist.url == null){
												var referenceListurl = '';
											}else{
												var referenceListurl = arrayReferencelist.url;
											}
											if(typeof arrayReferencelist.supplier == 'undefined' || arrayReferencelist.supplier == undefined || typeof arrayReferencelist.supplier == 'null' || arrayReferencelist.supplier == null){
												var referenceListsupplier = '';
											}else{
												var referenceListsupplier = arrayReferencelist.supplier;
											}
											if(typeof arrayReferencelist.priority == 'undefined' || arrayReferencelist.priority == undefined || typeof arrayReferencelist.priority == 'null' || arrayReferencelist.priority == null){
												var referenceListpriority = '';
											}else{
												var referenceListpriority = arrayReferencelist.priority;
											}
											
											if(typeof arrayReferencelist.currency == 'undefined' || arrayReferencelist.currency == undefined || typeof arrayReferencelist.currency == 'null' || arrayReferencelist.currency == null){
												var referenceListcurrency = '';
											}else{
												var referenceListcurrency = arrayReferencelist.currency;
											}
											if(typeof arrayReferencelist.price == 'undefined' || arrayReferencelist.price == undefined || typeof arrayReferencelist.price == 'null' || arrayReferencelist.price == null){
												var referenceListprice = '';
											}else{
												var referenceListprice = arrayReferencelist.price;
											}
											
											conn.query("insert into tbl_sygic_references (id, poiID, referenceIDsygic, referencetitle, referencetype, referencelanguage_id, referenceurl, referencesupplier, priority, currency,poiprice, flags, timestamp)values(?,?,?,?,?,?,?,?,?,?,?,?,now())",[ReferencesystemPOIID,systemPOIID,referenceListID,referenceListtitle,referenceListtype,referenceListlanguage_id,referenceListurl,referenceListsupplier,referenceListpriority,referenceListcurrency,referenceListprice,'0'],function(err,result){
													if(err){
														console.error('SQL error: ', err);
														return next(err);
													}
													next();
												});
										
										}
										
										
										}, function (err)
										{
											if (err)
											{
												console.error('Error: ' + err.message);
												return;
											}
									//  next();
										console.log('Finished!');
									});
								
								}
								/*------------------------------ Reference data end -----------------------------*/
								
									
								
								
								if(typeof item.categories == 'undefined' || item.categories == undefined || typeof item.categories == 'null' || item.categories == null){
									next();
								}else{
									var catagoryArray = item.categories;
									
									asyncLoop(catagoryArray, function (catagoryArrayList, next)
									{
										var dt = dateTime.create();
										var otp = Math.floor(Math.random()*900000) + 100000;
										var formatted = dt.format('YmdHMSl');
										var categoriesPOIID = formatted+otp;
										if(typeof catagoryArrayList == 'undefined' || typeof catagoryArrayList == null || catagoryArray.length < 0){
											next();
										}else{
											
											console.log(9);
											conn.query("insert into tbl_sygicpoicategories(id, poiID, poiCategories, timestamp)values(?,?,?,now())",[categoriesPOIID,systemPOIID,catagoryArrayList],function(err,result){
												if(err){
													console.error('SQL error: ', err);
													return next(err);
												}
												next();
											});
										}
									}, function (err)
									{
										if (err)
										{
											console.error('Error: ' + err.message);
											return;
										}else{
/* ----------------------------------------  Parend array start------------------------------------------------------------*/											
											var parent_idsArray = item.parent_ids;
									
									
									asyncLoop(parent_idsArray, function (parent_idsArraylist, next)
									{
										var dt = dateTime.create();
										var otp = Math.floor(Math.random()*900000) + 100000;
										var formatted = dt.format('YmdHMSl');
										var parentPOIID = formatted+otp;
										
										if(typeof parent_idsArraylist == 'undefined' || parent_idsArray.length < 0){
											next();
										}else{
											 var res = parent_idsArraylist.replace(":", "-");
											
											conn.query("insert into tbl_sygicpoiparent(id, poiID, parentID, timestamp)values(?,?,?,now())",[parentPOIID,systemPOIID,res],function(err,result){
												if(!!err){
													console.error('SQL error: ', err);
													return next(err);
												}else{
													next();
												}
											});
										}
									}, function (err)
									{
										if (err)
										{
											console.error('Error: ' + err.message);
											return;
										}
										
										
										
										
										/*--------------------------------- Media code start ----------------------------------------*/
									if(typeof item.main_media == 'undefined' || item.main_media == '' || typeof item.main_media == 'null' || item.main_media == null){
										next();
									}else{
									
									if(typeof item.main_media.media == 'undefined' || item.main_media.media == '' || typeof item.main_media.media == 'null' || item.main_media.media == null){
										next();
									}else{
										var mediaArray = item.main_media.media;
										asyncLoop(mediaArray, function (mediaArraystr, next)
											{
												
												/* ------------------------------------ Media id------------------------*/
												var dt = dateTime.create();
												var otp = Math.floor(Math.random()*900000) + 100000;
												var formatted = dt.format('YmdHMSl');
												var mediaSystemID = formatted+otp;
												
												if(typeof mediaArraystr.type == 'undefined' || mediaArraystr.type == undefined || typeof mediaArraystr.type == 'null'  || mediaArraystr.type == null){
													var mediaStrtype = '';
												}else{
													var mediaStrtype = mediaArraystr.type;
												}
												if(typeof mediaArraystr.url_template == 'undefined' || mediaArraystr.url_template == undefined || typeof mediaArraystr.url_template == 'null'  || mediaArraystr.url_template == null){
													var url_templateStr = '';
												}else{
													var url_templateStr = mediaArraystr.url_template;
												}if(typeof mediaArraystr.url == 'undefined' || mediaArraystr.url == undefined || typeof mediaArraystr.url == 'null'  || mediaArraystr.url == null){
													var urlmediaStr = '';
												}else{
													var urlmediaStr = mediaArraystr.url;
												}if(typeof mediaArraystr.location == 'undefined' || mediaArraystr.location == undefined || typeof mediaArraystr.location == 'null'  || mediaArraystr.location == null){
													var locationmediaStr = '';
													var latMedia_main= '';
													var lngMedia_main= '';
												}else{
													var locationmediaStr = mediaArraystr.location;
													if(locationmediaStr != ''){
														var latMedia_main= locationmediaStr.lat;
														var lngMedia_main= locationmediaStr.lng;
													}
													
												}if(typeof mediaArraystr.original == 'undefined' || mediaArraystr.original == undefined || typeof mediaArraystr.original == 'null'  || mediaArraystr.original == null){
													var originalMediaStr = '';
												}else{
													if(typeof mediaArraystr.original.width == 'undefined' || mediaArraystr.original.width == undefined || typeof mediaArraystr.original.width == 'null'  || mediaArraystr.original.width == null){
														var originalMediaWidthStr = '';
													}else{
														var originalMediaWidthStr = mediaArraystr.original.width;
													}
													if(typeof mediaArraystr.original.height == 'undefined' || mediaArraystr.original.height == undefined || typeof mediaArraystr.original.height == 'null'  || mediaArraystr.original.height == null){
														var originalMediaHeightStr = '';
													}else{
														var originalMediaHeightStr = mediaArraystr.original.height;
													}if(typeof mediaArraystr.original.size == 'undefined' || mediaArraystr.original.size == undefined || typeof mediaArraystr.original.size == 'null'  || mediaArraystr.original.size == null){
														var originalMediaSizeStr = '';
													}else{
														var originalMediaSizeStr = mediaArraystr.original.size;
													}
												}
												
												if(typeof mediaArraystr.created_at == 'undefined' || mediaArraystr.created_at == undefined || typeof mediaArraystr.created_at == 'null'  || mediaArraystr.created_at == null){
													var created_atMediaSizeStr = '';
												}else{
													var created_atMediaSizeStr = mediaArraystr.created_at;
													var created_atMediaSizeStr = created_atMediaSizeStr.replace("+0000", "");
												}if(typeof mediaArraystr.created_by == 'undefined' || mediaArraystr.created_by == undefined || typeof mediaArraystr.created_by == 'null'  || mediaArraystr.created_by == null){
													var created_byMediaSizeStr = '';
												}else{
													var created_byMediaSizeStr = mediaArraystr.created_by;
												}
												
												if(typeof mediaArraystr.attribution == 'undefined' || mediaArraystr.attribution == undefined || typeof mediaArraystr.attribution == 'null' || mediaArraystr.attribution == null){
													var titleAttribution = '';
													var title_urlAttribution = '';
													var authorAttribution = '';
													var author_urlAttribution = '';
													var otherAttribution = '';
													var licenseAttribution = '';
													var license_urlAttribution = '';
												}else{
													if(typeof mediaArraystr.attribution.title == 'undefined' || mediaArraystr.attribution.title == undefined || typeof mediaArraystr.attribution.title == 'null' || mediaArraystr.attribution.title == null){
														var titleAttribution ='';
													}else{
														var titleAttribution = mediaArraystr.attribution.title;
													}if(typeof mediaArraystr.attribution.title_url == 'undefined' || mediaArraystr.attribution.title_url == undefined || typeof mediaArraystr.attribution.title_url == 'null' || mediaArraystr.attribution.title_url == null){
														var title_urlAttribution ='';
													}else{
														var title_urlAttribution = mediaArraystr.attribution.title_url;
													}if(typeof mediaArraystr.attribution.title_url == 'undefined' || mediaArraystr.attribution.title_url == undefined || typeof mediaArraystr.attribution.title_url == 'null' || mediaArraystr.attribution.title_url == null){
														var title_urlAttribution ='';
													}else{
														var title_urlAttribution = mediaArraystr.attribution.title_url;
													}if(typeof mediaArraystr.attribution.author == 'undefined' || mediaArraystr.attribution.author == undefined || typeof mediaArraystr.attribution.author == 'null' || mediaArraystr.attribution.author == null){
														var authorAttribution ='';
													}else{
														var authorAttribution = mediaArraystr.attribution.author;
													}if(typeof mediaArraystr.attribution.author_url == 'undefined' || mediaArraystr.attribution.author_url == undefined || typeof mediaArraystr.attribution.author_url == 'null' || mediaArraystr.attribution.author_url == null){
														var author_urlAttribution ='';
													}else{
														var author_urlAttribution = mediaArraystr.attribution.author_url;
													}
													if(typeof mediaArraystr.attribution.other == 'undefined' || mediaArraystr.attribution.other == undefined || typeof mediaArraystr.attribution.other == 'null' || mediaArraystr.attribution.other == null){
														var otherAttribution ='';
													}else{
														var otherAttribution = mediaArraystr.attribution.other;
													}if(typeof mediaArraystr.attribution.license == 'undefined' || mediaArraystr.attribution.license == undefined || typeof mediaArraystr.attribution.license == 'null' || mediaArraystr.attribution.license == null){
														var licenseAttribution ='';
													}else{
														var licenseAttribution = mediaArraystr.attribution.license;
													}if(typeof mediaArraystr.attribution.license_url == 'undefined' || mediaArraystr.attribution.license_url == undefined || typeof mediaArraystr.attribution.license_url == 'null' || mediaArraystr.attribution.license_url == null){
														var license_urlAttribution ='';
													}else{
														var license_urlAttribution = mediaArraystr.attribution.license_url;
													}
													
													
													if(typeof mediaArraystr.source == 'undefined' || mediaArraystr.source == undefined || typeof mediaArraystr.source == 'null' || mediaArraystr.source == null){
														var nameSource ='';
													}else{
														if(typeof mediaArraystr.source.name == 'undefined' || mediaArraystr.source.name == undefined || typeof mediaArraystr.source.name == 'null' || mediaArraystr.source.name == null){
															var nameSource ='';
														}else{
															var nameSource = mediaArraystr.source.name;
														}
														if(typeof mediaArraystr.source.external_id == 'undefined' || mediaArraystr.source.external_id == undefined || typeof mediaArraystr.source.external_id == 'null' || mediaArraystr.source.external_id == null){
															var external_idSource ='';
														}else{
															var external_idSource = mediaArraystr.source.external_id;
														}if(typeof mediaArraystr.source.provider == 'undefined' || mediaArraystr.source.provider == undefined || typeof mediaArraystr.source.provider == 'null' || mediaArraystr.source.provider == null){
															var providerSource =' ';
														}else{
															var providerSource = mediaArraystr.source.provider;
															if(providerSource == ''){
																providerSource = ' ';
															}
														}if(typeof mediaArraystr.suitability == 'undefined' || mediaArraystr.suitability == undefined || typeof mediaArraystr.suitability == 'null' || mediaArraystr.suitability == null || mediaArraystr.suitability.length < 0 ){
															var suitabilityArray ='';
														}else{
															if(typeof mediaArraystr.suitability[0] == 'undefined' || mediaArraystr.suitability[0] == undefined || typeof mediaArraystr.suitability[0] == 'null' || mediaArraystr.suitability[0] ==  null){
																var suitabilityArray = '';
															}else{
																var suitabilityArray = mediaArraystr.suitability[0];
															}
															
														}
														
													}
													
													
												}
												
												 if(typeof item.quadkey == 'undefined' || item.quadkey == undefined || item.quadkey == null){
														var sygicPOI_quadkey = 0;
													}else{
														var sygicPOI_quadkey = item.quadkey;
													}
												/* ------------------------------ Insert query for media fiel start -----------------------*/
												
												
												conn.query("insert into tbl_sygic_poi_main_media (id, poiID, mediatype, mediaurl_template, media_url,latMedia_main,lngMedia_main, originalwidth, originalheight,originasize,created_at,created_by, attributionTitle, attributionTitle_url, attributionAuthor,attributionAuthor_url,attributionOther, attributionLicense, attributionLicense_url, sourceName, sourceExternal_id,sourceProvider,suitability, quadkey, mediaID, timestamp)values(?, ?, ?, ?, ?,?,?,?, ?,?, ?, ?, ?,?, ?,?,?, ?,?,?,?, ?,?, ?,'', now())",[mediaSystemID,systemPOIID,mediaStrtype,url_templateStr,urlmediaStr,
												latMedia_main,lngMedia_main,originalMediaWidthStr,originalMediaHeightStr,originalMediaSizeStr,created_atMediaSizeStr,created_byMediaSizeStr,titleAttribution,title_urlAttribution,authorAttribution,author_urlAttribution,otherAttribution,licenseAttribution,license_urlAttribution,nameSource,external_idSource,providerSource,suitabilityArray,sygicPOI_quadkey],function(err,result){
													if(!!err){
														console.error('SQL error: ', err);
														return next(err);
													}else{
														
													}
													next();
												});
												/* ------------------------------ Insert query for media fiel End -------------------------*/
												
												
												
											}, function (err)
											{
												if (err)
												{
													console.error('Error: ' + err.message);
													return;
												}
											 
												
												/*--------------------------- Tag array list start ------------------------------------- */
								if(typeof item.tags == 'undefined' || item.tags == undefined || typeof item.tags == 'null' || item.tags == null){
									next();
								}else{
									var tagsArray = item.tags;
									
									asyncLoop(tagsArray, function (tagsArraylist, next)
									{
										if(typeof tagsArraylist == 'undefined' || tagsArraylist == undefined || typeof tagsArraylist == 'null' || tagsArraylist == null || tagsArray.length < 0){
											next();
										}else{
											var dt = dateTime.create();
											var otp = Math.floor(Math.random()*900000) + 100000;
											var formatted = dt.format('YmdHMSl');
											var tagID = formatted+otp;
											var tagsKey = tagsArraylist.key
											var tagsName = tagsArraylist.name
											
											conn.query("insert into tbl_sygicpoi_tag(id, poiID, tagskey, tagsName,timestamp)values(?,?,?,?,now())",[tagID,systemPOIID,tagsKey,tagsName],function(err,result){
													if(!!err){
														console.error('SQL error: ', err);
														return next(err);
													}else{
														next();
													}
												});
										}
										
									}, function (err)
									{
										if (err)
										{
											console.error('Error: ' + err.message);
											return;
										}
									 
										/*------------------------- Asyncloop for external id start ------------------------*/
								var external_idsArray = item.external_ids;
								asyncLoop(external_idsArray, function (external_idsArrayList, next)
								{
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var externalIDPOIID = formatted+otp;
									
									if(typeof external_idsArrayList == 'undefined' || external_idsArrayList == undefined || typeof external_idsArrayList == 'null' || external_idsArrayList == null || external_idsArray.length < 0){
										next();
									}else{
										if(typeof external_idsArrayList.id == 'undefined' || external_idsArrayList.id == undefined ||  typeof external_idsArrayList.id == 'null' || external_idsArrayList.id == null){
											var external_idID = '';
										}else{
											var external_idID = external_idsArrayList.id;
										}
										if(typeof external_idsArrayList.type == 'undefined' || external_idsArrayList.type == undefined ||  typeof external_idsArrayList.type == 'null' || external_idsArrayList.type == null){
											var external_idType = '';
										}else{
											var external_idType = external_idsArrayList.type;
										}
										if(typeof external_idsArrayList.language_id == 'undefined' || external_idsArrayList.language_id == undefined ||  typeof external_idsArrayList.language_id == 'null' || external_idsArrayList.language_id == null){
											var external_idlanguage_id = '';
										}else{
											var external_idlanguage_id = external_idsArrayList.language_id;
										}
										
										conn.query("insert into tbl_sygic_external (id, poiID, externalId, externalType, externallanguage_id,	timestamp)values(?, ?, ?, ?, ?, now())",[externalIDPOIID,systemPOIID,external_idID,external_idType,external_idlanguage_id],function(err,result){
											if(!!err){
												console.error('SQL error: ', err);
												return next(err);
											}else{
												next();
											}
										});
									
									
									}
									
								}, function (err)
								{
									if (err)
									{
										console.error('Error: ' + err.message);
										return;
									}
								 
									/*----------------------------- Media secod statrt --------------------------------------*/
									
									
									
									
									
									
											
											/*------------------------- Asyncloop for external id start ------------------------*/
										var mediaArrayCode = item.media;
										asyncLoop(mediaArrayCode, function (mediaArrayList, next)
										{
											var dt = dateTime.create();
											var otp = Math.floor(Math.random()*900000) + 100000;
											var formatted = dt.format('YmdHMSl');
											var mediaListPOIID = formatted+otp;
											if(mediaArrayCode.length < 0){
												next();
											}else{
											if(typeof mediaArrayList.id == 'undefined' ||  mediaArrayList.id == undefined || typeof mediaArrayList.id == 'null' || mediaArrayList.id == null){
												var mediaIDsceconID = '';
											}else{
												var mediaIDsceconID = mediaArrayList.id;
											}
											if(typeof mediaArrayList.type == 'undefined' ||  mediaArrayList.type == undefined || typeof mediaArrayList.type == 'null' || mediaArrayList.type == null){
												var mediaIDscecontype = '';
											}else{
												var mediaIDscecontype = mediaArrayList.type;
											}
											
											if(typeof mediaArrayList.url_template == 'undefined' ||  mediaArrayList.url_template == undefined || typeof mediaArrayList.url_template == 'null' || mediaArrayList.url_template == null){
												var mediaIDsceconurl_template = '';
											}else{
												var mediaIDsceconurl_template = mediaArrayList.url_template;
											}
											if(typeof mediaArrayList.url == 'undefined' ||  mediaArrayList.url == undefined || typeof mediaArrayList.url == 'null' || mediaArrayList.url == null){
												var mediaIDsceconurl = '';
											}else{
												var mediaIDsceconurl = mediaArrayList.url;
											}
											if(typeof mediaArrayList.location == 'undefined' ||  mediaArrayList.location == undefined || typeof mediaArrayList.location == 'null' || mediaArrayList.location == null){
												var mediaIDsceconlocationLat = '';
												var mediaIDsceconlocationLng = '';
											}else{
												var mediaIDsceconlocation = mediaArrayList.location;
												if(typeof mediaIDsceconlocation.lat == 'undefined' || mediaIDsceconlocation.lat == undefined || typeof mediaIDsceconlocation.lat == 'null' || mediaIDsceconlocation.lat == null){
													var mediaIDsceconlocationLat = '';
												}else{
													var mediaIDsceconlocationLat = mediaIDsceconlocation.lat;
												}
												if(typeof mediaIDsceconlocation.lng == 'undefined' || mediaIDsceconlocation.lng == undefined || typeof mediaIDsceconlocation.lng == 'null' || mediaIDsceconlocation.lng == null){
													var mediaIDsceconlocationLng ='';
												}else{
													var mediaIDsceconlocationLng = mediaIDsceconlocation.lng;
												}
											}
											
											if(typeof mediaArrayList.original == 'undefined' ||  mediaArrayList.original == undefined || typeof mediaArrayList.original == 'null' || mediaArrayList.original == null){
												var mediaIDsceconoriginalwidth = '';
												var mediaIDsceconoriginalheight = '';
												var mediaIDsceconoriginalsize = '';
											}else{
												var mediaIDsceconoriginal = mediaArrayList.original;
												if(typeof mediaIDsceconoriginal.width == 'undefined' || mediaIDsceconoriginal.width == undefined || typeof mediaIDsceconoriginal.width == 'null' || mediaIDsceconoriginal.width == null){
													var mediaIDsceconoriginalWidth ='';
												}else{
													var mediaIDsceconoriginalWidth = mediaIDsceconoriginal.width;
												}
												
												if(typeof mediaIDsceconoriginal.height == 'undefined' || mediaIDsceconoriginal.height == undefined || typeof mediaIDsceconoriginal.height == 'null' || mediaIDsceconoriginal.height == null){
													var mediaIDsceconoriginalheight ='';
												}else{
													var mediaIDsceconoriginalheight = mediaIDsceconoriginal.height;
												}
												if(typeof mediaIDsceconoriginal.size == 'undefined' || mediaIDsceconoriginal.size == undefined || typeof mediaIDsceconoriginal.size == 'null' || mediaIDsceconoriginal.size == null){
													var mediaIDsceconoriginalsize ='';
												}else{
													var mediaIDsceconoriginalsize = mediaIDsceconoriginal.size;
												}
												
											}
											
											if(typeof mediaArrayList.created_at == 'undefined' ||  mediaArrayList.created_at == undefined || typeof mediaArrayList.created_at == 'null' || mediaArrayList.created_at == null){
												var mediaIDsceconcreated_at = '';
											}else{
												var mediaIDsceconcreated_at = mediaArrayList.created_at;
											}
											if(typeof mediaArrayList.created_by == 'undefined' ||  mediaArrayList.created_by == undefined || typeof mediaArrayList.created_by == 'null' || mediaArrayList.created_by == null){
												var mediaIDsceconcreated_by = '';
											}else{
												var mediaIDsceconcreated_by = mediaArrayList.created_by;
											}
											
											if(typeof mediaArrayList.attribution == 'undefined' ||  mediaArrayList.attribution == undefined || typeof mediaArrayList.attribution == 'null' || mediaArrayList.attribution == null){
												var mediaIDscecon_attributiontitle = '';
												var mediaIDscecon_attributiontitle_url = '';
												var mediaIDscecon_attributionauthor = '';
												var mediaIDscecon_attributionauthor_url = '';
												var mediaIDscecon_attributionother = '';
												var mediaIDscecon_attributionlicense = '';
												var mediaIDscecon_attributionlicense_url = '';
											}else{
												var mediaIDscecon_attribution = mediaArrayList.attribution;
												if(typeof mediaIDscecon_attribution.title == 'undefined' ||  mediaIDscecon_attribution.title == undefined || typeof mediaIDscecon_attribution.title == 'null' || mediaIDscecon_attribution.title == null){
													var mediaIDscecon_attributiontitle = '';
												}else{
													var mediaIDscecon_attributiontitle = mediaArrayList.title;
												}
												
												if(typeof mediaIDscecon_attribution.title_url == 'undefined' ||  mediaIDscecon_attribution.title_url == undefined || typeof mediaIDscecon_attribution.title_url == 'null' || mediaIDscecon_attribution.title_url == null){
													var mediaIDscecon_attributiontitle_url = '';
												}else{
													var mediaIDscecon_attributiontitle_url = mediaArrayList.title_url;
												}
												if(typeof mediaIDscecon_attribution.author == 'undefined' ||  mediaIDscecon_attribution.author == undefined || typeof mediaIDscecon_attribution.author == 'null' || mediaIDscecon_attribution.author == null){
													var mediaIDscecon_attributionauthor = '';
												}else{
													var mediaIDscecon_attributionauthor = mediaArrayList.author;
												}
												if(typeof mediaIDscecon_attribution.author_url == 'undefined' ||  mediaIDscecon_attribution.author_url == undefined || typeof mediaIDscecon_attribution.author_url == 'null' || mediaIDscecon_attribution.author_url == null){
													var mediaIDscecon_attributionauthor_url = '';
												}else{
													var mediaIDscecon_attributionauthor_url = mediaArrayList.author_url;
												}if(typeof mediaIDscecon_attribution.other == 'undefined' ||  mediaIDscecon_attribution.other == undefined || typeof mediaIDscecon_attribution.other == 'null' || mediaIDscecon_attribution.other == null){
													var mediaIDscecon_attributionother = '';
												}else{
													var mediaIDscecon_attributionother = mediaArrayList.other;
												}if(typeof mediaIDscecon_attribution.license == 'undefined' ||  mediaIDscecon_attribution.license == undefined || typeof mediaIDscecon_attribution.license == 'null' || mediaIDscecon_attribution.license == null){
													var mediaIDscecon_attributionlicense = '';
												}else{
													var mediaIDscecon_attributionlicense = mediaArrayList.license;
												}if(typeof mediaIDscecon_attribution.license_url == 'undefined' ||  mediaIDscecon_attribution.license_url == undefined || typeof mediaIDscecon_attribution.license_url == 'null' || mediaIDscecon_attribution.license_url == null){
													var mediaIDscecon_attributionlicense_url = '';
												}else{
													var mediaIDscecon_attributionlicense_url = mediaArrayList.license_url;
												}
											}
											
											
											
											if(typeof mediaArrayList.source == 'undefined' ||  mediaArrayList.source == undefined || typeof mediaArrayList.source == 'null' || mediaArrayList.source == null){
												var mediaIDscecon_sourcename = '';
												var mediaIDscecon_sourceexternal_id = '';
												var mediaIDscecon_sourceprovider = '';
												
											}else{
												var mediaIDscecon_source = mediaArrayList.source;
												if(typeof mediaIDscecon_source.name == 'undefined' ||  mediaIDscecon_source.name == undefined || typeof mediaIDscecon_source.name == 'null' || mediaIDscecon_source.name == null){
													var mediaIDscecon_sourcename = '';
												}else{
													var mediaIDscecon_sourcename = mediaArrayList.name;
												}if(typeof mediaIDscecon_source.external_id == 'undefined' ||  mediaIDscecon_source.external_id == undefined || typeof mediaIDscecon_source.external_id == 'null' || mediaIDscecon_source.external_id == null){
													var mediaIDscecon_sourceexternal_id = '';
												}else{
													var mediaIDscecon_sourceexternal_id = mediaArrayList.external_id;
												}if(typeof mediaIDscecon_source.provider == 'undefined' ||  mediaIDscecon_source.provider == undefined || typeof mediaIDscecon_source.provider == 'null' || mediaIDscecon_source.provider == null){
													var mediaIDscecon_sourceprovider = '';
												}else{
													var mediaIDscecon_sourceprovider = mediaArrayList.provider;
												}
											}
											if(typeof mediaArrayList.suitability == 'undefined' ||  mediaArrayList.suitability == undefined || typeof mediaArrayList.suitability == 'null' || mediaArrayList.suitability == null || mediaArrayList.suitability.length < 0){
												var mediaIDscecon_soursuitability = '';
											}else{
												var mediaIDscecon_soursuitability = mediaArrayList.suitability[0];
											}
											
											
											conn.query("insert into tbl_sygic_media_second (id, poiID, m_id, mtype, url_template,url, mlocationlat,mlocationlng, moriginalwidth,moriginalheight, moriginalsize, created_at, created_by, attributionTitle,attributiontitle_url,attributionauthor,attributionauthor_url, attributionother, attributionlicense, attributionlicense_url,sourceName, sourceexternal_id, sourceprovider, suitability, timestamp)values(?,?, ?, ?, ?,?, ?,?,?,?,?, ?, ?,?, ?, ?,?, ?, ?,?,?,?,?,?, now())",[mediaListPOIID,systemPOIID,mediaIDsceconID,mediaIDscecontype,mediaIDsceconurl_template,mediaIDsceconurl,mediaIDsceconlocationLat,mediaIDsceconlocationLng,mediaIDsceconoriginalwidth,mediaIDsceconoriginalheight,mediaIDsceconoriginalsize,mediaIDsceconcreated_at,mediaIDsceconcreated_by,mediaIDscecon_attributiontitle,mediaIDscecon_attributiontitle_url,mediaIDscecon_attributionauthor,mediaIDscecon_attributionauthor_url,mediaIDscecon_attributionother,mediaIDscecon_attributionlicense,mediaIDscecon_attributionlicense_url,mediaIDscecon_sourcename,mediaIDscecon_sourceexternal_id,mediaIDscecon_sourceprovider,mediaIDscecon_soursuitability],function(err,result){
												if(!!err){
													console.error('SQL error: ', err);
													return next(err);
												}else{
													
												}next();
											});
											
										}
										}, function (err)
										{
											if (err)
											{
												console.error('Error: ' + err.message);
												return;
											}
										 next();
											/*--------------------------------- Referemce Array start -------------------------------*/
											
											
											
													
											
											
											
											/*--------------------------------- Referemce Array end -------------------------------*/
										});
										/*------------------------- Asyncloop for external id end ------------------------*/
											
											
											
									
									
									/*----------------------------- Media secod end --------------------------------------*/
								});
								/*------------------------- Asyncloop for external id end ------------------------*/
									});
								}
								/*--------------------------- Tag array list end ------------------------------------- */
												
												/*-------------------------- Media array asyncLoop end ----------------------------------*/
											});
										
										
										
										
									}
									}
									/*--------------------------------- Media code end ------------------------------------------*/
									
										
										
										
										
										
										
										
										
										
										
									});
										

/* ------------------------------------------------- Parend array end  --------------------------------------------------------------*/										
										}
											
										
										
									});
								}
								
								
								
								
								
								/* ------------------------------------- Parent IDs start ---------------------------------------------*/
								if(typeof item.parent_ids == 'undefined' || item.parent_ids == undefined || item.parent_ids == null || item.parent_ids.length < 0){
									var sygicPOI_marker = item.marker;
									var sygicPOI_cityID = '';
									var sygicPOI_region = '';
									var sygicPOI_region1 = '';
									var sygicPOI_country = '';
									var sygicPOI_continent = '';
								}else{
									
									
									
								/* ------------------------------------- Parent IDs End ---------------------------------------------*/
								
								/* --------------------------- POI levele and all data Start ----------------------------------------*/
								
								
								if(typeof item.level == 'undefined' || item.level == undefined || item.level == null){
									var sygicPOIlevel = '';
								}else if(typeof item.rating == 'undefined' || item.rating == undefined || item.rating == null){
									var sygicPOIrating = 0;
								}else if(typeof item.rating_local == 'undefined' || item.rating_local == undefined || item.rating_local == null){
									var sygicPOI_rating_local = 0;
								}else if(typeof item.quadkey == 'undefined' || item.quadkey == undefined || item.quadkey == null){
									var sygicPOI_quadkey = 0;
								}else if(typeof item.location.lat == 'undefined' || item.location.lat == undefined || item.location.lat == null){
									var sygicPOI_locationLat = 0;
								}else if(typeof item.location.lng == 'undefined' || item.location.lng == undefined || item.location.lng == null){
									var sygicPOI_locationlong = 0;
								}else if(typeof item.bounding_box == 'undefined' || item.bounding_box == undefined || item.bounding_box == null){
									var sygicPOI_bounding_box = 0;
								}else if(typeof item.name == 'undefined' || item.name == undefined || item.name == null){
									var sygicPOI_Titlename = '';
								}else if(typeof item.name_suffix == 'undefined' || item.name_suffix == undefined || item.name_suffix == null){
									var sygicPOI_name_suffix = '';
								}else if(typeof item.url == 'undefined' || item.url == undefined || item.url == null){
									var sygicPOI_url = '';
								}else if(typeof item.duration == 'undefined' || item.duration == undefined || item.duration == null){
									var sygicPOI_duration = '';
								}else if(typeof item.marker == 'undefined' || item.marker == undefined || item.marker == null){
									var sygicPOI_marker = '';
								}
								
								
								
								if(typeof item.perex == 'undefined' || item.perex == '' || typeof item.perex == 'null' || item.perex == null){
									var prefixStr = '';
								}else{
									var prefixStr = item.perex;
								}if(typeof item.customer_rating == 'undefined' || item.customer_rating == '' || typeof item.customer_rating == 'null' || item.customer_rating == null){
									var customer_ratingStr = '';
								}else{
									var customer_ratingStr = item.customer_rating;
								}if(typeof item.star_rating == 'undefined' || item.star_rating == '' || typeof item.star_rating == 'null' || item.star_rating == null){
									var star_ratingStr = '';
								}else{
									var star_ratingStr = item.star_rating;
								}if(typeof item.star_rating_unofficial == 'undefined' || item.star_rating_unofficial == '' || typeof item.star_rating_unofficial == 'null' || item.star_rating_unofficial == null){
									var star_rating_unofficialStr = '';
								}else{
									var star_rating_unofficialStr = item.star_rating_unofficial;
								}if(typeof item.thumbnail_url == undefined || item.thumbnail_url == '' || typeof item.thumbnail_url == 'null' || item.thumbnail_url == null){
									var thumbnail_urlStr = '';
								}else{
									var thumbnail_urlStr = item.thumbnail_url;
								}if(typeof item.area == 'undefined' || item.area == '' || typeof item.area == 'null' || item.area == null){
									var areaStr = '';
								}else{
									var areaStr = item.area;
								}if(typeof item.address == 'undefined' || item.address == '' || typeof item.address == 'null' || item.address == null){
									var addressStr = '';
								}else{
									var addressStr = item.address;
								}if(typeof item.admission == 'undefined' || item.admission == '' || typeof item.admission == 'null' || item.admission == null){
									var admissionStr = '';
								}else{
									var admissionStr = item.admission;
								}if(typeof item.email == 'undefined' || item.email == '' || typeof item.email == 'null' || item.email == null){
									var emailStr = '';
								}else{
									var emailStr = item.email;
								}if(typeof item.opening_hours == 'undefined' || item.opening_hours == '' || typeof item.opening_hours == 'null' || item.opening_hours == null){
									var opening_hoursStr = '';
								}else{
									var opening_hoursStr = item.opening_hours;
								}if(typeof item.is_deleted == 'undefined' || item.is_deleted == '' || typeof item.is_deleted == 'null' || item.is_deleted == null){
									var is_deletedStr = '';
								}else{
									var is_deletedStr = item.is_deleted;
								}if(typeof item.phone == 'undefined' || item.phone == '' || typeof item.phone == 'null' || item.phone == null){
									var phoneStr = '';
								}else{
									var phoneStr = item.phone;
								}
								
								
								
								/* --------------------------------- Poi description start -----------------------------------*/
								if(typeof item.description == 'undefined' || item.description == '' || typeof item.description == 'null' || item.description == null){
									var descriptiontextStr = '';
									var providerStr = '';
									var translation_providerStr = '';
									var linkdesStr = '';
									var is_translatedDesStr = '';
								}else{
									
									if(typeof item.description.text == 'undefined' || item.description.text == '' || typeof item.description.text == 'null'){
										var descriptiontextStr = '';
									}else{
										var descriptiontextStr = item.description.text;
									}if(typeof item.description.provider == 'undefined' || item.description.provider == '' || typeof item.description.provider == 'null' || item.description.provider == null){
										var providerStr = '';
									}else{
										var providerStr = item.description.provider;
										
									}if(typeof item.description.translation_provider == 'undefined' || item.description.translation_provider == '' || typeof item.description.translation_provider == 'null' || item.description.translation_provider == null){
										var translation_providerStr = '';
									}else{
										var translation_providerStr = item.description.translation_provider;
										
									}if(typeof item.description.link == 'undefined' || item.description.link == '' || typeof item.description.link == 'null' || item.description.link == null){
										var linkdesStr = '';
									}else{
										var linkdesStr = item.description.link;
									}if(typeof item.description.is_translated == 'undefined' || item.description.is_translated == '' || typeof item.description.is_translated == 'null' || item.description.is_translated == null){
										var is_translatedDesStr = '';
									}else{
										var is_translatedDesStr = item.description.is_translated;
									}
								
								}
								
								/* --------------------------------- Poi description end -----------------------------------*/
								
								
								if(typeof item.media_count  == 'undefined' || item.media_count == '' || typeof item.media_count == 'null' || item.media_count == null){
									var mediacountStr = 0;
								}else{
									var mediacountStr = item.media_count;
								}
								if(typeof item.main_media  == 'undefined' || item.main_media == '' || typeof item.main_media == 'null' || item.main_media == null){
									var main_mediatStr = '';
									var usageStr = '';
									var squareStr = '';
									var landscapeStr = '';
									var portraitStr = '';
									var video_previewStr = '';
								}else{
									var mediacountStr = item.main_media	;
									if(typeof item.main_media.usage  =='undefined' || item.main_media.usage == '' || typeof item.main_media.usage == 'null' || item.main_media.usage == null){
										var usageStr = '';
										var squareStr = '';
										var landscapeStr = '';
										var portraitStr = '';
										var video_previewStr = '';
									}else{
										if(typeof item.main_media.usage.square  == 'undefined' || item.main_media.usage.square == '' || typeof item.main_media.usage.square == 'null' || item.main_media.usage.square == null){
											var squareStr = '';
										}else{
											var squareStr = item.main_media.usage.square;
										}
										if(typeof item.main_media.usage.landscape  == 'undefined' || item.main_media.usage.landscape == '' || typeof item.main_media.usage.landscape == 'null' || item.main_media.usage.landscape == null){
											var landscapeStr = '';
										}else{
											var landscapeStr = item.main_media.usage.landscape;
										}if(typeof item.main_media.usage.portrait  == 'undefined' || item.main_media.usage.portrait == '' || typeof item.main_media.usage.portrait == 'null' || item.main_media.usage.portrait == null){
											var portraitStr = '';
										}else{
											var portraitStr = item.main_media.usage.portrait;
										}if(typeof item.main_media.usage.video_preview  == 'undefined' || item.main_media.usage.video_preview == '' || typeof item.main_media.usage.video_preview == 'null' || item.main_media.usage.video_preview == null){
											var video_previewStr = '';
										}else{
											var video_previewStr = item.main_media.usage.video_preview;
										}
									}
									
									
									
								}
								
								var sygicPOIID = item.id;
								var sygicPOIlevel = item.level;
								var sygicPOIrating = item.rating;
								var sygicPOI_rating_local = item.rating_local;
								var sygicPOI_quadkey = item.quadkey;
								var sygicPOI_locationLat = item.location.lat;
								var sygicPOI_locationlong = item.location.lng;
								
								if(typeof item.bounding_box == 'null' || item.bounding_box == null){
									var sygicPOI_bounding_box = '';
								}else{
									if(typeof item.bounding_box.south == 'undefined' || item.bounding_box.south == undefined || typeof item.bounding_box.south== 'null' || item.bounding_box.south == null){
										var southStr = ''; 
									}else{
										var southStr = item.bounding_box.south;
									}
									if(typeof item.bounding_box.west == 'undefined' || item.bounding_box.west == undefined || typeof item.bounding_box.west== 'null' || item.bounding_box.west == null){
										var westStr = ''; 
									}else{
										var westStr = item.bounding_box.west;
									}
									if(typeof item.bounding_box.north == 'undefined' || item.bounding_box.north == undefined || typeof item.bounding_box.north== 'null' || item.bounding_box.north == null){
										var northStr = ''; 
									}else{
										var northStr = item.bounding_box.south;
									}
									if(typeof item.bounding_box.east == 'undefined' || item.bounding_box.east == undefined || typeof item.bounding_box.east== 'null' || item.bounding_box.east == null){
										var eastStr = ''; 
									}else{
										var eastStr = item.bounding_box.east;
									}
									var sygicPOI_bounding_box = 'S:'+southStr +' W:'+westStr +' N:'+northStr +' E:'+eastStr;
								}
								
								var sygicPOI_Titlename = item.name;
								var sygicPOI_name_suffix = item.name_suffix;
								var sygicPOI_url = item.url;
								var sygicPOI_duration = item.duration;
								var sygicPOI_marker = item.marker;
							}
							
							
							/* console.log(mediacountStr); */
							
							conn.query("insert into tbl_sygicpoi_data (id, poiID, level, rating, rating_local, quadkey, locationLat,locationLng,bounding_box, poiTitle, poiNameSuffix, poiUrl, poiDuration, poiMarker,parent_idsCity, parent_idsRegion,parent_idsRegion1, parent_idsCountry,parent_idsContinent,poiPerex, poiCustomer_rating, poiStar_rating,	poiStar_rating_unofficial,poiThumbnail_url,poiArea, poiAddress, poiAdmission, poiEmail, poiOpening_hours,poiIs_deleted,poiPhone, poiDescription,	poiProvider, poiTranslation_provider,poiLink, poiIs_translated, poiMedia_count, poiMain_mediaUsagesquare,poiMain_mediaUsagelandscape, poiPortrait, poiVideo_preview, timestamp)values(?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?,?, ?,?,?,?, ?, ?, ?,?,?, ?,?, ?,?, ?, ?, ?, ?,?, ?, ?, ?,?,?, ?, ?,now())",[systemPOIID,sygicPOIID,sygicPOIlevel,sygicPOIrating,sygicPOI_rating_local,sygicPOI_quadkey,sygicPOI_locationLat,sygicPOI_locationlong,sygicPOI_bounding_box,sygicPOI_Titlename,sygicPOI_name_suffix,sygicPOI_url,sygicPOI_duration,sygicPOI_marker,'','','','','',prefixStr,customer_ratingStr,star_ratingStr,star_rating_unofficialStr,thumbnail_urlStr,areaStr,addressStr,admissionStr,emailStr,opening_hoursStr,is_deletedStr,phoneStr,descriptiontextStr,providerStr,translation_providerStr,linkdesStr,is_translatedDesStr,'',squareStr,landscapeStr,portraitStr,video_previewStr],function(err,result){
								if(!!err){
									console.error('SQL error: ', err);
									return next(err);
								}else{
									
								}
							});
							
							
							/* --------------------------- POI levele and all data END ----------------------------------------*/
						//	next();
								}
							}
					
						});	
					}
							
						/* ------------------------------------- Else close ------------------------------- */	
							
							
							
						}, function (err)
						{
							if (err)
							{
								console.error('Error: ' + err.message);
								return;
							}
							console.log(2333);
							// res.json({"status":"success", "message":"success result"});
						});
						
					  
					 // 
					});
			}
		});
	}catch(ex){
		console.error("Internal error:"+ ex);
		return next(ex);
	}
});
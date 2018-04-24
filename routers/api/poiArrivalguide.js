var express = require("express");
var nodemailer = require('nodemailer');
var dateTime = require('node-datetime');

var fs = require("fs"); 
var router = express.Router();
var Cryptr = require('cryptr'),  
cryptr = new Cryptr('myTotalySecretKey');
var asyncLoop = require('node-async-loop');
var mailemail = 'tapan.rawal@travialist.com';
var mailpass = 'Mindcrew@123';

var imgurl = 'https://travialist.com/ImagesFiles/';

module.exports = router;


router.post('/poiArrivalguideData',function(req, res, next) {
	var response = req.body.destination;
	var dt = dateTime.create();
	var otp = Math.floor(Math.random()*900000) + 100000;
	var formatted = dt.format('YmdHMSl');
	var POiID = formatted+otp;
	
	/* City poi details diffault varibale*/
	var sectionName = '';
	var iso = '';
	var des = '';
	var specialoffers = '';
	var booking = '';
	var title = '';
	var description = '';
	var lat = '';
	var lon = '';
	var poiAddress = '';
	var phone = '';
	var poiWebsite = '';
	var poiOpeninghours = '';
	var poiMoreinfo = '';
	var poiSubway = '';
	var poiTickets = '';
	var poiGooglePlaceId = '';
	/* City poi details diffault varibale*/
	
	
	
	
		try{
				req.getConnection(function(err, conn) {
					if (!!err) {
						console.error('SQL Connection error: ', err);
						return next(err);
					}else{
						var poiMainQuery= '';
						var cityImageQuery= '';
						var PoiDetailsQuery= '';
						var PoiImageQuery= '';
						
						if(response.iso == undefined || response.iso== ''){
							var isocity = '';
						}else{
							var isocity = response.iso;
							if(isocity == null){
								isocity = '';
							}else{
								isocity = isocity.replace(/'|_/g,'`');
								isocity = isocity.replace(/"|_/g,'`');
							}
						}
						
						if(response.Name == undefined || response.Name == ''){
							var cityName = '';
						}else{
							var cityName = response.Name;
							if(cityName == null){
								cityName = '';
							}else{
								cityName = cityName.replace(/'|_/g,'`');
								cityName = cityName.replace(/"|_/g,'`');
								
							}
							
						}
						if(response.description == undefined || response.description == ''){
							var mainDescription = '';
						}else{
							var mainDescription = response.description;
							
							
							if(mainDescription == null){
								mainDescription = '';
							}else{
								// mainDescription = mainDescription.replace("\u0027", "`");
								mainDescription = mainDescription.replace(/'|_/g,'`');
								mainDescription = mainDescription.replace(/"|_/g,'`');
								// mainDescription = mainDescription.replace(/'|_/g,'`');
							}
													
							
							
						}
						
					// ---------------------------------------start icon --------------------------------------		
						if(response.icon == undefined || response.icon == ''){
							var mainImage = '';
						}else{
							if(response.icon.url == undefined || response.icon.url == ''){
								var mainImage = '';
							}else{
								var mainImage = response.icon.url;
							}
								
						}
					// ---------------------------------------end icon--------------------------------------
					
						// ---------------------------------------start facts --------------------------------------		
						
						if(response.facts == undefined || response.facts == ''){
							var mainImage = '';
							var EmergencyNumbers = '';
							var Currency = '';
							var Newspapers = '';
							var OpeningHours = '';
							var Population = '';
							var TouristInformation = '';
							var Website = '';
							
						}else{
							if(response.facts.EmergencyNumbers == undefined || response.facts.EmergencyNumbers == ''){
								var EmergencyNumbers = '';
							}else{
								var EmergencyNumbers = response.facts.EmergencyNumbers;
								if(EmergencyNumbers == null){
									EmergencyNumbers = '';
								}else{
									EmergencyNumbers = EmergencyNumbers.replace(/'|_/g,'`');
									EmergencyNumbers = EmergencyNumbers.replace(/"|_/g,'`');
								}
								
							}if(response.facts.Currency == undefined || response.facts.Currency == ''){
								var Currency = '';
							}else{
								var Currency = response.facts.Currency;
								if(Currency == null){
									Currency = '';
								}else{
									Currency = Currency.replace(/'|_/g,'`');
									Currency = Currency.replace(/"|_/g,'`');
								}
								
							}if(response.facts.Newspapers == undefined || response.facts.Newspapers == ''){
								var Newspapers = '';
							}else{
								var Newspapers = response.facts.Newspapers;
								if(Newspapers == null){
									Newspapers = '';
								}else{
									Newspapers = Newspapers.replace(/'|_/g,'`');
									Newspapers = Newspapers.replace(/"|_/g,'`');
								}
								
							}if(response.facts.OpeningHours == undefined || response.facts.OpeningHours == ''){
								var OpeningHours = '';
							}else{
								var OpeningHours = response.facts.OpeningHours;
								if(OpeningHours == null){
									OpeningHours = '';
								}else{
									OpeningHours = OpeningHours.replace(/'|_/g,'`');
									OpeningHours = OpeningHours.replace(/"|_/g,'`');
								}
								
							}if(response.facts.Population == undefined || response.facts.Population == ''){
								var Population = '';
							}else{
								var Population = response.facts.Population;
								if(Population == null){
									Population = '';
								}else{
									Population = Population.replace(/'|_/g,'`');
									Population = Population.replace(/"|_/g,'`');
								}
							}if(response.facts.TouristInformation == undefined || response.facts.TouristInformation == ''){
								var TouristInformation = '';
							}else{
								var TouristInformation = response.facts.TouristInformation;
								if(TouristInformation == null){
									TouristInformation = '';
								}else{
									TouristInformation = TouristInformation.replace(/'|_/g,'`');
									TouristInformation = TouristInformation.replace(/"|_/g,'`');
								}
							}if(response.facts.Website == undefined || response.facts.Website == ''){
								var Website = '';
							}else{
								var Website = response.facts.Website;
								if(Website == null){
									Website = '';
								}else{
									Website = Website.replace(/'|_/g,'`');
									Website = Website.replace(/"|_/g,'`');
								}
							}
						}
						// ---------------------------------------end facts--------------------------------------
						
						// ---------------------------------------start Location --------------------------------------
						
						
						// Location
						
						if(response.Location == undefined || response.Location == ''){
							var lat = '';
							var lon = '';
						}else{
							if(response.Location.lat == undefined || response.Location.lat == ''){
								var latmaindata = '';
							}else{
								var latmaindata = response.Location.lat;
							}if(response.Location.lon == undefined || response.Location.lon == ''){
								var lonmaindata = '';
							}else{
								var lonmaindata = response.Location.lon;
							}
						}
						
						// ---------------------------------------end Location--------------------------------------
						
						// ---------------------------------------start LastUpdated --------------------------------------
						if(response.LastUpdated == undefined || response.LastUpdated == ''){
							var LastUpdated = '2060-01-01';
						}else{
							var LastUpdated = response.LastUpdated;
						}
						
						
						
						// ---------------------------------------end LastUpdated--------------------------------------
						
						// ---------------------------------------start slideshow city Image --------------------------------------
						if(response.slideshow== undefined || response.slideshow == ''){
							var cityImage = '';
						}else{
							if(response.slideshow.image== undefined || response.slideshow.image == ''){
								var cityImage = '';
							}else{
								var cityImage = '';
								for(var i = 0; i < response.slideshow.image.length; i++){
									
									var dt = dateTime.create();
									var otp = Math.floor(Math.random()*900000) + 100000;
									var formatted = dt.format('YmdHMSl');
									var cityID = formatted+otp;
									
									if(cityImage == ''){
										
										cityImage = "('"+cityID+"','"+POiID+"', '"+response.slideshow.image[i].url +"',now())";
									}else{
										cityImage += ",('"+cityID+"','"+POiID+"', '"+response.slideshow.image[i].url +"',now())";
									}
								}
								if(cityImage == ''){
									cityImageQuery = '';
								}else{
									cityImageQuery = "insert into tbl_ArrivalguidesCityImage (id, arrivalID, image, timestamp)values"+cityImage;
								}
							}
						}
						// ---------------------------------------End slideshow city Image --------------------------------------
						
						
						
						
						
						
						// --------------------------------------- start city Poi details ----------------------------------------
						if(response.sections.section== undefined || response.sections.section== ''){
							var section = '';
						}else{
							var cityPoidetails = '';
							var ImagePoidetails = '';
							var sectionArray = response.sections.section;
							asyncLoop(sectionArray, function (sectionArrayitem, next){
								var dt = dateTime.create();
								var otp = Math.floor(Math.random()*900000) + 100000;
								var formatted = dt.format('YmdHMSl');
								var id = formatted+otp;   // city id
								var image= sectionArrayitem.image;
								var specialoffers= sectionArrayitem.specialoffers;
								var booking= sectionArrayitem.booking;
								iso= sectionArrayitem.iso;
								var sectionName= sectionArrayitem.name;
								var iso= sectionArrayitem.iso;
								var desriptionSection= sectionArrayitem.description;
								var url= sectionArrayitem.url;
								
								if(desriptionSection== null){
									desriptionSection = '';
								}else{
									desriptionSection = desriptionSection.replace(/'|_/g,'`');
									desriptionSection = desriptionSection.replace(/"|_/g,'`');
								}
								
								if(sectionName== null){
									sectionName = '';
								}else{
									sectionName = sectionName.replace(/'|_/g,'`');
									sectionName = sectionName.replace(/"|_/g,'`');
								}
								
								if(specialoffers== null){
									specialoffers = '';
								}else{
									specialoffers = specialoffers.replace(/'|_/g,'`');
									specialoffers = specialoffers.replace(/"|_/g,'`');
								}if(booking== null){
									booking = '';
								}else{
									booking = booking.replace(/'|_/g,'`');
									booking = booking.replace(/"|_/g,'`');
								}
								
								
								
								
								
								if(sectionArrayitem.pointsofinterest == undefined || sectionArrayitem.pointsofinterest == ''){
									ImagePoidetails += '';
								}else{
									if(sectionArrayitem.pointsofinterest.entry == undefined || sectionArrayitem.pointsofinterest.entry==''){
										
									}else{
										if(sectionArrayitem.pointsofinterest.entry.length > 0){
											var entryArray = sectionArrayitem.pointsofinterest.entry;
											
											/* console.log(desriptionSection); */
											
											asyncLoop(entryArray, function (entryArrayitem, next){
												title = entryArrayitem.title;
												des = entryArrayitem.description;
												lat = entryArrayitem.Location.lat;
												lon = entryArrayitem.Location.lon;
												
												var dt = dateTime.create();
												var otp = Math.floor(Math.random()*900000) + 100000;
												var formatted = dt.format('YmdHMSl');
												var id = formatted+otp;
												
												poiAddress = entryArrayitem.meta[0].content;
												console.log(12345);
												console.log(entryArrayitem.meta);
												console.log(12345);
												console.log(entryArrayitem.meta[0]);
												console.log(12345);
												console.log(entryArrayitem.meta[0].content);
												console.log(12345);
												
												if(poiAddress== null){
													poiAddress = '';
												}
												else{
													poiAddress = poiAddress.replace(/'|_/g,'`');
													poiAddress = poiAddress.replace(/"|_/g,'`');
												}
												
												
												if(des== null){
													des = '';
												}
												else{
													des = des.replace(/'|_/g,'`');
													des = des.replace(/"|_/g,'`');
												}if(title== null){
													title = '';
												}
												else{
													title = title.replace(/'|_/g,'`');
													title = title.replace(/"|_/g,'`');
												}
												
												 phone = entryArrayitem.meta[1].content;
												if(phone== null){
													phone = '';
												}
												poiWebsite = entryArrayitem.meta[2].content;
												if(poiWebsite== null){
													poiWebsite = '';
												}
												poiOpeninghours = entryArrayitem.meta[3].content;
												if(poiOpeninghours== null){
													poiOpeninghours = '';
												}else{
													poiOpeninghours = poiOpeninghours.replace(/'|_/g,'`');
													poiOpeninghours = poiOpeninghours.replace(/"|_/g,'`');
												}
												poiMoreinfo = entryArrayitem.meta[4].content;
												if(poiMoreinfo== null){
													poiMoreinfo = '';
												}else{
													poiMoreinfo = poiMoreinfo.replace(/'|_/g,'`');
													poiMoreinfo = poiMoreinfo.replace(/"|_/g,'`');
												}
												poiSubway = entryArrayitem.meta[5].content;
												if(poiSubway== null){
													poiSubway = '';
												}else{
													poiSubway = poiSubway.replace(/'|_/g,'`');
													poiSubway = poiSubway.replace(/"|_/g,'`');
												}
												poiTickets = entryArrayitem.meta[6].content;
												if(poiTickets== null || poiTickets == ''){
													poiTickets = '';
												}else{
													poiTickets = poiTickets.replace(/'|_/g,'`');
													poiTickets = poiTickets.replace(/"|_/g,'`');
												}
												poiGooglePlaceId = entryArrayitem.meta[7].content;
												if(poiGooglePlaceId== null || poiGooglePlaceId== ''){
													poiGooglePlaceId = '';
												}else{
													poiGooglePlaceId = poiGooglePlaceId.replace(/'|_/g,'`');
													poiGooglePlaceId = poiGooglePlaceId.replace(/"|_/g,'`');
												}
												
												
												var ImagesArray = entryArrayitem.images.image; 
												if(ImagesArray.length > 0){
													asyncLoop(ImagesArray, function (ImagesArrayitem, next){
													/* console.log(item.base64); */
													var dt = dateTime.create();
													var otp = Math.floor(Math.random()*900000) + 100000;
													var formatted = dt.format('YmdHMSl');
													var imageID = formatted+otp;
													var ImageCopyright = ImagesArrayitem.Copyright;
													
													if(ImageCopyright == null){
														ImageCopyright = '';
													}else{
														ImageCopyright = ImageCopyright.replace(/'|_/g,'`');
														ImageCopyright = ImageCopyright.replace(/"|_/g,'`');
													}
													
													var ImageDescription = ImagesArrayitem.Description;
													if(ImageDescription == null){
														ImageDescription = '';
													}else{
														ImageDescription = ImageDescription.replace(/'|_/g,'`');
														ImageDescription = ImageDescription.replace(/"|_/g,'`');
													}
													
													var ImageCopyrightLink = ImagesArrayitem.CopyrightLink;
													
													if(ImageCopyrightLink == null){
														ImageCopyrightLink = '';
													}else{
														ImageCopyrightLink = ImageCopyrightLink.replace(/'|_/g,'`');
														ImageCopyrightLink = ImageCopyrightLink.replace(/"|_/g,'`');
													}
													var Imagecontent = ImagesArrayitem.content;
													
													if(Imagecontent == null){
														Imagecontent = '';
													}else{
														Imagecontent = Imagecontent.replace(/'|_/g,'`');
														Imagecontent = Imagecontent.replace(/"|_/g,'`');
													}
													/* id= id; // citypoi id */
													POiID = POiID; // main id
													
													if(ImagePoidetails == ''){
																ImagePoidetails += "('"+imageID+"','"+POiID+"','"+id+"','"+ImageDescription+"','"+ImageCopyright+"','"+ImageCopyrightLink+"','"+Imagecontent+"',now())";
															}else{
															ImagePoidetails += ",('"+imageID+"','"+POiID+"','"+id+"','"+ImageDescription+"','"+ImageCopyright+"','"+ImageCopyrightLink+"','"+Imagecontent+"',now())";
															}
													
													
													
													next();

													}, function (err)
													{
														if(ImagePoidetails == ''){
														PoiImageQuery = '';
														}else{
															PoiImageQuery = "insert into tbl_ArrivalguidesPoiImage (id, arrivalID, poiID, Description, Copyright, CopyrightLink, image,timestamp)values"+ImagePoidetails;
														}
														console.log('Finished!');
													});
												}else{
													
												}
												
												
												if(cityPoidetails == ''){
													cityPoidetails += "('"+id+"','"+POiID+"','"+sectionName+"','"+iso+"','"+desriptionSection+"','"+response.sections.section[0].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[0].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												}else{
													cityPoidetails += ",('"+id+"','"+POiID+"','"+sectionName+"','"+iso+"','"+desriptionSection+"','"+response.sections.section[0].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[0].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												}
												
												
											next();

											}, function (err)
											{
												console.log('Finished!');
											});
										}else{
											/* City poi details diffault varibale*/
											var sectionName = '';
											var iso = '';
											var des = '';
											var specialoffers = '';
											var booking = '';
											var title = '';
											var description = '';
											var lat = '';
											var lon = '';
											var poiAddress = '';
											var phone = '';
											var poiWebsite = '';
											var poiOpeninghours = '';
											var poiMoreinfo = '';
											var poiSubway = '';
											var poiTickets = '';
											var poiGooglePlaceId = '';
											/* City poi details diffault varibale*/
											
											/* if(cityPoidetails == ''){
													cityPoidetails += "('"+id+"','"+POiID+"','"+sectionName+"','"+response.sections.section[i].iso+"','"+desriptionSection+"','"+response.sections.section[i].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[i].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												}else{
													cityPoidetails += ",('"+id+"','"+POiID+"','"+sectionName+"','"+response.sections.section[i].iso+"','"+desriptionSection+"','"+response.sections.section[i].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[i].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												} */
											
											
										}
									}
									
									
									
									
								}
								
								/* console.log(4321);
								console.log(poiWebsite);
								console.log(4321);
								return; */
								if(cityPoidetails == ''){
													cityPoidetails += "('"+id+"','"+POiID+"','"+sectionName+"','"+iso+"','"+desriptionSection+"','"+response.sections.section[0].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[0].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												}else{
													cityPoidetails += ",('"+id+"','"+POiID+"','"+sectionName+"','"+iso+"','"+desriptionSection+"','"+response.sections.section[0].image+"', '"+specialoffers +"','"+booking +"','"+response.slideshow.image[0].url +"','"+title +"','"+des+"','"+lat+"','"+lon+"','"+poiAddress+"','"+phone+"','"+poiWebsite+"','"+poiOpeninghours+"','"+poiMoreinfo+"','"+poiSubway+"','"+poiTickets+"','"+poiGooglePlaceId+"',now())";
												}
									/* console.log(sectionArrayitem.pointsofinterest); */
									console.log(123);
								
								next();

							},function (err)
							{
								console.log('Finished!');
							});
							
							
						if(cityPoidetails == undefined || typeof cityPoidetails == 'undefined' || cityPoidetails == ''){
								PoiDetailsQuery='';
							}else{
								PoiDetailsQuery = "insert into tbl_ArrivalguidesPoiIDetails(id, arrivalID, name, iso, mainDescription, image, specialoffers, booking, url, poiTitle, poiDescription, poiLat, poiLong, poiAddress, phone, poiWebsite, poiOpeninghours, poiMoreinfo, poiSubway,poiTickets, poiGooglePlaceId, timestamp)values"+cityPoidetails;
							}
							
							


						}
						/* return; */
						// --------------------------------------- end city Poi details ----------------------------------------
						
						poiMainQuery = "insert into tbl_ArrivalguidesPoi (id, cityName, mainDescription, mainImage, EmergencyNumbers, Currency, Newspapers, OpeningHours, Population, TouristInformation, Website, lat, lon, LastUpdated,timestamp,iso)values('"+POiID+"', '"+ cityName+"', '"+ mainDescription+"', '"+ mainImage+"', '"+EmergencyNumbers+"', '"+Currency+"', '"+Newspapers+"', '"+ OpeningHours+"','"+Population+"', '"+TouristInformation+"', '"+Website+"', '"+latmaindata+"', '"+lonmaindata+"', '"+LastUpdated+"', now(),'"+isocity+"')";
						
						
						
						
						var alldata = 'call STR_SAVE_ARRIVALGUIDE_DATA("'+poiMainQuery+'","'+cityImageQuery+'","'+PoiDetailsQuery+'","'+PoiImageQuery+'",@a,@b)'; 
						conn.query('call STR_SAVE_ARRIVALGUIDE_DATA("'+poiMainQuery+'","'+cityImageQuery+'","'+PoiDetailsQuery+'","'+PoiImageQuery+'",@a,@b)');
						console.log(alldata);
						
						
						res.json({"status": "success","poiMainQuery":"success"});
					}
				});
		}catch(ex){
				console.error("Internal error:"+ ex);
				return next(ex);
			}
	
	
});
tbScrts0001tbl = mongoose.Schema({
					cityID:{
						type : String
					},countryName:{
						type : String
					},cityName:{
						type : String
					},mainDescription:{
						type : String
					},citydescription:{
						type : String
					},cityimage:{
						type : String
					},
					lat:{
						type : String
					},lng:{
						type : String
					},Website:{
						type : String
					}
				});
				
				
				var tblShortDescription = module.exports = connectionOne.model('tblcityshortdescription001', tbScrts0001tbl);
				
				module.exports.addCityShortDescription = function(user, callback){ 
					tblShortDescription.create(user, callback);
				}
				module.exports.findCityShortDescription = function(user, callback){ 
					tblShortDescription.find(user, callback);
				}
module.exports = tblShortDescription;   




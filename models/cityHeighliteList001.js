tbScrts0001tbl = mongoose.Schema({
					arrivalID:{
						type : String
					},name:{
						type : String
					},cityname:{
						type : String
					},Continents:{
						type : String
					},countryName:{
						type : String
					},iso:{
						type : String
					},mainDescription:{
						type : String
					},specialoffers:{
						type : String
					},booking:{
						type : String
					},poiImage:{
						type : String
					},cityHighlightImage:{
						type : String
					},poiTitle:{
						type : String
					},poiDescription:{
						type : String
					},poiLat:{
						type : String
					},poiLong:{
						type : String
					},poiAddress:{
						type : String
					},phone:{
						type : String
					},poiWebsite:{
						type : String
					},poiOpeninghours:{
						type : String
					},poiMoreinfo:{
						type : String
					},poiSubway:{
						type : String
					},poiTickets:{
						type : String
					},poiGooglePlaceId:{
						type : String
					},timestamp:{
						type : Date
					},status:{
						type : String
					},categories:{
						type : String
					},Copyright:{
						type : String
					},images:{
						type : String
					}
				});
				
				
				var tblquestion = module.exports = connectionOne.model('tblcityhighlight001', tbScrts0001tbl);
				
				module.exports.addCityHighlights = function(user, callback){ 
					tblquestion.create(user, callback);
				}
				module.exports.findQuestion = function(user, callback){ 
					tblquestion.find(user, callback);
				}
module.exports = tblquestion;   




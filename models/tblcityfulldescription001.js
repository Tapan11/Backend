tbScrts0001tbl = mongoose.Schema({
					arrivalID:{
						type : String
					},countryName:{
						type : String
					},cityName:{
						type : String
					},name:{
						type : String
					},iso:{
						type : String
					},mainDescription:{
						type : String
					},
					image:{
						type : String
					}
				});
				
				
				var tblfullDescription = module.exports = connectionOne.model('tblcityfulldescription001', tbScrts0001tbl);
				
				module.exports.addCityfullDescription = function(user, callback){ 
					tblfullDescription.create(user, callback);
				}
				module.exports.findCityfullDescription = function(user, callback){ 
					tblfullDescription.find(user, callback);
				}
module.exports = tblfullDescription;   




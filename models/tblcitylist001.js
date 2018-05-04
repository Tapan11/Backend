tbScrts0001tbl = mongoose.Schema({
					id:{
						type : String
					},countryName:{
						type : String
					},CityName1:{
						type : String
					},location:{
						type : String
					},image:{
						type : String
					},description:{
						type : String
					},fullimage:{
						type : String
					},pdf:{
						type : String
					},EmergencyNumbers:{
						type : String
					}
				});
				
				var tblcitylist001 = module.exports = connectionOne.model('tblcitylist001', tbScrts0001tbl);
				module.exports.addCitylist = function(user, callback){ 
					tblcitylist001.create(user, callback);
				}
				module.exports.findcity = function(user, callback){
				tblcitylist001.find(user, callback);	
				/* tblcitylist001.aggregate([
					{
					 $match:{
						"_id": ObjectId("5a65c0fefb09a59c5ffc0eab")
					 }
				  },
				   {
					 $lookup:
					   {
						 from: "sms_logs",
						 localField: "number",
						 foreignField: "receiver_number",
						 as: "inventory_docs"
					   }
				  }
				]); */
					/* tblcitylist001.find(user, callback); */
				}
				
				
				
				
module.exports = tblcitylist001;   

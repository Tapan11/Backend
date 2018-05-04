tbScrts0001tbl = mongoose.Schema({
					userId:{
						type : String
					},arrivalID:{
						type : String
					},bookmark:{
						type : int
					},timestamp:{
						type : Date
					},lastUpdate:{
						type : Date
					}
				});
				
				var tblbookmarkcity = module.exports = connectionOne.model('tblbookmarkcity001', tbScrts0001tbl);
				module.exports.addBookmarkCitylist = function(user, callback){ 
					tblbookmarkcity.create(user, callback);
				}
				module.exports.findBookmarkCitylist = function(user, callback){ 
					tblbookmarkcity.create(user, callback);
					tblbookmarkcity.find(user, callback);
				}
module.exports = tblbookmarkcity;   


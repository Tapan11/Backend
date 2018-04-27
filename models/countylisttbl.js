tbScrts0002tbl = mongoose.Schema({
					region:{
						type : String
					},
					country:{
						type : Array
					}
				});
				
				var tbsecret0002One = module.exports = connectionOne.model('tblcountylists', tbScrts0002tbl);
				
				module.exports.findCountry = function(user, callback){ 
					tbsecret0002One.create(user, callback);
					tbsecret0002One.find(user, callback);
				}
module.exports = tbsecret0002One;   




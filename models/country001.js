tbScrtscitylist0003 = mongoose.Schema({
			countryId:{
				type : String
			},
			countryName:{
				type : String
			}
		});
		
		var countryList001 = module.exports = connectionOne.model('tblsygiccountry001', tbScrtscitylist0003);
		module.exports.addcountry = function(user, callback){ 
			countryList001.create(user, callback);
			
		}
								
module.exports = countryList001;   




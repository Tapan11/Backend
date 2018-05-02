tbScrtscitylist0003 = mongoose.Schema({
			cityId:{
				type : String
			},
			cityName:{
				type : String
			},
			countryId:{
				type : String
			}
		});
		
		var tbsecretcitylistlist0001 = module.exports = connectionOne.model('tblsygiccitylist001', tbScrtscitylist0003);
		module.exports.addcity = function(user, callback){ 
			tbsecretcitylistlist0001.create(user, callback);
			
		}
								
module.exports = tbsecretcitylistlist0001;   




tbScrtscitylist0003 = mongoose.Schema({
			country:{
				type : String
			},
			city:{
				type : Array
			}
		});
		
		var tbsecretcitylist0001 = module.exports = connectionOne.model('tblcity001', tbScrtscitylist0003);
		module.exports.findCity = function(user, callback){ 
			tbsecretcitylist0001.create(user, callback);
			tbsecretcitylist0001.find(user, callback);
		}
								
module.exports = tbsecretcitylist0001;   




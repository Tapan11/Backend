tbScrtscitylist0004 = mongoose.Schema({
			id:{
				type : String
			},
			level:{
				type : String
			},
			rating:{
				type : String
			},
			rating_local:{
				type : String
			},quadkey:{
				type : String
			},location:{
				type : Object
			},bounding_box:{
				type : String
			},name:{
				type : String
			},name_suiffx:{
				type : String
			},url:{
				type : String
			},duration:{
				type : String
			},
			marker:{
				type : String
			},
			categories:{
				type : Array
			},
			parent_ids:{
				type : Array
			},
			perex:{
				type : String
			},
			customer_rating:{
				type : String
			},
			star_rating:{
				type : String
			},
			star_rating_unofficial:{
				type : String
			},
			thumbnail_url:{
				type : String
			},
			tags:{
				type : Array
			},
			area:{
				type : String
			},
			address:{
				type : String
			},
			admission:{
				type : String
			},
			email:{
				type : String
			},
			opening_hours:{
				type : String
			},
			is_deleted:{
				type : String
			},
			phone:{
				type : String
			},
			description:{
				type : Object
			},
			media_count:{
				type : String
			},
			main_media:{
				type : Object
			},
			references:{
				type : Array
			},
			external_ids:{
				type : Array
			},
			media:{
				type : Array
			}
		});
		
		var tbsecretSygicdatalist0002 = module.exports = connectionOne.model('tbl_sygicdata002', tbScrtscitylist0004);
		/* module.exports.findCity = function(user, callback){ 
			tbsecretSygicdatalist0002.create(user, callback);
			tbsecretSygicdatalist0002.find(user, callback);
		} */
		
		module.exports.addSygicdata = function(user, callback){ 
					tbsecretSygicdatalist0002.create(user, callback);
					///tbuser0001Two.create(user, callback);
				}
								
module.exports = tbsecretSygicdatalist0002;   




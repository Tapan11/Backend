
tbScrts0001tbl = mongoose.Schema({
					first_name:{
						type : String
					},
					last_name:{
						type : String
					},
					email:{
						type : String
					},
					city:{
						type : String
					},
					password:{
						type : String
					},
					isverified:{
						type : String
					},
					platform:{
						type : String
					},
					question_one:{
						type : String
					},
					answer_one:{
						type : String
					},
					question_two:{
						type : String
					},
					answer_two:{
						type : String
					},
					otp:{
						type : String
					},
					gender:{
						type : String
					},
					dob:{
						type : Date
					},
					countryName:{
						type : String
					},
					mobile_number:{
						type : String
					},
					country_code_mob:{
						type : String
					},
					user_unique_key:{
						type : String
					},
					logintype:{
						type : String
					},
					fb_id:{
						type : String
					},
					cdate:{
						type : Date, default: Date.now
					},
					profilepic:{
						type : String
					},
					ptype:{
						type : String
					},
					psetpassword:{
						type : String
					}
				});
				
				var tbsecret0001Two = module.exports = connectionOne.model('tbllogin001', tbScrts0001tbl);
				
				module.exports.addUser = function(user, callback){ 
					console.log(user);
					tbsecret0001Two.create(user, callback);
					///tbuser0001Two.create(user, callback);
				}
module.exports = tbsecret0001Two;   




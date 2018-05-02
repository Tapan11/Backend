tbScrts0001tbl = mongoose.Schema({
					userId:{
						type : String
					},poiID:{
						type : String
					},platform:{
						type : String
					},answer:{
						type : Array
					}
				});
				
				var tblquestionans = module.exports = connectionOne.model('tblansquestion001', tbScrts0001tbl);
				
				module.exports.addQuestionAns = function(user, callback){ 
					tblquestionans.create(user, callback);
				}
				module.exports.findQuestionAns = function(user, callback){ 
					tblquestionans.find(user, callback);
				}
module.exports = tblquestionans;   

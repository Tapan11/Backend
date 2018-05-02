tbScrts0001tbl = mongoose.Schema({
					question:{
						type : String
					}
				});
				
				var tblquestion = module.exports = connectionOne.model('tblquestion001', tbScrts0001tbl);
				
				module.exports.addQuestion = function(user, callback){ 
					tblquestion.create(user, callback);
				}
				module.exports.findQuestion = function(user, callback){ 
					tblquestion.find(user, callback);
				}
module.exports = tblquestion;   




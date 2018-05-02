tbScrts0001tbl = mongoose.Schema({
					poiID:{
						type : String
					},userId:{
						type : String
					},platform:{
						type : String
					},answer:{
						type : Array
					}
				});
				
				var tblcomment001 = module.exports = connectionOne.model('tblcommentAdd001', tbScrts0001tbl);
				module.exports.addComment = function(user, callback){ 
					tblcomment001.create(user, callback);
				}
				module.exports.findQuestionAns = function(user, callback){ 
					tblcomment001.find(user, callback);
				}
module.exports = tblcomment001;   

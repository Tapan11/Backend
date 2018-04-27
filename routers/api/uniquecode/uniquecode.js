var methods = {
	uniqueSystme : function(callback){
		
	var uniqueIDStr = "";
	var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++){
		uniqueIDStr += possible.charAt(Math.floor(Math.random() * possible.length));
	}
		
		var data = {user_unique_key:uniqueIDStr};
		tbsecret0001Two.find(data, function(err, result) {
			if (err) throw err;
			if(result.length > 0){
					uniquecode.uniqueSystme(function(err, result){});
				}else{
					console.log(uniqueIDStr);
					return callback('success',uniqueIDStr);
				}
		});
	}								
}
module.exports = methods;
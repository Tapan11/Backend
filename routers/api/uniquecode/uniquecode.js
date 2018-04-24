var methods = {
	uniqueSystme : function(conn,callback){
		
	var uniqueIDStr = "";
	var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++){
		uniqueIDStr += possible.charAt(Math.floor(Math.random() * possible.length));
	}
		
						
				conn.query("select * from tbl_login where user_unique_key = '"+uniqueIDStr+"'",function(err, result) {
					if (!!err) {
						console.log(123);
						console.error('SQL error: ', err);
						return next(err);
					}else{
						if(result.length > 0){
							uniquecode.uniqueSystme(conn,function(err, result){});
						}else{
							console.log(uniqueIDStr);
							return callback('success',uniqueIDStr);
						}
					}
				});
			
	
			
		
	}								
}
module.exports = methods;
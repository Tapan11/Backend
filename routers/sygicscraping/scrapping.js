
module.exports = router;
router.post('/scrapping1', function(req, res, next) {
	if(typeof req.body == 'undefined' || req.body ==undefined){
		 console.error("Internal error:Object is not ddd defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
	var reqObj=req.body;
	/* console.log(reqObj); */
		
		
		/* console.log(typeof reqObj);
return; */		
		
		try {
			
			tbsecretSygicdatalist0002.addSygicdata(reqObj, function(err, result) {
				if (err) throw err;
				
				res.json({"status": "success","message":"Password set successfully"});
			});
		} catch (ex) {
			console.error("Internal error:" + ex);
			return next(ex);
		}
	}
	
});				


















router.post('/scrapping', function(req, res, next) {
	if(typeof req.body.places == 'undefined' || req.body.places ==undefined){
		 console.error("Internal error:Object is not ddd defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
	/* var reqObj=req.body; */
	/* console.log(reqObj); */
		
		
		
	
		console.log(req.body.places.length);
		
		var array = req.body.places;
	
		var i=80;
		asyncLoop(array, function (arraylist, next)
		{
			
			request({
					url: arraylist,
					json: true
				}, function (error, response, body) {
					
				if (!error && response.statusCode === 200) {
					var json = JSON.stringify(response.body);
					var obj = JSON.parse(json);
					try {
						console.log(i);
						tbsecretSygicdatalist0002.addSygicdata(obj, function(err, result) {
							/* if (err) throw err; */
							console.log(err);
							i++;
							console.log(i);
							next();
							
							/* res.json({"status": "success","message":"Password set successfully"}); */
						});
					} catch (ex) {
						console.error("Internal error:");
						return next(ex);
					}
					
				}else{
					next();
					console.log(error);
				}
			});
		},function(err){
			res.json({"status": "success","message":"Password set successfully"});
		});

		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
});				
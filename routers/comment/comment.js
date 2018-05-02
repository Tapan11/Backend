var express=require("express");
var request = require("request");
var asyncLoop = require('node-async-loop');
var router = express.Router();
module.exports = router;


/* ------------------------------------------ Answer API for rating start ---------------------------------------------------*/		
router.post('/allcomments', function(req, res, next) {
	try {
		if(typeof req.body.allcomments == 'undefined' || req.body.allcomments == undefined){
			console.error("Internal error:Object is not defiend");
			var ex = "Internal error:Object is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
		var reqObj=req.body.allcomments;
		if(typeof reqObj.userId == 'undefined' || reqObj.userId == undefined || reqObj.userId == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
			
		}else if(typeof reqObj.poiID == 'undefined' || reqObj.poiID == undefined || reqObj.poiID == ''){
			var ex = "Internal error:Object poiID is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.answer == 'undefined' || reqObj.answer == undefined || reqObj.answer == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if(typeof reqObj.platform == 'undefined' || reqObj.platform == undefined || reqObj.platform == ''){
			var ex = "Internal error:Object userid is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else if((reqObj.answer).length != 3){
			var ex = "Internal error:Object answer is wrong.";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var data = {userId:reqObj.userId,poiID:reqObj.poiID,answer:reqObj.answer,platform:reqObj.platform}
			tblcommentAdd001.addComment(data,function(err, result) {
				if (err== null){
					res.json({"status": "success","message":"Comment add successfuly."});
				}else{
					res.json({"status": "error","message":"Comment is not add"});
				}
			});
		}
		}
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});		
/* ------------------------------------------ Answer API for rating end ---------------------------------------------------*/	
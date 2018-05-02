var express=require("express");
var request = require("request");
var asyncLoop = require('node-async-loop');
var router = express.Router();
module.exports = router;

router.post('/questionrating', function(req, res, next) {
	try {
		var data = {};
		question0001.findQuestion(data,function(err, result) {
			if (err) throw err;
			var arr1 =[];
			
			if(result.length >0){
				for(var i=0; i< result.length; i++){
					var obj1={};
					obj1.questionId=result[i]['_id'];
					obj1.question=result[i]['question'];
					arr1.push(obj1);
				}
				res.json({"status": "success","question":arr1,"message":"Question send successfully."});
			}else{
				res.json({"status": "error","message":"Question does not exists."});
			}
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});



/* ------------------------------------------ Add question start ---------------------------------------------------*/		
router.post('/questionadd', function(req, res, next) {
	try {
		if(req.body.question == undefined){
		 console.error("Internal error:Object is not defiend");
		 var ex = "Internal error:Object is not defiend";
		 res.json({"status": "error","message":ex});
        return next(ex);
	}else{
		var reqObj=req.body.question;
		if(typeof reqObj.question == 'undefined' || reqObj.question == undefined || reqObj.question == ''){
			var ex = "Internal error:Object email is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
			var data = {question:reqObj.question};
			question0001.addQuestion(data,function(err, result) {
			if (err) throw err;
			res.json({"status": "success","message":"Question add successfully"});
			});
		}
	}
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});	
/* ------------------------------------------ Add question end ---------------------------------------------------*/		


/* ------------------------------------------ Answer API for rating start ---------------------------------------------------*/		
router.post('/questionAns', function(req, res, next) {
	try {
		if(typeof req.body.questionAns == 'undefined' || req.body.questionAns == undefined){
			console.error("Internal error:Object is not defiend");
			var ex = "Internal error:Object is not defiend";
			res.json({"status": "error","message":ex});
			return next(ex);
		}else{
		var reqObj=req.body.questionAns;
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
		}else{
			var data = {userId:reqObj.userId,poiID:reqObj.poiID,answer:reqObj.answer,platform:reqObj.platform}
			questionAns0001.addQuestionAns(data,function(err, result) {
				if (err== null){
					res.json({"status": "success","message":"Feedback added successfully."});
				}else{
					res.json({"status": "error","message":"Feedback didn't add."});
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
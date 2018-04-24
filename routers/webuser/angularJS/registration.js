var app = angular.module("myApp", []);

'use strict';

app.controller("registration", function($scope,$http,$window) {
	
	$scope.ValidateEmail = function(email){  
		var emailv = email;
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailv))  
		  {  
			return true;
		  }else{
			  swal({
				  title: "Error!",
				  text: "You have entered an invalid email address!",
				  type: "error"
				});
				return false;
		  }  
			
	}
	
	
	$scope.validatePassword = function(password) {
		var newPassword =password;
		var minNumberofChars = 8;
		var maxNumberofChars = 16;
		var regularExpression  = /^[A-Za-z0-9_@.#$=!%^)(\]:\*;\?\/\,}{'\|<>\[&\+-]*$/;
		
		if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
			swal({
				  title: "Error!",
				  text: "Password should be 8 character !",
				  type: "error"
				});
				return false;
		}
		if(!regularExpression.test(newPassword)) {
			
			swal({
				  title: "Error!",
				  text: "Password should contain atleast one number and one special character !",
				  type: "error"
				});
			return false;
		}else{
			return true;
		}
	}

  
	 $scope.registration = function(pn) {
        if(pn == undefined || pn ==''){
			swal({
			  title: "Error!",
			  text: "Register first !",
			  type: "error"
			});
			return false;
		}
		else if(pn.fname == undefined || pn.fname =='' || pn.fname == null || pn.fname == 'null'){
			swal({
			  title: "Error!",
			  text: "First name should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.lname == undefined || pn.lname =='' || pn.lname == null || pn.lname == 'null'){
			swal({
			  title: "Error!",
			  text: "Last name should not be blank !",
			  type: "error"
			});
			return false;
		}
		else if(pn.email ==undefined || pn.email =='' || pn.email == null || pn.email =='null'){
			swal({
			  title: "Error!",
			  text: "Please enter valid email !",
			  type: "error"
			});
			return false;
		}else if(pn.password ==undefined || pn.password =='' || pn.password == null || pn.password =='null'){
			swal({
			  title: "Error!",
			  text: "Password should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.cpassword ==undefined || pn.cpassword =='' || pn.cpassword == null || pn.cpassword =='null'){
			swal({
			  title: "Error!",
			  text: "Confirm password should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.cpassword != pn.password){
			swal({
			  title: "Error!",
			  text: "Password and confirm password does not matched !",
			  type: "error"
			});
			return false;
		}else if(pn.dprSecurityQuestionFirst ==undefined || pn.dprSecurityQuestionFirst =='' || pn.dprSecurityQuestionFirst == null || pn.dprSecurityQuestionFirst =='null'){
			swal({
			  title: "Error!",
			  text: "Please select security question 1!",
			  type: "error"
			});
			return false;
		}else if(pn.dprSecurityAnsFirst ==undefined || pn.dprSecurityAnsFirst =='' || pn.dprSecurityAnsFirst == null || pn.dprSecurityAnsFirst =='null'){
			swal({
			  title: "Error!",
			  text: "Answer should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.dprSecurityQuestionSecond ==undefined || pn.dprSecurityQuestionSecond =='' || pn.dprSecurityQuestionSecond == null || pn.dprSecurityQuestionSecond =='null'){
			swal({
			  title: "Error!",
			  text: "Please select security question 2!",
			  type: "error"
			});
			return false;
		}else if(pn.dprSecurityAnsSecond ==undefined || pn.dprSecurityAnsSecond =='' || pn.dprSecurityAnsSecond == null || pn.dprSecurityAnsSecond =='null'){
			swal({
			  title: "Error!",
			  text: "Please give answer security question 2 !",
			  type: "error"
			});
			return false;
		}else if(pn.city ==undefined || pn.city =='' || pn.city == null || pn.city =='null'){
			swal({
			  title: "Error!",
			  text: "Please enter city !",
			  type: "error"
			});
			return false;
		}else{
			var emailv = $scope.ValidateEmail(pn.email);
			if(emailv==false){
				return false;
			}else{
			var passwordstaus = $scope.validatePassword(pn.password);
				if(passwordstaus == false){
					return false;
				}else{
					
					var dataObj = {
						fname : pn.fname,
						lname : pn.lname,
						email : pn.email,
						password : pn.password,
						dprSecurityQuestionFirst : pn.dprSecurityQuestionFirst,
						dprSecurityAnsFirst : pn.dprSecurityAnsFirst,
						dprSecurityQuestionSecond : pn.dprSecurityQuestionSecond,
						dprSecurityAnsSecond : pn.dprSecurityAnsSecond,
						city : pn.city,
					};	
					
					var headers = {
					  'Content-Type': 'application/json; charset=utf-8'
					}	
					
					$http.post(baseURl+'subscribeWeb/registration', dataObj, headers).then(function(success) {
						if(success.data.status == 'success'){
							swal({
								title: success.data.status,
								text: success.data.message,
								showConfirmButton: true,
								type: "success"
							},function(){
								$window.location.href = redirectURL+'index.html';
							});
						}else{
							
							swal({
								title: success.data.status,
								text: success.data.message,
								// timer: 2000,
								showConfirmButton: true,
								type: "error"
							},function(){
								$window.location.href = redirectURL+'index.html';
							}); 
						}
					});
				}
			}
		
		}
	}; // function close
	
	
	
});
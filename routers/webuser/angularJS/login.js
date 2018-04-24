var app = angular.module("myApp", []);

'use strict';

app.controller("login", function($scope,$http,$window) {
	
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
	
	$scope.doLogin = function(pn) {
        if(pn == undefined || pn ==''){
			swal({
			  title: "Error!",
			  text: "Register first !",
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
		}else{
			var emailv = $scope.ValidateEmail(pn.email);
			if(emailv==false){
				swal({
				  title: "Error!",
				  text: "Please enter valid email !",
				  type: "error"
				});
				return false;
			}else{
					var dataObj = {
						email : pn.email,
						password : pn.password,
					};	
					
					var headers = {
					  'Content-Type': 'application/json; charset=utf-8'
					}	
					
					$http.post(baseURl+'subscribeWeb/login', dataObj, headers).then(function(success) {
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
	}; // function close
});
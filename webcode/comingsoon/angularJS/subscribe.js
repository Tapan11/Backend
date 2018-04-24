var app = angular.module("myApp", []);

'use strict';

app.controller("subscribe", function($scope,$http,$window) {
  // this will be equal to the controller and will be same as $scope
  // using $scope is not recommended and should be used as follows
  // quick google on why not to use scope will give you plenty of explanation
  /* var vm = this; */
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
	
	$scope.mobileValidation = function(val){
		if (/^\d{10}$/.test(val)) {
			// value is ok, use it
			return true;
		} else {
			swal({
				  title: "Error!",
				  text: "You have entered an invalid mobile number!",
				  type: "error"
				});
				return false;
		}
	}
  
  
	 $scope.myFunc = function(pn) {
        if(pn == undefined || pn ==''){
			swal({
			  title: "Error!",
			  text: "Name and email should not be blank !",
			  type: "error"
			});
			return false;
		}
		else if(pn.name == undefined || pn.name =='' || pn.name == null || pn.name == 'null'){
			swal({
			  title: "Error!",
			  text: "Name should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.email ==undefined || pn.email =='' || pn.email == null || pn.email =='null'){
			swal({
			  title: "Error!",
			  text: "Please enter valid email !",
			  type: "error"
			});
			return false;
		}
		else{
			var emailv = $scope.ValidateEmail(pn.email);
			if(emailv==false){
				swal({
				  title: "Error!",
				  text: "Please enter valid email !",
				  type: "error"
				});
				return false;
			} else{
			
			var dataObj = {
				name : pn.name,
				email : pn.email,
			};	
			
			var headers = {
              'Content-Type': 'application/json; charset=utf-8'
            }	
				
			$http.post(baseURl+'subscribeWeb/subscibe', dataObj, headers).then(function(success) {
				if(success.data.status == 'success'){
					swal({
						title: success.data.status,
						text: success.data.message,
						// timer: 2000,
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
	
	
	$scope.contactUS = function(pn) {
        if(pn == undefined || pn ==''){
			swal({
			  title: "Error!",
			  text: "Fill form first !",
			  type: "error"
			});
			return false;
		}
		else if(pn.cname == undefined || pn.cname =='' || pn.cname == null || pn.cname == 'null'){
			swal({
			  title: "Error!",
			  text: "Name should not be blank !",
			  type: "error"
			});
			return false;
		}else if(pn.emailaddress ==undefined || pn.emailaddress =='' || pn.emailaddress == null || pn.emailaddress =='null'){
			swal({
			  title: "Error!",
			  text: "Please enter email !",
			  type: "error"
			});
			return false;
		}
		/* else if(pn.mobile ==undefined || pn.mobile =='' || pn.mobile == null || pn.mobile =='null'){
			swal({
			  title: "Error!",
			  text: "Please enter mobile number!",
			  type: "error"
			});
			return false;
		} */
		else if(pn.msg ==undefined || pn.msg =='' || pn.msg == null || pn.msg =='null'){
			swal({
			  title: "Error!",
			  text: "Please fill message!",
			  type: "error"
			});
			return false;
		}else{
			var emailv = $scope.ValidateEmail(pn.emailaddress);
			if(emailv==false){
				swal({
				  title: "Error!",
				  text: "Please enter valid email!",
				  type: "error"
				});
				return false;
			} else{
				
				
				var dataObj = {
					name : pn.cname,
					email : pn.emailaddress,
					mobile : '1234567890',
					msg : pn.msg,
				};	
			
				var headers = {
				  'Content-Type': 'application/json; charset=utf-8'
				}	
					
				$http.post(baseURl+'subscribeWeb/contactUS', dataObj, headers).then(function(success) {
					if(success.data.status == 'success'){
						swal({
							title: success.data.status,
							text: success.data.message,
							// timer: 2000,
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
	
	
});
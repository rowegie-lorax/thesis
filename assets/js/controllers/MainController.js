;(function(){
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);


	MainController.$inject = ['$http', '$state', 'LocalStorage'];

	function MainController($http, $state, LocalStorage){
		var vm = this;
		vm.is_logged_in = LocalStorage.get('is_logged_in');

		vm.loggedInUser = {
			birthdate: '',
			gender: '',
			phoneNumber: '',
			address: ''
		}
		vm.message="true";
		getUserLoggedIn();
		

		function getUserLoggedIn(){
			var id = LocalStorage.get('user_id');
			$http({
    			url: 'http://localhost/thesis/controllers/user/retrieve.php', 
    			method: "GET",
    			params: {user_id: id}
 			}).then(function(response){
 				vm.loggedInUser = response.data;
 				if (vm.loggedInUser !== null){
 					// vm.loggedInUser.birthdate === "0000-00-00 00:00:00" ? today() : 
 					if (vm.loggedInUser.birthdate === "0000-00-00 00:00:00"){
	 					today();
	 				}else{
	 					vm.loggedInUser.birthdate = new Date(vm.loggedInUser.birthdate)
	 				}
 				

 				}
 				
 				

 			});

		}

		function clean(obj) {
  			for (var propName in obj) { 
   				if (obj[propName] === null || obj[propName] === undefined) {
      				delete obj[propName];
    			}
  			}
		}

		vm.update = function(){
			console.log((vm.loggedInUser));
			// vm.loggedInUser = clean(vm.loggedInUser);
			vm.loggedInUser.id = LocalStorage.get('user_id');
			$http({
    			url: 'http://localhost/thesis/controllers/user/update.php', 
    			method: "POST",
    			data: vm.loggedInUser
 			}).then(function(response){
 				if(response.data.success){
 					$state.reload();
 				}

 			});
		}

		function today (){
			vm.loggedInUser.birthdate = new Date();
		}


	}
})();
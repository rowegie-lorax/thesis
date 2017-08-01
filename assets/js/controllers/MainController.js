;(function(){
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);


	MainController.$inject = ['$http', 'LocalStorage'];

	function MainController($http,LocalStorage){
		var vm = this;
		vm.is_logged_in = LocalStorage.get('is_logged_in');
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
 			});

		}


	}
})();
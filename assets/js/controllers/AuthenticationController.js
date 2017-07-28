(function(){
	'use strict';

	angular
		.module('app')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$http', 'LocalStorage'];

	function AuthenticationController($http, LocalStorage){
		var vm = this;

		vm.message = "Asdf";

		vm.user = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName:''
		}

		vm.login = function(){
			$http({
				url: 'http://localhost/thesis/controllers/user/login.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				LocalStorage.set('is_logged_in', true);
				LocalStorage.set('user_id', response.data.id);
				
	
			})

		}

		vm.register = function(){
			$http({
				url: 'http://localhost/thesis/controllers/user/create.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				console.log(response.data);
			})


		}

	}

})();
(function(){
	'use strict';

	angular
		.module('app')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$http'];

	function AuthenticationController($http){
		var vm = this;

		vm.user = {
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName:'',

		}

		vm.login = function(){
			$http({
				url: 'http://localhost/app/controllers/user/login.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				console.log(response);
			})

		}

		vm.register = function(){
			$http({
				url: 'http://localhost/app/controllers/user/create.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				console.log(response);
			})


		}

	}

})();
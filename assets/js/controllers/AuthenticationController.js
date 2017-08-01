(function(){
	'use strict';

	angular
		.module('app')
		.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = ['$http', '$state', 'LocalStorage'];

	function AuthenticationController($http, $state, $modal, LocalStorage){
		var vm = this;

		vm.message = "";
		vm.success = true;

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
				if (!response.data.hasOwnProperty('success')){
					LocalStorage.set('is_logged_in', true);
					LocalStorage.set('user_id', response.data.id);
					window.location.reload();
				}else{
					vm.message = response.data.message;
					vm.success = response.data.success;

				}
				// console.log();
	
			})

		}

		vm.register = function(){
			$http({
				url: 'http://localhost/thesis/controllers/user/create.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				if (response.data.success){
					alert("Successful registration!");
					$state.go('login');

				}else{
					vm.message = response.data.message;
					vm.success = response.data.success;
				}
			})


		}

		vm.logout = function(){
			$modal.open({
            templateUrl: 'logout.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, user) {
                $scope.user = user;
                $scope.submit = function () {
                    $log.log('Submiting user info.'); // kinda console logs this statement
                    $log.log(user); 
                    $modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });//end of modal.open
		}

	}

})();
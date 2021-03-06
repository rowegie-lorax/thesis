(function(){
	'use strict';

	angular
		.module('app')
		.controller('AuthenticationController', AuthenticationController)
		.controller('ModalInstanceCtrl', ModalInstanceCtrl);

	AuthenticationController.$inject = ['$location', '$http', '$state', 'LocalStorage', '$uibModal'];

	function AuthenticationController($location, $http, $state, LocalStorage, $uibModal){
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
				url: 'controllers/user/login.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				if ( response.data === null){
					vm.message = "User does not exists";
					vm.success = false;
				}else if (!response.data.hasOwnProperty('success')){
					console.log(response.data.has_taken_entrance);
					LocalStorage.set('is_logged_in', true);
					LocalStorage.set('is_admin', response.data.is_admin);
					LocalStorage.set('user_id', response.data.id);
					LocalStorage.set('has_taken_entance', response.data.has_taken_entrance);
					window.location.reload();
				}else{
					vm.message = response.data.message;
					vm.success = response.data.success;
				}
			})

		}

		vm.register = function(){
			console.log(vm.user);
			$http({
				url: 'controllers/user/create.php',
				method: 'POST',
				data: vm.user
			}).then(function(response){
				console.log(response);
				if (response.data.success){
					alert("Successful registration!");
					$state.go('login');

				}else{
					vm.message = response.data.message;
					vm.success = response.data.success;
				}
			})


		}

		vm.logout =  function(){
	    	var modalInstance = $uibModal.open({
	      		animation: true,
	      		ariaLabelledBy: 'modal-title',
	      		ariaDescribedBy: 'modal-body',
	      		templateUrl: 'views/authentication/logout.html',
	      		controller: 'ModalInstanceCtrl',
	      		controllerAs: 'vm',
	      		size: 'sm'
	    	});

		    modalInstance.result.then(function (choice) {
		    	if (choice){
		    		LocalStorage.remove('is_logged_in');
		    		LocalStorage.remove('user_id');
		    		LocalStorage.remove('is_admin');
		    		LocalStorage.remove('has_taken_entance');
		    		window.location.reload();
		    	}
		    }, function () {

		    });

		}

	}

	function ModalInstanceCtrl($uibModalInstance){
		var vm = this;
		
		vm.ok = function () {
			$uibModalInstance.close(true);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();
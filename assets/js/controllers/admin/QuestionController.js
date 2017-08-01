(function(){
	'use strict';

	angular
		.module('app')
		.controller('QuestionController', QuestionController)
		.controller('ModalInstanceCtrl', ModalInstanceCtrl);

	QuestionController.$inject = ['$http', '$uibModal']

	function QuestionController($http, $uibModal){
		var vm = this;

		vm.question = {
			questionName: '' ,
			category: '',

		}

		vm.addQuestion = function(){
			var modalInstance = $uibModal.open({
	      		animation: true,
	      		ariaLabelledBy: 'modal-title',
	      		ariaDescribedBy: 'modal-body',
	      		templateUrl: 'views/admin/add-question.html',
	      		controller: 'ModalInstanceCtrl',
	      		controllerAs: 'vm',
	      		size: 'md',
	      		resolve: {
	        		items: function () {
	          			return vm.items;
	        		}
	     	 	}
	    	});

		    modalInstance.result.then(function (choice) {
		    	console.log(choice);
		    }, function () {

		    });

		}


	}

	function ModalInstanceCtrl($uibModalInstance){
		var vm = this;
		vm.question = {
			content: '',
			category:'',
			answer: '',
			choices:{},
			exam_type:''
		}
		
		vm.ok = function () {
			$uibModalInstance.close(true);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}


})();
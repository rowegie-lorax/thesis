(function(){
	'use strict';

	angular
		.module('app')
		.controller('QuestionController', QuestionController)
		.controller('ModalInstanceCtrl', ModalInstanceCtrl);

	QuestionController.$inject = ['$http', '$uibModal'];

	function QuestionController($http, $uibModal){
		var vm = this;

		getQuestionCategories();
		getExamTypes();

		function getQuestionCategories(){
			$http({
				url: 'http://localhost/thesis/controllers/question_categories/retrieve.php',
				method: 'GET'
			}).then(function(response){
				vm.categories = response.data;
			})

		}

		function getExamTypes(){
			$http({
				url: 'http://localhost/thesis/controllers/exam/retrieve.php',
				method: 'GET'
			}).then(function(response){
				vm.exam_types = response.data;
			})

		}

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
	        		categories: function(){
	          			return vm.categories;
	        		},
	        		exam_types: function(){
	        			return vm.exam_types;
	        		}
	     	 	}
	    	});

		    modalInstance.result.then(function (question) {
		    	console.log(question);
		    	$http({
					url: 'http://localhost/thesis/controllers/questions/create.php',
					method: 'POST',
					data: question
				}).then(function(response){
					console.log(response.data);
				})

		    }, function () {

		    });

		}


	}

	function ModalInstanceCtrl($uibModalInstance, categories, exam_types){
		var vm = this;

		vm.categories = categories;
		vm.exam_types = exam_types;
		vm.answerOptions = [];

		vm.question = {
			content: '',
			category:'',
			answer: '',
			choices:[],
			exam_type:''
		}
		
		vm.choicesConfig = {
		    create: true,
		    maxItems: 4
		}

		vm.ok = function () {
			$uibModalInstance.close(vm.question);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}


})();

(function(){
	'use strict';

	angular
		.module('app')
		.controller('QuestionController', QuestionController)
		.controller('ModalQuestionCtrl', ModalQuestionCtrl);

	QuestionController.$inject = ['$http', '$state', '$uibModal'];

	function QuestionController($http, $state, $uibModal){
		var vm = this;

		getQuestionCategories();
		getExamTypes();
		retrieveQuestions();

		function retrieveQuestions(){
			$http({
				url: 'controllers/questions/list.php',
				method: 'GET'
			}).then(function(response){
				vm.questions = response.data;
			})

		}

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

		vm.addQuestion = function(){
			var modalInstance = $uibModal.open({
	      		animation: true,
	      		ariaLabelledBy: 'modal-title',
	      		ariaDescribedBy: 'modal-body',
	      		templateUrl: 'views/admin/add-question.html',
	      		controller: 'ModalQuestionCtrl',
	      		controllerAs: 'vm',
	      		size: 'md',
	      		// backdrop: false,
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
		    	$http({
					url: 'controllers/questions/create.php',
					method: 'POST',
					data: question
				}).then(function(response){
					if (response.data.hasOwnProperty('success')){
						$state.reload();
					}
				})

		    }, function () {

		    });

		}


	}

	function ModalQuestionCtrl($uibModalInstance, categories, exam_types){
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
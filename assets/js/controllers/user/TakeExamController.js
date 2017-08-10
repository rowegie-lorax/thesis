;(function(){
	'use strict';

	angular
		.module('app')
		.controller('TakeExamController', TakeExamController);


	TakeExamController.$inject = ['$http', '$state', 'LocalStorage'];

	function TakeExamController($http, $state, LocalStorage){
		var vm = this;
		vm.is_logged_in = LocalStorage.get('is_logged_in');
    vm.user_id = LocalStorage.get('user_id');

    vm.previousPage = 0;
  	vm.currentPage = 1;
    vm.itemsPerPage = 1;
    vm.previousSelected = {};
    vm.selected = {};
    vm.score = 0;
    vm.isFinised = false;
    vm.answers =[];
    vm.result = {};
  	retrieveQuestions();
    retrieveChoices();
    

		function retrieveQuestions(){

      var id = LocalStorage.get('has_taken_entance') === 0 ? 1 : 2 ;

			$http({
        url:'controllers/questions/retrieve.php',
        method: 'GET',
        params: {exam_id: id }

      }).then(function(response){
        vm.totalItems = 4;
        if (vm.totalItems > 0){
          vm.questions = angular.fromJson(response.data);
          console.log(vm.questions);
        }
			})
		}

    function retrieveChoices(){
      $http({
        url: 'controllers/choices/retrieve.php',
        method: 'GET',
      }).then(function(response){
        if (response.data.length > 0 ){
          vm.choices = angular.fromJson(response.data);
        }
      });
    }

    vm.checkAnswer = function(){
      
      if (vm.currentPage > vm.previousPage){
        var index = vm.answers.indexOf(vm.selected);
        if (index === -1){
          if (vm.answers.length === 0){
            vm.selected.answer = vm.answer;
            vm.answers.push(vm.selected);
          }else{
             vm.selected.answer = vm.answer;
             vm.answers[vm.previousPage] = vm.selected
             vm.selected = vm.currentSelected;
          }
        }else{
          console.log(vm.selected);
          vm.selected = vm.currentSelected;
          console.log(vm.selected);
        }
        
      }else{
        vm.currentSelected = vm.selected;
        console.log(vm.currentSelected);
        vm.selected = vm.answers[vm.currentPage-1];
      }
      vm.previousPage = vm.currentPage-1;
    }

    vm.selectAnswer = function(){
      vm.selected.answer = vm.answer;
    }
    vm.submitAnswer = function(){
      if(vm.selected.hasOwnProperty('choice_name')){
        vm.selected.answer = vm.answer;
      }
      vm.answers.push(vm.selected);
      console.log(vm.answers);
      angular.forEach(vm.answers, function(value, key){
        if (value['choice_name'].toUpperCase() === value['answer'].toUpperCase()){
          vm.score += 1 ;
        }
      })
      console.log(vm.score);
      vm.isFinised = true;

      vm.exam_result = (vm.score/vm.total * 100) > 74.44 ? "pass" : "fail";

      vm.result = {
        user_id: vm.user_id,
        score: vm.score,
        total: vm.totalItems,
        exam_result: vm.exam_result,
        date_taken: new Date()

      }
      $http({
        method: 'POST',
        url: 'controllers/exam_results/create.php',
        data: vm.result
      }).then(function(response){
        console.log(response);
      });

    }
    
	}


})();
;(function(){
	'use strict';

	angular
		.module('app')
		.controller('TakeExamController', TakeExamController);


	TakeExamController.$inject = ['$http', '$state', 'LocalStorage'];

	function TakeExamController($http, $state, LocalStorage){
		var vm = this;
		vm.is_logged_in = LocalStorage.get('is_logged_in');


  	vm.currentPage = 1;
    vm.itemsPerPage = 1;
    vm.selected = [];
    vm.score = 0;

  	retrieveQuestions();
    retrieveChoices();
    

		function retrieveQuestions(){

			$http.get('http://localhost/thesis/controllers/questions/retrieve.php').then(function(response){
        vm.totalItems = response.data.length;
        if (vm.totalItems > 0){
          vm.questions = angular.fromJson(response.data);
        }
			})
		}

    function retrieveChoices(){
      $http({
        url: 'http://localhost/thesis/controllers/choices/retrieve.php',
        method: 'GET',
      }).then(function(response){
        if (response.data.length > 0 ){
          vm.choices = angular.fromJson(response.data);
        }
      });
    }

    vm.checkAnswer = function(choice, answer){
      if (choice.choice_name.toUpperCase() === answer.toUpperCase()){
        vm.score += 1 ;
        console.log(vm.score);
      }
    }

	}


})();
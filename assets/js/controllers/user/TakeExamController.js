;(function(){
	'use strict';

	angular
		.module('app')
		.controller('TakeExamController', TakeExamController);


	TakeExamController.$inject = ['$http', '$state', 'LocalStorage'];

	function TakeExamController($http, $state, LocalStorage){
		var vm = this;
		vm.is_logged_in = LocalStorage.get('is_logged_in');


		vm.totalItems = 64;
  		vm.currentPage = 4;

  		retrieveQuestions();

  		function retrieveQuestions(){
  			// $http({
  			// 	url: 'http://localhost/thesis/controllers/questions/retrieve.php',
  			// 	method: 'GET'
  			// }).then(function(response){
  				
  			// })
  			$http.get('http://localhost/thesis/controllers/questions/retrieve.php')
  				 .then(function(response){
  				 	console.log(angular.fromJson(response));
  				 })

  		}



	}


})();
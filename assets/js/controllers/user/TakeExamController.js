  ;(function(){
  	'use strict';

  	angular
  		.module('app')
  		.controller('TakeExamController', TakeExamController)
      .controller('ModalResultController', ModalResultController );


  	TakeExamController.$inject = ['$scope', '$window', '$http', '$state', '$uibModal', 'LocalStorage'];

  	function TakeExamController($scope, $window, $http, $state, $uibModal, LocalStorage){

  		var vm = this;
  		vm.is_logged_in = LocalStorage.get('is_logged_in');
      vm.user_id = LocalStorage.get('user_id');
      vm.exam_id = LocalStorage.get('has_taken_entance') === '0' ? 1 : 2 ;
      
      var documentResult = document.getElementById("time");
      // var wrappedDocumentResult = angular.element(documentResult);
      // console.log(wrappedDocumentResult);

      vm.previousPage = 0;
    	vm.currentPage = 1;
      vm.itemsPerPage = 1;
      vm.previousSelected = {};
      vm.selected = undefined;
      vm.score = 0;
      vm.isFinished = false;
      vm.answers =[];
      vm.result = {};


    	retrieveQuestions();
      retrieveChoices();
      console.log(vm.isFinished);
      startTimer(60*5, documentResult);

      
      
      function startTimer(duration, display) {
        var start = Date.now(),
            diff,
            minutes,
            seconds;

        function timesUp() {
          alert("Time is up!");
          window.clearInterval();
          vm.submitAnswer();

        }
        function timer() {
            diff = duration - (((Date.now() - start) / 1000) | 0);
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds; 
            if (diff <= 0) {
                start = Date.now() + 1000;
            }
            if (minutes == 0 && seconds == 0){
              timesUp();
            }
        };
        if (!vm.isFinished){
          timer();
          setInterval(timer, 1000);
        }
        
      }


  		function retrieveQuestions(){

  			$http({
          url:'controllers/questions/retrieve.php',
          method: 'GET',
          params: {id: vm.exam_id }

        }).then(function(response){
          vm.totalItems = response.data.length;
          if (vm.totalItems > 0){
            vm.questions = angular.fromJson(response.data);
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
            vm.selected = vm.currentSelected;
          }
          
        }else{
          vm.currentSelected = vm.selected;
          vm.selected = vm.answers[vm.currentPage-1];
        }
        vm.previousPage = vm.currentPage-1;
      }

      vm.selectAnswer = function(){
        vm.selected.answer = vm.answer;
      }

      vm.submitAnswer = function(){
        console.log(vm.selected);
        if(vm.selected !== undefined){
          vm.selected.answer = vm.answer;
          vm.answers.push(vm.selected);
        }
        console.log(vm.answers);
        if (vm.answers.length > 0){
          angular.forEach(vm.answers, function(value, key){
            if (value['choice_name'].toUpperCase() === value['answer'].toUpperCase()){
              vm.score += 1 ;
            }
          })
          
        }
        vm.isFinished = true;
        vm.exam_result = (vm.score/vm.totalItems * 100) >= vm.passing_rate ? "pass" : "fail";

        vm.result = {
          user_id: vm.user_id,
          exam_id: vm.exam_id,
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
          if(response.data.success== "True"){
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/user/exam_result.html',
              controller: 'ModalResultController',
              controllerAs: 'vm',
              size: 'md',
              // backdrop: false,
              resolve: {
                results: function(){
                    return vm.result;
                },
                passing_rate: function(){
                  return vm.passing_rate
                }
                
              }

            });

            modalInstance.result.then(function () {
              $state.go('profile');
            }, function () {
              $state.go('profile');
            });
          }
        });
        
      }
      
  	}

    function ModalResultController($uibModalInstance, results, passing_rate){
      var vm = this;

      vm.results = results;
      vm.passing_rate = passing_rate;

      vm.ok = function () {
        $uibModalInstance.close();
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }


  })(); 
(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap','selectize'])
        .run(run)
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    run.$inject = ['$location', '$rootScope','LocalStorage'];


    function config($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.html5Mode(true);
    	$locationProvider.hashPrefix('');
    	$stateProvider
    		.state('home', {
    			url: '/home',
    			templateUrl: 'views/layout/home.html',
                controller: 'MainController',
                controllerAs: 'vm'
    		})
    		.state('login', {
    			url: '/login',
    			templateUrl: 'views/authentication/login.html',
    			controller: 'AuthenticationController',
    			controllerAs: 'vm'
    		})
    		.state('register', {
    			url: '/register',
    			templateUrl: 'views/authentication/register.html',
    			controller: 'AuthenticationController',
    			controllerAs: 'vm'
    		})
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/user/profile.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('questions', {
                url: '/questions',
                templateUrl: 'views/admin/questions.html',
                controller: 'QuestionController',
                controllerAs: 'vm'
            })
            .state('exam', {
                url: '/exam',
                templateUrl: 'views/user/exam.html',
                controller: 'TakeExamController',
                controllerAs: 'vm'
            });

            

    	$urlRouterProvider.otherwise('/home');
       
    }



    function run($location, $rootScope, LocalStorage){

        $rootScope.$on('$locationChangeStart', function(){
            var is_logged_in = LocalStorage.get('is_logged_in');
            var urls = ['/login', '/register'];

            if (is_logged_in){
                if ( urls.indexOf($location.path()) != -1 ){
                    $location.path('/home')
                }

            }else{
                if($location.path() == '/register'){
                    $location.path('/register');
                }else{
                    $location.path('/login');
                }
                
            }           

        })
        

    }

})();



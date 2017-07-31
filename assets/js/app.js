(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.bootstrap'])
        .run(run)
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    run.$inject = ['$location', '$rootScope','$state', '$stateParams'];


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
            .state('logout',{
                url: '/logout',
                templateUrl: 'views/authentication/register.html',
                controller: 'AuthenticationController',
                controllerAs: 'vm' 
            })

    	$urlRouterProvider.otherwise('/home');
       
    }



    function run($location, $rootScope, $state, $stateParams){

        $rootScope.$on('$locationChangeStart', function(){
            var is_logged_in = localStorage.getItem('is_logged_in');

            if (is_logged_in && $location.path() === '/login' || $location.path() === '/register' )  {
                $location.path('home');
            }

        })
        

    }

})();


